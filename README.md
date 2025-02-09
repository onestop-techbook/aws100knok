# Vivliostyleで技術同人誌を始めよう

この本は、Vivliostyleを使って、技術同人誌を書くのに、本当に最低限必要なノウハウだけをまとめた本です。

怠惰は美徳です。技術者たるもの怠惰を極めましょう。本を書くにしても原稿だけに集中してそれ以外は怠惰にやっていきたいものですね。この本は、そんな怠惰なあなたのためにあります。

## 前提

* [Node.js](https://nodejs.org/en/)

## install

```sh
npm i
```

## 本を作成

本を作成するコマンドは `npm run build` と `npm run build:print` です。

```sh:オンラインで使う前提のカラーPDFを作成するコマンド
npm run build
```

```sh:印刷対応の、なるべく白黒に寄せたPDFを作成するコマンド
npm run build:print
```

## プレビュー

```sh
npm run preview
```

## ライセンス

* `src/*` は原稿ファイルと画像ファイルなのでオープンソースとしてのライセンスは付与しません。
* サンプルコードは普通に使っていただいてかまいません
* それ以外のファイルはMIT Licenseのもと使っていただいてかまいません。設定ファイルには筆者の名前や、この本のタイトルなどが書かれいているためご自身の物に書き換えることは忘れないでください。

### 使用しているフォントのライセンス

License: SIL Open Font License, Version 1.1.

* https://github.com/microsoft/cascadia-code
* https://github.com/IBM/plex
* https://github.com/trueroad/HaranoAjiFonts
