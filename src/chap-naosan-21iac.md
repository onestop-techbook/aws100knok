---
class: chapter
---

# AWSリソース定義を一括管理！Infrastructure as Code (IaC) のススメ

<div class="flush-right">
山本 直弥（Nao）
</div>

## 毎回マネージメントコンソールでリソース定義を確認するのは大変
AWSのシステムはAPI Gateway や AWS Lambda 、AWS S3 など複数のAWSサービスを使ったリソースをいくつも組み合わせることで構築されるケースが多いです。そのリソースの数は数十個や数百個になることもあります。もしそれらのリソースのメモリやタイムアウトの設定などの定義情報を確認したい場合、1つずつそのリソースの画面を開いて確認するには時間がかかります。変更を加えるにしても1つずつ開いて設定を変更するのも大変です。そこでInfrastructure as Code (IaC) が登場します。

## Infrastructure as Code (IaC) のメリットはたくさん！
IaCを簡単に言うと、AWSアカウントに定義された複数のリソースの定義をJSONやYAML、その他のTypeScriptなどのプログラム言語で表現して1つのファイルにまとめて管理しようという考え方です。これには以下のようなメリットがあります。  
- 各リソースの画面を開く必要がなく、IaCコードで一括で確認できる
- 各リソースを1つずつ変更する必要がなく、IaCコードで一括で変更を反映できる
- IaCコードはテキストファイルとして管理できるので、Gitなどで差分や変更履歴が管理しやすい

## AWSのIaCの選択肢は様々。好みのIaCツールを見つけよう！
AWSのシステムをIaC管理しようとすると、主なツールとしてCloudFormation、CDK、SAM、Terraformなどが選択肢にあります。それぞれ特徴があるため、システムやチームの熟練度、プロジェクトの特性などを考慮して適切なものを選択してください。  
- AWS CloudFormation 
  - 多くの種類のリソースが定義できる
  - 詳細な設定を定義できるが、詳細に設定する必要があるためコードが長くなりすぎる傾向あり(コードが長くなると可読性が低下する懸念も)
  - Infrastructure Composer でリソース間の関連などを視覚化可能
- AWS SAM
  - サーバレスアプリケーションを定義する際にCloudFormationと比較して簡略化した書き方ができる
  - Infrastructure Composer と組み合わせるとGUI操作でローコード開発可能
- AWS CDK
  - TypeScript、Python、Goなどのプログラミング言語でIaCコードを記述できる
  - 設定項目の一部をCDKに任せて自動設定させる抽象化が行えるため、CloudFormationと比較して少ないコード量で定義が可能
- Terraform
  - HCL (HashiCorp Configuration Language) や JSON で定義する
  - AWS以外のクラウドにも対応しているマルチクラウド対応のツール


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