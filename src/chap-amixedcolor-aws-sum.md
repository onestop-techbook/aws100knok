---
class: chapter
---

# AWS未経験でもすぐにサーバーレスアプリが作れる「AWS SAM」について

<div class="flush-right">
保 龍児（エイミ/amixedcolor）
</div>



筆者はちょうど今月でAWS歴1年たったばかりの新参者ですが、一番最初に作成したAWS関連のシステムでAWS SAMを用いていました。
右も左も分からない自分にとって、すぐにHello Worldできて、簡単にサーバーレスアプリケーションを作れるSAMは心強い味方でした。
今回はそんな推し「AWS SAM」の推しポイント3つについて紹介します。

## その前に：そもそもAWS SAMとは？

省略せずに記述すると、「AWS Serverless Application Model」です。これは、AWS上でサーバーレスアプリケーションを構築するためのフレームワークです。
「AWS SAMテンプレート」と呼ばれるテンプレートとソースコードを記述することで、簡単にAWS上にアプリケーションを構築できます。

公式サイトはこちら
https://aws.amazon.com/jp/serverless/sam/

### サーバーレスとは？

サーバーを管理することなく、コードの実行などに注力することができる仕組みのことです。
基本的には従量課金であり、例えばAWS Lambdaでは、 **計算処理をしていないときはお金がかからない** という特徴があります。

個人的には、クラウドもインフラも何もわからないときはもちろん、完全に理解した後も使いこなし大きなアプリケーションを作れる優れもの、という認識で、こちらもAWS推しポイントの1つです。

公式サイトはこちら
https://aws.amazon.com/jp/serverless/

## 推しポイント１：簡単にHello Worldできる

前提として、AWSアカウント・AWS CLI・認証情報の用意は必要ですが、Hello World用のテンプレートが用意されています！

APIのエンドポイントをcurlなどで叩くと「Hello World」とレスポンスが返ってくるだけですが、特別詰まることなく **クラウド上にアプリケーションをデプロイできた** という体験が得られたのは、自分にとってとても嬉しいことでした。

以下のURLから、公式のHello Worldチュートリアルが用意されているので、AWS アカウントを用意すればすぐに試すことができます。
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-getting-started-hello-world.html

## 推しポイント２：豊富なテンプレートと対応サービス

AWS SAMには、2025/05/05時点で16ものQuick Startテンプレートが用意されています。
また、対応サービスも多く、なんと全サービス合わせて399もののリソースに対応しています。

なぜこの2つが豊富だと嬉しいのか。もちろんやれることが多いというのはありますが、私は「AWS初心者が学習するのにもうってつけ」だと考えています。
ちまたの「AWS CDKのコンストラクトを通してベストプラクティスの構成を学ぶ」とも似ている部分があります。
テンプレートや、SAMを通したリソースの作成は、各サービス・各リソースの **主要機能を徐々に理解していく** ことに貢献すると考えています。
特にテンプレートは、何かの要件をみたしたい時の（サーバーレスによる）主要な構成を知ることにもつながります。

### テンプレートについて紹介

以下は標準出力のコピペですが、Hello Worldだけではなく、多くのテンプレートがあります。

```shell
Choose an AWS Quick Start application template
	1 - Hello World Example
	2 - Data processing
	3 - Hello World Example with Powertools for AWS Lambda
	4 - Multi-step workflow
	5 - Scheduled task
	6 - Standalone function
	7 - Serverless API
	8 - Infrastructure event management
	9 - Lambda Response Streaming
	10 - GraphQLApi Hello World Example
	11 - Full Stack
	12 - Lambda EFS example
	13 - Serverless Connector Hello World Example
	14 - Multi-step workflow with Connectors
	15 - DynamoDB Example
	16 - Machine Learning
```

この中でのおすすめは、 `Standalone function` です。
なぜなら、このテンプレートは非常にシンプルだからです。また、個人的な意見としてシンプルさは理解のしやすさとカスタムのしやすさに直結すると考えています。
特に、AWSのリソースに対して何かの操作を自動化したい時に便利です。筆者はこのテンプレートを応用して、AWSのリソースを定期的に自動で整理するシステムを作成しました。
もしご興味ある方は、下記のリンクからJAWS FESTA 2024 in 広島での発表資料をご覧いただければと思います。
https://speakerdeck.com/amixedcolor/bu-yao-narisosuwozi-dong-deding-qi-de-nizheng-li-surufang-fa-sandboxakauntonokosutowoxue-jian-siyou

実装の詳細でお困りがあれば、X（@amixedcolor）にDMしていただければと思います！

### 対応サービスについて紹介

いろいろなサービスがありますが個人的おすすめは、AWS Lambda Function（ `AWS::Lambda::Function` ）とAWS EventBridge Rule（ `AWS::Events::Rule` ）です。
先ほどの話に続きますが、AWS内のリソースの操作を自動化するにこれほどいい環境はないと思うほどです。
LambdaでSDKを呼び出し、EventBridgeでLambdaを規則的に呼び出すことで、非常に多くの処理を自動化できると考えています。

公式のリソース一覧はこちら

https://docs.aws.amazon.com/ja_jp/serverlessrepo/latest/devguide/list-supported-resources.html

## 推しポイント３：CloudFormationでリソースを辿れる

AWS SAMは、AWS CDKと同様に、内部でCloudFormationテンプレートを作成、実行しています。それにより、以下2つの大きなメリットがあると考えています。

- 作成したリソースが散らからず、集約されているため管理しやすい
- 学習者が作成したリソースを追いやすく、AWSの理解に繋げやすい

特に後者は、推しポイント2とも繋がるところです。AWS SAMはその作りやすさや管理のしやすさだけでなく、未経験であってもキャッチアップしやすく、その先のAWSに対するステップアップにも繋げやすいことが非常に魅力的だと感じています。

## さいごに

AWS推しポイントの1つとして、AWS SAMを紹介させていただきました。筆者自身、AWSをよく扱う部署に異動して、初めてのAWSとして、初めて開発したAWSがコアなシステムとして、思い入れのあるツールです。もし、SAMを初めて聞いたという人はぜひHello Worldしてみてください。もう知ってるよ、という人も、もしあなたが特にAWSの初学者であれば、AWS SAMを利用した学習をしてみてください。

ここまでお読みいただきありがとうございました！
エイミでした。それでは、またこんど！

#### 著者紹介

---

<div class="author-profile">
    <img src="images/chap-amixedcolor/amixedcolor-logo.png" width="60%">
    <div>
        <div>
            <b>保 龍児（エイミ/amixedcolor）</b></br>
            X：<a href="https://x.com/amixedcolor">https://x.com/amixedcolor</a></br>
            Note：<a href="https://note.com/amixedcolor">https://note.com/amixedcolor</a></br>
            SpeakerDeck：<a href="https://speakerdeck.com/amixedcolor">https://speakerdeck.com/amixedcolor</a></br>
            GitHub：<a href="https://github.com/amixedcolor">https://github.com/amixedcolor</a></br>
            所属：<a href="https://relic.co.jp/">株式会社Relic（https://relic.co.jp/）</a>
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
すき：アジャイル、スクラム、新規事業開発、AWS、完全没入型仮想現実、うた、漫画、ゲーム</br>
</p>
