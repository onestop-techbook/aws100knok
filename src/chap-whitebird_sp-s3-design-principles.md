---
class: chapter
---

# AWSを使った開発で行き詰ったら、Amazon S3 Design Principlesを読む！

<div class="flush-right">
白鳥 翔太@whitebird_sp
</div>

## Amazon S3 Design Principlesとは？
Amazon S3 Design Principlesとは、AWSがAmazon S3を開発する際に設計原則としていたものとなります。よくAWSの設計方針で悩んだ際は、Well-Architected Frameworkを参考にされる方が多いと思います。Well-Architected Frameworkはこれまでの経験を踏まえた設計原則のノウハウ集となっておりよくできておりますが、長年のアップデートを経て非常に複雑なものとなっています。Amazon S3 Design PrinciplesはS3を使う時だけではなく、シンプルな設計原則に立ち返る際に見返しておきたい考え方の基本になっております。

### Amazon S3 Design Principles(原文)
Amazon S3 Design Principlesは現在AWSの公式ドキュメントで見ることはできませんが、過去にはS3のページにあったり、re:InventのKeynoteでも紹介されておりました。
https://web.archive.org/web/20090520072911/http://aws.amazon.com/s3/

まずは原文そのままを読んでみます。

* _Decentralization_ : Use fully decentralized techniques to remove scaling bottlenecks and single points of failure.
* _Asynchrony_ : The system makes progress under all circumstances.
* _Autonomy_ : The system is designed such that individual components can make decisions based on local information.
* _Local responsibility_ : Each individual component is responsible for achieving its consistency; this is never the burden of its peers.
* _Controlled concurrency_ : Operations are designed such that no or limited concurrency control is required.
* _Failure tolerant_ : The system considers the failure of components to be a normal mode of operation, and continues operation with no or minimal interruption.
* _Controlled parallelism_ : Abstractions used in the system are of such granularity that parallelism can be used to improve performance and robustness of recovery or the introduction of new nodes.
* _Decompose into small well-understood building blocks_ : Do not try to provide a single service that does everything for everyone, but instead build small components that can be used as building blocks for other services.
* _Symmetry_ : Nodes in the system are identical in terms of functionality, and require no or minimal node-specific configuration to function.
* _Simplicity_ : The system should be made as simple as possible (but no simpler).

### Amazon S3 Design Principles(訳文)
訳文を簡単に作ってみました。公式のものではないので誤りを含むかもしれませんが、なるべく理解しやすいようにしてみました。
* _分散化_ : スケーリングのボトルネックや単一障害点を取り除くために、完全に分散化された技術を使います
* _非同期性_ : システムはあらゆる状況下でも処理を進められます
* _自律性_ : システムは各コンポーネントが自身の持つ情報に基づいて決定を下せるように設計されています
* _局所的責任_ : それぞれの独立したコンポーネントは一貫性を達成する責任を持っています。これは決して他のピアのコンポーネントの負担になりません
* _制御された並行性_ : オペレーションは同時実行制御が不要か、ごく限られるように設計されています
* _耐障害性_ : システムはコンポーネントの障害を通常起こりうるものとみなし、中断なしか最小限の中断で継続し続けます。
* _制御された並列処理_ : システムの抽象化はパフォーマンスや回復の堅牢性、または新しいノードの導入を入れても並列化できるようにします
* _小さく理解しやすいビルディングブロックへの分解_ : すべての人にすべてを提供する単一のサービスを提供しようとするのではなく、他のサービスの構成要素として使用できるビルディングブロックを構築します
* _対称性_ : システム内のノードは機能の点で同一であり、最小限の固有の設定で機能するようにします
* _シンプルさ_ : システムはできるだけシンプルに作ります (単に機能を少なくすればよいというものではない)

## Amazon S3 Design Principlesの推しポイント
Amazon.com のCTOである、Werner Vogles氏は分散コンピューティングで博士号を取得した専門家です。re:Invent 2024のテーマであったSimplexityでも本Principlesがベースになったことを語られており、AWSがローンチして20年たっても変わらない基本原則となっています。耐障害性、ビルディングブロックなど現在では一般的になったワードもAWSの初期から存在しており、本設計原則をもとに様々なサービスの概念や思想を考えていくことはAWSを理解するうえで非常に大事な概念ではないかと思います。一つ一つの項目だけでも語り始めると長くなりそうなので、本記事では簡単に全体の推しポイントのみにとどめておきます。

## まとめ
こうした設計原則はあまり意識しないかもしれませんが、何か判断に困ったときにはこうした原則に一度立ち返って見直すことで、ご自身の管理するワークロードやシステムがシンプルさと大規模さを両立するためのポイントになるのではないかと思います。

#### 著者紹介

---

<div class="author-profile">
    <img src="images/whitebird_sp.jpg">
    <div>
        <div>
            <b>白鳥 翔太</b>
            <a href="https://x.com/whitebird_sp">X@whitebird_sp</a>
        </div>
        <div>
            所属：NW-JAWS
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
ネットワークとクラウドを組み合わせるのが大好きなエンジニア。AWSの大規模イベントでWi-Fiのアクセスポイントを調査してる人がいたら大体私です。とある通信事業者の中の人。NW-JAWSの運営もやっています。好きなサービスはもちろんAmazon VPC<br>
・AWS Ambassadors<br>
・AWS Community Builder<br>
・Japan AWS Top Engineers<br>
・Japan AWS All Certifications Engineers
</p>