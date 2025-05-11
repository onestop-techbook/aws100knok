---
class: chapter
---

# リアルな音声を簡単に生成できる！Amazon Pollyを推したい！！

<div class="flush-right">
大塚 雄仁 @zzzzico
</div>

## なぜAmazon Pollyがおすすめなのか？
Amazon Pollyは、AIを活用した高度な音声合成技術を提供し、文章をリアルな音声に変換します。

動画ナレーション、アプリ内音声、カスタマーサポートなど、多様な用途で活用できるのが魅力です。

以下、詳細な推しポイントを紹介します！

## Amazon Pollyの推しポイント！
### 推しポイント① 多言語対応
Amazon Pollyは、30以上の言語と多様なアクセントに対応しており、グローバルなコンテンツ制作が容易にできます。

言語の多様性
* 主要な言語を幅広くサポート（英語、日本語、中国語、フランス語、スペイン語など）
* 地域ごとのアクセントを選択可能（例: 米国英語・英国英語・オーストラリア英語）

Pollyを使えば世界中のユーザーに適した言語で情報を発信できます。

### 推しポイント② リアルな音声
Pollyでは、男性・女性の音声が選択できるだけでなく、ニューラル音声（NTTS）も提供されています。

声のバリエーション
* 自然な話し方が可能（旧来の合成音声と比べて、イントネーションや抑揚がリアル）
* キャラクターの個性に合った声を選択（落ち着いた声、明るい声など）
* NTTS（Neural Text-to-Speech）技術を採用し、より人間らしい音声を生成

### 推しポイント③ SSML（Speech Synthesis Markup Language）
Pollyでは、SSMLを使うことで発話の微調整が可能です。 特に以下の点がカスタマイズできます。

* ポーズの調整 (`<break time="500ms"/>`)
* 声のトーン (`<prosody rate="fast" volume="loud">`)
* 発音のカスタマイズ (`<phoneme alphabet="ipa" ph="tʃaɪna">China</phoneme>`)

SSMLの主な機能
| 機能 | 説明 | SSMLコード例 |
| :--- | :--- | :--- |
| ポーズ調整 | 発話の流れを自然にする | `<break time="500ms"/>` |
| イントネーション調整 | 声のトーンや話速を変更 | `<prosody rate="slow">ゆっくり話す</prosody>` |
| 発音カスタマイズ | 特定の単語の発音を指定 | `<phoneme alphabet="ipa" ph="tʃaɪna">China</phoneme>` |
| 数字・略語の発音 | 略語や通貨、日付の発音を調整 | `<say-as interpret-as="date" format="mdy">01/01/2025</say-as>` |

```xml
<speak>
    こんにちは。<break time="500ms"/> とても良い天気ですね！
    <prosody rate="slow">ゆっくり話します。</prosody>
    今日は<say-as interpret-as="date" format="mdy">01/01/2025</say-as>です。
</speak>
```
このようにSSMLを使えば、発話の流れや感情を細かく調整し、より聞きやすい音声コンテンツを作成できます。

例えば、動画のナレーションや音声アシスタントの調整に役立ちます。

> 参照）
> https://docs.aws.amazon.com/ja_jp/polly/latest/dg/supportedtags.html

## Amazon PollyのTips！
### 音声と字幕を組み合わせる
Pollyの音声と字幕を活用することで、動画コンテンツのアクセシビリティを向上させられます。

* ナレーション付き字幕を作成し、情報伝達の効果をUP
* バリアフリー対応として字幕付き音声コンテンツを提供
* YouTubeやSNSコンテンツの補助音声として利用

例えば、教育コンテンツや企業のプレゼン資料の動画化に活用できます！

### Bedrockでスライド資料の説明を生成して読ませる
Amazon Bedrockを使ってスライドの説明文を自動生成し、Pollyで読み上げさせることができます。

* 生成AIによるスライド説明文作成（Amazon Bedrock）
* Pollyでナレーションを生成し、音声付きプレゼン作成
* 研修資料やeラーニング教材の音声ガイドとして活用

例えば、社内研修やオンラインコースのコンテンツ制作に役立ちます！

#### 著者紹介

---

<div class="author-profile">
    <img src="images/otsuka.png">
    <div>
        <div>
            <b>大塚 雄仁</b>
            X: <a href="https://x.com/zzzzico">@zzzzico</a>
            Qita: <a href="https://qiita.com/zzzzico/">@zzzzico</a>
        </div>
        <div>
            サークル名：JAWS-UG 茨城支部
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
縁あってJAWS-UG茨城支部運営に携わっています。2024 Japan AWS All Certifications Engineer。
</p>
