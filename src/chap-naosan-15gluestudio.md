---
class: chapter
---

# Glue Job をGUIで開発！Glue Studio Visual ETL のススメ

<div class="flush-right">
山本 直弥（Nao）
</div>


## Visual ETL を利用することで直感的に Glue Job を開発できる！
ETL処理を大雑把に説明するとデータソースからデータを取得し、データを変換してターゲットデータストレージに保存する処理です。この各ステップごとに事前定義されたノードと呼ばれる処理やAWSサービスの種類を選択して組み合わせ、つなぎ合わせることで直感的にETL処理を行うGlueJobを開発できます  

↓画面イメージ  
<img src="images/chap-naosan-devtools/glue_01_image.png" width="100%">


## ETL処理で利用するデータ変換パターンが事前定義のノードとして提供されている！
データ変換処理に関するノードは任意のSQLを記載できる「SQL Query」ノードの他、複数のデータソースのデータをJOINする「Join」ノード、nullの項目を取り除く「Drop Null Fields」などよく使われるデータ変換パターンのノードが用意されており、SQLを書くよりも少ない設定で目的の処理を実現できます。  

↓データ変換に関するノード例  
<img src="images/chap-naosan-devtools/glue_02_transformnode.png" width="60%">


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