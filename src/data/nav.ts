export const sections = [
  { label: 'AI Coding・Playtesting', href: '/ai-coding/', accent: 'blue', children: [] },
  {
    label: 'Godot編', href: '/godot/', accent: 'mint',
    children: [
      { label: '導入とUI実装', href: '/godot/ui/' },
      { label: 'テストの仕方', href: '/godot/testing/' },
    ],
  },
  {
    label: 'Unity編', href: '/unity/', accent: 'amber',
    children: [
      { label: '導入とUI実装', href: '/unity/ui/' },
      { label: 'テストの仕方', href: '/unity/testing/' },
    ],
  },
  { label: 'インスペクタ編', href: '/inspector/', accent: 'violet', children: [] },
  { label: 'MCPサーバー操作編', href: '/mcp/', accent: 'blue', children: [] },
] as const;

export const docs = [
  { label: 'Docs概要', href: '/docs/' },
  { label: '.NETパッケージ', href: '/docs/dotnet-packages/' },
  { label: 'Godot API・仕様', href: '/docs/runtime-adapters/' },
  { label: 'Unity API・仕様', href: '/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/docs/github-actions/' },
] as const;

export const sectionsEn = [
  { label: 'AI Coding & Playtesting', href: '/en/ai-coding/', accent: 'blue', children: [] },
  {
    label: 'Godot', href: '/en/godot/', accent: 'mint',
    children: [
      { label: 'Install and implement UI', href: '/en/godot/ui/' },
      { label: 'Testing UI', href: '/en/godot/testing/' },
    ],
  },
  {
    label: 'Unity', href: '/en/unity/', accent: 'amber',
    children: [
      { label: 'Install and implement UI', href: '/en/unity/ui/' },
      { label: 'Testing UI', href: '/en/unity/testing/' },
    ],
  },
  { label: 'Inspector', href: '/en/inspector/', accent: 'violet', children: [] },
  { label: 'MCP Server', href: '/en/mcp/', accent: 'blue', children: [] },
] as const;

export const docsEn = [
  { label: 'Docs overview', href: '/en/docs/' },
  { label: '.NET packages', href: '/en/docs/dotnet-packages/' },
  { label: 'Godot API and specification', href: '/en/docs/runtime-adapters/' },
  { label: 'Unity API and specification', href: '/en/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/en/docs/github-actions/' },
] as const;
