---
class: chapter
---

# 環境構築

ViviloStyleは動作時にNode.jsが必要です<span class="footnote">主な処理はBunでも動作しますが、一部でNode.js依存をしています。</span>。

原稿ファイルを編集するためにテキストエディタが必要です。頑張ればWindowsのメモ帳でも書けるかもしれませんが、もしテキストエディタを使っていない人は、Visual Studio Code<span class="footnote">https://azure.microsoft.com/ja-jp/products/visual-studio-code</span>などをインストールしましょう。

## システムにNode.jsをインストールする

Node.jsの公式サイト<span class="footnote">https://nodejs.org</span>から最新のLTS<span class="footnote">LTSはLong Term Supportの略で、Node.jsの最新安定版です。毎年10月頃にLTSの新しいバージョンが登場し、そのバージョンは2年半はメンテナンスされることが保証されています。</span>というバージョンをダウンロードしてインストールしてください。`Download Node.js (LTS)`ボタンが一つしかないため迷うことはないと思います。

![Node.jsの公式画面](./images/chap-setup/nodejs.png){width=90%}


## まずリポジトリを作る

本の原稿を履歴管理するためにgitのリポジトリを作成します。一番手っ取り早いやり方は、本書のリポジトリ<span class="footnote">https://github.com/erukiti/vivliostyle-techbook-starter</span>がテンプレートリポジトリなので `use this template`と書かれたボタンを押して `create a new repository` を選択すると、テンプレートを元にリポジトリを作成可能です。


![GitHubの画面](./images//chap-setup/template1.png)

リポジトリ作成画面では、誰のリポジトリにしたいのかオーナーを選び、リポジトリの名前を入力します。リポジトリの名前は本の名前なので、たとえばReactで世界征服する本なら `react-conquer-the-world` みたいな名前になるでしょうか。本を全世界に公開したいならPublicを選択し、そうじゃなければPrivateを選択し `create repository` ボタンを押しましょう。

![リポジトリ作成画面](./images/chap-setup/template2.png)

これで、リポジトリができあがりました。

![作成されたリポジトリ](./images/chap-setup/template3.png)


## 確認する

ここまでの作業で、今あなたが手に取っている本の内容そのものがPDFとして生成できる準備が整いました。

まずはローカルで実際にPDFが構築できるか確認してみましょう。たとえば、リポジトリは `git@github.com:erukiti/sample1.git` だとします<span class="footnote">このリポジトリはプライベートリポジトリなので皆さんはアクセスできません。</span>。

```sh
% git clone git@github.com:erukiti/sample1.git
Cloning into 'sample1'...
remote: Enumerating objects: 573, done.
remote: Counting objects: 100% (181/181), done.
remote: Compressing objects: 100% (89/89), done.
remote: Total 573 (delta 89), reused 154 (delta 70), pack-reused 392 (from 1)
Receiving objects: 100% (573/573), 39.38 MiB | 9.70 MiB/s, done.
Resolving deltas: 100% (277/277), done.
```

このようにして、手元に `sample1` というディレクトリができたはずです。出来ていない場合は、gitやGitHubの使い方をなんとかして頑張って身につけてみてください。

`sample1`ディレクトリに移動し `npm i` でVivliostyleを動かすのに必要なパッケージをインストールします。色々警告が出ますが、いったんそういうものとしてください。これが完了するとPDFを生成する準備ができました。

```sh
% cd sample1
% npm i
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.
中略

added 858 packages, and audited 859 packages in 5s

210 packages are looking for funding
  run `npm fund` for details

4 high severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
```

`npm run build` コマンドで電子版PDFが作成できます。

```sh
% npm run build

> vivliostyle-book-sample@0.0.0 build
> vivliostyle build -o screen.pdf

✔ 00-title.md vivliostyle-sample
中略
✔ 99-colophon.md vivliostyle-sample
⊙ Processing PDF
screen.pdf has been created.
Built successfully.
```

`Built successfully.` がでてくれば、そのディレクトリにPDFが生えているはずです。さてここまでで、本書と同じ物を作れることを確認できましたね。重要なマイルストーンを一つクリアできました。

## 設定を変更する

このままでは本書と同じ内容の本を作ってしまうことになります。そのため、まずは本の設定を変えましょう。

Vivliostyleでは、本のタイトル、本のサイズ、原稿ファイル名などはすべて `vivliostyle.config.js` に記述されています。

|設定名|内容|
|-----|----|
|title|タイトルですが標準だと色々なところに埋め込まれて、日本語名を使うと問題が生じることがあるという噂なので、英数字とハイフンくらいに限定して方がいいかもしれません。ただしこのリポジトリの手法でPDFを生成するだけなら何を設定してもしなくても問題はないはずです。|
|author|著者名と連絡先です。必ずご自身のものに書き換えてください。|
|<span class="whitespace-nowrap">language</span>|`ja`が日本語です。|
|size|ある程度大きな教科書サイズが`JIS-B5`で、最近流行の小さいサイズの技術書が`A5`です。なお`B5`という指定は国際標準の方で、日本のB5とは異なるものなので要注意です。|
|entry|ここに原稿ファイル名を書いてください。ここに書いてないファイル名は参照されません。|

## それぞれの原稿ファイルについて

原稿ファイルは `src` ディレクトリの中にファイルがすべて入っています。このディレクトリの中のファイルは本書の内容そのものであるため、中身をそのまま使うことはおやめください。作りを真似るのはかまいませんが、あなた自身が本を作らなければなりません。

本書では、通常の章はMarkdownで記述していますが、いわゆる扉といわれるタイトルページや、部を示すページなどはHTMLを駆使しています。通常の組版が必要なページは普通の流れに任せた方が楽ですが、扉のようなレイアウトは、あまり通常のやり方に固執せず、サクサクとHTML+CSSを構築した方が楽かも知れません。

また、本書ではファイル名に一定のルールを設定しています。

* いわゆる扉やまえがき・あとがき・著者紹介・奥付などは数字始まりのファイル名 `00-title.md` など
* 通常の章は `chap-hoge.md` のように `chap-` で始まるファイル名
* 第一部・第二部などは `part-hoge.md` のように `part-` で始まるファイル名

というようにしています。これはわかりやすさもあるのですが、CSSの妙技を駆使するための苦肉の策でもあります。

## 印刷用のPDFを作成する

`npm run build` で作成したPDFはデジタル環境向けのものでタブレットなどの画面で見ることを想定しています。ソースコードがプリティプリントと呼ばれる、構文を際立たせる色分けなどをはじめとして、カラー前提です。

ところが、印刷所に出すPDFはフルカラーだと印刷代金がかかりすぎるため1色刷をするのが一般的なことと、全部のフォントの埋め込みもしくは、アウトライン化など、印刷向けのPDFにしなければ、印刷所が受け付けてくれない可能性があります。

`npm run build:print` コマンドで印刷向けのPDFを作成できます。元々 `npm run build` で生成されるPDFは印刷所に提出しても問題ないため、このコマンドではコードブロックの色つけを抑制だけしています。

通常のPDF作成と同じく `Built successfully.` が表示されていれば、成功しているはずです。

<div class="column">
<div class="column-title">印刷所で完全に問題の無いPDFを作る難しさ</div>
　印刷所で受付可能なPDFを作るのは実は結構難しいです。Vivliostyleにも未解決のissuesとして残っているようです。

Vivliostyleでは多くのフォントは問題なく埋め込みが自動的にされているようですが、特殊な文字などでType 3フォントというPostScript由来の特殊なフォントが使われることがあるようですが、これが悪さをすることがあり、印刷所としても苦労していると言われました。じつはこの本を入稿して安心してたら、オペレーターの人から電話がかかってきて、顔が真っ青になったところです。

フォント関連の問題を解決するための方法として、フォントをすべてアウトライン化するというやりかたがあります。CLIで動くOSSととしてこの処理を行えるpress-readyというソフトがありますが、これは特定条件<span class="footnote">画像かCSSによって透明色がある状態。当然普通にありますよね。これを全滅させる必要があるというのは、どこを探して喪情報としては見当たりませんでした。幸いこの現象を調べるののに複数日かかりましたがViliostyle SlackのQ&Aチャンネルで教えていただけました。ありがとうございます！</span>ではベクターフォントとしてのアウトライン化がうまくいかず昔の印刷技術のようなページができてしまい、実用に耐えないと判断しました。

Type3フォントは、数式の表示、特殊文字の表現、全角と半角の間の不可視文字などで使われるらしく、この程度なら、壊れても仕方ない、前述の現象よりは遙かにマシと判断しました。

さらに、この問題に際して一部の原稿を削りました<span class="footnote">pdffontsと言うコマンドをつかって印刷所受付可能なPDFかどうかを確認しようという内容でした。失敗してんじゃんよ。とほほ</span>。

今回、印刷所のねこのしっぽさまには多大なご迷惑をおかけするに至りました。何回も再入稿する、時間ギリギリまでご対応いただくなど、本当にありがたい限りです。
</div>

<!--

あかん。T3Font問題が解決できない。。。マジで泣きそう。

## PDFが印刷所対応かを確認する

確認する方法としては、Adobe Acrobat Reader を使う方法と、Xpdfというソフトに含まれる `pdffonts` というコマンドを使う方法があります。筆者はAdobe Acrobat Readerを使っていないため、pdffontsでのやり方を書きます。

MacでHomebrewを使っているなら`brew install xpdf`でインストールができます<span class="footnote">インストールしたあとは一度ターミナルを抜けないと、インストールされたコマンドを認識してくれないことがあるため要注意です。</span>。ターミナルを立ち上げ直すと `pdffonts output.pdf` で確認ができるはずです。

```
% pdffonts screen.pdf
name                 type         emb sub uni
-------------------- ------------ --- --- ---
AAAAAA+Verdana-Bold  CID TrueType yes yes yes
BAAAAA+Verdana       CID TrueType yes yes yes
CAAAAA+Verdana-Bold  CID TrueType yes yes yes
[none]               Type 3       yes no  yes
省略
```

-->

<!--
このコマンドはフォントの設定を行ったときに特に重要です。せっかく組版するのだから使いたいフォントを指定したとして、そのフォントが正しく使われているかを確認する必要があります。そういうときに使うと、フォントの名前を確認できます。

nameに`[none]` と表示されていますが、これはVivliostyleがPDFを生成するときに使うChromiumの特殊なものが使われているたためのようです。
-->

<!-- 今回は試しにデジタル版のPDFで試した結果こうなっています。このときembにnoがなければ印刷所に投げても問題のないPDFです。もしemvのnoのものがあると、印刷所から「フォント埋め込んでください」という電話がかかってくることになるでしょう。

press-readyで作成したPDFの場合はどうでしょうか？

```
% pdffonts print.pdf
name                                           type              emb sub uni prob object ID
---------------------------------------------- ----------------- --- --- --- ---- ---------
```

そもそもフォントをすべてアウトライン化しているため、PDFの中にフォント情報は存在していません。 -->

## CIでPDFが自動生成されているか確認する

この本のリポジトリは、GitHub Actions用の設定がされているため、GitHub上でCIが自動で動いてPDFが作成されているはずです。

![Actions](./images/chap-setup/actions.png)

それぞれのアクション結果をクリックするとアクションの詳細画面に遷移するので、最下部にある Artifacts をダウンロードしてみましょう。

![actions詳細](./images/chap-setup/actions-detail.png)

Artifacts.zipというファイルがダウンロードできるはずです。zipを展開すると、印刷用とデジタル用のそれぞれのPDFが出てくるはずです。

PDFがローカルで作成したものと同じように見えるか見比べましょう。特にフォントが変わってるかもしれません。

これが、うまく動いていることが確認できれば、複数人で同人誌を書くときにめちゃくちゃ捗るようになります。

## プレビューのやり方

`npm run build` でPDFを作成する以外にも `npm run preview` で、ビルドするよりは早く原稿を確認することができます。

![プレビュー](./images/chap-setup/preview2.png)

プレビュー画面は、ファイル更新を検知し自動でビルドしなおしてくれます。横幅を広げると見開きで表示してくれるのでイメージがしやすいでしょう。
