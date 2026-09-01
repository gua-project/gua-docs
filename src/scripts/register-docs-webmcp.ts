import {
  registerDocsWebMcp,
  type DocsDocument,
  type DocsHeading,
  type DocsPage,
  type DocsProvider,
  type DocsSearchResult,
} from 'webmcp-docs';
import { renderDocumentation } from './docs-markdown';

const pathsElement = document.querySelector<HTMLScriptElement>('#webmcp-document-paths');
const pagesElement = document.querySelector<HTMLScriptElement>('#webmcp-navigation-pages');

if (pathsElement?.textContent) {
  const documentPaths = parseDocumentPaths(pathsElement.textContent);
  const navigationPages = parseNavigationPages(pagesElement?.textContent ?? '[]');
  const documentPathSet = new Set(documentPaths);
  const documentCache = new Map<string, Promise<DocsDocument | null>>();

  const loadDocument = (path: string) => {
    const cached = documentCache.get(path);
    if (cached) return cached;

    const pending = fetchDocument(path).catch(() => null);
    documentCache.set(path, pending);
    return pending;
  };

  const provider: DocsProvider = {
    async search(query) {
      const normalizedQuery = normalizeSearchText(query);
      if (!normalizedQuery) return [];

      const documents = await loadAllDocuments(documentPaths, loadDocument);
      return documents
        .map((document) => toRankedSearchResult(document, normalizedQuery))
        .filter((result): result is RankedSearchResult => result !== null)
        .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
        .slice(0, 20)
        .map(({ score: _, ...result }) => result);
    },
    async getDocument(id) {
      const path = normalizeDocumentId(id);
      if (!path || !documentPathSet.has(path)) return null;
      return loadDocument(path);
    },
  };

  void registerDocsWebMcp({ provider, pages: navigationPages }).then((registration) => {
    if (registration.status === 'failed') {
      console.warn(`[Gua Docs WebMCP] ${registration.error.message}`);
    }
  });
}

function parseNavigationPages(value: string): DocsPage[] {
  try {
    const parsed: unknown = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter((item): item is DocsPage => {
      if (typeof item !== 'object' || item === null) return false;
      const page = item as Record<string, unknown>;
      return typeof page.id === 'string'
        && page.id.startsWith('/')
        && typeof page.title === 'string'
        && page.title.length > 0
        && (page.url === undefined || (typeof page.url === 'string' && page.url.length > 0))
        && (page.section === undefined || (typeof page.section === 'string' && page.section.length > 0));
    });
  } catch {
    return [];
  }
}

interface RankedSearchResult extends DocsSearchResult {
  score: number;
}

function parseDocumentPaths(value: string): string[] {
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed)
      ? parsed.filter((item): item is string => typeof item === 'string' && item.startsWith('/'))
      : [];
  } catch {
    return [];
  }
}

async function loadAllDocuments(
  paths: readonly string[],
  loadDocument: (path: string) => Promise<DocsDocument | null>,
): Promise<DocsDocument[]> {
  const documents: DocsDocument[] = [];
  let nextIndex = 0;

  const worker = async () => {
    while (nextIndex < paths.length) {
      const path = paths[nextIndex++];
      if (!path) continue;
      const document = await loadDocument(path);
      if (document) documents.push(document);
    }
  };

  await Promise.all(Array.from({ length: Math.min(6, paths.length) }, worker));
  return documents;
}

async function fetchDocument(path: string): Promise<DocsDocument | null> {
  const response = await fetch(path, { headers: { Accept: 'text/html' } });
  if (!response.ok) return null;

  const html = await response.text();
  const page = new DOMParser().parseFromString(html, 'text/html');
  const contentRoot = page.querySelector<HTMLElement>('.doc-body')
    ?? page.querySelector<HTMLElement>('main.content');
  if (!contentRoot) return null;

  const title = page.querySelector('h1')?.textContent?.trim()
    ?? page.title.replace(/\s*\|\s*Gua(?: 日本語)? Reference.*$/u, '').trim();
  if (!title) return null;

  const canonicalUrl = page.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href
    ?? new URL(path, window.location.origin).href;

  return {
    id: path,
    title,
    content: renderDocumentation(contentRoot),
    canonicalUrl,
    headings: extractHeadings(contentRoot),
  };
}

function extractHeadings(root: HTMLElement): DocsHeading[] {
  return Array.from(root.querySelectorAll<HTMLHeadingElement>('h1, h2, h3, h4, h5, h6'))
    .map((heading) => ({
      title: heading.textContent?.trim() ?? '',
      level: Number(heading.tagName.slice(1)),
      ...(heading.id ? { id: heading.id } : {}),
    }))
    .filter((heading) => heading.title.length > 0);
}

function normalizeDocumentId(id: string): string | null {
  try {
    const url = new URL(id, window.location.origin);
    if (url.origin !== window.location.origin) return null;
    const path = decodeURIComponent(url.pathname);
    if (path === '/') return path;
    return path.endsWith('/') ? path : `${path}/`;
  } catch {
    return null;
  }
}

function normalizeSearchText(value: string): string {
  return value.normalize('NFKC').toLocaleLowerCase().trim();
}

function toRankedSearchResult(document: DocsDocument, query: string): RankedSearchResult | null {
  const title = normalizeSearchText(document.title);
  const headings = normalizeSearchText(document.headings?.map((heading) => heading.title).join(' ') ?? '');
  const content = normalizeSearchText(document.content);
  const terms = query.split(/\s+/u).filter(Boolean);
  if (!terms.every((term) => title.includes(term) || headings.includes(term) || content.includes(term))) {
    return null;
  }

  let score = title.includes(query) ? 120 : 0;
  score += headings.includes(query) ? 70 : 0;
  score += content.includes(query) ? 30 : 0;
  for (const term of terms) {
    if (title.includes(term)) score += 25;
    if (headings.includes(term)) score += 12;
    if (content.includes(term)) score += 3;
  }

  return {
    id: document.id,
    title: document.title,
    excerpt: createExcerpt(document.content, query, terms),
    url: document.canonicalUrl,
    section: document.id.startsWith('/ja/') ? '日本語' : 'English',
    score,
  };
}

function createExcerpt(content: string, query: string, terms: readonly string[]): string {
  const normalizedContent = normalizeSearchText(content);
  let matchIndex = normalizedContent.indexOf(query);
  if (matchIndex < 0) {
    matchIndex = terms.reduce((best, term) => {
      const index = normalizedContent.indexOf(term);
      return index >= 0 && (best < 0 || index < best) ? index : best;
    }, -1);
  }

  const start = Math.max(0, matchIndex - 90);
  const excerpt = content.slice(start, start + 280).replace(/\s+/g, ' ').trim();
  return `${start > 0 ? '…' : ''}${excerpt}${start + 280 < content.length ? '…' : ''}`;
}
