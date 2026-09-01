# Gua Reference

[`link1345/gua`](https://github.com/link1345/gua) の Godot UIテスト、AI Coding・AI Playtesting、Unity導入、.NETテスト、Inspector、MCP操作を英語と日本語で解説する公式リファレンスサイトです。

英語版を正式な参照として扱います。翻訳内容に差異がある場合は英語版が優先されます。英語版は `/`、日本語版は `/ja/` 配下にあります。

## 開発

このリポジトリでは Bun を使用します。npm は不要です。

```powershell
bun install
bun run dev
```

## 検証・ビルド

```powershell
bun run check
bun run build
```

静的ファイルは `dist/` に生成されます。

## WebMCP

[`webmcp-docs`](https://www.npmjs.com/package/webmcp-docs) v0.3.0 を使い、WebMCP 対応ブラウザーに `list_docs`、`search_docs`、`get_doc` を公開します。`list_docs` は英語版と日本語版のナビゲーションページを一覧し、セクション名で絞り込めます。`search_docs` は両言語を横断検索し、`get_doc` は一覧・検索結果の ID または URL から文書本文を取得します。HTML からエージェント向け本文への変換には Turndown と GFM プラグインを使い、リンク、表、リスト、言語付きコードブロック、Callout の意味を Markdown に保持します。

WebMCP 未対応ブラウザーではツール登録を行わず、通常のドキュメントサイトとしてそのまま動作します。

## 公開

`main`へのpushで、GitHub Actionsが`https://gua.orizika.com/`へ自動デプロイします。初回のGitHub Pages設定とDNS設定は[DEPLOYMENT.md](DEPLOYMENT.md)を参照してください。

## ページ構成

- AI Coding・AI Playtesting
  - MCP対応AIコーディングエージェントによる実行中ゲームの観測・操作・検証
  - AI開発ループ、Playwrightとの対応関係、FAQ
- Godot編
  - Semantic locatorによるGodot UIテスト
  - 導入とUI実装、テストの仕方
- Unity編
  - 導入とUI実装
  - テストの仕方
- インスペクタ編
- MCPサーバー操作編
- Docs / Reference
  - Godotサンプル `main.gd`
  - .NETパッケージ（.NET Standard 2.1 / Visual / Recordingを含む）
  - Godotアドオン、GDExtension DLL、他エンジンへの移植
  - Unity UPM、公開API、Control写像、対応マトリクス

内容は Gua の `main` ブランチにある実装・サンプル・README をもとにしています。
