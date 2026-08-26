import { describe, expect, test } from 'bun:test';
import { renderDocumentationHtml } from './docs-markdown';

describe('renderDocumentationHtml', () => {
  test('preserves links, ordered lists, and GFM tables', () => {
    const markdown = renderDocumentationHtml(`
      <p>Open the <a href="https://github.com/link1345/gua/releases/latest">latest release</a>.</p>
      <ol><li>Download the package</li><li>Install it</li></ol>
      <table><thead><tr><th>Engine</th><th>Version</th></tr></thead>
      <tbody><tr><td>Godot</td><td>4.7</td></tr></tbody></table>
    `);

    expect(markdown).toContain('[latest release](https://github.com/link1345/gua/releases/latest)');
    expect(markdown).toContain('1.  Download the package');
    expect(markdown).toContain('2.  Install it');
    expect(markdown).toContain('| Engine | Version |');
    expect(markdown).toContain('| --- | --- |');
  });

  test('keeps Gua code-block titles and languages', () => {
    const markdown = renderDocumentationHtml(`
      <figure class="code-block">
        <figcaption><span class="traffic"><i></i></span><span>main.gd</span><small>gdscript</small></figcaption>
        <pre><code>extends Node\nprint(&quot;ready&quot;)</code></pre>
      </figure>
    `);

    expect(markdown).toContain('**main.gd**');
    expect(markdown).toContain('```gdscript\nextends Node\nprint("ready")\n```');
  });

  test('converts Gua callouts to readable alert blocks', () => {
    const markdown = renderDocumentationHtml(`
      <aside class="callout warn">
        <strong>! Player settings</strong>
        <div><p>Use <code>Mono</code>. See the <a href="/unity/">Unity guide</a>.</p></div>
      </aside>
    `);

    expect(markdown).toContain('> [!WARNING]');
    expect(markdown).toContain('> **Player settings**');
    expect(markdown).toContain('> Use `Mono`. See the [Unity guide](/unity/).');
  });
});
