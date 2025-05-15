import { VFM } from "@vivliostyle/vfm";

const isPrint = process.argv.includes("print.pdf");

const def = {
  //デフォルト２分でタイムアウトしちゃうので、ローカルコンパイル対応のため追加
  timeout: 300000,   // 5 分

  title: "AWS100kno", // populated into `publication.json`, default to `title` of the first entry or `name` in `package.json`.
  author: "oyakata <oyakata2438@gmail.com>", // default to `author` in `package.json` or undefined.
  language: "ja", // default to undefined.
  size: "JIS-B5", // JIS-B5: 教科書サイズ、A5: 最近流行りの小さいサイズの技術書
  theme: [
    "./fonts",
    "./theme-nice-techbook2",
  ],
  entry: [
    // 表紙
    // { rel: "cover" },

    // 扉
    // "00-title.md",
    "title.html",
    // 前書き
    "01-preface.md",

    // 目次
    { rel: "contents" },

    // 第一部
    "part-1-service.md",			//サービスそのものの説明、初級者向け
    "chap-torapota-infra.md",
	"chap-mob_engineer-aws-resilience-hub.md",
    "chap-kazzpapa3-aws-cli.md",
    "chap-otsuka-cloudshell.md",
    "chap-otsuka-polly.md",
    "chap-ikngm-cdk.md",
    "chap-mkdev10-amplify.md",
    "chap-whitebird_sp-amazon-vpc.md",
    "chap-takano-org.md",
	"chap-naosan-01infrastructurecomposer.md",
	"chap-naosan-02iacgenerator.md",
	"chap-shfk2-fis.md",


	"chap-naosan-13mitsumori.md",
	"chap-naosan-14amazonqvscode.md",
	"chap-naosan-15gluestudio.md",
	"chap-naosan-16stepfunctions.md",
	"chap-yakumo-neptune.md",
	"chap-amixedcolor-aws-sum.md",
    "chap-fossamagna-amplify-hosting.md",
    "chap-fossamagna-lambda-web-adapter.md",
	"chap-Riri-BuilderCards.md",

	"chap-naosan-22pac.md",
	"chap-naosan-23codedeploy.md",
	"chap-amixedcolor-amplify-gen2.md",
	"chap-akira-sato22.md",
	"chap-ryder472-guardduty.md",
    "chap-p0n-s3.md",
	"chap-nyagoro-AWS-S3.md",
	"chap-hirosys-support.md",
  	"chap-whitebird_sp-s3-design-principles.md",
    "chap-ashirasu-gameday.md",
	"chap-fukuchi-bedrock-custom-orchestration.md",
    "chap-aoto-appsig.md",
    "chap-kasacchiful-stepfunctions.md",
    "chap-kazzpapa3-aws-cloudtrail.md",
	"chap-naosan-28eventbridge.md",		//体裁著と悩ましい

	"part-2-usage.md",					//相対的に上級向けっぽく
    "chap-sour23-lambda.md",
	"chap-yuj1osm-team.md",
	"chap-kazzpapa3-aws-technical-support.md",
    "chap-iwamot-hiring-process.md",
	"chap-naosan-08wellarchitectedframework.md",
    "chap-beli-epic.md",
	"chap-naosan-12handson.md",
	"chap-otsukit-cloudformation.md",
	"chap-naosan-11awsdocument.md",
	"chap-otsukit-communicationtest.md",
	"chap-naosan-17browserextends.md",
	"chap-naosan-18drawio.md",
  	"chap-takano-game.md",
  	"chap-terusaku-ArchitectureCenter.md",
	"chap-naosan-24codepipeline.md",
	"chap-naosan-25s3lifecycle.md",
	"chap-naosan-26costcut.md",
	"chap-naosan-21iac.md",
	"chap-naosan-27sfparallel.md",
	"chap-naosan-29drift.md",
	"chap-naosan-30github.md",			//体裁ちょっと悩ましい
	"chap-mob_engineer-water-mark.md",
	"chap-mob_engineer-security-group-type.md",
	"chap-mob_engineer-ec2-global-group.md",
	"chap-amixedcolor-amazon-bedrock.md",
	"chap-shfk2-cloudwatchOI.md",
  	"chap-hibiki-iic.md",
	"chap-siba-operation.md",
	"chap-naosan-10awsblackbelt.md",
	"chap-naosan-37notebooklm.md",
	"chap-naosan-43builderscard.md",
	"chap-ksks-cloudwatch-metrics.md",

	"part-3-certification.md",				//資格試験のススメ、体験記など
    "chap-otsuka-certification.md",
    "chap-beli-cert.md",
	"chap-naosan-03awsexams.md",
	"chap-naosan-10awsblackbelt.md",
	"chap-mob_engineer-01soa.md",
	"chap-mob_engineer-02aif.md",
	"chap-mob_engineer-03mls.md",
	"chap-mob_engineer-04mla.md",
	"chap-mob_engineer-05scs.md",
	"chap-mob_engineer-06ans.md",
	"chap-mob_engineer-08dop.md",
	"chap-mob_engineer-07sap.md",
	"chap-mob_engineer-09dea.md",
	"chap-mob_engineer-10dva.md",
  	"chap-aikawa-certification.md",
  	"chap-harukotanabe-aws_certification.md",   //修正待ちアリ
	"chap-naosan-31skillbuilder.md",
	"chap-ryder472-cert-scs.md",
    "chap-beli-gold-jacket.md",
	"chap-mhiroki-certification.md",

	"part-4-community.md",					//コミュニティ、勉強会
    "chap-atsumi-community.md",
    "chap-mob_engineer-jaws-community-life.md",
    "chap-hiyokoinfraengineer.md",
	"chap-naosan-04communitybuilder.md",
	"chap-naosan-05jawsnagoya.md",
	"chap-naosan-06jawsnasa.md",
	"chap-naosan-07awssummit.md",
	"chap-naosan-09awsblog.md",
	"chap-naosan-20connpass.md",
	"chap-oyakata-greetingcard.md",
	"chap-naosan-19icons.md",
	"chap-kkimura-ug-kyushu.md",
  	"chap-harukotanabe-jaws_sainokuni.md",
    "chap-kazzpapa3-jawsug.md",
	"chap-naosan-32blog.md",
	"chap-naosan-33dev.md",
	"chap-naosan-34developersio.md",
	"chap-naosan-35swblog.md",
	"chap-naosan-36speakerdeck.md",
	"chap-naosan-38playle.md",
	"chap-naosan-39linkedin.md",
	"chap-naosan-40jawslunch.md",
	"chap-naosan-41jawssyukan.md",
	"chap-naosan-42edtech.md",
	"chap-otsukit-reinvent.md",
	"chap-takano-gizyutudouzin.md",

    // 後書き
    "90-postscript.md",
    "98-authors.md",
    "99-colophon.md",
  ],
  entryContext: "./src",

  // output: [ // path to generate draft file(s). default to '{title}.pdf'
  //   './output.pdf', // the output format will be inferred from the name.
  //   {
  //     path: './book',
  //     format: 'webpub',
  //   },
  // ],
  workspaceDir: ".vivliostyle", // directory which is saved intermediate files.
  toc: {
    title: "目次", // title of table of contents. default to 'Contents'.
    sectionDepth: 2,
    includeCover: false, // include cover page in table of contents. default to 'false'.
  },
  // cover: './cover.png', // cover image. default to undefined.
  vfm: {
    // options of VFM processor
    //   hardLineBreaks: true, // converts line breaks of VFM to <br> tags. default to 'false'.
    //   disableFormatHtml: true, // disables HTML formatting. default to 'false'.
  },
};

if (isPrint) {
  def.theme = [
    ...def.theme,
    // グレースケール印刷可能なPDF
    "./theme-nice-techbook2/theme-print-pdf.css",
  ];
} else {
  def.theme = [
    ...def.theme,
    // オンライン向けのフルカラーPDF
    "./theme-nice-techbook2/theme-online-pdf.css",
    "./theme-nice-techbook2/theme-base/css/lib/prism/base.css",
    "./theme-nice-techbook2/theme-base/css/lib/prism/theme-okaidia.css",
  ];
}

export default def;
