---
class: chapter
---

# これが噂のイベント駆動！Amazon EventBridgeのススメ

<div class="flush-right">
山本 直弥（Nao）
</div>


## AWSサービスはいろんなイベント通知を発信している！
Cognitoが何か異常を検知した時、S3バケットに何かオブジェクトがアップロードされたとき、CloudWatchがアラームを出した時などAWSのリソースの状態が変化した時、そのリソースは通知を発行しています。そのイベント通知を受け取り、別のサービスに連携するためにEventBridgeはとても有用です。

## Amazon EventBridge がイベントを送受信するサービスは種類が豊富！
CognitoやS3などのがイベント通知を発行した際にEventBridgeは様々なAWSリソースにイベントを連携できます。たとえば、Cognitoが検知した意図せぬ変更に対してEventBridge経由でLambda関数を実行して自動的に修復したり、S3に何かのファイルがアップロードされた際にEventBridge経由でSNSやChatBotに通知を渡し、Slackなどでユーザーに通知したりとEventBridge経由でAWSリソースを操作することで様々な応用が可能になります。

## 定期実行のためにも利用できる！
夜間のバッチ処理を行うなど定期処理を実行したい場合はEventBridgeを利用します。EventBridgeを起動する時間と起動するAWSリソースをあらかじめ設定しておけば、他のAWSリソースからの通知なしで、設定した時間になればEventBridgeが設定されたAWSサービスを起動します。例えば、StepFunctionsのステートマシンでバッチ処理を定義しておき、定期的にEventBridgeで起動するなどが実現可能です。


### 著者紹介

---

<div class="author-profile">
    <img src="images/naosan.jpg" width="60%">
    <div>
        <div>
            <b>山本 直弥 ( Nao )</b></br> 
            X：<a href="https://x.com/nananaonana7">https://x.com/nananaonana7</a></br> 
            Qiita：<a href="https://qiita.com/Nana_777">https://qiita.com/Nana_777</a></br> 
            lit.link：<a href="https://qiita.com/Nana_777">https://lit.link/nao777nanaarchitect</a></br> 
            所属：<a href="https://jawsug-nagoya.connpass.com/">JAWS-UG 名古屋支部</a>
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
2025~ AWS Community Builder (DevTools) </br> 
2023~ AWS All Certifications Engineer </br> 
今力を入れてること：技術アウトプット(LT登壇、ブログ投稿など) </br> 
すきなもの：バーチャルおばあちゃん、ながの（ちいかわ）、真勇者ルーサー、神田伯山さん </br> 
</p>