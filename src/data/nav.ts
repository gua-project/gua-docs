export const sectionGroups = [
  {
    label: '始める',
    items: [
      { label: 'AI開発・AIプレイヤー', href: '/ja/ai-coding/', accent: 'blue', children: [] },
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
    ],
  },
  {
    label: 'ゲームを公開する',
    items: [
      { label: 'Semantic UI Tree編', href: '/ja/semantic-ui-tree/', accent: 'mint', children: [] },
      { label: 'World Object Tree編', href: '/ja/world-object-tree/', accent: 'amber', children: [] },
      { label: 'ゲーム入力編', href: '/ja/game-input/', accent: 'violet', children: [] },
    ],
  },
  {
    label: 'AIから操作する',
    items: [
      { label: 'MCPサーバー編', href: '/ja/mcp/', accent: 'blue', children: [] },
      { label: 'ブラウザWebMCP編', href: '/ja/webmcp/', accent: 'blue', children: [] },
    ],
  },
  {
    label: 'テスト・調査する',
    items: [
      { label: 'インスペクタ編', href: '/ja/inspector/', accent: 'violet', children: [] },
      { label: 'Visualテスト編', href: '/ja/visual-testing/', accent: 'violet', children: [] },
      { label: 'Recording編', href: '/ja/recording/', accent: 'blue', children: [] },
    ],
  },
  {
    label: '安全性・再現性を高める',
    items: [
      { label: '仮想時計編', href: '/ja/virtual-clock/', accent: 'mint', children: [] },
      { label: 'AIエージェント公開ポリシー編', href: '/ja/agent-policy/', accent: 'blue', children: [] },
    ],
  },
] as const;

export const docs = [
  { label: 'Docs概要', href: '/ja/docs/' },
  { label: '.NETパッケージ', href: '/ja/docs/dotnet-packages/' },
  { label: 'Gua.Runtime実装ガイド', href: '/ja/docs/gua-runtime/' },
  { label: 'Godot API・仕様', href: '/ja/docs/runtime-adapters/' },
  { label: 'Unity API・仕様', href: '/ja/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/ja/docs/github-actions/' },
  { label: '変更監査', href: '/ja/docs/change-audit/' },
] as const;

export const sectionGroupsEn = [
  {
    label: 'GET STARTED',
    items: [
      { label: 'AI development & players', href: '/ai-coding/', accent: 'blue', children: [] },
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
    ],
  },
  {
    label: 'EXPOSE THE GAME',
    items: [
      { label: 'Semantic UI Tree', href: '/semantic-ui-tree/', accent: 'mint', children: [] },
      { label: 'World Object Tree', href: '/world-object-tree/', accent: 'amber', children: [] },
      { label: 'Game input', href: '/game-input/', accent: 'violet', children: [] },
    ],
  },
  {
    label: 'OPERATE WITH AI',
    items: [
      { label: 'MCP server', href: '/mcp/', accent: 'blue', children: [] },
      { label: 'Browser-native WebMCP', href: '/webmcp/', accent: 'blue', children: [] },
    ],
  },
  {
    label: 'TEST & INSPECT',
    items: [
      { label: 'Inspector', href: '/inspector/', accent: 'violet', children: [] },
      { label: 'Visual testing', href: '/visual-testing/', accent: 'violet', children: [] },
      { label: 'Recording', href: '/recording/', accent: 'blue', children: [] },
    ],
  },
  {
    label: 'SAFETY & REPRODUCIBILITY',
    items: [
      { label: 'Virtual clock', href: '/virtual-clock/', accent: 'mint', children: [] },
      { label: 'AI agent exposure policy', href: '/agent-policy/', accent: 'blue', children: [] },
    ],
  },
] as const;

export const docsEn = [
  { label: 'Docs overview', href: '/docs/' },
  { label: '.NET packages', href: '/docs/dotnet-packages/' },
  { label: 'Gua.Runtime guide', href: '/docs/gua-runtime/' },
  { label: 'Godot API and specification', href: '/docs/runtime-adapters/' },
  { label: 'Unity API and specification', href: '/docs/unity-reference/' },
  { label: 'GitHub Actions', href: '/docs/github-actions/' },
  { label: 'Change audit', href: '/docs/change-audit/' },
] as const;
