---
class: chapter
---

# 従量課金制だからこそできる！コスト削減のススメ

<div class="flush-right">
山本 直弥（Nao）
</div>


## 使用頻度を減らす以外に、AWSの設定を見直すことでコスト削減が可能！
AWSの利用料金はAWSを利用した分だけ発生します。使わなければ課金されない反面、高頻度で使用しすぎたり、作成したリソースをそのままにしておくと思わぬ課金が発生することがあります。課金の計算方法はAWSサービスの種類によって変わり、送受信したデータ量や使用した計算リソース、メモリ量、保存されているデータ量などによって変わります。つまり、使用頻度を減らすだけではなく使い方やAWSリソースの設定を見直すことでコスト削減ができます。


## 今すぐできるコスト削減の施策例！
コスト削減のために比較的すぐに見直せるAWSリソース設定を紹介します  

- コスト配分タグの使用したコスト発生減の見える化
  - AWSリソースに任意で設定できるタグを設定することで、例えば誰が作ったどのプロジェクトの何のためのリソースかが見える化できます
  - 高コストの原因を調べたり無駄なコストがないか分析する際にタグは有効です
- Amazon S3 内のオブジェクトのライフサイクル設定
  - S3に不要なオブジェクトがいつまでも保存されていたり、それが無駄に読み込まれることは無駄なコストの発生につながります
  - S3のライフサイクル設定を行い、不要なオブジェクトを自動的に削除されるようにしましょう
- AWS Glue の Flex execution の利用
  - AWS GlueをAWSの余剰リソースで実行するこの設定はJob実行時のコストを最大34%削減できます
  - AWSの余剰リソースを使用するため、実行開始後すぐに利用開始できない場合があるため、本番環境以外での検証時の利用に適しています


## さいごに
従量課金される度合いをある程度自分たちでコントロールできるのは素敵ですね。是非、各AWSサービスの料金計算に使われる項目と実際の利用環境の設定を確認して無駄なコスト発生を防止してください。

#### 著者紹介

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