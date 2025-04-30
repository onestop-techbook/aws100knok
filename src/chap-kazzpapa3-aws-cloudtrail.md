---
class: chapter
---

# トラブルシュートの強い味方 AWS CloudTrail

<div class="flush-right">市野 和明 @kazzpapa3</div>

## トラブルシュートの傾向（超主観）

テクニカルサポートエンジニアとして仕事をする中で、いただくお問い合わせで多いのが「何もしてないのに壊れた」、そして「想定通りに動かない」という二大巨塔があります。

AWS アカウント内でのすべての変更履歴が端的に記録されており、厳然たる証拠として突きつけることができることから、AWS Config が好きだ、と言う同じ部署の同僚もいます。（突きつける、はちょっと言い方が悪いですね）
ただし、費用発生するサービスのためすべてのお客様が有効化していない可能性もあり、AWS Config で万事解決とならない弱点があります。

そこで、無料の範囲でも利用が可能な推しサービスである AWS CloudTrail をトラブルシュートの初動でよく活用しています。

## AWS CloudTrail について

AWS CloudTrail はリスク監査やガバナンス、コンプライアンスの実現を目的としたイベント記録の機能です。大きく次の 3 つのイベント記録方法が提供されています。<span class="footnote">[What Is AWS CloudTrail?](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html) https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html </span>  

| 種別 | 概要 |
| --- | --- |
| イベント履歴 | リージョンごとに過去 90 日間の **管理イベント** を変更不可能な形式で記録し、表示・ダウンロードできるサービスです。<br>記録されている情報に対し、単一の属性でフィルタリングをしイベントを検索することが可能となっています。 |
| 証跡 | CloudTrail と同様の JSON 形式のイベント履歴を S3 バケットに保存することを可能にする機能です。<br>イベント履歴では記録されない **データイベント** にも対応でき、長期保存とコンプライアンス目的を主とした機能です。 |
| CloudTrail Lake | CloudTrail イベント履歴の拡張機能の位置付けで、最大 7 年間の長期保存が可能となります。<br>また行ベースの JSON 形式のイベント履歴を Apache ORC に変換して保存されていることで SQL ベースのクエリ機能を利用でき、複雑な検索が可能となっています。<br>証跡の上位機能にあたり、長期保存に加えて高度な分析とセキュリティ調査を目的とした機能です。 |

「証跡」「CloudTrail Lake」の機能は設定に応じて費用発生があるため、お問い合わせをいただく環境によっては有効化・設定されていないことあります。
反面「イベント履歴は」基本機能として備わっており環境に左右されず利用ができるため、前述の通り多用しています。

本章内の以降で **CloudTrail** と呼称するものは「イベント履歴」を指すものとします。

### 注意点

前節の整理の中で **管理イベント** や **データイベント** と記載しましたが、厳密には CloudTrail イベントの中には、以下 4 つの種類のイベントが存在します。

| 種別 | 概要 |
| --- | --- |
| 管理イベント | AWS アカウント内のリソースに対して実行された「管理操作」に関する情報となります。|
| データイベント | リソース上、あるいはリソースないで実行された「リソース操作」に関する情報となります。|
| ネットワークアクティビティイベント | VPC から AWS サービスへの VPC エンドポイントを使用した AWS API 呼び出しを記録するものです。 |
| インサイトイベント | AWS アカウント内の異常な API 呼び出し率やエラー率のアクティビティを記録するものです。 |

AWS ではコントロールプレーンやデータプレーンという概念がありますが、管理イベントがコントロールプレーンに関する操作、データイベントがデータプレーンに関する操作という位置付けになります。

上記の整理から、例えば標準の範囲のイベント履歴だけを利用している場合には、S3 バケット内のオブジェクト操作が記録されないということになります。<span class="footnote">GetObject や PutObject、DeleteObject など。[Logging data events](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html) https://docs.aws.amazon.com/awscloudtrail/latest/userguide/logging-data-events-with-cloudtrail.html </span>

標準のイベント履歴があるからといっても、後から追えない性質の操作もあるという点に注意が必要です。

## AWS CLI を利用したアプローチ

「CloudTrail について」の節の「イベント履歴」の説明内で単一の属性でのフィルタリングと記載しました。
無料の範囲なので致し方ないのですが検索の際の条件として 1 つしか設定できないこと、マネジメントコンソールの場合はページネーションされている点から俯瞰的に見られない制約があります。

そこで、私がよく使う AWS CLI を利用したアプローチを紹介します。個人的によく使うオプションとともに基本的な構文を書くと以下のようなものとなります。  

### 基本構文

```bash
START=$(date +%s -d "2024-07-22 00:00:00")
END=$(date +%s -d "2024-07-22 01:59:59")
ATTR_KEY="EventSource"
ATTR_VALUE="ec2.amazonaws.com"

aws cloudtrail lookup-events \
  --start-time ${START} \
  --end-time ${END} \
  --lookup-attributes AttributeKey="${ATTR_KEY}",AttributeValue="${ATTR_VALUE}"
```

なお `cloudtrail lookup-events ` サブコマンドではすべてのオプションが必須ではないため、`--lookup-attributes` の指定も本来不要です。
とはいえ、膨大な出力が予想されます。

### 返却値の例

```json
{
  "Events": [
    {
    	"EventId": "86f82c29-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    	"EventName": "DescribeVolumes",
    	"ReadOnly": "true",
    	"EventTime": "2024-07-22T01:58:27+09:00",
    	"EventSource": "ec2.amazonaws.com",
    	"Username": "f397768c-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    	"Resources": [],
    	"CloudTrailEvent": "{\"eventVersion\":\"1.09\",\"userIdentity\":{\"type\":\"AssumedRole\",\"principalId\":\"ARXXXXXXXXXXXXXXXXXXX:f397768c-xxxx-xxxx-xxxx-xxxxxxxxxxxx\",\"arn\":\"arn:aws:sts::XXXXXXXXXXXX:assumed-role/AWSServiceRoleForApplicationMigrationService/f397768c-xxxx-xxxx-xxxx-xxxxxxxxxxxx\",\"accountId\":\"XXXXXXXXXXXX\",\"sessionContext\":{\"sessionIssuer\":{\"type\":\"Role\",\"principalId\":\"ARXXXXXXXXXXXXXXXXXXX\",\"arn\":\"arn:aws:iam::XXXXXXXXXXXX:role/aws-service-role/mgn.amazonaws.com/AWSServiceRoleForApplicationMigrationService\",\"accountId\":\"XXXXXXXXXXXX\",\"userName\":\"AWSServiceRoleForApplicationMigrationService\"},\"attributes\":{\"creationDate\":\"2024-07-21T16:58:26Z\",\"mfaAuthenticated\":\"false\"}},\"invokedBy\":\"mgn.amazonaws.com\"},\"eventTime\":\"2024-07-21T16:58:27Z\",\"eventSource\":\"ec2.amazonaws.com\",\"eventName\":\"DescribeVolumes\",\"awsRegion\":\"ap-northeast-1\",\"sourceIPAddress\":\"mgn.amazonaws.com\",\"userAgent\":\"mgn.amazonaws.com\",\"requestParameters\":{\"volumeSet\":{},\"filterSet\":{\"items\":[{\"name\":\"tag:AWSApplicationMigrationServiceManaged\",\"valueSet\":{\"items\":[{\"value\":\"mgn.amazonaws.com\"}]}},{\"name\":\"tag:Name\",\"valueSet\":{\"items\":[{\"value\":\"AWS Application Migration Service Replication Volume\"},{\"value\":\"AWS Application Migration Service Conversion Server Volume\"}]}}]}},\"responseElements\":null,\"requestID\":\"5292c075-xxxx-xxxx-xxxx-xxxxxxxxxxxx\",\"eventID\":\"86f82c29-xxxx-xxxx-xxxx-xxxxxxxxxxxx\",\"readOnly\":true,\"eventType\":\"AwsApiCall\",\"managementEvent\":true,\"recipientAccountId\":\"XXXXXXXXXXXX\",\"vpcEndpointId\":\"vpce-xxxxxxxxxxxxxxxxxxxxx\",\"eventCategory\":\"Management\"}”
   },
   {
     …
   }
 ]
}
```

前述の実行例では検索範囲と検索条件の併用をしていますが、これはマネジメントコンソールでも AWS CLI でも同一です。
また、検索条件においては、`AttributeKey` と `AttributeValue` の組み合わせを **一対のみ** 指定可能であることもマネジメントコンソールでも AWS CLI でも同一です。

できることは GUI でも CUI でも変わらないものの、CUI での実施であればテキストドキュメントとして利用が可能です。
ページネーションの概念は同様に存在するもののプログラムの組み方で再起的にテキストドキュメントとして整形できるメリットもあります。
また、好みに応じて jq などを用いて CSV 化したり、grep コマンドで追加の検索も可能です。

マネジメントコンソールでは実現できない `ec2.amazonaws.com` を `EventSource` に持ち、`sessionContext` に特定のユーザーが含まれる操作、などの検索も容易だと考えます。

### AttributeKey として指定できる値

AWS 公式ドキュメントを整理すると以下のように整理できます。<span class="footnote">[Viewing recent management events with the AWS CLI](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-cli.html) https://docs.aws.amazon.com/awscloudtrail/latest/userguide/view-cloudtrail-events-cli.html</span>

| 指定できる値 | AttributeValue として取りうる値                              | 例                                                  |
| ------------ | ------------------------------------------------------------ | --------------------------------------------------- |
| AccessKeyId  | IAM ユーザーのアクセスキー ID                                | AKIAIOSFODNN7EXAMPLE                                |
| EventId      | 特定の CloudTrail イベント  ID                               | b5cc8c40-12ba-4d08-a8d9-2bceb9a3e002  のような UUID |
| EventName    | 特定の AWS API イベント名                                    | RunInstances                                        |
| EventSource  | 検索対象とする AWS サービスの名前空間（サービスプリンシパル） | iam.amazonaws.com                                   |
| ReadOnly     | API  呼び出しが     読み取り専用操作であったか否か           | true/false                                          |
| ResourceName | 対象の AWS リソース名                                        | CloudTrail_CloudWatchLogs_Role                      |
| ResourceType | AWS  CloudFormation でサポートされている AWS  リソースタイプ | AWS::S3::Bucket                                     |
| Username     | ユーザー名                                                   | root, IAM ユーザー名                                |

### EventName や EventSource を知る方法

実はここまでの内容は、JAWS-UG の CLI 専門支部で LT 登壇した際にまとめていた内容です。<span class="footnote">[JAWS-UG CLI専門支部 #412 CloudShell入門](https://jawsug-cli.connpass.com/event/324664/) https://jawsug-cli.connpass.com/event/324664/</span>    
特定の AWS API イベント名を示す `EventName` であれば、公式ドキュメントから探すことは可能です。<span class="footnote">[Actions, resources, and condition keys for AWS services](https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html) https://docs.aws.amazon.com/service-authorization/latest/reference/reference_policies_actions-resources-contextkeys.html </span>  
ただ `EventSource` として利用可能な文字列（名前空間）が公式情報に網羅的に記されたドキュメントがないことを登壇時に嘆いていました。CUI で完結したいのに、知るためにはマネコンでイベントソースプルダウンを実際に確認するしかない点をナンセンスに思っていました。

### Service Reference の活用

前項の問題を解決できる、網羅的に整理された情報として 2024年10月10日に Service Reference という形で公開開始されました。<span class="footnote">[Streamline automation of policy management workflows with service reference information](https://aws.amazon.com/about-aws/whats-new/2024/10/streamline-automation-policy-management-workflows-service-reference-information/?nc1=h_ls) https://aws.amazon.com/about-aws/whats-new/2024/10/streamline-automation-policy-management-workflows-service-reference-information/?nc1=h_ls </span>  
Service Prefix（iam.amazonaws.com でいう iam に相当する部分）と、各 Service Prefix ごとに内包する API アクション名が JSON 形式で取得可能になっています。

####  サービスの一覧

[https://servicereference.us-east-1.amazonaws.com/](https://servicereference.us-east-1.amazonaws.com/) へアクセスすることで取得可能です。

取得可能な情報例（抜粋）

```json
[ {
  "service" : "a2c",
  "url" : "https://servicereference.us-east-1.amazonaws.com/v1/a2c/a2c.json"
}, {
  ...
}, {
  "service" : "xray",
  "url" : "https://servicereference.us-east-1.amazonaws.com/v1/xray/xray.json"
} ]
```

####  サービスごとの API アクション

取得した情報中の各 `service` に呼応する `url` キーの値に記載の URL へアクセスすることで取得可能です。

取得可能な情報例（前述の例に含まれる https://servicereference.us-east-1.amazonaws.com/v1/a2c/a2c.json での例）

```json
{
  "Name" : "a2c",
  "Actions" : [ {
    "Name" : "GetContainerizationJobDetails"
  }, {
    "Name" : "GetDeploymentJobDetails"
  }, {
    "Name" : "StartContainerizationJob"
  }, {
    "Name" : "StartDeploymentJob"
  } ],
  "Version" : "v1.1"
}
```

## まとめ

AWS CloudTrail を活用する際に AWS CLI が複雑な検索をする際に有用だと紹介しました。

また、弱点だと感じていた EventSource を知るための網羅的な情報が公式にない問題も Service Reference を利用すれば容易に調べられるようになったことも合わせて紹介しました。

さらに Service Reference は CloudTrail での活用のみならず、本書でおそらく誰かが書いてくれるであろう IAM のポリシー検討にも役立ちそうです。


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