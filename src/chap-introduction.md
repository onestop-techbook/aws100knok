---
class: chapter
---

# 本書の書き方(それぞれの著者向け)

<div class="flush-right">
おやかた@oyakata2438
</div>

各章に署名を入れてください。名前@XのIDなど。JAWSの支部などを書いてもOK。

## 原稿の追加とファイル命名規則

個別の原稿ファイルは、以下のように名前を付けてください。

/src/chap-oyakata2438-intro.md


* chap- 固定で全員付ける。
* ID- 著者名を書く。個識別できればOKなので、好きな名前で。
* intro 内容が想定できるような単語を簡単に。同一著者の別原稿との区別用。


画像フォルダ

/src/images/chap-oyakata2438-intro/

を作り、その下に、画像を入れて、Markdownから参照する。

原稿本体を
**/vivliostyke.config.js**に追記してください。

    // 第一部 書き方の例＋並べる前はここへ。
    "part-easy.md",
	"chap-introduction.md",
	"chap-taro-.md",



## 推しポイントはここ！

本文は基本的に、そのまま書けばOKです。

空行は段落と認識されます。

Markdownにおける文はでは、<br/><-ここにbrタグアリ
改行一つでは、(←単なる改行)
実際の改行は行われません。

Markdownの書式については、別の章がありますので、そちらを参照してください。

### 見出し(節見出し。採番あり)

適宜見出しを付けると読みやすくなります。自動採番されますが、###(1.2.2 xxx)のレベルくらいまでをお勧めします。

### 箇条書き

* AWS
* GCP
* Azure ...

1. アメリカ東部
2. アメリカ西部
3. 東アジア ...

### 脚注

Markdown(GFM)式の[^1]脚注は、「章末」にまとまってしまうので、Vivliostyleの脚注<span class="footnote">本文中に書く。footnoteのclassで指定して本文中に書く</span>を使ってください。 

[^1]:GitHub Flavored Markdown式書き方。 


### 画像の貼り付け

![2台使用時の確率](images/chap-introduction/datalost2.png){width=50%}

適宜イメージを貼ってください。

画像は、章ごとに、/images/chapter-name/**.pngとしていれて、幅は適宜調整してください。(編集者でも行うので適宜。)幅は、{width=xx%}で、本文スペースに対しての幅で指定できます。

<img src="images/chap-takano-org/Orgnizations.png" width="60%">
この書式で貼ると、左寄せになります。(自動採番・キャプションなし)

### コラムの書き方

<div class="column">
<div class="column-title">コラムの書き方</div>

コラムは、columnクラスでくくって書きます。

</div>

### 著者紹介

最後に、著者紹介を入れてください。
画像、所属サークルや会社名(任意)、ひとこと。

---

<div class="author-profile">
    <img src="images/oyakata.jpg">
    <div>
        <div>
            <b>親方 </b>
            <a href="https://twitter.com/oyakata2438">X@otakata2438</a>
        </div>
        <div>
            サークル名：親方Project
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
ワンストップ本シリーズ企画・編集（一部執筆）してます。コミケと技術書典に出没。ついに技術書同人誌博覧会（技書博）のコアスタッフとして運営側に参加。技術書イベントが増えて嬉しいけれど、イベント多すぎて外出チケットと徳が不足気味。徳を貯めるべく、家事をこなしつつ、ラボに遊びに行ったり、飲み会や懇親会で著者を新規開拓したり。著者募集はいつでもやっていますので、ぜひご参加ください。
</p>