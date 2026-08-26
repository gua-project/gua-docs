import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

const markdownConverter = createMarkdownConverter();

export function renderDocumentation(root: HTMLElement): string {
  const clone = root.cloneNode(true) as HTMLElement;
  clone.querySelectorAll('script, style, iframe, .ad-label').forEach((element) => element.remove());
  return markdownConverter.turndown(clone).replace(/\n{3,}/g, '\n\n').trim();
}

export function renderDocumentationHtml(html: string): string {
  return markdownConverter.turndown(html).replace(/\n{3,}/g, '\n\n').trim();
}

function createMarkdownConverter(): TurndownService {
  const converter = new TurndownService({
    headingStyle: 'atx',
    bulletListMarker: '-',
    codeBlockStyle: 'fenced',
    fence: '```',
    emDelimiter: '*',
    strongDelimiter: '**',
    linkStyle: 'inlined',
  });
  converter.use(gfm);

  converter.addRule('guaCodeBlock', {
    filter: (node) => node.nodeName === 'FIGURE' && node.classList.contains('code-block'),
    replacement: (_content, node) => {
      const title = node.querySelector('figcaption > span:not(.traffic)')?.textContent?.trim();
      const language = normalizeCodeLanguage(node.querySelector('figcaption > small')?.textContent);
      const code = node.querySelector('pre > code')?.textContent?.replace(/\n$/, '') ?? '';
      const fence = createCodeFence(code);
      const caption = title ? `**${title}**\n\n` : '';
      return `\n\n${caption}${fence}${language}\n${code}\n${fence}\n\n`;
    },
  });

  converter.addRule('guaCallout', {
    filter: (node) => node.nodeName === 'ASIDE' && node.classList.contains('callout'),
    replacement: (_content, node) => {
      const calloutType = node.classList.contains('warn')
        ? 'WARNING'
        : node.classList.contains('tip') ? 'TIP' : 'NOTE';
      const children = Array.from(node.children);
      const titleElement = children.find((child) => child.tagName === 'STRONG');
      const body = children.find((child): child is HTMLElement => child.tagName === 'DIV');
      const title = titleElement?.textContent
        ?.replace(/^(?:✓|!|i)\s*/u, '')
        .trim();
      const bodyMarkdown = body ? converter.turndown(body).trim() : '';
      const lines = [
        `[!${calloutType}]`,
        ...(title ? [`**${title}**`] : []),
        ...(bodyMarkdown ? ['', ...bodyMarkdown.split('\n')] : []),
      ];
      return `\n\n${lines.map((line) => `> ${line}`.trimEnd()).join('\n')}\n\n`;
    },
  });

  return converter;
}

function normalizeCodeLanguage(value: string | null | undefined): string {
  const language = value?.trim().toLocaleLowerCase() ?? '';
  return /^[a-z0-9_+.-]+$/u.test(language) ? language : 'text';
}

function createCodeFence(code: string): string {
  const longestFence = Math.max(0, ...Array.from(code.matchAll(/`{3,}/g), (match) => match[0].length));
  return '`'.repeat(Math.max(3, longestFence + 1));
}
