---
class: chapter
---

# 会議中にAWSマネコン画面を共有しても安心！機密情報保護拡張機能のススメ

<div class="flush-right">
山本 直弥（Nao）
</div>

## はじめに
AWSサービスと直接関係はないですが、Chromeの拡張機能を利用することでAWSに関する業務の一部を効率化できる場面もあります。例えば、会議中に画面共有をして第三者にAWSマネジメントコンソールの画面を見せる場合、アカウントIDなど他の人には知られたくない情報がどうしても画面に表示されてしまいます。今回はこの機密情報を自動でマスキングしてくれる拡張機能を紹介します。

### AWSの機密情報を自動でマスキング！「AWS Masking」
自動でモザイク風のマスキングをしてくれるツールが「AWS Masking」。特に設定不要でARNやアカウントID、アクセスキーなどをマスキングしてくれます。  

↓拡張機能「AWS Masking」のアイコン  
<img src="images/chap-naosan-devtools/extends_10_page.png" width="50%">

↓マスキング結果  
<img src="images/chap-naosan-devtools/extends_11_automask.png" width="80%">  

### 任意の機密情報をマスキング！ハイライトも可能「Highlight This」
「Highlight This」を使えば、任意のパターンについてマスキングが可能です。マスキング対象の文字列は直接文字を指定するか、正規表現で文字列の構造を指定するとそのパターンに一致した文字列の背景と文字の色を変更します。例えば背景と文字の色をどちらも黒色にすれば、その文字列はマスキングされたような表示になります。  

↓拡張機能「Highlight This」のアイコン  
<img src="images/chap-naosan-devtools/extends_20_page.png" width="60%">  

↓設定画面1。正規表現でマスク対象を定義する  
<img src="images/chap-naosan-devtools/extends_21_setting01.png" width="50%">  
↓設定画面2。背景と文字の色を同じにするとマスキングされたような見た目になる    
<img src="images/chap-naosan-devtools/extends_22_setting02.png" width="50%">  

↓マスキング結果  
<img src="images/chap-naosan-devtools/extends_23_mask.png" width="80%">  

## さいごに
ちなみに両方の拡張機能を同時に有効にすることも可能です。その場合、「Highlight This」で黒色になった上に「AWS Masking」でモザイクがかかったような表示になります。また、自分の画面で見ている状態ではわかりませんが、Teamsなどで画面共有していると、その共有画面を見ている相手の画面ではスクロールが発生した際に一瞬だけ「Highlight This」のマスクが外れる場合があるようです。そのため、どちらかというと「AWS Masking」を使っておく方が安心かもしれません。  

↓両方の拡張機能を有効化した結果  
<img src="images/chap-naosan-devtools/extends_30_double.png" width="80%">  


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