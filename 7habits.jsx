import { useState, useEffect } from "react";

const _gf = document.createElement("link");
_gf.rel = "stylesheet";
_gf.href = "https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&display=swap";
document.head.appendChild(_gf);

const P = {
  navy:"#1B3F8B", yellow:"#F5C800", skyBlue:"#A8D4F0", lightBlue:"#D6EDFB",
  coral:"#EE8EAD", green:"#7BC87A", greenPale:"#D8F2D8",
  white:"#FFFFFF", off:"#F8F6F0", grayL:"#E8EDF5", grayM:"#9AAAC0",
  locked:"#C8D0DC", lockedBg:"#EEF1F6", gold:"#F5C800", goldPale:"#FFFBE8",
  textDark:"#0D1F50", mintGreen:"#48B888", mintPale:"#D8F0E8",
};
const PH = { tag: P.green, bg: P.greenPale, dot: P.green };
const USERS = [
  { id:"chii", name:"ちい", color:P.coral,   tc:"#fff" },
  { id:"teru", name:"てる", color:P.skyBlue, tc:P.navy },
];

// tag: 🧠=理解  ✋=行動  💭=振り返り
const H = [
  { id:1, title:"主体的である", en:"Be Proactive", phase:"私的成功", icon:"①",
    desc:"刺激と反応の間には「選択の空白」がある。外の環境でなく自分の価値観に基づいて行動する。",
    levels:[
      { step:"STEP 1", label:"気づく", items:[
        {tag:"🧠",text:"「できない」「しなければ」は被害者思考を強める。今日自分がどんな言葉を使ったか意識して観察した"},
      ]},
      { step:"STEP 2", label:"言葉を変える", items:[
        {tag:"🧠",text:"「影響の輪」＝自分が変えられること。「関心の輪」＝気になるが変えられないこと。この違いを今日意識した"},
        {tag:"✋",text:"「できない・しなければ」を「しない・する」に言い換えた場面が1つ以上あった"},
      ]},
      { step:"STEP 3", label:"反応を選ぶ", items:[
        {tag:"🧠",text:"忙しい日こそ「刺激→即反応」になりやすい。仕事や家庭のすれ違いで、3秒立ち止まる意識を持った"},
        {tag:"✋",text:"カッとなりそうな・焦った場面で一呼吸おいてから言葉を選んだ"},
        {tag:"💭",text:"今日、誰かのせいにしたくなった瞬間があったか。そのときどう行動したか振り返った"},
      ]},
      { step:"STEP 4", label:"自分への約束", items:[
        {tag:"✋",text:"今日、自分に約束したことを1つ守った（小さなことでもOK）"},
        {tag:"✋",text:"職場か家庭で「自分にできること」にフォーカスした具体的な行動を1つとった"},
        {tag:"💭",text:"影響の輪の外（上司の評価・相手の気分など）にエネルギーを使いすぎた場面はなかったか振り返った"},
      ]},
      { step:"STEP 5", label:"主体性を広げる", items:[
        {tag:"🧠",text:"主体性は大きな決断だけでなく、日常の小さな選択の積み重ね。毎日の習慣がキャラクターをつくる"},
        {tag:"✋",text:"誰かの愚痴に共感しつつも、自分は「では何ができるか」を考えて言葉にした"},
        {tag:"✋",text:"仕事・家庭どちらかで、問題を誰かのせいにせず自分の行動で改善しようと動いた"},
        {tag:"💭",text:"今週、主体的に動けた瞬間を1つ思い浮かべ、なぜそれができたか言語化した"},
      ]},
    ],
  },
  { id:2, title:"終わりを思い描くことから始める", en:"Begin with the End in Mind", phase:"私的成功", icon:"②",
    desc:"すべてのものは二度つくられる。まず頭の中で（知的創造）、次に現実に（物的創造）。",
    levels:[
      { step:"STEP 1", label:"ゴールを知る", items:[
        {tag:"🧠",text:"「人生の終わりにどんな人だったと言われたいか」を1分でいいので頭に浮かべた。それが今日の行動の羅針盤になる"},
      ]},
      { step:"STEP 2", label:"ミッションに触れる", items:[
        {tag:"🧠",text:"ミッションステートメントは「自分の憲法」。仕事が忙しいときほど、立ち返る場所として機能する"},
        {tag:"✋",text:"今日、ミッションステートメント（または大切にしたいことのメモ）を読み返した"},
      ]},
      { step:"STEP 3", label:"今日をゴールにつなげる", items:[
        {tag:"✋",text:"今日の行動・判断のうち1つでも「自分のゴールに沿っているか」意識して確認した"},
        {tag:"✋",text:"配偶者・仕事・自分自身など各役割を意識して、それぞれに誠実な行動を1つとった"},
        {tag:"💭",text:"「目の前のタスク」に追われて、本当に大切なことを後回しにした場面がなかったか振り返った"},
      ]},
      { step:"STEP 4", label:"役割を設計する", items:[
        {tag:"🧠",text:"役割ごとに理想の姿を持つことで、毎日の行動に優先順位が生まれる"},
        {tag:"✋",text:"今週担う主な役割を書き出し、それぞれ大切にしたい行動を1つ決めた"},
        {tag:"💭",text:"忙しさの中で「配偶者としての自分」「仕事人としての自分」をどれだけ意識できたか振り返った"},
      ]},
      { step:"STEP 5", label:"人生をデザインする", items:[
        {tag:"🧠",text:"「葬儀で何を言ってほしいか」という問いは人生の優先順位を根本から問い直す力がある。定期的に立ち返る習慣を持つ"},
        {tag:"✋",text:"ミッションステートメントを見直し・加筆した（まだなければ草案を書いた）"},
        {tag:"✋",text:"今日の仕事・家庭での判断を、短期の都合でなく長期のゴールに基づいて行った場面が1つあった"},
        {tag:"💭",text:"今週、「終わり」から逆算して動けた場面と流された場面をそれぞれ思い浮かべた"},
      ]},
    ],
  },
  { id:3, title:"最優先事項を優先する", en:"Put First Things First", phase:"私的成功", icon:"③",
    desc:"重要だが緊急でない「第2領域」に時間を使う。大切なことを中心に据えた生き方へ。",
    levels:[
      { step:"STEP 1", label:"第2領域を知る", items:[
        {tag:"🧠",text:"4つのマトリクス：第1（緊急＋重要）・第2（重要だが緊急でない）・第3（緊急だが重要でない）・第4（どちらでもない）。今日どこに時間を使ったか意識した"},
      ]},
      { step:"STEP 2", label:"第2領域に時間を作る", items:[
        {tag:"🧠",text:"第2領域の例：健康管理・関係構築・学習・将来の計画。これを後回しにし続けると、いずれ第1領域の危機になる"},
        {tag:"✋",text:"今日、第2領域（健康・学習・夫婦の会話・将来の計画など）の活動に15分以上時間を使った"},
      ]},
      { step:"STEP 3", label:"週次スケジュールを使う", items:[
        {tag:"🧠",text:"週の初めに役割ごとの「大切な行動」を先にブロックする。後から空き時間を探すのではなく、先に守る時間を決める"},
        {tag:"✋",text:"今週のスケジュールを確認し、第2領域の活動が少なくとも1つカレンダーに入っている"},
        {tag:"💭",text:"今日、緊急だが重要でない割り込みに振り回された場面を振り返った"},
      ]},
      { step:"STEP 4", label:"ノーと言う力", items:[
        {tag:"🧠",text:"大切なことに「イエス」と言うためには、重要でないことに「ノー」と言う必要がある。断ることは自分の優先順位への誠実さ"},
        {tag:"✋",text:"重要でない依頼・誘い・タスクに対して、はっきりまたは丁寧に断った場面があった"},
        {tag:"✋",text:"今日、最も重要なタスクを「朝イチ」か「集中できる時間帯」に行った"},
        {tag:"💭",text:"今日の時間の使い方を振り返り、第2領域に使えた割合はどのくらいだったか概算した"},
      ]},
      { step:"STEP 5", label:"優先順位を生き方にする", items:[
        {tag:"🧠",text:"「時間管理」は本来、自己管理・人生管理。スケジュール帳は「自分の価値観を実行するツール」として使う"},
        {tag:"✋",text:"今週の振り返りを行い、第2領域に使えた時間・使えなかった原因を書き出した"},
        {tag:"✋",text:"来週のスケジュールに、仕事・家庭・健康・夫婦の時間それぞれの第2領域活動を1つずつ入れた"},
        {tag:"💭",text:"「忙しい」が口癖になっていないか。本当に大切なことに時間を使えているか正直に振り返った"},
      ]},
    ],
  },
  { id:4, title:"Win-Winを考える", en:"Think Win-Win", phase:"公的成功", icon:"④",
    desc:"互いが満足できる解決策を探す。競争や妥協でなく「共に豊かになれる道」を選ぶ姿勢。",
    levels:[
      { step:"STEP 1", label:"6つのパラダイムを知る", items:[
        {tag:"🧠",text:"Win-Win・Win-Lose・Lose-Win・Lose-Lose・Win・Win-Win or No Deal。自分がどのパラダイムで動きがちか、今日の会話を観察した"},
      ]},
      { step:"STEP 2", label:"相手のWinを意識する", items:[
        {tag:"🧠",text:"Win-Winは「やさしさ」ではなく「勇気＋思いやり」の組み合わせ。自分の利益も相手の利益も、どちらも大切にする姿勢"},
        {tag:"✋",text:"職場か家庭で誰かと話す際、「相手にとってのメリット・大切なこと」を意識して会話した"},
      ]},
      { step:"STEP 3", label:"協力の姿勢をとる", items:[
        {tag:"🧠",text:"職場での競争文化や「自分が正しい」という思い込みはWin-Lose思考を生む。忙しいときほど「ともに解決する」視点が薄れる"},
        {tag:"✋",text:"誰かと意見が違う場面で、競争・論破ではなく「一緒に考える」姿勢で話し合いに臨んだ"},
        {tag:"💭",text:"今日の人間関係の場面を振り返り、Win-WinかWin-Loseかどちらに近かったか確認した"},
      ]},
      { step:"STEP 4", label:"アグリーメントを作る", items:[
        {tag:"🧠",text:"Win-Winアグリーメントとは、期待する結果・ガイドライン・リソース・アカウンタビリティを事前に合意すること。家庭の役割分担にも使える"},
        {tag:"✋",text:"家庭か職場で、役割・期待・ルールを相手と話し合い、お互いが納得できる形で確認した"},
        {tag:"✋",text:"誰かとの約束・合意を誠実に守った"},
        {tag:"💭",text:"「相手に我慢させていないか」「自分だけ我慢していないか」今日の関係性を正直に振り返った"},
      ]},
      { step:"STEP 5", label:"Win-Winを習慣にする", items:[
        {tag:"🧠",text:"Win-Winは豊かさマインドから生まれる。「成功は限られたパイ」ではなく「ともに大きくできる」という信念が根底にある"},
        {tag:"✋",text:"Win-Winにならないと判断した場面で、合意しない（No Deal）という選択を意識的にとった"},
        {tag:"✋",text:"夫婦・職場・友人のどこかで、相手のWinのために自分から動いた行動が1つあった"},
        {tag:"💭",text:"今週の人間関係を振り返り、Win-Winを実現できた・できなかった場面を書き出した"},
      ]},
    ],
  },
  { id:5, title:"まず理解に徹し、そして理解される", en:"Seek First to Understand", phase:"公的成功", icon:"⑤",
    desc:"診断する前に処方するな。相手を本当に理解してから自分を理解してもらう。",
    levels:[
      { step:"STEP 1", label:"自叙伝的反応に気づく", items:[
        {tag:"🧠",text:"人は無意識に「評価・詮索・アドバイス・解釈」を返しがち（自叙伝的反応）。今日、自分がこれをしていないか観察した"},
      ]},
      { step:"STEP 2", label:"最後まで聞く", items:[
        {tag:"🧠",text:"共感的傾聴とは「返答を考えながら聞く」ではなく「相手を理解するために聞く」こと。仕事終わりの疲れた時間帯こそ試される"},
        {tag:"✋",text:"誰かの話を、途中でアドバイスせず最後まで聞いた"},
      ]},
      { step:"STEP 3", label:"言い換えて確認する", items:[
        {tag:"🧠",text:"共感的傾聴の4段階：①言葉をそのまま返す→②言い換える→③気持ちを反映する→④言葉＋気持ちを返す。今日どの段階を試せたか意識した"},
        {tag:"✋",text:"相手の話を自分の言葉で言い換えて「〜ということですか？」と確認した場面があった"},
        {tag:"💭",text:"今日の会話で「もっと聞けばよかった」と感じた場面を振り返り、次回どうするか考えた"},
      ]},
      { step:"STEP 4", label:"気持ちに寄り添う", items:[
        {tag:"🧠",text:"人は「正しいアドバイス」より「わかってもらえた」と感じることを先に求めている。夫婦間では解決策より共感が関係の質を変える"},
        {tag:"✋",text:"相手の感情（疲れ・不安・喜びなど）を言葉で確認した（「大変だったんだね」など）"},
        {tag:"✋",text:"アドバイスや解決策を出す前に、相手が「わかってもらえた」と感じるまで聞き続けた"},
        {tag:"💭",text:"今日、自分が「理解してほしい」と感じた場面はあったか。そのとき相手はどう接してくれたか振り返った"},
      ]},
      { step:"STEP 5", label:"理解し、理解される関係へ", items:[
        {tag:"🧠",text:"「まず理解する」が習慣になると、相手も自然とこちらの話を聞こうとする。夫婦・職場の信頼貯金が着実に積み上がる"},
        {tag:"✋",text:"共感的に聞いた後で、自分の考えや気持ちも率直に・穏やかに伝えた（理解される側も実践）"},
        {tag:"✋",text:"普段あまり深く話せていない相手との会話で、意識的に傾聴を実践した"},
        {tag:"💭",text:"今週の人間関係で、傾聴によって関係が深まった・空気が変わった瞬間があったか振り返った"},
      ]},
    ],
  },
  { id:6, title:"シナジーを創り出す", en:"Synergize", phase:"公的成功", icon:"⑥",
    desc:"全体は部分の総和以上になる。違いを強みとして、自分一人では到達できない結果を生む。",
    levels:[
      { step:"STEP 1", label:"違いに気づく", items:[
        {tag:"🧠",text:"シナジーは「違い」から生まれる。同じ意見の人同士では新しいものは生まれない。今日、自分と違う意見・視点に出会った場面を観察した"},
      ]},
      { step:"STEP 2", label:"違いを受け取る", items:[
        {tag:"🧠",text:"「自分と違う＝間違い」という反応は本能的。しかし「自分と違う＝学べる何かがある」という姿勢に切り替えると会話の質が変わる"},
        {tag:"✋",text:"自分と違う意見・アプローチに触れたとき、否定せずに「なるほど」「おもしろい」と受け取った"},
      ]},
      { step:"STEP 3", label:"第3の案を探す", items:[
        {tag:"🧠",text:"第3の案とは「私の案でも、あなたの案でもない、ともに生み出す新しい解決策」。家事分担や職場のプロジェクトでも実践できる"},
        {tag:"✋",text:"意見の違いがある場面で「どちらかが正しい」ではなく「もっと良い第3の案はないか」と問いかけた"},
        {tag:"💭",text:"今日、妥協（Lose-Lose）や多数決（Win-Lose）で終わった場面で、第3の案を探していたらどうなったか考えた"},
      ]},
      { step:"STEP 4", label:"違いを活かして協力する", items:[
        {tag:"🧠",text:"シナジーが起きるには「安心して違いを出せる関係性」が必要。習慣4・5を実践してきた土台の上にシナジーは生まれる"},
        {tag:"✋",text:"相手の強み・得意・視点を活かして、自分一人ではできなかったことを一緒に実現した場面があった"},
        {tag:"✋",text:"夫婦や職場で「私がやる・あなたがやる」の分担から「一緒に考えてより良くする」に切り替えた場面があった"},
        {tag:"💭",text:"今日の協力場面で、お互いの違いが「プラスに働いた」と感じた瞬間があったか振り返った"},
      ]},
      { step:"STEP 5", label:"シナジーを根付かせる", items:[
        {tag:"🧠",text:"シナジーが起きているとき「自分だけでは絶対ここに来られなかった」と感じる。その体験が違いへの開放性をさらに高める好循環を生む"},
        {tag:"✋",text:"今日、1＋1が2以上になる場面を意識的につくった（アイデア出し・役割分担・会話など何でもOK）"},
        {tag:"✋",text:"自分が「正しい」と思っていた方法を手放し、相手のやり方を試してみた場面があった"},
        {tag:"💭",text:"今週、シナジーが生まれた瞬間を振り返り、何が「違い」を活かせた要因だったか言語化した"},
      ]},
    ],
  },
  { id:7, title:"刃を研ぐ", en:"Sharpen the Saw", phase:"刃を研ぐ", icon:"⑦",
    desc:"4つの側面（肉体・精神・知性・社会情緒）を継続的に更新・強化する。自分が最も重要な資産。",
    levels:[
      { step:"STEP 1", label:"4領域を知る", items:[
        {tag:"🧠",text:"刃を研ぐ4領域：①肉体（運動・睡眠・栄養）②精神（価値観・内省）③知性（読書・学習）④社会情緒（人間関係・共感・貢献）。今どの領域が一番おろそかになっているか意識した"},
      ]},
      { step:"STEP 2", label:"肉体を整える", items:[
        {tag:"🧠",text:"肉体は他の6つの習慣を実践するための土台。睡眠不足・運動不足は判断力・感情コントロール・創造性すべてに影響する"},
        {tag:"✋",text:"【肉体】今日、運動・十分な睡眠・栄養バランスのどれか1つを意識して実行した"},
      ]},
      { step:"STEP 3", label:"精神を養う", items:[
        {tag:"🧠",text:"精神的刷新とは、自分の価値観・ミッションとつながり直すこと。忙しい毎日に「静かな時間」を意図的につくることが鍵"},
        {tag:"✋",text:"【肉体】今日、体を動かした・よく眠れた・食事を整えた"},
        {tag:"✋",text:"【精神】瞑想・祈り・自然の中での散歩・音楽・芸術鑑賞など、心が静まる時間を10分以上とった"},
        {tag:"💭",text:"今日「立ち止まって自分を取り戻せた」と感じる瞬間があったか振り返った"},
      ]},
      { step:"STEP 4", label:"知性・社会情緒を育む", items:[
        {tag:"🧠",text:"知性の刷新は「消費」ではなく読書・書くこと・学ぶことから生まれる。社会情緒的刷新は人への貢献・共感・深いつながりから生まれる"},
        {tag:"✋",text:"【肉体】体を大切に扱えた"},
        {tag:"✋",text:"【精神】心が静まる時間をとった"},
        {tag:"✋",text:"【知性】本・記事・ポッドキャストなど学びになるものに15分以上触れた"},
        {tag:"✋",text:"【社会情緒】誰かに感謝した・話を聞いた・助けた・一緒に笑った"},
      ]},
      { step:"STEP 5", label:"4領域を毎日回す", items:[
        {tag:"🧠",text:"刃を研ぐことは「いつかやること」ではなく「毎日の習慣」。1日の中で4領域すべてに少しずつ時間を使うことが長期的な幸福感を生む"},
        {tag:"✋",text:"【肉体】今日、体を大切に扱えた"},
        {tag:"✋",text:"【精神】自分の内側と向き合う時間をとった"},
        {tag:"✋",text:"【知性】何か新しいことを学んだ・書いた・考えを深めた"},
        {tag:"✋",text:"【社会情緒】誰かとのつながりを大切にする行動を1つとった"},
        {tag:"💭",text:"今週の4領域バランスを振り返り、特に弱かった領域と来週取り組みたいことを書き出した"},
      ]},
    ],
  },
];

const MQ = [
  { id:"role_model", sec:"大切な人から学ぶ",
    q:"あなたが心から尊敬する人は誰ですか？\nその人のどんなところが好きですか？",
    hint:"実在の人でも架空の人でも。その人の「どんな姿」に憧れるか書いてみてください。",
    ph:"例：祖母。どんなときも穏やかで、会うと自分が大切にされていると感じた。" },
  { id:"peak", sec:"自分の輝いた瞬間",
    q:"これまでの人生で「これが自分だ」と感じた瞬間はいつでしたか？",
    hint:"仕事・家庭・趣味・どんな場面でもOK。「自分らしくいられた」と感じた記憶を。",
    ph:"例：チームで難しいプロジェクトをやり遂げたとき。みんなの力が合わさる瞬間が好き。" },
  { id:"values", sec:"譲れない価値観",
    q:"どんな状況でも、絶対に大切にしたいことは何ですか？\n3つ以内で教えてください。",
    hint:"「正直さ」「家族との時間」「成長し続けること」など。自分の言葉でOKです。",
    ph:"例：誠実であること、家族の笑顔、好奇心を忘れないこと。" },
  { id:"roles", sec:"あなたが担う役割",
    q:"今のあなたが大切にしたい「役割」を書いてください。\n（配偶者・仕事人・親・自分自身など）",
    hint:"それぞれの役割で、どんな人でありたいかひと言ずつ添えると深まります。",
    ph:"例：配偶者として→てるの一番の理解者でいたい。仕事人として→誠実に楽しんで取り組む人。" },
  { id:"contribution", sec:"世界への貢献",
    q:"あなたの存在が、周りの人や社会にどんな影響を与えたいですか？",
    hint:"大きなことでなくて大丈夫。「家族が安心できる場所になりたい」でも十分です。",
    ph:"例：一緒にいる人が、自分を好きになれるような関わりをしたい。" },
  { id:"funeral", sec:"人生の終わりから考える",
    q:"人生の最後に、大切な人たちにどんな言葉をかけてもらいたいですか？",
    hint:"コビー博士が勧める「葬儀の場面」を想像する問いです。人生の羅針盤になります。",
    ph:"例：「あの人といると、自分のままでいられた」と言ってほしい。" },
  { id:"free", sec:"自由記述",
    q:"ここまでの答えを読み返して、あなたの人生で本当に大切なことを\n自分の言葉でまとめてみてください。",
    hint:"完璧じゃなくていい。今の自分の言葉で書いた「草案」がミッションステートメントです。何度でも書き直せます。",
    ph:"例：私は誠実さと好奇心を大切に、家族が安心できる場所であり続ける。仕事では人の力を引き出し、ともに成長することを喜びとする。" },
];

function ds(o=0){const d=new Date();d.setDate(d.getDate()+o);return d.toISOString().split("T")[0];}
function wk(){const d=new Date(),day=d.getDay(),m=new Date(d);m.setDate(d.getDate()-day+(day===0?-6:1));return m.toISOString().split("T")[0];}
function fd(ts){return new Date(ts).toLocaleDateString("ja-JP",{month:"long",day:"numeric"});}
function done(ch,u,h,lv,dk){const its=H.find(x=>x.id===h)?.levels[lv]?.items||[];return its.length>0&&its.every((_,i)=>!!ch[`${u}_${dk}_${h}_${lv}_${i}`]);}
function streak(ch,u,h,lv){let s=0;for(let d=0;d<30;d++){if(done(ch,u,h,lv,ds(-d)))s++;else break;}return s;}
function ulv(p,u,h){return p[`${u}_${h}_level`]??0;}
function unlocked(p,h){return h===1||p[`both_${h-1}_complete`]===true;}

function MissionTab({me,msn,mqi,md,setMqi,setMd,sMn,meU,pt}){
  const um=msn[me]||{};
  const answered=MQ.filter(q=>um[q.id]?.trim()).length;
  const allDn=answered===MQ.length;
  const curQ=MQ[mqi];
  const saved=um[curQ?.id]||"";
  const saveAns=()=>{
    if(!md.trim())return;
    const nx={...msn,[me]:{...um,[curQ.id]:md.trim()}};
    sMn(nx);setMd("");
    if(mqi<MQ.length-1)setMqi(mqi+1);
  };
  return (
    <>
    <div style={{fontSize:26,fontWeight:900,color:P.navy,marginBottom:4}}>ミッションステートメント</div>
    <div style={{fontSize:16,color:P.grayM,marginBottom:18}}>完璧を目指さなくていい。今の自分の言葉で。</div>
    <div style={{background:P.white,borderRadius:18,padding:"16px 18px",marginBottom:16,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
        <span style={{fontSize:15,fontWeight:700,color:P.navy}}>{meU.name}さんの進捗</span>
        <span style={{fontSize:15,fontWeight:700,color:P.green}}>{answered} / {MQ.length} 問</span>
      </div>
      <div style={{height:10,background:P.grayL,borderRadius:5,overflow:"hidden"}}>
        <div style={{height:"100%",background:P.green,borderRadius:5,transition:"width .4s",width:`${answered/MQ.length*100}%`}}/>
      </div>
      {allDn&&<div style={{marginTop:10,fontSize:15,color:P.green,fontWeight:700,textAlign:"center"}}>草案が完成しました！いつでも編集できます。</div>}
    </div>
    {!allDn&&<div style={{background:P.white,borderRadius:18,padding:"20px 18px",marginBottom:16,boxShadow:"0 2px 10px rgba(0,0,0,.06)",border:`2px solid ${P.greenPale}`}}>
      <div style={{display:"flex",gap:5,marginBottom:16}}>
        {MQ.map((q,i)=>(
          <button key={i} onClick={()=>{setMqi(i);setMd(um[q.id]||"");}} style={{
            flex:1,height:6,borderRadius:3,border:"none",cursor:"pointer",transition:"background .2s",
            background:um[q.id]?P.green:i===mqi?P.navy:P.grayL}}/>
        ))}
      </div>
      <div style={{fontSize:12,fontWeight:800,color:P.green,letterSpacing:1,marginBottom:8,textTransform:"uppercase"}}>{curQ.sec}</div>
      <div style={{fontSize:20,fontWeight:900,color:P.navy,lineHeight:1.55,marginBottom:10,whiteSpace:"pre-line"}}>{curQ.q}</div>
      <div style={{fontSize:14,color:P.grayM,lineHeight:1.7,marginBottom:14,padding:"10px 12px",background:P.off,borderRadius:10}}>{curQ.hint}</div>
      {saved&&!md&&(
        <div style={{background:P.greenPale,borderRadius:12,padding:"14px 16px",marginBottom:12}}>
          <div style={{fontSize:12,color:P.green,fontWeight:700,marginBottom:6}}>保存済みの回答</div>
          <div style={{fontSize:16,color:P.navy,lineHeight:1.7}}>{saved}</div>
          <button onClick={()=>setMd(saved)} style={{marginTop:10,fontSize:13,fontWeight:700,color:P.green,background:"transparent",border:`1.5px solid ${P.green}`,borderRadius:8,padding:"5px 14px",cursor:"pointer"}}>編集する</button>
        </div>
      )}
      {(!saved||md)&&<>
        <textarea value={md} onChange={e=>setMd(e.target.value)} placeholder={curQ.ph}
          style={{width:"100%",minHeight:110,border:`2px solid ${P.grayL}`,borderRadius:14,padding:"14px 16px",fontSize:17,fontFamily:"inherit",color:P.navy,outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.7}}/>
        <div style={{display:"flex",gap:10,marginTop:12}}>
          {mqi>0&&<button onClick={()=>{setMqi(mqi-1);setMd(um[MQ[mqi-1].id]||"");}} style={{padding:"12px 18px",background:P.off,color:P.navy,border:`2px solid ${P.grayL}`,borderRadius:12,fontSize:16,fontWeight:700,cursor:"pointer"}}>← 前へ</button>}
          <button onClick={saveAns} style={{flex:1,padding:13,color:"#fff",border:"none",borderRadius:12,fontSize:17,fontWeight:900,cursor:md.trim()?"pointer":"default",background:md.trim()?P.navy:P.locked,transition:"background .2s"}}>
            {mqi<MQ.length-1?"保存して次へ →":"草案を完成させる"}
          </button>
        </div>
      </>}
    </div>}
    {answered>0&&<>
      <div style={{display:"inline-block",color:"#fff",fontSize:15,fontWeight:800,padding:"6px 18px",borderRadius:20,margin:"4px 0 14px",background:P.navy}}>これまでの回答</div>
      {MQ.map((q)=>{
        const ans=um[q.id];
        if(!ans)return null;
        return(
          <div key={q.id} style={{background:P.white,borderRadius:14,padding:"16px 18px",marginBottom:10,border:`2px solid ${P.greenPale}`,position:"relative",boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
            <div style={{fontSize:11,fontWeight:800,color:P.green,letterSpacing:1,marginBottom:4}}>{q.sec}</div>
            <div style={{fontSize:13,color:P.grayM,marginBottom:8}}>{q.q.split("\n")[0]}</div>
            <div style={{fontSize:17,color:P.navy,lineHeight:1.75,paddingRight:44}}>{ans}</div>
            <button onClick={()=>{const idx=MQ.findIndex(x=>x.id===q.id);setMqi(idx);setMd(ans);}} style={{position:"absolute",top:14,right:14,fontSize:12,fontWeight:700,color:P.navy,background:P.off,border:`1.5px solid ${P.grayL}`,borderRadius:8,padding:"4px 10px",cursor:"pointer"}}>編集</button>
          </div>
        );
      })}
    </>}
    {msn[pt.id]?.free&&<>
      <div style={{display:"inline-block",color:"#fff",fontSize:15,fontWeight:800,padding:"6px 18px",borderRadius:20,margin:"16px 0 14px",background:pt.color}}>{pt.name}さんのミッション草案</div>
      <div style={{background:P.white,borderRadius:14,padding:"16px 18px",marginBottom:10,border:`2.5px solid ${pt.color}`,boxShadow:"0 1px 6px rgba(0,0,0,.04)"}}>
        <div style={{fontSize:17,color:P.navy,lineHeight:1.8}}>{msn[pt.id].free}</div>
      </div>
    </>}
  </>
  );
}

export default function App(){
  const [tab,setTab]=useState("today");
  const [me,setMe]=useState("chii");
  const [ah,setAh]=useState(1);
  const [ch,setCh]=useState({});
  const [pr,setPr]=useState({});
  const [ins,setIns]=useState({});
  const [draft,setDraft]=useState("");
  const [toast,setToast]=useState(null);
  const [pop,setPop]=useState(null);
  const [msn,setMsn]=useState({});
  const [mqi,setMqi]=useState(0);
  const [md,setMd]=useState("");
  const today=ds(0),wkey=wk();

  useEffect(()=>{
    try{
      const c=localStorage.getItem("y7c"),p=localStorage.getItem("y7p"),
            i=localStorage.getItem("y7i"),m=localStorage.getItem("y7m");
      if(c)setCh(JSON.parse(c));if(p)setPr(JSON.parse(p));
      if(i)setIns(JSON.parse(i));if(m)setMsn(JSON.parse(m));
    }catch{}
  },[]);

  const sCh=n=>{setCh(n);try{localStorage.setItem("y7c",JSON.stringify(n));}catch{}};
  const sPr=n=>{setPr(n);try{localStorage.setItem("y7p",JSON.stringify(n));}catch{}};
  const sIn=n=>{setIns(n);try{localStorage.setItem("y7i",JSON.stringify(n));}catch{}};
  const sMn=n=>{setMsn(n);try{localStorage.setItem("y7m",JSON.stringify(n));}catch{}};
  const toast2=(m,d=2600)=>{setToast(m);setTimeout(()=>setToast(null),d);};

  const toggle=(hid,lv,idx)=>{
    const k=`${me}_${today}_${hid}_${lv}_${idx}`;
    const nx={...ch,[k]:!ch[k]};sCh(nx);
    const its=H.find(x=>x.id===hid).levels[lv].items;
    if(!its.every((_,i)=>!!nx[`${me}_${today}_${hid}_${lv}_${i}`]))return;
    const s=streak(nx,me,hid,lv);
    if(s>=7)advance(nx,hid,lv);else toast2(`${s}日連続！あと${7-s}日`);
  };

  const advance=(cur,hid,lv)=>{
    const hab=H.find(x=>x.id===hid),max=hab.levels.length-1,nx={...pr},pt=USERS.find(u=>u.id!==me);
    if(lv<max){nx[`${me}_${hid}_level`]=lv+1;sPr(nx);toast2(`${hab.levels[lv+1].step}に進んだ！`);}
    else{
      nx[`${me}_${hid}_complete`]=true;
      if(nx[`${pt.id}_${hid}_complete`]){nx[`both_${hid}_complete`]=true;sPr(nx);if(hid<7)setPop(hid+1);else toast2("全7習慣コンプリート！！");}
      else{sPr(nx);toast2(`習慣${hid}クリア！${pt.name}さんを待っています`);}
    }
  };

  const isCh=(hid,lv,idx)=>!!ch[`${me}_${today}_${hid}_${lv}_${idx}`];
  const postIns=()=>{if(!draft.trim())return;const k=`${me}_${wkey}`;sIn({...ins,[k]:[...(ins[k]||[]),{text:draft.trim(),ts:Date.now()}]});setDraft("");toast2("投稿しました");};

  const hab=H.find(x=>x.id===ah),meU=USERS.find(u=>u.id===me),pt=USERS.find(u=>u.id!==me);
  const isUn=unlocked(pr,ah),lv=ulv(pr,me,ah),sk=streak(ch,me,ah,lv);
  const myDn=pr[`${me}_${ah}_complete`]===true,btDn=pr[`both_${ah}_complete`]===true;
  const its=isUn?(hab.levels[lv]?.items||[]):[];
  const tdDn=its.length>0&&its.every((_,i)=>isCh(ah,lv,i));
  const clr=H.filter(x=>pr[`both_${x.id}_complete`]).length;

  const tagStyle=(tag,done)=>{
    const bg=tag==="🧠"?"#E8F0FC":tag==="✋"?P.greenPale:"#FFF3E8";
    const col=tag==="🧠"?P.navy:tag==="✋"?"#2E7A2E":"#A05A00";
    const lbl=tag==="🧠"?"🧠 理解":tag==="✋"?"✋ 行動":"💭 振り返り";
    return{bg,col,lbl};
  };

  return(
    <div style={{fontFamily:"'M PLUS Rounded 1c','Hiragino Maru Gothic ProN','Hiragino Sans',sans-serif",background:P.off,minHeight:"100vh",maxWidth:480,margin:"0 auto"}}>

      {/* HEADER */}
      <div style={{background:P.navy,position:"sticky",top:0,zIndex:10,boxShadow:"0 4px 16px rgba(27,63,139,.35)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 16px 10px"}}>
          <div style={{background:P.yellow,borderRadius:10,padding:"8px 14px"}}>
            <div style={{fontSize:22,fontWeight:900,color:P.navy}}>7 Habits</div>
            <div style={{fontSize:12,color:P.navy,opacity:.7,marginTop:1}}>ちい &amp; てる の習慣プログラム</div>
          </div>
          <div style={{display:"flex",gap:8}}>
            {USERS.map(u=>(
              <button key={u.id} onClick={()=>setMe(u.id)} style={{padding:"10px 18px",borderRadius:12,border:"none",cursor:"pointer",transition:"all .18s",
                background:me===u.id?u.color:"rgba(255,255,255,.18)",
                border:me===u.id?`3px solid ${P.yellow}`:"3px solid transparent",
                transform:me===u.id?"scale(1.08)":"scale(1)"}}>
                <span style={{fontSize:18,fontWeight:900,color:me===u.id?u.tc:"#fff"}}>{u.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Journey dots */}
        <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 16px 8px"}}>
          {H.map(x=>{
            const un=unlocked(pr,x.id),bt=pr[`both_${x.id}_complete`],on=ah===x.id;
            return(
              <button key={x.id} onClick={()=>{setAh(x.id);setTab("today");}} style={{
                width:36,height:36,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .18s",
                background:bt?P.yellow:un?"rgba(255,255,255,.25)":"rgba(255,255,255,.08)",
                border:on?"3px solid #fff":"3px solid transparent",
                transform:on?"scale(1.15)":"scale(1)",
                boxShadow:on?"0 4px 12px rgba(0,0,0,.3)":"none"}}>
                <span style={{fontSize:17,fontWeight:900,color:bt?P.navy:un?"#fff":"rgba(255,255,255,.4)"}}>
                  {bt?"✓":un?x.id:"🔒"}
                </span>
              </button>
            );
          })}
          <span style={{fontSize:13,color:"rgba(255,255,255,.5)",marginLeft:"auto",fontWeight:700}}>{clr}/7</span>
        </div>

        {/* Tabs */}
        <div style={{display:"flex",borderTop:"1px solid rgba(255,255,255,.15)"}}>
          {[["today","今日"],["weekly","週次"],["share","ふたりで"],["mission","ミッション"]].map(([id,lbl])=>(
            <button key={id} onClick={()=>setTab(id)} style={{flex:1,padding:"11px 0",background:"transparent",border:"none",cursor:"pointer",
              borderBottom:tab===id?`3px solid ${P.yellow}`:"3px solid transparent",
              color:tab===id?P.yellow:"rgba(255,255,255,.45)",fontSize:13,fontWeight:700}}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* BODY */}
      <div style={{padding:"16px 16px 80px"}}>

        {/* ── TODAY ── */}
        {tab==="today"&&<>
          {/* Strip */}
          <div style={{display:"flex",gap:7,marginBottom:16}}>
            {H.map(x=>{
              const un=unlocked(pr,x.id),on=ah===x.id,bt=pr[`both_${x.id}_complete`];
              return(
                <button key={x.id} onClick={()=>setAh(x.id)} style={{
                  flex:1,height:58,borderRadius:12,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"all .18s",
                  background:on?P.green:bt?P.yellow:un?P.greenPale:P.lockedBg,
                  border:`2.5px solid ${on?P.green:bt?P.yellow:un?P.green:P.locked}`,
                  transform:on?"translateY(-4px) scale(1.06)":"none",
                  boxShadow:on?`0 8px 20px ${P.green}55`:"none"}}>
                  <span style={{fontSize:18,fontWeight:900,color:on?"#fff":bt?P.navy:un?P.navy:P.locked}}>
                    {bt?"✓":x.id}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Habit card */}
          <div style={{background:isUn?P.greenPale:P.lockedBg,borderRadius:18,padding:"18px 18px 16px",marginBottom:14,
            border:`2.5px solid ${isUn?P.green:P.locked}`,boxShadow:"0 3px 14px rgba(0,0,0,.07)"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <span style={{display:"inline-block",color:"#fff",fontSize:13,fontWeight:800,padding:"4px 14px",borderRadius:20,
                background:isUn?P.green:P.locked}}>
                {hab.phase}
              </span>
              {btDn&&<span style={{fontSize:13,fontWeight:800,padding:"4px 12px",borderRadius:20,background:P.mintPale,color:P.mintGreen}}>クリア済み</span>}
              {!isUn&&<span style={{fontSize:13,fontWeight:800,padding:"4px 12px",borderRadius:20,background:P.locked,color:"#fff"}}>ロック中</span>}
              {isUn&&myDn&&!btDn&&<span style={{fontSize:13,fontWeight:800,padding:"4px 12px",borderRadius:20,background:P.goldPale,color:"#C89800"}}>待機中</span>}
            </div>
            <div style={{fontSize:40,lineHeight:1,marginBottom:4,color:P.navy}}>{hab.icon}</div>
            <div style={{fontSize:22,fontWeight:900,color:P.textDark,lineHeight:1.4,marginBottom:4}}>{hab.title}</div>
            <div style={{fontSize:14,color:P.grayM,letterSpacing:.5,marginBottom:10}}>{hab.en}</div>
            <div style={{fontSize:16,color:"#4A5568",lineHeight:1.75,paddingTop:10,borderTop:"1.5px solid rgba(0,0,0,.07)"}}>{hab.desc}</div>
          </div>

          {/* Locked */}
          {!isUn&&(
            <div style={{textAlign:"center",padding:"34px 20px",background:P.lockedBg,borderRadius:18,marginBottom:14,border:`2px dashed ${P.locked}`}}>
              <div style={{fontSize:50}}>🔒</div>
              <div style={{fontSize:22,fontWeight:900,color:P.grayM,margin:"10px 0 6px"}}>まだロック中</div>
              <div style={{fontSize:17,color:P.grayM,lineHeight:1.7}}>習慣{ah-1}をふたりでクリアすると解放されます！</div>
            </div>
          )}

          {/* Active */}
          {isUn&&!btDn&&!myDn&&<>
            {/* Step card */}
            <div style={{background:P.white,borderRadius:18,padding:"18px 16px",marginBottom:14,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",gap:6,marginBottom:16}}>
                {hab.levels.map((lx,i)=>(
                  <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:4}}>
                    <div style={{width:34,height:34,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s",
                      background:i<lv?P.green:i===lv?P.green:P.grayL,
                      border:i===lv?`3px solid ${P.green}`:"3px solid transparent",
                      boxShadow:i===lv?`0 0 0 5px ${P.greenPale}`:"none"}}>
                      <span style={{fontSize:14,fontWeight:900,color:i<=lv?"#fff":P.grayM}}>{i<lv?"✓":i+1}</span>
                    </div>
                    <span style={{fontSize:11,fontWeight:700,color:i<=lv?P.green:P.grayM}}>{lx.step}</span>
                    <span style={{fontSize:10,color:i===lv?P.green:P.grayM,textAlign:"center",lineHeight:1.3}}>{lx.label}</span>
                  </div>
                ))}
              </div>
              {/* Streak bars */}
              <div style={{display:"flex",flexDirection:"column",gap:10}}>
                {USERS.map(u=>{
                  const ul=ulv(pr,u.id,ah),us=streak(ch,u.id,ah,ul),ud=pr[`${u.id}_${ah}_complete`];
                  return(
                    <div key={u.id} style={{display:"flex",alignItems:"center",gap:10}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"6px 12px",borderRadius:20,minWidth:66,flexShrink:0,background:u.color}}>
                        <span style={{fontSize:16,fontWeight:900,color:u.tc}}>{u.name}</span>
                      </div>
                      <div style={{display:"flex",gap:4,flex:1}}>
                        {[...Array(7)].map((_,d)=>(
                          <div key={d} style={{flex:1,height:16,borderRadius:4,transition:"background .25s",
                            background:ud?P.green:d<us?P.green:P.grayL}}/>
                        ))}
                      </div>
                      <span style={{fontSize:16,fontWeight:900,minWidth:52,textAlign:"right",color:ud?P.green:P.navy}}>
                        {ud?"完了！":`${us}/7`}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Check card */}
            <div style={{background:P.white,borderRadius:18,padding:"18px 16px",marginBottom:14,border:`2.5px solid ${P.green}`,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <div>
                  <span style={{fontSize:19,fontWeight:900,color:P.navy}}>今日のチェック</span>
                  <span style={{fontSize:14,color:P.green,fontWeight:700,marginLeft:8}}>{hab.levels[lv]?.label}</span>
                </div>
                <span style={{fontSize:16,fontWeight:900,color:"#fff",padding:"4px 14px",borderRadius:20,background:P.green}}>
                  {its.filter((_,i)=>isCh(ah,lv,i)).length}/{its.length}
                </span>
              </div>
              {its.map((item,i)=>{
                const dn=isCh(ah,lv,i);
                const txt=typeof item==="string"?item:item.text;
                const tg=typeof item==="string"?null:item.tag;
                const {bg,col,lbl}=tg?tagStyle(tg,dn):{bg:null,col:null,lbl:null};
                return(
                  <button key={i} onClick={()=>toggle(ah,lv,i)} style={{
                    width:"100%",display:"flex",alignItems:"flex-start",gap:14,padding:"14px 12px",
                    borderRadius:14,border:`2px solid ${dn?P.green:P.grayL}`,marginBottom:10,cursor:"pointer",
                    transition:"all .15s",background:dn?P.greenPale:P.white}}>
                    <div style={{width:30,height:30,borderRadius:"50%",border:`2.5px solid ${dn?P.green:P.grayM}`,
                      flexShrink:0,marginTop:4,display:"flex",alignItems:"center",justifyContent:"center",
                      background:dn?P.green:"transparent"}}>
                      {dn&&<span style={{color:"#fff",fontSize:18,fontWeight:900}}>✓</span>}
                    </div>
                    <div style={{flex:1,textAlign:"left"}}>
                      {tg&&<span style={{display:"inline-block",fontSize:12,fontWeight:700,color:col,background:bg,borderRadius:6,padding:"2px 9px",marginBottom:6}}>{lbl}</span>}
                      <div style={{fontSize:17,color:dn?P.textDark:"#444",lineHeight:1.7,fontWeight:dn?600:400}}>{txt}</div>
                    </div>
                  </button>
                );
              })}
              {tdDn&&(
                <div style={{display:"flex",alignItems:"center",gap:8,padding:"12px 16px",borderRadius:12,marginTop:10,background:P.green}}>
                  <span style={{fontSize:20,fontWeight:900,color:"#fff"}}>{sk}日連続！あと{Math.max(0,7-sk)}日でレベルアップ</span>
                </div>
              )}
            </div>
          </>}

          {/* Waiting */}
          {isUn&&myDn&&!btDn&&(
            <div style={{textAlign:"center",padding:"32px 20px",borderRadius:18,marginBottom:14,background:P.goldPale,border:`2.5px solid ${P.gold}`}}>
              <div style={{fontSize:24,fontWeight:900,color:P.navy,margin:"0 0 8px"}}>{meU.name}さんはクリア！</div>
              <div style={{fontSize:17,color:P.navy,lineHeight:1.7}}>{pt.name}さんのクリアを待っています。一緒に突破しよう！</div>
            </div>
          )}

          {/* Both done */}
          {isUn&&btDn&&(
            <div style={{textAlign:"center",padding:"36px 20px",borderRadius:18,marginBottom:14,background:P.greenPale,border:`2px solid ${P.green}66`}}>
              <div style={{fontSize:60}}>🎉</div>
              <div style={{fontSize:26,fontWeight:900,color:P.navy,margin:"8px 0 6px"}}>ふたりでクリア！</div>
              <div style={{fontSize:18,color:P.navy,lineHeight:1.7,marginBottom:14}}>「{hab.title}」が身につきました！</div>
              {ah<7&&<button onClick={()=>setAh(ah+1)} style={{padding:"14px 28px",color:"#fff",border:"none",borderRadius:14,fontSize:18,fontWeight:900,cursor:"pointer",background:P.green}}>習慣{ah+1}へ進む →</button>}
              {ah===7&&<div style={{fontSize:22,fontWeight:900,color:P.coral}}>全習慣マスター！！</div>}
            </div>
          )}
        </>}

        {/* ── WEEKLY ── */}
        {tab==="weekly"&&<>
          <div style={{fontSize:26,fontWeight:900,color:P.navy,marginBottom:4}}>週次レビュー</div>
          <div style={{fontSize:16,color:P.grayM,marginBottom:18}}>7日連続チェックで次のステップへ！</div>
          {H.map(x=>{
            const un=unlocked(pr,x.id),bt=pr[`both_${x.id}_complete`];
            return(
              <div key={x.id} style={{background:bt?P.greenPale:un?P.white:P.lockedBg,borderRadius:16,padding:16,marginBottom:12,
                border:`2.5px solid ${bt?P.green:un?P.green:P.locked}`,boxShadow:"0 2px 8px rgba(0,0,0,.05)",opacity:un?1:.55}}>
                <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:un&&!bt?12:0}}>
                  <div style={{width:40,height:40,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,
                    background:bt?P.yellow:un?P.green:P.locked}}>
                    <span style={{fontWeight:900,color:bt?P.navy:"#fff",fontSize:17}}>{bt?"✓":x.id}</span>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:18,fontWeight:800,color:un?P.navy:P.locked,lineHeight:1.4}}>{x.title}</div>
                    {bt&&<div style={{fontSize:14,color:P.green,fontWeight:700,marginTop:2}}>クリア済み</div>}
                  </div>
                </div>
                {un&&!bt&&USERS.map(u=>{
                  const ul=ulv(pr,u.id,x.id),us=streak(ch,u.id,x.id,ul),ud=pr[`${u.id}_${x.id}_complete`];
                  return(
                    <div key={u.id} style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",justifyContent:"center",padding:"5px 12px",borderRadius:20,flexShrink:0,minWidth:60,background:u.color}}>
                        <span style={{fontSize:15,fontWeight:900,color:u.tc}}>{u.name}</span>
                      </div>
                      <div style={{display:"flex",gap:3,flex:1}}>
                        {[...Array(7)].map((_,d)=>(
                          <div key={d} style={{flex:1,height:14,borderRadius:3,background:ud?P.green:d<us?P.green:P.grayL}}/>
                        ))}
                      </div>
                      <span style={{fontSize:16,fontWeight:900,minWidth:52,textAlign:"right",color:ud?P.green:P.navy}}>
                        {ud?"完了！":`${us}/7`}
                      </span>
                    </div>
                  );
                })}
              </div>
            );
          })}
          <div style={{display:"flex",alignItems:"flex-start",gap:14,background:"#FEFBE8",borderRadius:16,padding:"18px 20px",marginTop:8,border:`2px solid ${P.yellow}`}}>
            <span style={{fontSize:28}}>💡</span>
            <div style={{fontSize:17,color:P.navy,lineHeight:1.8}}>ふたりとも<strong>7日連続</strong>チェックで次の習慣が解放されます。段階的に項目が増えていくので無理なく習慣が身につきます！</div>
          </div>
        </>}

        {/* ── SHARE ── */}
        {tab==="share"&&<>
          <div style={{fontSize:26,fontWeight:900,color:P.navy,marginBottom:4}}>ふたりの記録</div>
          <div style={{fontSize:16,color:P.grayM,marginBottom:18}}>今週の気づきをシェアしよう</div>
          {/* Summary */}
          <div style={{background:P.white,borderRadius:18,padding:"18px 16px",marginBottom:18,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
            <div style={{fontSize:18,fontWeight:900,color:P.navy,marginBottom:14}}>ジャーニー進捗</div>
            <div style={{display:"flex",gap:7}}>
              {H.map(x=>{
                const bt=pr[`both_${x.id}_complete`],un=unlocked(pr,x.id);
                return(
                  <div key={x.id} style={{flex:1,textAlign:"center"}}>
                    <div style={{width:"100%",aspectRatio:"1",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",
                      background:bt?P.yellow:un?P.greenPale:P.lockedBg,border:`2.5px solid ${bt?P.yellow:un?P.green:P.locked}`}}>
                      <span style={{fontSize:18,fontWeight:900,color:bt?P.navy:un?P.navy:P.locked}}>{bt?"✓":un?x.id:"🔒"}</span>
                    </div>
                    <div style={{display:"flex",justifyContent:"center",gap:2,marginTop:4}}>
                      {USERS.map(u=>(
                        <div key={u.id} style={{width:7,height:7,borderRadius:"50%",background:pr[`${u.id}_${x.id}_complete`]?P.green:P.grayL}}/>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{display:"flex",gap:10,marginTop:14}}>
              {USERS.map(u=>{
                const cnt=H.filter(x=>pr[`${u.id}_${x.id}_complete`]).length;
                return(
                  <div key={u.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"10px 14px",borderRadius:14,flex:1,background:u.color}}>
                    <span style={{fontSize:18,fontWeight:900,color:u.tc}}>{u.name}</span>
                    <span style={{fontSize:16,fontWeight:700,color:u.tc,opacity:.8}}>{cnt}/7 クリア</span>
                  </div>
                );
              })}
            </div>
          </div>
          {/* Post */}
          <div style={{background:P.white,borderRadius:18,padding:"18px 16px",marginBottom:18,boxShadow:"0 2px 10px rgba(0,0,0,.06)"}}>
            <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:"7px 16px",borderRadius:20,marginBottom:12,background:meU.color}}>
              <span style={{fontSize:17,fontWeight:900,color:meU.tc}}>{meU.name}として投稿</span>
            </div>
            <textarea value={draft} onChange={e=>setDraft(e.target.value)}
              placeholder="今週の気づき・うまくいったこと・難しかったこと..."
              style={{width:"100%",minHeight:100,border:`2px solid ${P.grayL}`,borderRadius:14,padding:"14px 16px",fontSize:17,fontFamily:"inherit",color:P.navy,outline:"none",resize:"vertical",boxSizing:"border-box",lineHeight:1.6}}/>
            <button onClick={postIns} style={{marginTop:12,width:"100%",padding:14,color:meU.tc,border:"none",borderRadius:14,fontSize:18,fontWeight:900,cursor:"pointer",background:meU.color}}>シェアする</button>
          </div>
          {USERS.map(u=>{
            const posts=[...(ins[`${u.id}_${wkey}`]||[])].reverse();
            return(
              <div key={u.id}>
                <div style={{display:"inline-block",color:"#fff",fontSize:15,fontWeight:800,padding:"6px 18px",borderRadius:20,margin:"16px 0 12px",background:u.color}}>{u.name}の気づき</div>
                {posts.length===0
                  ?<div style={{fontSize:16,color:P.grayM,textAlign:"center",padding:"16px 0"}}>まだ投稿がありません</div>
                  :posts.map((p,i)=>(
                    <div key={i} style={{background:P.white,borderRadius:16,padding:"16px 18px",marginBottom:10,border:`2.5px solid ${u.color}`,boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
                      <div style={{fontSize:17,color:P.textDark,lineHeight:1.75}}>{p.text}</div>
                      <div style={{fontSize:13,color:P.grayM,marginTop:8}}>{fd(p.ts)}</div>
                    </div>
                  ))
                }
              </div>
            );
          })}
        </>}

        {/* ── MISSION ── */}
        {tab==="mission"&&<MissionTab
          me={me} msn={msn} mqi={mqi} md={md}
          setMqi={setMqi} setMd={setMd} sMn={sMn}
          meU={meU} pt={pt}
        />}
      </div>

      {/* UNLOCK POPUP */}
      {pop&&(
        <div style={{position:"fixed",inset:0,background:"rgba(27,63,139,.7)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={()=>setPop(null)}>
          <div style={{background:P.white,borderRadius:22,maxWidth:340,width:"90%",overflow:"hidden",boxShadow:"0 20px 60px rgba(0,0,0,.35)"}} onClick={e=>e.stopPropagation()}>
            <div style={{background:P.yellow,padding:"22px 24px",textAlign:"center"}}>
              <span style={{fontSize:32,fontWeight:900,color:P.navy}}>習慣{pop}が解放！</span>
            </div>
            <div style={{padding:"28px 28px 20px"}}>
              <div style={{fontSize:22,fontWeight:900,color:P.navy,marginBottom:8}}>{H.find(x=>x.id===pop)?.title}</div>
              <div style={{fontSize:17,color:P.navy,lineHeight:1.7,marginBottom:24}}>ふたりで次のステージへ進みましょう！</div>
              <button onClick={()=>{setPop(null);setAh(pop);setTab("today");}} style={{width:"100%",padding:14,background:P.navy,color:"#fff",border:"none",borderRadius:14,fontSize:18,fontWeight:900,cursor:"pointer"}}>さっそく始める！</button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast&&<div style={{position:"fixed",bottom:30,left:"50%",transform:"translateX(-50%)",background:P.navy,color:"#fff",padding:"12px 26px",borderRadius:30,fontSize:16,fontWeight:800,zIndex:100,boxShadow:"0 6px 24px rgba(27,63,139,.4)",pointerEvents:"none",whiteSpace:"nowrap"}}>{toast}</div>}
    </div>
  );
}
