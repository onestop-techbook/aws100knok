# ぼくのAESの推しのポイント100本ノック

この本は、AWSに関わる皆さんの「推しポイント」を集めた本です。

AWSの多種多様なサービスに対し、何らかの推しポイントがあるでしょう。その「推し」を語る本です。

単にインスタンス/サービスの説明をしてもつまらないし、構築の方法などはたくさんの本(商業、同人)あるいはBlogやWeb情報もあります。それを集めても日進月歩のキャッチアップは難しいですし、同人誌ならでは、あるいはコミュニティをベースにした本を作る意味は薄いと考えます。そういう観点で、体験談を集めるならではの価値を創りだしたいと考えました。

そして、会話しているなかで、「推しポイント」を語ることこそ、たくさんの人がいるユーザーズグループをベースとするの活動の一つとして、そしてそれを世の中に出す価値の一つとなるのではないか、という点に到達しました。

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

また、Github Actionsを設定してありますので、Pushしたり、PullRequestがマージされれば、自動的にビルドプロセスが走り、PDFが生成されるはずです。

https://github.com/onestop-techbook/aws100knok/actions

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
