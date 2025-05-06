---
class: chapter
---

# Lambda Web Adapter を使って Lambda で HTTP サーバを動かそう

<div class="flush-right">村上 雅彦 a.k.a @fossamagna</div>

## はじめに

AWS Lambda はイベント駆動型のサーバーレス環境として広く使われています。以前から `API Gateway` と組み合わせて Web API を構築することが多かったと思いますが、多少の学習コストや Lambda 関数側で `API Gateway` から受け取ったイベントを処理する実装が必要になるなどの制約があります。そんな中、2023年に登場した [Lambda Web Adapter](https://github.com/awslabs/aws-lambda-web-adapter) は、Lambda 上で HTTP アプリケーションを動作させる手段として注目を集めています。

## Lambda Web Adapter とは？

Lambda Web Adapter は、任意の HTTP フレームワーク（Express, Laravel, Flask など）を Lambda 上でほぼそのまま動かすための リバースプロキシ のように動作します。

このアダプターが起動時に Lambda ランタイムとアプリケーションの間に入り、Lambda が受け取ったイベントを HTTP リクエストとしてアプリケーションにルーティングし、アプリケーションの HTTP レスポンスを 再び Lambdaイベントのレスポンスに変換して Lambda に返してくれます。

### 主な特徴

- Express, Laravel, Flask, Spring Boot など幅広く対応
- Rustで実装されており、軽量
- Lambda Layer または コンテナイメージで簡単に導入
- Lambda とローカルで同様に動かせる開発体験

これらの特徴により、既存の Web アプリケーションをほぼそのまま Lambda で動作させることが可能です。
また、`CloudFront` + `Lambda Function URL` のような構成が可能になるので、`API Gateway` などの設定が不要で構成がシンプルになります。
そして、コンテナを利用する場合、ローカルと Lambda で同様の実行方法で開発が進められます。

## セットアップ方法（Node.js + Express の例）

```bash
npm install express
```

```js
// index.js
const express = require('express')
const app = express()
const port = process.env['PORT'] || 8080

// SIGTERM Handler
process.on('SIGTERM', async () => {
    console.info('[express] SIGTERM received');

    console.info('[express] cleaning up');
    // perform actual clean up work here.
    await new Promise(resolve => setTimeout(resolve, 100));

    console.info('[express] exiting');
    process.exit(0)
});

app.get('/', (req, res) => {
    res.send('Hi there!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
```

```dockerfile
FROM public.ecr.aws/docker/library/node:20-slim
# Lambda Web Adapterをコピーする
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter
EXPOSE 8080
WORKDIR "/var/task"
ADD src/package.json /var/task/package.json
ADD src/package-lock.json /var/task/package-lock.json
RUN npm install --omit=dev
ADD src/ /var/task
CMD ["node", "index.js"]
```

### 著者のユースケース

Remix サーバの構築。Remix で SSR を行う際のサーバを Lambda で起動するために利用しました。このケースの Remix サーバでは、loader, action のようなサーバサイドで実行される関数から直接DBにリクエストを送信する実装になっていました。Lambda Web Adapter を利用することで Remix サーバを VPC 内の Lambda 上で起動し、VPC 内の RDS に接続する構成でアプリケーションを稼働させることができました。

[Lambda Web AdapterのGitHubリポジトリ](https://github.com/awslabs/aws-lambda-web-adapter?tab=readme-ov-file#examples) にはたくさんの様々な言語やフレームワークを利用した Examples が含まれているので、Lambda Web Adapter を利用する際にとても参考になります。

## まとめ

Lambda Web Adapter は、Lambda をもっと自由に、もっと柔軟に使いたい開発者にとって非常に魅力的な選択肢です。特に 既存の Web アプリを再利用したい 場合や、シンプルな API のサーバレス化 を検討している場合にはうってつけのツールです。AWSでHTTP サーバを動かそうと考えている方は Lambda Web Adapter を一度試してみてはいかがでしょうか？

#### 著者紹介

---

<div class="author-profile">
    <img src="images/fossamagna.jpg">
    <div>
        <div>
            <b>村上 雅彦 ( fossamagna )</b>
        </div>
        <div>
            X：<a href="https://x.com/fossamagna">https://x.com/fossamagna</a>
        </div>
        <div>
            GitHub：<a href="https://github.com/fossamagna">https://github.com/fossamagna</a>
        </div>
        <div>
            Speakerdeck：<a href="https://speakerdeck.com/fossamagna">https://speakerdeck.com/fossamagna</a>
        </div>
        <div>
            所属：<a href="https://aws-amplify-jp.github.io/">Amplify Japan User Group</a>
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
ソフトウェアエンジニアとして主にWeb・モバイルアプリの開発に従事しています。趣味でAWS Amplify関連のリポジトリにコントリビューションしています。Amplify Japan User Group運営メンバー / AWS Community Builder (Front-End Web & Mobile since 2022)
</p>
