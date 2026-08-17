export const sections = [
  { label: 'AI Coding・Playtesting', href: '/ja/ai-coding/', accent: 'blue', children: [] },
  {
    label: 'Godot編', href: '/ja/godot/', accent: 'mint',
    children: [
      { label: '導入とUI実装', href: '/ja/godot/ui/' },
      { label: 'テストの仕方', href: '/ja/godot/testing/' },
    ],
  },
  {
    label: 'Unity編', href: '/ja/unity/', accent: 'amber',
    children: [
      { label: '導入とUI実装', href: '/ja/unity/ui/' },
      { label: 'テストの仕方', href: '/ja/unity/testing/' },
    ],
  },
  { label: 'インスペクタ編', href: '/ja/inspector/', accent: 'violet', children: [] },
  { label: 'MCPサーバー操作編', href: '/ja/mcp/', accent: 'blue', children: [] },
] as const;

export const docs = [
  { label: 'Docs概要', href: '/ja/docs/' },
  { label: '.NETパッケージ', href: '/ja/docs/dotnet-packages/' },
  { label: 'Godot API・仕様', href: '/ja/docs/runtime-adapters/' },
  { label: 'Unity API・仕様', href: '/ja/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/ja/docs/github-actions/' },
] as const;

export const sectionsEn = [
  { label: 'AI Coding & Playtesting', href: '/ai-coding/', accent: 'blue', children: [] },
  {
    label: 'Godot', href: '/godot/', accent: 'mint',
    children: [
      { label: 'Install and implement UI', href: '/godot/ui/' },
      { label: 'Testing UI', href: '/godot/testing/' },
    ],
  },
  {
    label: 'Unity', href: '/unity/', accent: 'amber',
    children: [
      { label: 'Install and implement UI', href: '/unity/ui/' },
      { label: 'Testing UI', href: '/unity/testing/' },
    ],
  },
  { label: 'Inspector', href: '/inspector/', accent: 'violet', children: [] },
  { label: 'MCP Server', href: '/mcp/', accent: 'blue', children: [] },
] as const;

export const docsEn = [
  { label: 'Docs overview', href: '/docs/' },
  { label: '.NET packages', href: '/docs/dotnet-packages/' },
  { label: 'Godot API and specification', href: '/docs/runtime-adapters/' },
  { label: 'Unity API and specification', href: '/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/docs/github-actions/' },
] as const;
