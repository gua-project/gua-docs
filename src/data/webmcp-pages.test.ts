import { describe, expect, test } from 'bun:test';
import { createWebMcpNavigationPages } from './webmcp-pages';

describe('createWebMcpNavigationPages', () => {
  test('exposes English and Japanese navigation with canonical URLs and sections', () => {
    const pages = createWebMcpNavigationPages(new URL('https://gua.orizika.com/'));

    expect(pages).toContainEqual({
      id: '/webmcp/',
      title: 'Browser-native WebMCP',
      url: 'https://gua.orizika.com/webmcp/',
      section: 'English / OPERATE WITH AI',
    });
    expect(pages).toContainEqual({
      id: '/ja/webmcp/',
      title: 'ブラウザWebMCP編',
      url: 'https://gua.orizika.com/ja/webmcp/',
      section: '日本語 / AIから操作する',
    });
    expect(new Set(pages.map((page) => page.id)).size).toBe(pages.length);
  });
});
