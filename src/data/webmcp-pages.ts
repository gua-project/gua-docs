import type { DocsPage } from 'webmcp-docs';
import { docs, docsEn, sectionGroups, sectionGroupsEn } from './nav';

interface NavigationItem {
  label: string;
  href: string;
  children: readonly NavigationChild[];
}

interface NavigationChild {
  label: string;
  href: string;
}

interface NavigationGroup {
  label: string;
  items: readonly NavigationItem[];
}

interface DocsLink {
  label: string;
  href: string;
}

export function createWebMcpNavigationPages(siteBase: URL): DocsPage[] {
  return [
    { id: '/', title: 'Introduction', url: new URL('', siteBase).href, section: 'English / HOME' },
    ...flattenGroups(sectionGroupsEn, siteBase, 'English'),
    ...flattenDocs(docsEn, siteBase, 'English / DOCS / REFERENCE'),
    { id: '/ja/', title: 'はじめに', url: new URL('ja/', siteBase).href, section: '日本語 / ホーム' },
    ...flattenGroups(sectionGroups, siteBase, '日本語'),
    ...flattenDocs(docs, siteBase, '日本語 / DOCS / REFERENCE'),
  ];
}

function flattenGroups(
  groups: readonly NavigationGroup[],
  siteBase: URL,
  language: string,
): DocsPage[] {
  return groups.flatMap((group) => {
    const section = `${language} / ${group.label}`;
    return group.items.flatMap((item) => [
      toPage(item, siteBase, section),
      ...item.children.map((child) => toPage(child, siteBase, section)),
    ]);
  });
}

function flattenDocs(
  links: readonly DocsLink[],
  siteBase: URL,
  section: string,
): DocsPage[] {
  return links.map((link) => toPage(link, siteBase, section));
}

function toPage(link: DocsLink, siteBase: URL, section: string): DocsPage {
  return {
    id: link.href,
    title: link.label,
    url: new URL(link.href.replace(/^\//, ''), siteBase).href,
    section,
  };
}
