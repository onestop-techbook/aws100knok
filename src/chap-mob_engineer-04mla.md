---
class: chapter
---

# AWS Certified Machine Learning Engineer - Associate　～～AM/MLパイプラインを実装するために～～

<div class="flush-right">
奥田 雅基 @mob_engineer
</div>

## 前置き

**AWS Certified Machine Learning - Specialty**から続いて第4弾となります。
今回はAWS専門資格の一つである**AWS Certified Machine Learning Engineer - Associate**について執筆したいと思います。

## どういった資格なのか？

公式サイトには以下の通り示されています。

>AWS Certified Machine Learning Engineer - Associate は、本番環境に ML を実装して運用可能にする技術的能力を実証するものです。キャリアプロファイルと信頼性を向上させて、需要の高い機械学習に関連する職務に備えましょう。
>この試験の理想的な候補者は、機械学習エンジニアリングまたは関連分野で少なくとも 1 年間の経験があり、AWS サービスを使用した実践経験が 1 年間 ある方です。機械学習の経験がないプロフェッショナルは、Exam Prep Plan で利用できるトレーニングを受講して、知識とスキルの構築を開始できます。

<figure><figcaption>出典：<a href="https://aws.amazon.com/jp/certification/certified-machine-learning-engineer-associate/"> AWS Certified Machine Learning Engineer - Associate ( https://aws.amazon.com/jp/certification/certified-machine-learning-engineer-associate/ )</a>より抜粋</figcaption></figure>

第2弾で執筆した**AWS Certified AI Practitioner**と同じタイミングで登場した新試験となります。そのため、私が受験した当時は**学習リソースが少なく対策が難しい**といった状況でした。そのうえで、試験勉強を行うことで**AWSサービスでAI/MLサービスをうまく運用していくために考慮しなくてはいけないポイントは何か**をキャッチアップすることができると思いました。

## 試験を通じて変わったこと

AWSサービスを利用した機械学習・データ分析基盤を構築するときのパイプラインのお作法について思い浮かべられるようになりました。また、JAWS-UG含む勉強会で**AWS Glueを実務で利用しているということは○○を考慮して運用しているな**といった自分なりの理解が行えるようになりました。そのうえで、私自身が本格的にパイプラインを構築した経験が少ないため、検証環境でパイプライン構築のハンズオンを行ってみたいと思います。

## まとめ

個人的に、**ソリューションアーキテクトロールの方が機械学習に関する知識をキャッチアップする**のであればAIF・MLSよりおススメできると思います。そのうえで、**AWS Glue/Step Functionなどの使い分け**を考えながら試験学習を行っていくことでパイプラインへの理解が深まるかと思います。

本内容を読んで、資格チャレンジする人がひとりでも増えれば幸いです。

### 著者紹介

---

<div class="author-profile">
    <img src="images/mobengineer.png">
    <div>
        <div>
            <b>奥田 雅基</b>
            <a href="https://x.com/mob_engineer">@mob_engineer</a>
        </div>
        <div>
            サークル名：JAWS-UG 彩の国埼玉支部
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
LT芸人・ブログ芸人を目指している一般人。2016年にインフラ運用保守からキャリアスタートし、PMO・ネットワークエンジニアの経験を積み、現在社内プロダクトPJにてインフラ・Web開発を担当。2025年はアウトプット活動（特にAWS）を頑張っていきたいと思っています！！
</p>