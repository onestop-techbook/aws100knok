---
class: chapter
---

# 私の原点 - AWS CLI

AWS CLI が好きです。SDK でも CDK でも CloudFormation でもなく AWS CLI が好きです。
<div class="flush-right">市野 和明 @kazzpapa3</div>

## AWS CLI の思い出

AWS、特に日本のユーザーコミュニティである JAWS の場では「私の好きな AWS サービスは〜」という推しサービスを述べつつ自己紹介する場面が多くあります。

私は自己紹介の際に「私の好きな AWS サービスは AWS CLI です。」と言って自己紹介するのですが、厳密には AWS CLI は サービスではないのにな、と思いながら喋っています。

AWS を知り、そして格段に興味を持って向き合っていったのは、すべてをコードで書き表すことができる世界にとても驚いたこと、そしてそれに未来を感じたからだったと記憶しています。

AWS に触れるまで物理の機器も多少触っていたし、レンタルサーバーも触っていてインターネット越しに仮想サーバを利用する、今でいうクラウド的なものには触れていました。
ただ、AWS に触れてみて全てが API で操作できる世界であること、Web ブラウザの GUI 操作でもポチポチ設定できるが、CUI の文字ベースで操作・管理できる点が面白い世界だと感じました。

いろいろ調べたり試行錯誤している中で AWS のユーザーコミュニティの中に AWS CLI を中心に据えた JAWS-UG CLI 専門支部という支部があることを知りました。<span class="footnote">[JAWS-UG CLI専門支部](http://jawsug-cli.s3-website-ap-northeast-1.amazonaws.com/) http://jawsug-cli.s3-website-ap-northeast-1.amazonaws.com/ </span>  
AWS 各サービスの一要素にクローズアップしたハンズオンを主体にした支部で、ひとつひとつ AWS を理解していくのにとても良い勉強会グループだと感じています。
ハンズオン自体やその手順の組み立て方も非常に参考になるのですが、運営の波田野さんが CRUD の観点で解説してくださることで、理解度が高まると感じています。

## AWS CLI とは

冒頭で AWS CLI は「サービスではない」と書きましたが、コマンドラインシェルでコマンドを使用して AWS のサービスを操作できるオープンソースツールと解説されています。<span class="footnote">[What is the AWS Command Line Interface?](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html </span>  AWS のサービスを管理するための統合ツールとも解説されています。<span class="footnote">[AWS Command Line Interface](https://aws.amazon.com/cli/) https://aws.amazon.com/cli/ </span>

つまり AWS の各サービスを操作するためのツールの位置付けなので、AWS の単体サービスではなく（ほぼ）AWS のすべてだと言えます。  
「AWS のほぼすべて」なので網羅するには膨大な量になってしまうため、詳細は AWS 公式ドキュメントや AWS CLI Command Reference に譲ります。

- [AWS 公式ドキュメント（User Guide）](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html) https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-welcome.html
- [AWS CLI Command Reference](https://docs.aws.amazon.com/ja_jp/cli/latest/index.html) https://docs.aws.amazon.com/ja_jp/cli/latest/index.html

公式ドキュメントで解説されているコマンドの構成要素だけ抜粋しますが、以下のようなコマンド体系で実行します。

`aws` で AWS プログラムを呼び出します。それに続けて トップレベルコマンドに指定した AWS サービスに対し、定義されているサブコマンドで操作内容を指定します。これにオプションやパラメータを添えて実行することで対象の要素に対して操作（作成、参照、更新、削除のいずれか）ができます。

> ## Command structure
> 
> The AWS CLI uses a multipart structure on the command line that must be specified in this order:
> 
> 1. The base call to the aws program.
> 2. The top-level command, which typically corresponds to an AWS service supported by the AWS CLI.
> 3. The subcommand that specifies which operation to perform.
> 4. General AWS CLI options or parameters required by the operation. You can specify these in any order as long as they follow the first three parts. If an exclusive parameter is specified multiple times, only the last value applies.
> 
> ```bash
> $ aws <command> <subcommand> [options and parameters]
> ```
> 
> （筆者による機械翻訳）  
> AWS CLIはコマンドラインでマルチパート構造を使用し、この順序で指定する必要がある：
> 1. aws プログラムのベースコール。
> 2. AWS CLI がサポートする AWS サービスに対応するトップレベルのコマンド。
> 3. 実行する操作を指定するサブコマンド。
> 4. 操作に必要な一般的なAWS CLIオプションまたはパラメータ。最初の3つの部分に続く限り、任意の順序で指定できる。排他パラメーターを複数回指定した場合は、最後の値のみが適用される。

<figure><figcaption>出典：<a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html">Command structure in the AWS CLI ( https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-commandstructure.html )</a> より抜粋</figcaption></figure>

## AWS CLI の推しポイント

推しポイントはずばりめんどくささです。ネガティブに聞こえるでしょうが、正直めんどくさく、そして時に頑固です。

一例として EC2 インスタンスにロール（インスタンスプロファイル）をアタッチする場面を考えてみます。

### EC2 インスタンスへのロールのアタッチ例

#### マネジメントコンソールで操作する場合の想定手順

おおむね以下のような手順になります。

1. IAM ロールを作る
    - この時、信頼関係ドキュメントとして EC2 が設定されるように作ることも可能（「信頼されたエンティティを選択」画面で「ユースケース」に EC2 を指定するイメージ）
    - この時、すでに存在している IAM ポリシーであればアタッチしながら作ることも可能
2. EC2 インスタンスに IAM ロールをアタッチする

#### AWS CLI の場合の想定手順

順序の入れ替え可能なステップもありますが、おおむね以下のような操作となります。

1. IAM ポリシーを作る（あるいは AWS 管理ポリシーを選定する）
2. 信頼関係ドキュメントを作る
3. ＜3＞で作成した信頼関係ドキュメントを指定して IAM ロールを作る
4. 作成した IAM ロールに ＜1＞ で作成あるいは選定した IAM ポリシーをアタッチする
5. インスタンスプロファイルを作る
6. インスタンスプロファイルに ＜3＞で作成した IAM ロールをアタッチする
7. インスタンスプロファイルを EC2 インスタンスにアタッチする

#### 両者の比較

AWS CLI の方がはるかに煩雑でうんざりする方も多いのではないでしょうか。

EC2 インスタンスへのロールアタッチをマネジメントコンソールで操作する場合、アタッチするロール名と同名のインスタンスプロファイルを自動的に作成し、ロールをアタッチするという動作を裏で実行しています。

マネジメントコンソールでは連携する AWS API を **"よしなに"** 呼び出してくれていてユーザー側に意識させることなく実行できる操作が多くあります。反面、AWS CLI ではひとつひとつ分解して順序性を保ちながら実行する必要があります。

CloudFormation ではこれが依存関係として現れますが、CloudFormation や CDK、サードパーティの IaC ツールではこの依存関係をうまく抽象化してくれているといえます。  
もちろんこれらのツールの利便性はその抽象化されている特性で裏側を意識させずに AWS を利用可能にすることだと認識していますので、筆者として否定するつもりはありません。

ここで AWS CLI を用いる、あるいは基本を理解していることで順序性や依存関係の存在を意識する契機になるかと考えています。また、基本的に AWS CLI では実行単位が単一の AWS API の呼び出しに相当します。これらを理解していると、IaC ツールで実行した処理がうまく動作しない場合のトラブルシュートの難易度が下がると考えています。

AWS CloudTrail を確認して、裏で呼び出されている AWS API を確認する。IaC が抽象化している裏で実行されているひとつひとつの AWS API の粒度のどこで詰まっているのか、そしてそのエラー内容を把握する。IaC で構築したコードがうまく動作しない場合のトラブルシュートの王道の流れかと考えられます。

このような考えの元となる AWS API を、最小単位として意識しながら利用できる点が AWS CLI を好きな理由です。

## まとめ

- AWS CLI は実行単位が単一の AWS API の呼び出しに相当する。
- 単一の AWS API 実行となるので順序性や依存関係を考慮しながら処理を組み立てる必要があるが、AWS API レベルでの理解につながる。
- 普段使いには順序性や依存関係をうまく抽象化してくれる CloudFormation や CDK、サードパーティの IaC ツールはもちろん便利。
- 実は、AWS の初学者にこそ有用なツールではないかと考えている。

上記の通り考慮が必要なポイントも多く、「黒い画面こわい」という方も一定数いると考えられます。ただ、ここまで述べてきたように AWS の本質の理解に近づくことができるので、初学者の方にこそ最適なツールではないかと考えています。

以前はローカル環境にインストールして、実行する IAM ユーザーと紐づくアクセスキーの設定をローカル環境に持っておく方法が一般的でした。そのため、アクセスキーの適切な保管などの考慮も必要でしたが今は AWS CloudShell があります。

権限さえ不足していなければ、マネジメントコンソールから呼び出して Web ブラウザ上で CUI 操作の環境が手に入りますので、ぜひ AWS CLI を実行してみてください。

VPC やサブネット、セキュリティグループやインターネットゲートウェイを構築し出来上がった仮想ネットワークの中に EC2 インスタンスを構築して、外からアクセスできる状態まで整える。これを AWS CLI でやり切った際にはマネジメントコンソールをなんとなくポチポチしてたらできた、ということ以上の達成感がありますよー。

---

<div class="author-profile">
    <img src="images/kazzpapa3.jpg">
    <div>
        <div>
            <b>市野 和明</b> <a href="https://x.com/kazzpapa3">@kazzpapa3</a>
        </div>
        <div>
            所属：<a href="https://jawsug-kobe.connpass.com/">JAWS-UG 神戸</a>
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
とある AWS パートナー企業のテクニカルサポート部門で働いているテクニカルサポートエンジニアです。<br>
AWS パートナーで利用者と AWS テクニカルサポートの中間地点に立って、いただく問い合わせに向かう際に、AWS テクニカルサポートが当たり前と思っていることが利用者にはそう捉えられていないと感じる点や、それを踏まえて少し問い合わせ方法を改善いただくことで課題解決が早まりそうだな、などと思いながら仕事をしている気づきを JAWS を中心にお話ししていたりします。
</p>