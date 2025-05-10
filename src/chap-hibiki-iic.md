---
class: chapter
---

# IAM Identity Center×SCPでマルチアカウント管理

<div class="flush-right">Hibiki@gravitas122</div>

## はじめに

AWSを用いて複数のシステム管理を行おうとすると、複数のアカウントをまとめて管理する「マルチアカウント構成」を利用する場面が多くあります。マルチアカウント構成は権限や請求先の分割で便利な反面、アクセス管理が複雑化しやすい点が悩みどころです。

そこで活躍するのが **IAM Identity Center（以下、IIC）** です。IICは、複数のアカウントに対して、ユーザーやグループ単位でアクセス権限を割り当て、一元的に管理できるサービスです。

IICを利用すると「このユーザーにはこのアカウントでこの権限を付与する」といった形で、アクセス管理を一元化できます。最近では「マルチアカウントではIAMユーザーではなく、IICを利用する」という流れも強まっており、今後さらに注目されるサービスです。

本パートでは、そんなIICの中でも重要な機能である **許可セット** に注目し、以下のトピックについて解説していきます。

-  許可セットとは何か？
-  許可セットを使うと、どのようなリソースが作成されるのか？
-  SCP（Service Control Policies）を使うとき、どうやってIICユーザーを制御するのか？

マルチアカウント環境でのアクセス管理に興味のある方の参考になれば嬉しいです！

## 許可セットって何？

許可セットとは、「どんな権限を付与するか」を定義するテンプレートです。こちらを利用することで、以下のようなアクセス制御を行うことができます。

-  **誰に（IICユーザーやグループ）**
-  **どのAWSアカウントに対して**
-  **どんな権限を付与するか（＝許可セットの中身）**

![](images/chap-hibiki-iic/iic-image.png){width=60%}
<!-- ここに「許可セットの構成イメージ」画像を挿入予定: ![許可セットの構成イメージ](images/chap-hibiki-iic/iic_image.png) -->

このように許可セットを活用することで、各IICユーザーやグループに、どのAWSアカウントでどんな権限を与えるかを柔軟に制御できます。

では、この許可セットが実際にアカウントに割り当てられると、各アカウントにはどのようなリソースが作成されるのでしょうか？

答えは、**IAMロール** です。  
この許可セットによって作成されるIAMロールについて、次の章『許可セットが割り当てられたときに作られるリソース』で詳しく解説していきます。

## 許可セットが割り当てられたときに作られるリソース

前章では許可セットの割り当てによってIAMロールが作成されると説明しました。
具体的には、IICユーザー×許可セット×アカウントの割り当て設定をすると、その内容に沿ったIAMロールが割り当て先の各アカウント側に自動的に作成されます。

![](images/chap-hibiki-iic/permissionset-role.png)
<!-- ここに「許可セットによってIAMロールが作成される流れ」画像を挿入予定: ![許可セットによってIAMロールが作成される流れ](images/chap-hibiki-iic/permset_iamrole.png) -->
このロールは、許可セット名に対して、各アカウントで次のような名前で作成されます：

```
AWSReservedSSO_{許可セット名}_{ランダム文字列}
```
※ランダム文字列はアカウントごと、許可セットごとに異なる値が生成されます。

次章では、こうして作られたIICのリソースを、どのようにSCPで制御していくのか解説します。

## SCPでIAM Identity Centerユーザーを制御するには？

SCP（Service Control Policies）は、AWS Organizationsで使えるポリシー機能です。組織単位（OU）やアカウント単位で「この操作は許可／拒否」といった制御ができます。

### (参考)IAMユーザーをSCPで指定する方法
まずSCPの使用例として、IAMユーザーをSCPで制御する場合についてご紹介します。
IAMユーザーを対象とする場合、SCP内Conditionで`aws:PrincipalArn`にIAMユーザーのARNを指定します。
```json
"Condition": {
  "ArnLike": {
    "aws:PrincipalArn": [
      "arn:aws:iam::{アカウントID}:user/{IAMユーザー名}"
    ]
  }
}
```

### IICユーザーをSCPで指定する方法
一方で、IICのユーザーはIAMユーザーのように各AWSアカウントに直接作成されるわけではありません。
『許可セットが割り当てられたときに作られるリソース』章でも解説した通り、ユーザーは、割り当てられた許可セットに応じて自動作成されるIAMロールを使って各アカウントへアクセスするからです。

よって、SCPでIICユーザーへ制御をかけるには、この自動生成されたIAMロールをターゲットにする必要があります。

SCPで特定のIICユーザーを制御したい場合は、以下のようなARNを `aws:PrincipalArn` に指定します：

```
arn:aws:iam::{アカウントID}:role/aws-reserved/sso.amazonaws.com/{リージョン}/AWSReservedSSO_{許可セット名}_*
```
※末尾の `*` は、許可セットごとに異なるランダムな文字列をワイルドカードでカバーするためのものです。


上記のARNを使って以下のように許可セットに対応するIAMロールを指定します。

```json
"Condition": {
  "ArnLike": {
    "aws:PrincipalArn": [
      "arn:aws:iam::{アカウントID}:role/aws-reserved/sso.amazonaws.com/{リージョン}/AWSReservedSSO_{許可セット名}_*"
    ]
  }
}
```

こちらを使用することで、特定の許可セットでアクセスするユーザーは許可、それ以外は拒否といった制御が可能になります。

さいごにSCPの実際の記載例をご紹介します。

### SCPでの使用例

ここでは、IICの許可セットに基づいて操作を拒否するSCPの使用例をご紹介します。

特定の操作を特定の許可セットのユーザーだけに行わせたい場合、SCPの `Action`、`Deny`、`ArnNotLike` を組み合わせて明示的に拒否する方法が有効です。

以下の例では、「AdminPermissionSet」という許可セットを持つユーザーには制限をかけず、それ以外のユーザーはIAMユーザー/グループの作成・変更・削除を禁止しています。

```json
{
  "Effect": "Deny",
  "Action": [
    "iam:CreateUser",
    "iam:DeleteUser",
    "iam:UpdateUser",
    "iam:CreateGroup",
    "iam:DeleteGroup",
    "iam:UpdateGroup"
    ],
  "Resource": "*",
  "Condition": {
    "ArnNotLike": {
      "aws:PrincipalArn": "arn:aws:iam::*:role/aws-reserved/sso.amazonaws.com/*/AWSReservedSSO_AdminPermissionSet_*"
    }
  }
}
```

上記のように設定することで、特定の許可セットを持っていないユーザーの操作を効果的に制御できます。

## まとめ

IAM Identity Center は、マルチアカウント環境におけるアクセス管理を一元化できるサービスです。
IICとSCPを組み合わせることで、よりセキュアかつ効率的なアクセス制御が可能になります。
本パートがその実現に向けた一歩となれば嬉しいです。

---

<div class="author-profile">
    <img src="images/hibiki.jpg">
    <div>
        <div>
            <b>Hibiki</b> <a href="https://x.com/gravitas122">@gravitas122</a>
        </div>
        <div>
            所属：NW-JAWS運営
        </div>
    </div>
</div>
<p style="margin-top: 0.5em; margin-bottom: 2em;">
23卒。NW、IaC、マルチアカウントが好きなエンジニアです。
</p> 