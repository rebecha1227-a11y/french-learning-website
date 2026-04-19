window.siteData = {
  nav: [
    { id: "dashboard", label: "今日学习", icon: "◉", description: "任务、进度、补做安排" },
    { id: "roadmap", label: "学习路线", icon: "▤", description: "阶段目标与周计划" },
    { id: "curriculum", label: "课程主线", icon: "✦", description: "教材单元、讲义、练习" },
    { id: "question-bank", label: "题库中心", icon: "◎", description: "真题、相似题、筛选练习" },
    { id: "mistakes", label: "错题复盘", icon: "※", description: "错因、复习、二刷" },
    { id: "youtube", label: "视频补充", icon: "▶", description: "YouTube 解析与扩展学习" }
  ],

  profile: {
    name: "Rebecha",
    target: "TCF Canada · 2027-05-01",
    level: "A1 → B1",
    weeklyGoal: "本周目标 12 小时",
    avatar: "RF"
  },

  tracking: {
    /* 热力图与进度改为读取真实用户行为数据（Supabase + localStorage） */
    totalHours: 0,
    thisWeek: 0,
    sessions: 0,
    weaknesses: [
      { label: "听力细节", value: 78, tone: "rose", level: "需二刷" },
      { label: "语法变位", value: 64, tone: "gold", level: "波动" },
      { label: "阅读定位", value: 82, tone: "teal", level: "稳定" },
      { label: "词汇召回", value: 58, tone: "purple", level: "优先补" }
    ]
  },

  aiTips: [
    "今天优先完成 Unité 1 讲义 + 练习，再进入一套短听力。",
    "错题里“语法变位”占比偏高，建议今晚复盘 être / avoir。",
    "如果学习时长超过 2 小时，最后 20 分钟只做复盘，不再开新内容。"
  ],

  dashboard: {
    title: "今日学习",
    intro: "按教材主线学习，再立刻做对应练习和真题，今天先完成 2 小时任务。",
    metrics: [
      { value: "2 小时", label: "今日学习时长" },
      { value: "A1 -> B2", label: "长期目标" },
      { value: "2027", label: "目标考试" },
      { value: "听阅优先", label: "当前重心" }
    ],
    todayPlan: [
      {
        id: "task-a1-u0",
        time: "25 分钟",
        title: "学习 Édito A1 Unité 0",
        type: "讲义",
        detail: "完成欢迎单元，练习问候、字母、数字和课堂常用表达。"
      },
      {
        id: "task-a1-u1-note",
        time: "30 分钟",
        title: "阅读 Unité 1 讲义",
        type: "讲义",
        detail: "学习自我介绍、身份信息、国籍语言和 être / avoir 基础。"
      },
      {
        id: "task-a1-u1-ex",
        time: "35 分钟",
        title: "完成 Unité 1 练习",
        type: "练习",
        detail: "做填空、改错、情景表达题，检查基础输出。"
      },
      {
        id: "task-review",
        time: "30 分钟",
        title: "听力与复盘",
        type: "复盘",
        detail: "做基础识别型听力，并把不会的词和错因记下来。"
      }
    ],
    questSummary: [
      { value: "4", label: "今日 Quest" },
      { value: "11.5h", label: "本周学习" },
      { value: "74%", label: "当前正确率" }
    ],
    quickCards: [
      {
        title: "今天先做什么",
        body: "从课程主线进入 Édito 单元，点开讲义，再做配套练习。"
      },
      {
        title: "做不完怎么办",
        body: "任务可以直接勾选完成，也可以顺延到明天或自定义日期。"
      },
      {
        title: "讲义怎么打印",
        body: "进入单元详情后点击“导出 PDF”，用浏览器打印保存即可。"
      }
    ]
  },

  roadmap: {
    title: "学习路线",
    phases: [
      {
        name: "阶段 1：基础打底",
        percent: 78,
        span: "现在 -> A2 稳定",
        objective: "建立发音、核心语法、基础词汇和最基本的听读理解。",
        milestones: ["完成 Édito A1 主线", "做第一批基础听阅真题", "建立错题分类体系"]
      },
      {
        name: "阶段 2：进阶衔接",
        percent: 44,
        span: "A2 -> B1",
        objective: "扩大词汇、提升长句理解，开始强化 TCF 高频任务型题目。",
        milestones: ["完成 Édito A2 / B1 高相关内容", "加大阅读与听力输入", "口语写作开始模块化训练"]
      },
      {
        name: "阶段 3：应试强化",
        percent: 12,
        span: "考前 4 个月",
        objective: "进入冲刺模式，做套题、模考、限时训练和薄弱项补强。",
        milestones: ["全模块真题训练", "高频错题重练", "模考节奏固定化"]
      }
    ],
    progress: { current: 38, target: 52, label: "年度计划进度" },
    weeks: [
      "第 1-2 周：发音、问候、自我介绍、数字、时间、基础识别型听力",
      "第 3-4 周：日常生活表达、核心动词、基础阅读定位",
      "第 5-8 周：A1 收束 + A2 过渡，建立第一套错题循环",
      "第 9 周以后：逐步引入 B1 高相关内容和更完整的题型训练"
    ]
  },

  questionBank: {
    title: "题库中心",
    stats: [
      { value: "126", label: "已整理题目" },
      { value: "18", label: "本周计划" },
      { value: "4 类", label: "覆盖模块" }
    ],
    modules: [
      { name: "听力场景题", description: "短对话 + 信息定位，适合每日快刷。" },
      { name: "阅读定位题", description: "先抓题干关键词，再练扫描定位。" },
      { name: "口语任务卡", description: "按 TCF Canada 任务类型拆成短练习。" }
    ],
    flows: [
      "先刷 1 组基础题，再回看错因。",
      "难度从入门 → 进阶 → 冲刺，不连续跳级。",
      "每次做题后立刻记录不会的词与表达。"
    ],
    items: [
      { title: "听力 · 场景识别 01", difficulty: "入门", status: "今日可做", module: "听力", description: "问候、数字、身份核实类高频短对话。" },
      { title: "阅读 · 关键信息定位 04", difficulty: "进阶", status: "建议二刷", module: "阅读", description: "练习公告、通知、海报类快速定位。" },
      { title: "口语 · Task 1 回答模板", difficulty: "冲刺", status: "周末训练", module: "口语", description: "围绕自我介绍与日常安排建立稳定开口模板。" }
    ]
  },

  mistakes: {
    title: "错题复盘",
    categories: ["语法", "词汇", "听力", "阅读定位", "表达组织"],
    loop: [
      "先标出错因，再决定是回教材还是回题目。",
      "48 小时内做一次二刷，避免只记答案。",
      "一周后抽查同类题，确认是否真正修复。"
    ],
    items: [
      { title: "avoir 变位混淆", category: "语法", reason: "主语变位不稳，做题时靠直觉。", nextAction: "回看 Unité 1 讲义并做 5 题替换练习。" },
      { title: "听力中数字误判", category: "听力", reason: "sept / seize / dix-sept 区分不稳。", nextAction: "复听数字类材料并跟读 10 分钟。" },
      { title: "阅读题先看全文", category: "阅读定位", reason: "没先抓关键词，耗时太长。", nextAction: "做题时先圈题干关键词再定位。" }
    ]
  },

  youtube: {
    title: "视频补充",
    cards: [
      { title: "跟读补音感", body: "只在教材学完后用视频补发音和语感，不替代主线。" },
      { title: "卡点再搜索", body: "遇到具体语法点，再找对应解析视频，不泛看。" },
      { title: "短视频先于长课程", body: "先看 8-12 分钟短解析，再决定要不要深挖。" }
    ],
    resources: [
      { title: "Être / Avoir 超短复习", note: "适合做完 Unité 1 后立即巩固。", linkLabel: "YouTube 链接占位" },
      { title: "TCF 听力题目拆解", note: "练习先听问题再抓人物关系。", linkLabel: "YouTube 链接占位" },
      { title: "法语数字辨音", note: "专门强化 0-20 数字与电话号码。", linkLabel: "YouTube 链接占位" }
    ]
  },

  curriculum: {
    title: "课程主线",
    summary:
      "课程主线已经按你现有的 Édito A1/A2 教材真实单元搭好。每个单元都可以点开看讲义、练习和答案。",
    meta: [
      "讲义是学习版 HTML，可直接导出 PDF 做笔记。",
      "练习题是根据教材主题和 cahier 风格改写的原创练习，避免死搬内容。",
      "后续会继续把每个单元和 TCF Canada 真题做知识点映射。"
    ],
    books: [
      {
        level: "Édito A1",
        caption: "先打基础，把最常用的生活场景和高频表达学扎实。",
        units: [
          {
            id: "a1-u0",
            code: "Unité 0",
            title: "Bienvenue !",
            focus: "法语入门、课堂常用语、问候与道别、字母与数字 0–20、tu 与 vous 的区分",
            lecture: {
              summary: "Unité 0 是整本 Édito A1 的热身单元，目标不是系统语法，而是让你放下对开口的恐惧。这一单元会建立你和法语的第一次真实接触：认识字母、听懂老师的课堂指令、和陌生人打招呼。所有内容都极其日常，学完后你就能在任何法语环境里不慌张地应对最基础的互动。",
              canDo: [
                "用 bonjour / salut / au revoir 等词打招呼和道别",
                "区分正式场合（vous）和熟人场合（tu）",
                "拼读法语字母表，听懂字母拼写",
                "数 0 到 20，理解简单数字信息",
                "听懂并执行基础课堂指令（Écoutez, Répétez, Lisez…）",
                "用 Comment ça va ? / Ça va bien 进行简短寒暄"
              ],
              grammarSections: [
                {
                  title: "tu vs. vous：正式与非正式的核心区分",
                  explanation: "法语有两种“你”：tu 用于熟人、朋友、同龄人、家人；vous 用于陌生人、长辈、上司、正式场合，同时也是“你们”的复数形式。这个区分在 TCF Canada 的听力和口语中非常重要——选错了说 tu 给陌生人会显得不礼貌。",
                  table: [
                    ["场合", "用词", "例句"],
                    ["熟人/朋友/同龄人", "tu", "Salut Paul, tu vas bien ?"],
                    ["陌生人/长辈/正式场合", "vous", "Bonjour Madame, comment allez-vous ?"],
                    ["多人（无论亲疏）", "vous", "Bonjour tout le monde, vous allez bien ?"]
                  ],
                  examples: [
                    { fr: "– Salut ! Tu t'appelles comment ? – Je m'appelle Léa.", zh: "– 嗨！你叫什么名字？– 我叫 Léa。（朋友间）" },
                    { fr: "– Bonjour Madame, comment vous vous appelez ? – Je m'appelle Dupont.", zh: "– 您好女士，请问您叫什么名字？– 我叫 Dupont。（正式场合）" }
                  ],
                  pitfall: "在 TCF Canada 听力中，说话人用 tu 还是 vous 往往透露出人物关系——是朋友、同事还是陌生人。这是一个常考的“关系判断”信号，要养成听到 vous 就识别正式关系的习惯。"
                },
                {
                  title: "基础问候与道别表达",
                  explanation: "法语问候语按时间和正式程度有细微区别。入门阶段只需掌握最常用的几组，但要知道哪些是正式、哪些是口语。",
                  table: [
                    ["表达", "使用场合", "回应"],
                    ["Bonjour", "白天，正式/非正式均可", "Bonjour !"],
                    ["Bonsoir", "傍晚/晚上", "Bonsoir !"],
                    ["Salut", "熟人之间，非正式", "Salut !"],
                    ["Au revoir", "道别，正式", "Au revoir !"],
                    ["À bientôt", "再见（近期会再见）", "À bientôt !"],
                    ["À demain", "明天见", "À demain !"],
                    ["Comment ça va ?", "非正式问候", "Ça va bien, merci ! / Ça va."],
                    ["Comment allez-vous ?", "正式问候", "Très bien, merci !"]
                  ],
                  examples: [
                    { fr: "– Bonjour, comment ça va ? – Ça va bien, merci ! Et vous ?", zh: "– 你好，近来怎么样？– 很好，谢谢！你呢？" },
                    { fr: "– Salut ! À bientôt ! – Salut, à demain !", zh: "– 嗨！再见！– 嗨，明天见！" }
                  ],
                  pitfall: "Salut 既能打招呼也能道别，相当于英语的 Hi 和 Bye，只用在非正式场合。Bonjour 只用于问候，不用于道别。"
                },
                {
                  title: "课堂常用指令（La langue de la classe）",
                  explanation: "这些词在听力和阅读课上会反复出现，听懂老师/考试题目的指令是第一步。",
                  table: [
                    ["指令", "中文意思"],
                    ["Écoutez !", "听！"],
                    ["Répétez !", "重复！"],
                    ["Lisez !", "读！"],
                    ["Regardez !", "看！"],
                    ["Écrivez !", "写！"],
                    ["Répondez !", "回答！"],
                    ["Associez.", "连线/匹配"],
                    ["Complétez.", "补全/填写"],
                    ["Choisissez.", "选择"],
                    ["Vrai ou faux ?", "对还是错？"],
                    ["Avec votre voisin(e).", "和你的同伴一起"]
                  ],
                  examples: [
                    { fr: "Écoutez et répétez les mots suivants.", zh: "听并重复以下单词。" },
                    { fr: "Associez les phrases aux photos.", zh: "把句子和图片连线。" }
                  ],
                  pitfall: "这些指令词在 TCF Canada 的题目说明里也会出现（如 Associez, Complétez, Vrai ou faux）。提前熟悉它们，考试时不会浪费时间读题目。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "法语字母表（L'alphabet）",
                  words: [
                    { fr: "A [a]  B [be]  C [se]  D [de]", zh: "注意 C 读 [se] 不读 [si]", example: "" },
                    { fr: "E [ə]  F [ɛf]  G [ʒe]  H [aʃ]", zh: "H 在法语里通常不发音", example: "" },
                    { fr: "I [i]  J [ʒi]  K [ka]  L [ɛl]", zh: "J 读 [ʒi] 类似“日”", example: "" },
                    { fr: "M [ɛm]  N [ɛn]  O [o]  P [pe]", zh: "", example: "" },
                    { fr: "Q [ky]  R [ɛʁ]  S [ɛs]  T [te]", zh: "R 是法语最难的音——小舌颤音", example: "" },
                    { fr: "U [y]  V [ve]  W [dublə ve]  X [iks]", zh: "U 读 [y]，嘴形像“鱼”，类似拼音 ü", example: "" },
                    { fr: "Y [igʁɛk]  Z [zɛd]", zh: "", example: "" }
                  ]
                },
                {
                  theme: "数字 0–20（Les nombres）",
                  words: [
                    { fr: "0 zéro  1 un  2 deux  3 trois", zh: "trois 末尾 s 不发音", example: "" },
                    { fr: "4 quatre  5 cinq  6 six  7 sept", zh: "sept 的 p 不发音", example: "" },
                    { fr: "8 huit  9 neuf  10 dix", zh: "neuf 在 heures 前读 [nœv]", example: "" },
                    { fr: "11 onze  12 douze  13 treize  14 quatorze", zh: "", example: "" },
                    { fr: "15 quinze  16 seize  17 dix-sept  18 dix-huit", zh: "", example: "" },
                    { fr: "19 dix-neuf  20 vingt", zh: "vingt 末尾 gt 不发音，读 [vɛ̃]", example: "" }
                  ]
                },
                {
                  theme: "基础问候词汇",
                  words: [
                    { fr: "bonjour", zh: "你好（白天）", example: "Bonjour Madame !" },
                    { fr: "bonsoir", zh: "晚上好", example: "Bonsoir, ça va ?" },
                    { fr: "salut", zh: "嗨（非正式）", example: "Salut Paul !" },
                    { fr: "au revoir", zh: "再见", example: "Au revoir, à bientôt !" },
                    { fr: "merci", zh: "谢谢", example: "Merci beaucoup !" },
                    { fr: "s'il vous plaît / s'il te plaît", zh: "请（正式/非正式）", example: "Un café, s'il vous plaît." },
                    { fr: "excusez-moi / excuse-moi", zh: "对不起/打扰一下", example: "Excusez-moi, vous êtes Madame Dupont ?" },
                    { fr: "pardon", zh: "抱歉/对不起", example: "Pardon, je ne comprends pas." },
                    { fr: "je ne comprends pas", zh: "我不明白", example: "Pardon, je ne comprends pas. Vous pouvez répéter ?" },
                    { fr: "je ne sais pas", zh: "我不知道", example: "Je ne sais pas, désolé(e)." }
                  ]
                }
              ],
              phonetique: "本单元最重要的语音任务：①区分鼻化元音和普通元音（如 un [œ̃] vs. ou [u]）；②注意法语末尾辅音通常不发音（trois, vingt, sept 的特殊情况除外）；③法语的 R 是小舌颤音 [ʁ]，和中文的 r 完全不同，需要专门练习。建议用 Duolingo 或 YouTube 上的发音视频每天练习字母朗读 5 分钟。",
              tcf: "TCF Canada A1 入门听力常考场景：两人打招呼、简短的身份核实对话。本单元的问候语（bonjour/bonsoir/salut 的区分）和 tu/vous 的使用是判断人物关系的关键信号。数字 0–20 在电话号码、地址、价格类题目中随时会出现。"
            },
            exercises: [
              {
                type: "tu 或 vous？",
                instruction: "根据情境选择 tu 或 vous，并把括号里的问句改成正确形式。",
                items: [
                  { prompt: "你在路上遇见老师。问她叫什么名字。\n→ Bonjour Madame, comment (tu t'appelles / vous vous appelez) _____ ?", answer: "vous vous appelez", explanation: "对老师（长辈、正式场合）用 vous。" },
                  { prompt: "你在语言班认识了同龄新朋友 Lucas。\n→ Salut ! Comment (tu t'appelles / vous vous appelez) _____ ?", answer: "tu t'appelles", explanation: "同龄朋友之间用 tu，非正式场合。" },
                  { prompt: "你给一群人介绍自己。\n→ Bonjour, (tu vas / vous allez) _____ bien ?", answer: "vous allez", explanation: "对多人说话一律用 vous（复数）。" }
                ]
              },
              {
                type: "问候匹配",
                instruction: "把左边的情境和右边最合适的表达连线（写出对应字母）。",
                items: [
                  { prompt: "① 下午 3 点见到同学", answer: "b. Bonjour !", explanation: "Bonjour 适用于全天（日落前）。" },
                  { prompt: "② 晚上 8 点见到邻居", answer: "c. Bonsoir !", explanation: "Bonsoir 用于傍晚/晚上。" },
                  { prompt: "③ 和好朋友说再见", answer: "a. Salut, à bientôt !", explanation: "Salut 可以道别，à bientôt 表示很快再见。" },
                  { prompt: "④ 正式结束会议告别", answer: "d. Au revoir, bonne journée !", explanation: "正式场合用 Au revoir，可加 bonne journée（祝你一天愉快）。" }
                ]
              },
              {
                type: "数字听写练习",
                instruction: "把下列数字用法语写出来（用字母拼写，不用阿拉伯数字）。",
                items: [
                  { prompt: "7", answer: "sept", explanation: "sept 的 p 不发音，注意拼写。" },
                  { prompt: "12", answer: "douze", explanation: "douze，注意不是 deuze。" },
                  { prompt: "15", answer: "quinze", explanation: "quinze，qu 读 [k]。" },
                  { prompt: "20", answer: "vingt", explanation: "vingt 末尾 gt 不发音，读 [vɛ̃]。" },
                  { prompt: "17", answer: "dix-sept", explanation: "17 = 10 + 7，中间加连字符。" }
                ]
              },
              {
                type: "课堂指令理解",
                instruction: "把下列课堂指令翻译成中文，写出老师希望你做的动作。",
                items: [
                  { prompt: "Écoutez et répétez !", answer: "听，然后重复！", explanation: "TCF 考试题目中常用 Écoutez（听力题的指令）。" },
                  { prompt: "Associez les photos aux textes.", answer: "把图片和文字连线/匹配。", explanation: "Associez 是最常见的题目指令之一。" },
                  { prompt: "Vrai ou faux ?", answer: "对还是错？", explanation: "判断正误题，TCF 阅读和听力都大量使用。" },
                  { prompt: "Complétez avec les mots suivants.", answer: "用以下单词填空。", explanation: "Complétez = 填写/补全，suivants = 以下的。" }
                ]
              },
              {
                type: "情景写作",
                instruction: "写出下列情景中你会说的法语（1–2 句即可）。",
                items: [
                  {
                    prompt: "① 你在早上 9 点进教室，要向老师问好。",
                    modelAnswer: "Bonjour Madame / Monsieur !",
                    keyPoints: ["用 Bonjour（白天）", "对老师用正式称呼 Madame 或 Monsieur"]
                  },
                  {
                    prompt: "② 你没听懂老师说的话，想请他/她重复一遍。",
                    modelAnswer: "Pardon, je ne comprends pas. Vous pouvez répéter, s'il vous plaît ?",
                    keyPoints: ["Pardon 表示打扰/抱歉", "je ne comprends pas = 我不明白", "对老师用 vous"]
                  },
                  {
                    prompt: "③ 下课了，你和朋友 Emma 道别，说明天见。",
                    modelAnswer: "Salut Emma, à demain !",
                    keyPoints: ["朋友间用 Salut 道别", "à demain = 明天见"]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u1",
            code: "Unité 1",
            title: "Je suis…",
            focus: "自我介绍、个人信息、国籍语言、基础身份识别",
            lecture: {
              summary: "这是 Édito A1 最核心的单元。整个单元围绕一个场景：认识陌生人、介绍自己、交换联系方式。学完这一单元，你应该能在 speed-dating、语言交换 App、节日现场等真实场景中完成基础的自我介绍。这些场景直接对应 TCF Canada 听力和阅读中最常见的“身份信息识别”类题目。",
              canDo: [
                "用法语介绍自己的姓名、国籍、年龄、爱好",
                "询问别人叫什么名字、来自哪里、会说什么语言",
                "读懂简单的身份信息（护照、学生证、网站注册表）",
                "用 à / au / en / aux 正确表达城市和国家",
                "区分 tu 和 vous，选择合适的问候方式",
                "说出 32-100 的数字（用于年龄、电话号码）"
              ],
              grammarSections: [
                {
                  title: "三个核心动词：être / avoir / s'appeler（现在时完整变位）",
                  explanation: "这三个动词是法语最基础的工具，贯穿整个 A1。être 说身份和国籍，avoir 说年龄，s'appeler 说名字。注意 s'appeler 是代词式动词，变位时代词随主语变化。",
                  table: [
                    ["主语", "être（是）", "avoir（有/岁）", "s'appeler（叫）"],
                    ["je", "suis", "ai", "m'appelle"],
                    ["tu", "es", "as", "t'appelles"],
                    ["il / elle", "est", "a", "s'appelle"],
                    ["nous", "sommes", "avons", "nous appelons"],
                    ["vous", "êtes", "avez", "vous appelez"],
                    ["ils / elles", "sont", "ont", "s'appellent"]
                  ],
                  examples: [
                    { fr: "– Comment vous vous appelez ? – Je m'appelle Lars.", zh: "– 您叫什么名字？– 我叫 Lars。" },
                    { fr: "– Tu as quel âge ? – J'ai 23 ans.", zh: "– 你几岁？– 我 23 岁。" },
                    { fr: "– Tu es hollandais ? – Non, je suis italien.", zh: "– 你是荷兰人？– 不，我是意大利人。" },
                    { fr: "Elle s'appelle Sanae, elle est japonaise et elle a 23 ans.", zh: "她叫 Sanae，是日本人，23 岁。" }
                  ],
                  pitfall: "avoir 表示“几岁”时，中文说“我是23岁”，但法语必须用 avoir：J'ai 23 ans，绝对不能说 Je suis 23 ans！"
                },
                {
                  title: "国籍形容词：阴阳性变化规则",
                  explanation: "法语形容词要跟名词的性（阴/阳）一致。国籍形容词也不例外。基本规则：阳性→阴性一般加 -e；以 -ien/-éen 结尾的变成 -ienne/-éenne；本身以 -e 结尾的（belge, russe, suisse）阴阳同形。",
                  table: [
                    ["阳性（masculin）", "阴性（féminin）", "规则"],
                    ["français", "française", "加 e（结尾辅音发音）"],
                    ["chinois", "chinoise", "加 e"],
                    ["américain", "américaine", "加 e"],
                    ["allemand", "allemande", "加 e"],
                    ["espagnol", "espagnole", "加 e"],
                    ["italien", "italienne", "ien → ienne"],
                    ["coréen", "coréenne", "éen → éenne"],
                    ["tchèque", "tchèque", "已含 e，阴阳同形"],
                    ["belge", "belge", "已含 e，阴阳同形"],
                    ["grec", "grecque", "特殊变化"],
                    ["turc", "turque", "特殊变化"]
                  ],
                  examples: [
                    { fr: "Il est hollandais. / Elle est hollandaise.", zh: "他是荷兰人。/ 她是荷兰人。" },
                    { fr: "Il est italien. / Elle est italienne.", zh: "他是意大利人。/ 她是意大利人。" },
                    { fr: "Monsieur Diouf est sénégalais. / Madame Lambert est belge.", zh: "Diouf 先生是塞内加尔人。/ Lambert 女士是比利时人。" }
                  ],
                  pitfall: "法语口语里，阳性和阴性国籍形容词的发音有时相同（如 chinois/chinoise 都读 [ʃinwa]），有时不同（français [frɑ̃sɛ] / française [frɑ̃sɛz]）。TCF 听力题要注意末尾辅音是否发音！"
                },
                {
                  title: "城市与国家前的介词：à / au / en / aux",
                  explanation: "法语用不同介词表示“在某地/来自某地”，取决于地名的性和数。规律：城市前一律用 à；阳性国名用 au；阴性国名（通常以 -e 结尾）用 en；以元音开头的国名也用 en；复数国名用 aux。",
                  table: [
                    ["地名类型", "介词", "例子"],
                    ["城市", "à", "à Paris, à Tokyo, à Montréal"],
                    ["阳性国家", "au", "au Canada, au Japon, au Maroc"],
                    ["阴性国家（-e结尾）", "en", "en France, en Italie, en Chine"],
                    ["元音开头的国家", "en", "en Algérie, en Argentine, en Inde"],
                    ["复数国家", "aux", "aux États-Unis, aux Pays-Bas"]
                  ],
                  examples: [
                    { fr: "Il est né à Washington, aux États-Unis.", zh: "他出生于华盛顿，美国。" },
                    { fr: "Elle habite à Genève, en Suisse.", zh: "她住在日内瓦，瑞士。" },
                    { fr: "J'habite au Canada, à Montréal.", zh: "我住在加拿大蒙特利尔。" },
                    { fr: "Il est né en Argentine, en 1978.", zh: "他 1978 年出生于阿根廷。" }
                  ],
                  pitfall: "例外记住：le Mexique（墨西哥）虽以 -e 结尾，但是阳性，所以用 au Mexique，不用 en！"
                },
                {
                  title: "定冠词 le / la / l' / les 与疑问形容词 quel",
                  explanation: "法语定冠词用于泛指某类事物（如“音乐”“体育”等）。疑问形容词 quel 用来提问，须与所修饰名词的性数一致：quel（阳单）/ quelle（阴单）/ quels（阳复）/ quelles（阴复）。",
                  table: [
                    ["", "阳性单数", "阴性单数", "元音/h开头", "复数"],
                    ["定冠词", "le", "la", "l'", "les"],
                    ["quel", "quel", "quelle", "quel/quelle", "quels/quelles"]
                  ],
                  examples: [
                    { fr: "J'aime le cinéma, la musique et l'art.", zh: "我喜欢电影、音乐和艺术。" },
                    { fr: "Dans quelle ville tu habites ?", zh: "你住在哪个城市？" },
                    { fr: "Tu parles quelles langues ?", zh: "你会说哪些语言？" },
                    { fr: "Quel est ton numéro de téléphone ?", zh: "你的电话号码是多少？" }
                  ],
                  pitfall: "quel 后面接动词 être 时，性数仍跟后面的名词走：Quelle est ton adresse ?（adresse 阴性）/ Quel est ton âge ?（âge 阳性）"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "自我介绍：身份信息",
                  words: [
                    { fr: "le nom", zh: "姓（surname）", example: "Mon nom est Dupont." },
                    { fr: "le prénom", zh: "名（first name）", example: "Mon prénom est Marie." },
                    { fr: "la date de naissance", zh: "出生日期", example: "Ma date de naissance est le 3 mars 1998." },
                    { fr: "le lieu de naissance", zh: "出生地", example: "Mon lieu de naissance est Shanghai." },
                    { fr: "la nationalité", zh: "国籍", example: "Ma nationalité est chinoise." },
                    { fr: "la langue", zh: "语言", example: "Je parle deux langues : le chinois et le français." },
                    { fr: "l'adresse mail (f.)", zh: "邮筱地址", example: "Mon adresse mail est wang@gmail.com" },
                    { fr: "le numéro de téléphone", zh: "电话号码", example: "Mon numéro est le 06 12 34 56 78." }
                  ]
                },
                {
                  theme: "国家与国籍（高频词）",
                  words: [
                    { fr: "la France / français(e)", zh: "法国/法国人", example: "Elle est française, elle habite à Lyon." },
                    { fr: "le Canada / canadien(ne)", zh: "加拿大/加拿大人", example: "Il est canadien, il habite à Montréal." },
                    { fr: "la Chine / chinois(e)", zh: "中国/中国人", example: "Je suis chinoise, je parle chinois et français." },
                    { fr: "le Japon / japonais(e)", zh: "日本/日本人", example: "Elle est japonaise, elle s'appelle Sanae." },
                    { fr: "les États-Unis / américain(e)", zh: "美国/美国人", example: "Il est américain, il habite à New York." },
                    { fr: "l'Italie / italien(ne)", zh: "意大利/意大利人", example: "Il est italien, il aime l'art." },
                    { fr: "l'Allemagne / allemand(e)", zh: "德国/德国人", example: "Elle est allemande et elle parle français." },
                    { fr: "la Suisse / suisse", zh: "瑞士/瑞士人（阴阳同形）", example: "Il est suisse, il a 25 ans." },
                    { fr: "la Belgique / belge", zh: "比利时/比利时人（阴阳同形）", example: "Madame Lambert est belge." },
                    { fr: "le Maroc / marocain(e)", zh: "摩洛哥/摩洛哥人", example: "Vous êtes marocaine, madame ?" }
                  ]
                },
                {
                  theme: "爱好（les loisirs）",
                  words: [
                    { fr: "l'art (m.)", zh: "艺术", example: "J'aime l'art et le cinéma." },
                    { fr: "le cinéma", zh: "电影", example: "Tu aimes le cinéma ?" },
                    { fr: "la musique", zh: "音乐", example: "Elle aime la musique." },
                    { fr: "le sport", zh: "体育/运动", example: "Il aime le sport." },
                    { fr: "les langues (f.)", zh: "语言（作为爱好）", example: "J'aime les langues !" }
                  ]
                },
                {
                  theme: "数字 70–100（TCF 高频！）",
                  words: [
                    { fr: "70 → soixante-dix", zh: "60+10（不是 septante！）", example: "Il a soixante-dix ans." },
                    { fr: "71 → soixante et onze", zh: "60+11", example: "" },
                    { fr: "80 → quatre-vingts", zh: "4×20（注意末尾 s）", example: "Elle a quatre-vingts ans." },
                    { fr: "81 → quatre-vingt-un", zh: "4×20+1（无 s）", example: "Il a quatre-vingt-un ans." },
                    { fr: "90 → quatre-vingt-dix", zh: "4×20+10", example: "Elle a quatre-vingt-dix ans." },
                    { fr: "100 → cent", zh: "一百", example: "C'est cent euros." }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：身份信息词汇、三大核心动词变位（含否定）、国籍词阴阳性、数字 32–100。",
                groups: [
                  {
                    title: "核心词汇默写：身份信息",
                    type: "vocab",
                    items: [
                      { prompt: "姓（surname）", answer: "le nom", hint: "阳性" },
                      { prompt: "名（first name）", answer: "le prénom", hint: "阳性" },
                      { prompt: "出生日期", answer: "la date de naissance", hint: "阴性" },
                      { prompt: "出生地", answer: "le lieu de naissance", hint: "阳性" },
                      { prompt: "国籍", answer: "la nationalité", hint: "-té 结尾，阴性" },
                      { prompt: "语言", answer: "la langue", hint: "阴性" },
                      { prompt: "邮箱地址", answer: "l'adresse mail (f.)", hint: "元音开头，缩写 l'" },
                      { prompt: "电话号码", answer: "le numéro de téléphone", hint: "阳性" }
                    ]
                  },
                  {
                    title: "国籍词默写（阳性 / 阴性）",
                    type: "vocab",
                    items: [
                      { prompt: "法国人（阳）", answer: "français", hint: "-ais 结尾" },
                      { prompt: "法国人（阴）", answer: "française", hint: "加 e，末尾 s 发音" },
                      { prompt: "中国人（阳）", answer: "chinois", hint: "-ois 结尾" },
                      { prompt: "中国人（阴）", answer: "chinoise", hint: "加 e" },
                      { prompt: "日本人（阳）", answer: "japonais", hint: "-ais 结尾" },
                      { prompt: "日本人（阴）", answer: "japonaise", hint: "加 e" },
                      { prompt: "意大利人（阳）", answer: "italien", hint: "-ien 结尾" },
                      { prompt: "意大利人（阴）", answer: "italienne", hint: "-ien → -ienne" },
                      { prompt: "美国人（阳）", answer: "américain", hint: "-ain 结尾" },
                      { prompt: "美国人（阴）", answer: "américaine", hint: "加 e" }
                    ]
                  },
                  {
                    title: "动词变位默写：être / avoir / s'appeler",
                    type: "conjugation",
                    items: [
                      { prompt: "je + être", answer: "je suis", hint: "完全不规则" },
                      { prompt: "tu + être", answer: "tu es", hint: "" },
                      { prompt: "il + être", answer: "il est", hint: "" },
                      { prompt: "nous + être", answer: "nous sommes", hint: "记住 sommes" },
                      { prompt: "vous + être", answer: "vous êtes", hint: "注意 ê" },
                      { prompt: "ils + être", answer: "ils sont", hint: "" },
                      { prompt: "je + avoir", answer: "j'ai", hint: "元音前 je → j'" },
                      { prompt: "tu + avoir", answer: "tu as", hint: "" },
                      { prompt: "elle + avoir", answer: "elle a", hint: "" },
                      { prompt: "nous + avoir", answer: "nous avons", hint: "" },
                      { prompt: "vous + avoir", answer: "vous avez", hint: "" },
                      { prompt: "ils + avoir", answer: "ils ont", hint: "" },
                      { prompt: "je + s'appeler", answer: "je m'appelle", hint: "me → m' 在元音前" },
                      { prompt: "tu + s'appeler", answer: "tu t'appelles", hint: "te → t'" },
                      { prompt: "elle + s'appeler", answer: "elle s'appelle", hint: "" },
                      { prompt: "je + être（否定）", answer: "je ne suis pas", hint: "ne...pas 包夹动词" },
                      { prompt: "il + avoir（否定）", answer: "il n'a pas", hint: "ne → n' 在元音前" },
                      { prompt: "je + s'appeler（否定）", answer: "je ne m'appelle pas", hint: "否定包夹代词+动词" }
                    ]
                  },
                  {
                    title: "数字默写（32–100）",
                    type: "numbers",
                    items: [
                      { prompt: "32", answer: "trente-deux", hint: "trente + 数字" },
                      { prompt: "45", answer: "quarante-cinq", hint: "quarante + 数字" },
                      { prompt: "58", answer: "cinquante-huit", hint: "cinquante + 数字" },
                      { prompt: "61", answer: "soixante et un", hint: "61 加 et" },
                      { prompt: "70", answer: "soixante-dix", hint: "60+10" },
                      { prompt: "71", answer: "soixante et onze", hint: "60+11" },
                      { prompt: "80", answer: "quatre-vingts", hint: "4×20，末尾有 s" },
                      { prompt: "81", answer: "quatre-vingt-un", hint: "4×20+1，无 s" },
                      { prompt: "90", answer: "quatre-vingt-dix", hint: "4×20+10" },
                      { prompt: "91", answer: "quatre-vingt-onze", hint: "4×20+11" },
                      { prompt: "100", answer: "cent", hint: "" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点：节奏组（groupe rythmique）。法语的重音固定落在每个节奏组的最后一个音节。例：Je m'appelle / Enzo / je suis / italien（4个节奏组，4个重音）。注意与 en/aux 的联诵：en Italie [ɑ̃nitali]，aux États-Unis [ozɛtazyni]。",
              tcf: "TCF Canada 听力第一大题常考：两人相遇，听取身份信息（姓名、国籍、年龄、职业）。阅读常考：读一份简短的自我介绍或注册表，回答“此人来自哪里”“此人几岁”等。本单元的介词（à/au/en/aux）在阅读中也高频出现，需要能快速识别城市/国家对应关系。"
            },
            exercises: [
              {
                type: "填空题",
                instruction: "用 être、avoir 或 s'appeler 的正确形式填空。",
                items: [
                  { prompt: "Je _____ Léa et j'_____ 28 ans. Je _____ française.", answer: "m'appelle / ai / suis", explanation: "三个动词各司其职：姓名用 s'appeler，年龄用 avoir，国籍用 être。" },
                  { prompt: "– Comment vous _____ ? – Je _____ Sébastien Leroux.", answer: "vous appelez / m'appelle", explanation: "正式问句用 vous，回答用第一人称 je m'appelle。" },
                  { prompt: "Il _____ suisse et il _____ 25 ans.", answer: "est / a", explanation: "国籍用 être，年龄用 avoir。" },
                  { prompt: "Nous _____ étudiants et nous _____ les langues.", answer: "sommes / aimons", explanation: "sommes 是 être 第一人称复数；aimons 是 aimer 第一人称复数（-er 动词规则变位）。" }
                ]
              },
              {
                type: "国籍形容词变形",
                instruction: "根据主语性别，将括号内的国籍形容词变为正确形式。",
                items: [
                  { prompt: "Elle est (japonais) _____.", answer: "japonaise", explanation: "阳性 japonais 加 e → japonaise（结尾 s 开始发音）。" },
                  { prompt: "Il est (colombien) _____, Alberto ?", answer: "colombien", explanation: "主语是 il（阳性），保持 colombien 不变。" },
                  { prompt: "Madame Lambert est (belge) _____.", answer: "belge", explanation: "belge 以 -e 结尾，阴阳同形，无需改变。" },
                  { prompt: "Elle est (coréen) _____.", answer: "coréenne", explanation: "éen 结尾阳性 → éenne 结尾阴性：coréen → coréenne。" },
                  { prompt: "Vous êtes (marocain) _____, madame ?", answer: "marocaine", explanation: "对女性说话用 madame，形容词加 e：marocain → marocaine。" }
                ]
              },
              {
                type: "介词填空",
                instruction: "选择正确的介词：à / au / en / aux。",
                items: [
                  { prompt: "Elle est née _____ Sion, _____ Suisse.", answer: "à / en", explanation: "城市前用 à；la Suisse 是阴性国名，用 en。" },
                  { prompt: "Il habite _____ Philadelphie, _____ États-Unis.", answer: "à / aux", explanation: "城市前用 à；les États-Unis 是复数，用 aux。" },
                  { prompt: "Il est né _____ Argentine _____ 1978.", answer: "en / en", explanation: "l'Argentine 以元音开头，用 en；年份前也用 en。" },
                  { prompt: "J'habite _____ Canada, _____ Montréal.", answer: "au / à", explanation: "le Canada 是阳性，用 au；城市前用 à。" },
                  { prompt: "Hugo habite _____ Bogota, _____ Colombie.", answer: "à / en", explanation: "城市前 à；la Colombie 阴性，用 en。" }
                ]
              },
              {
                type: "改错题",
                instruction: "找出句子中的错误并改正，说明原因。",
                items: [
                  { prompt: "Il est italienne.", answer: "Il est italien.", explanation: "il 是阳性主语，形容词应用阳性 italien，不能用阴性 italienne。" },
                  { prompt: "J'ai française.", answer: "Je suis française.", explanation: "国籍/身份用 être，不用 avoir。avoir 表示“拥有”或“几岁”。" },
                  { prompt: "Elle habite à France.", answer: "Elle habite en France.", explanation: "国家名前不用 à，la France 是阴性国名，用 en France。" },
                  { prompt: "Quel est ton adresse mail ?", answer: "Quelle est ton adresse mail ?", explanation: "adresse 是阴性名词，quel 必须变为阴性 quelle。" },
                  { prompt: "Je suis 30 ans.", answer: "J'ai 30 ans.", explanation: "年龄用 avoir，不用 être。这是中法文化差异最大的地方之一！" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读下面的自我介绍，在每个空格填入最恰当的词（冠词、介词或动词变位形式）。",
                passage: "Bonjour ! Je (1)_____ Sanae et j'(2)_____ 23 ans. Je (3)_____ japonaise, je suis née (4)_____ Japon, (5)_____ Osaka. Maintenant, j'habite (6)_____ France, (7)_____ Paris. J'aime (8)_____ musique et (9)_____ langues. Je parle japonais, anglais et un peu (10)_____ français !",
                items: [
                  { blank: 1, answer: "m'appelle", explanation: "说名字用 s'appeler，第一人称：je m'appelle。" },
                  { blank: 2, answer: "ai", explanation: "说年龄用 avoir，第一人称：j'ai。" },
                  { blank: 3, answer: "suis", explanation: "说国籍用 être，第一人称：je suis。" },
                  { blank: 4, answer: "au", explanation: "le Japon 阳性国名，用 au。" },
                  { blank: 5, answer: "à", explanation: "城市名前用 à。" },
                  { blank: 6, answer: "en", explanation: "la France 阴性国名，用 en。" },
                  { blank: 7, answer: "à", explanation: "城市名前用 à。" },
                  { blank: 8, answer: "la", explanation: "la musique，阴性单数定冠词 la。" },
                  { blank: 9, answer: "les", explanation: "les langues，复数定冠词 les。" },
                  { blank: 10, answer: "de", explanation: "un peu de + 名词，表示“一点点……”。" }
                ]
              },
              {
                type: "表达练习",
                instruction: "仿照课本 Document B 的格式，用 40-60 个词写一段法语自我介绍（语言交换 App 风格）。包含：姓名、国籍、居住城市、年龄、两三个爱好。",
                items: [
                  {
                    prompt: "在语言交换 App「Duo」上写一段自我介绍，向法语母语者介绍自己。",
                    modelAnswer: "Salut ! Je m'appelle Wang Jing. Je suis chinoise, je suis née à Chengdu, en Chine, mais j'habite maintenant au Canada, à Montréal. J'ai 26 ans. J'aime la musique, le cinéma et les langues. Je parle chinois et un peu français. Et toi ?",
                    keyPoints: [
                      "姓名用 je m'appelle，不用 mon nom est（口语中不自然）",
                      "国籍形容词阴阳形式正确（中国女生：chinoise；男生：chinois）",
                      "城市/国家介词正确（au Canada, à Montréal, en Chine）",
                      "年龄用 j'ai … ans，不用 je suis … ans",
                      "爱好前有定冠词（j'aime la musique，不是 j'aime musique）",
                      "结尾用 Et toi ? 体现互动感，符合真实语境"
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u2",
            code: "Unité 2",
            title: "Près de moi",
            focus: "居住地点、兴趣爱好、家庭成员、职业",
            lecture: {
              summary: "这个单元把'我'的世界向外扩展：从介绍自己，到介绍我住在哪里、我喜欢什么、我的家人是谁、他们做什么工作。三个语法点（冠词系统、-er 动词变位、物主代词）是整个 A1 阶段最高频的语法工具，学透之后后面的单元会轻松很多。",
              canDo: [
                "说出自己住在哪里（城市、街区、公寓）",
                "表达喜欢、不喜欢、讨厌某事",
                "介绍家庭成员及其关系",
                "说出常见职业（区分阴阳性）",
                "使用物主代词（mon/ma/mes 等）正确描述'我的东西'"
              ],
              grammarSections: [
                {
                  title: "定冠词与不定冠词：区别与用法",
                  explanation: "法语名词前必须有冠词。不定冠词（un/une/des）用于第一次提到、泛指不特定事物；定冠词（le/la/l'/les）用于已知、特定事物，或泛指某类事物（如'我喜欢音乐'）。这是中国学生最难习惯的地方之一。",
                  table: [
                    ["", "阳性单数", "阴性单数", "元音/h开头", "复数"],
                    ["不定冠词", "un", "une", "un / une", "des"],
                    ["定冠词", "le", "la", "l'", "les"]
                  ],
                  examples: [
                    { fr: "Tu habites dans un quartier sympa ? — Oui, dans le quartier Saint-Jean.", zh: "你住在一个不错的街区吗？— 对，在圣让街区（特指）。" },
                    { fr: "J'habite dans une rue calme. C'est la rue Mantega.", zh: "我住在一条安静的街道上。就是曼特加街（特指）。" },
                    { fr: "J'aime la musique et le cinéma.", zh: "我喜欢音乐和电影。（泛指这类事物，用定冠词）" },
                    { fr: "Il y a des instruments de musique ici.", zh: "这里有一些乐器。（不特指哪些，用 des）" }
                  ],
                  pitfall: "说'我喜欢……'时，法语用定冠词（J'aime la musique），不用不定冠词（不能说 J'aime une musique）。但说'我有一把吉他'是第一次提到，用不定冠词（J'ai une guitare）。"
                },
                {
                  title: "-er 动词现在时变位（第一组规则动词）",
                  explanation: "法语中大多数动词以 -er 结尾，变位规律统一：去掉 -er 保留词干，再加对应人称的词尾。六个人称的词尾为：-e, -es, -e, -ons, -ez, -ent。注意：je 在元音前缩写为 j'；否定用 ne...pas 包夹动词。",
                  table: [
                    ["主语", "aimer（喜欢）", "habiter（住）", "détester（讨厌）"],
                    ["je / j'", "aime", "habite", "déteste"],
                    ["tu", "aimes", "habites", "détestes"],
                    ["il / elle / on", "aime", "habite", "déteste"],
                    ["nous", "aimons", "habitons", "détestons"],
                    ["vous", "aimez", "habitez", "détestez"],
                    ["ils / elles", "aiment", "habitent", "détestent"]
                  ],
                  examples: [
                    { fr: "J'adore le cinéma mais je déteste le ski.", zh: "我爱电影，但我讨厌滑雪。" },
                    { fr: "Manon n'aime pas la neige.", zh: "Manon 不喜欢雪。（否定：ne + 动词 + pas）" },
                    { fr: "Elles habitent en Angleterre, elles parlent bien anglais.", zh: "她们住在英国，英语说得很好。" },
                    { fr: "On = nous : On habite dans une rue calme.", zh: "on 通常等于 nous（我们住在一条安静的街上）。" }
                  ],
                  pitfall: "ils/elles aiment 的 -ent 结尾不发音！所以 il aime 和 ils aiment 口语发音完全相同，只有书写区别。这是法语听力的一大难点。"
                },
                {
                  title: "物主代词（adjectifs possessifs）完整表",
                  explanation: "物主代词用来表示'谁的'，必须跟后面名词的性和数保持一致，而不是跟所有者的性别一致。这是中文没有的概念，需要额外注意。",
                  table: [
                    ["所有者", "阳性单数", "阴性单数", "复数", "例子"],
                    ["je（我的）", "mon", "ma", "mes", "mon frère, ma sœur, mes parents"],
                    ["tu（你的）", "ton", "ta", "tes", "ton ami, ta cousine, tes enfants"],
                    ["il/elle（他/她的）", "son", "sa", "ses", "son père, sa mère, ses amis"],
                    ["nous（我们的）", "notre", "notre", "nos", "notre maison, nos amis"],
                    ["vous（你们/您的）", "votre", "votre", "vos", "votre appartement, vos cousins"],
                    ["ils/elles（他们的）", "leur", "leur", "leurs", "leur fils, leur fille, leurs enfants"]
                  ],
                  examples: [
                    { fr: "J'invite mes parents, ma grand-mère, mon frère.", zh: "我邀请我的父母、我的祖母、我的兄弟。" },
                    { fr: "Ta cousine Clara est libre ? — Oui, et son fils et sa fille aussi.", zh: "你的表妹 Clara 有空吗？— 有，她的儿子和女儿也有空。" },
                    { fr: "Il y a aussi nos amis Robin et Aya.", zh: "还有我们的朋友 Robin 和 Aya。" }
                  ],
                  pitfall: "当阴性名词以元音或哑音 h 开头时，用阳性物主代词 mon/ton/son 代替 ma/ta/sa，以避免两个元音相撞：mon amie（不是 ma amie）、ton adresse（不是 ta adresse）。"
                },
                {
                  title: "职业名词的阴阳性变化",
                  explanation: "职业名词和国籍形容词一样，也有阴阳之分。规律：-eur → -euse（coiffeur/coiffeuse）；-teur → -trice（acteur/actrice）；-ien → -ienne（informaticien/informaticienne）；-er → -ère（infirmier/infirmière）；以 -e 结尾阴阳同形（fleuriste, dentiste）；professeur/étudiant 有特殊阴性。",
                  table: [
                    ["阳性", "阴性", "规则"],
                    ["le coiffeur", "la coiffeuse", "-eur → -euse"],
                    ["l'acteur", "l'actrice", "-teur → -trice"],
                    ["l'informaticien", "l'informaticienne", "-ien → -ienne"],
                    ["l'infirmier", "l'infirmière", "-er → -ère"],
                    ["le fleuriste", "la fleuriste", "阴阳同形（-e结尾）"],
                    ["l'étudiant", "l'étudiante", "-t → -te"],
                    ["le professeur", "la professeure", "加 -e（书面语）"]
                  ],
                  examples: [
                    { fr: "Mon père est informaticien. Ma mère est professeure.", zh: "我父亲是程序员，我母亲是老师。" },
                    { fr: "Je suis infirmière et le père de Thomas est fleuriste.", zh: "我是护士，Thomas 的父亲是花艺师。" }
                  ],
                  pitfall: "médecin（医生）阴阳同形，不变：Elle est médecin. 不要说 Elle est médecine（那是'医学'这门学科）。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "居住相关词汇",
                  words: [
                    { fr: "l'appartement (m.)", zh: "公寓", example: "J'habite dans un appartement avec des amies." },
                    { fr: "le quartier", zh: "街区/社区", example: "Tu habites dans un quartier sympa ?" },
                    { fr: "la rue", zh: "街道", example: "On habite dans une rue calme." },
                    { fr: "la mer", zh: "大海", example: "À Nice, il y a la mer !" },
                    { fr: "la plage", zh: "沙滩", example: "Le quartier est à 8 minutes de la plage." },
                    { fr: "l'université (f.)", zh: "大学", example: "Tu es à l'université à Paris ?" }
                  ]
                },
                {
                  theme: "爱好与运动",
                  words: [
                    { fr: "la danse / danser", zh: "舞蹈/跳舞", example: "Tu aimes la danse ?" },
                    { fr: "la natation / nager", zh: "游泳", example: "Ils adorent nager." },
                    { fr: "le ski / skier", zh: "滑雪", example: "Elle déteste skier." },
                    { fr: "la marche / marcher", zh: "徒步/步行", example: "On fait de la marche le week-end." },
                    { fr: "la guitare", zh: "吉他", example: "J'ai une guitare." },
                    { fr: "le piano", zh: "钢琴", example: "Elle joue du piano." }
                  ]
                },
                {
                  theme: "家庭成员（la famille）",
                  words: [
                    { fr: "les parents", zh: "父母（双亲）", example: "J'invite mes parents." },
                    { fr: "le père / la mère", zh: "父亲/母亲", example: "Mon père est informaticien." },
                    { fr: "le frère / la sœur", zh: "兄弟/姐妹", example: "Je suis fils unique, je n'ai pas de frères et sœurs." },
                    { fr: "le fils / la fille", zh: "儿子/女儿", example: "Clara a un fils et une fille." },
                    { fr: "le grand-père / la grand-mère", zh: "祖父/祖母", example: "Ma grand-mère a 80 ans." },
                    { fr: "l'oncle (m.) / la tante", zh: "叔伯舅/姑姨", example: "Mon oncle Paul habite à Lyon." },
                    { fr: "le cousin / la cousine", zh: "表/堂兄弟姐妹", example: "Ma cousine Clara est libre ?" },
                    { fr: "le neveu / la nièce", zh: "侄子/侄女（外甥/甥女）", example: "Mon neveu a 2 mois !" },
                    { fr: "marié(e) / célibataire", zh: "已婚/单身", example: "Nessim n'est pas marié, il est célibataire." },
                    { fr: "fils/fille unique", zh: "独生子/独生女", example: "Théo est fils unique." }
                  ]
                },
                {
                  theme: "常见职业",
                  words: [
                    { fr: "l'étudiant(e)", zh: "学生", example: "Tu es étudiante, Barbara ?" },
                    { fr: "le/la professeur(e)", zh: "老师", example: "Ma mère est professeure." },
                    { fr: "l'infirmier / l'infirmière", zh: "护士", example: "Je suis infirmière." },
                    { fr: "l'informaticien(ne)", zh: "IT/程序员", example: "Mon père est informaticien." },
                    { fr: "le coiffeur / la coiffeuse", zh: "理发师", example: "Ana est coiffeuse." },
                    { fr: "l'acteur / l'actrice", zh: "演员", example: "Elle est actrice." },
                    { fr: "le/la fleuriste", zh: "花艺师（同形）", example: "Gabriel est fleuriste." }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：家庭成员、职业词（阴阳性对比）、-er 动词变位（含否定）、重要句型。",
                groups: [
                  {
                    title: "家庭成员词汇默写",
                    type: "vocab",
                    items: [
                      { prompt: "父母（双亲）", answer: "les parents", hint: "复数" },
                      { prompt: "父亲", answer: "le père", hint: "阳性" },
                      { prompt: "母亲", answer: "la mère", hint: "阴性" },
                      { prompt: "兄弟", answer: "le frère", hint: "阳性" },
                      { prompt: "姐妹", answer: "la sœur", hint: "注意 œ" },
                      { prompt: "儿子", answer: "le fils", hint: "ls 不发音" },
                      { prompt: "女儿", answer: "la fille", hint: "阴性" },
                      { prompt: "祖父", answer: "le grand-père", hint: "连字符" },
                      { prompt: "祖母", answer: "la grand-mère", hint: "连字符" },
                      { prompt: "表/堂兄弟（男）", answer: "le cousin", hint: "阳性" },
                      { prompt: "表/堂姐妹（女）", answer: "la cousine", hint: "加 e" }
                    ]
                  },
                  {
                    title: "职业词默写（阴阳性对比）",
                    type: "vocab",
                    items: [
                      { prompt: "理发师（男）", answer: "le coiffeur", hint: "-eur 结尾" },
                      { prompt: "理发师（女）", answer: "la coiffeuse", hint: "-eur → -euse" },
                      { prompt: "护士（男）", answer: "l'infirmier", hint: "-er 结尾" },
                      { prompt: "护士（女）", answer: "l'infirmière", hint: "-er → -ère" },
                      { prompt: "演员（男）", answer: "l'acteur", hint: "-teur 结尾" },
                      { prompt: "演员（女）", answer: "l'actrice", hint: "-teur → -trice" },
                      { prompt: "IT/程序员（男）", answer: "l'informaticien", hint: "-ien 结尾" },
                      { prompt: "IT/程序员（女）", answer: "l'informaticienne", hint: "-ien → -ienne" },
                      { prompt: "花艺师（阴阳同形）", answer: "le/la fleuriste", hint: "-e 结尾，不变" }
                    ]
                  },
                  {
                    title: "动词变位默写：aimer / habiter / détester",
                    type: "conjugation",
                    items: [
                      { prompt: "je + aimer", answer: "j'aime", hint: "元音前 je → j'" },
                      { prompt: "tu + aimer", answer: "tu aimes", hint: "加 -es" },
                      { prompt: "il + habiter", answer: "il habite", hint: "加 -e" },
                      { prompt: "nous + aimer", answer: "nous aimons", hint: "加 -ons" },
                      { prompt: "vous + habiter", answer: "vous habitez", hint: "加 -ez" },
                      { prompt: "ils + détester", answer: "ils détestent", hint: "-ent 不发音！" },
                      { prompt: "elle + aimer（否定）", answer: "elle n'aime pas", hint: "ne → n' 在元音前" },
                      { prompt: "ils + habiter（否定）", answer: "ils n'habitent pas", hint: "ne → n' 在元音前" },
                      { prompt: "je + détester（否定）", answer: "je ne déteste pas", hint: "ne...pas 包夹动词" }
                    ]
                  },
                  {
                    title: "重要句型默写",
                    type: "phrases",
                    items: [
                      { prompt: "我住在一个安静的街区。", answer: "J'habite dans un quartier calme.", hint: "habiter + dans + 冠词 + 名词" },
                      { prompt: "我父亲是工程师。（职业前无冠词）", answer: "Mon père est informaticien.", hint: "être + 职业，无冠词！" },
                      { prompt: "她不喜欢雪。（否定句）", answer: "Elle n'aime pas la neige.", hint: "ne → n' 在元音前" },
                      { prompt: "我的朋友 Sophie（阴性，元音开头）", answer: "mon amie Sophie", hint: "mon 替代 ma，避免元音相撞" },
                      { prompt: "她们住在英国。", answer: "Elles habitent en Angleterre.", hint: "Angleterre 阴性国名，用 en" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点：-er 动词的 -ent 结尾（ils/elles）不发音，造成口语中单数复数同音：il aime = ils aiment。另外注意与冠词/物主代词的联诵（liaison）：les enfants [lezɑ̃fɑ̃]、mes amis [mezami]、mon ami [mɔ̃nami]。联诵是法语流利度的关键。",
              tcf: "TCF Canada 阅读和听力常出现家庭关系、居住情况、职业信息等题材（如：读一封邮件，判断写信人的家庭情况）。物主代词在听力理解中非常关键，错误识别 son/sa 的指向会导致整道题判断错误。-er 动词是所有作文和口语的基础骨架。"
            },
            exercises: [
              {
                type: "冠词填空",
                instruction: "选择正确的冠词（un / une / des / le / la / l' / les）填入空格。",
                items: [
                  { prompt: "— C'est ___ université sur la photo ? — Oui, c'est ___ université Lumière.", answer: "une / l'", explanation: "第一次提到用 une；第二次特指（大学名字）用定冠词，因 université 以元音 u 开头，用 l'。" },
                  { prompt: "— Ah, vous avez ___ piano ici ? — Oui, c'est ___ piano de Mathieu.", answer: "un / le", explanation: "第一次提到未知的 piano 用 un；已知是 Mathieu 的那架，用 le。" },
                  { prompt: "J'aime ___ musique et ___ sport.", answer: "la / le", explanation: "泛指喜欢某类事物时用定冠词：la musique, le sport。" },
                  { prompt: "Il y a ___ instruments de musique dans cette pièce.", answer: "des", explanation: "des 是不定冠词复数，指'一些'不特定的乐器。" },
                  { prompt: "J'habite dans ___ rue calme. C'est ___ rue Mantega.", answer: "une / la", explanation: "une 初次提到；la 特指已知的那条街。" }
                ]
              },
              {
                type: "-er 动词变位",
                instruction: "将括号中的动词变位为正确形式。",
                items: [
                  { prompt: "Jeanne et toi, vous (skier) _____ ? Et vous (aimer) _____ marcher ?", answer: "skiez / aimez", explanation: "vous 对应 -ez 词尾：skiez, aimez。" },
                  { prompt: "Je (détester) _____ le sport mais j'(adorer) _____ la musique.", answer: "déteste / adore", explanation: "je 对应 -e 词尾；j' 用于元音开头的动词 adorer。" },
                  { prompt: "Elles (habiter) _____ en Angleterre, elles (parler) _____ bien anglais.", answer: "habitent / parlent", explanation: "elles 对应 -ent 词尾，口语不发音！" },
                  { prompt: "Tu (aimer) _____ la danse ? Tu (danser) _____ le rock ?", answer: "aimes / danses", explanation: "tu 对应 -es 词尾：aimes, danses。" },
                  { prompt: "Manon n'(aimer) _____ pas la neige.", answer: "aime", explanation: "否定句：ne + 动词 + pas，动词本身变位不变：n'aime pas。" }
                ]
              },
              {
                type: "物主代词填空",
                instruction: "根据括号中的所有者和后面名词的性数，填入正确的物主代词。",
                items: [
                  { prompt: "(Je) J'invite ___ parents, ___ grand-mère et ___ frère.", answer: "mes / ma / mon", explanation: "parents（复数）→ mes；grand-mère（阴性）→ ma；frère（阳性）→ mon。" },
                  { prompt: "(Tu) Ta cousine Clara est libre ? — Oui, ___ fils et ___ fille aussi.", answer: "son / sa", explanation: "son fils（阳性）/ sa fille（阴性）——物主代词跟名词性别一致，不跟 Clara 性别一致。" },
                  { prompt: "(Nous) Il y a aussi ___ amis Robin et Aya.", answer: "nos", explanation: "nos = 我们的（复数），amis 复数。" },
                  { prompt: "(Je, 阴性名词以元音开头) C'est ___ amie Sophie.", answer: "mon", explanation: "mon amie 而不是 ma amie！阴性名词以元音开头时，用 mon/ton/son 避免元音相撞。" },
                  { prompt: "(Ils) Sofa, ___ mari et ___ enfants sont invités.", answer: "son / ses", explanation: "son mari（阳性单）/ ses enfants（复数）。这里是 elle（Sofa）的丈夫和孩子，所以用 son/ses。" }
                ]
              },
              {
                type: "职业阴阳性变形",
                instruction: "将括号内的职业改为正确的阴性或阳性形式。",
                items: [
                  { prompt: "Maxime est coiffeur. Laure est _____.", answer: "coiffeuse", explanation: "-eur → -euse。" },
                  { prompt: "Élodie est infirmière. Jean est _____.", answer: "infirmier", explanation: "-ière → -ier（去掉 e）。" },
                  { prompt: "Gabriel est fleuriste. Florence est _____.", answer: "fleuriste", explanation: "以 -e 结尾，阴阳同形。" },
                  { prompt: "Manuelle est actrice. Xavier est _____.", answer: "acteur", explanation: "-trice → -teur。" },
                  { prompt: "Christine est étudiante. Pedro est _____.", answer: "étudiant", explanation: "-te → -t（去掉 e）。" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读这封邮件，在空格填入正确的词（冠词、物主代词、动词变位形式）。",
                passage: "Salut !\n(1)Ma femme, (2)___ enfants et moi (3)habitons à Ajaccio maintenant. Notre nouvelle maison est grande. (4)___ quartier est à 8 minutes de la plage.\nMarianne (5)___ (aimer) le métier d'infirmière. Siena et Max, eux, (6)___ (adorer) jouer de (7)___ guitare et voir (8)___ cousins mais ils n'aiment pas étudier (9)___ art.\nLe week-end, on (10)___ (faire) de la marche dans les villages voisins, c'est super !",
                items: [
                  { blank: 2, answer: "les", explanation: "les enfants = 孩子们（特指他/她的孩子），用定冠词复数。" },
                  { blank: 3, answer: "habitons", explanation: "nous（= ma femme, les enfants et moi）对应 -ons 词尾。" },
                  { blank: 4, answer: "Le", explanation: "已知特定的街区，用定冠词 Le（quartier 阳性）。" },
                  { blank: 5, answer: "aime", explanation: "Marianne 是第三人称单数，aimer → aime。" },
                  { blank: 6, answer: "adorent", explanation: "Siena et Max = ils，adorent（-ent 结尾不发音）。" },
                  { blank: 7, answer: "la", explanation: "la guitare，阴性定冠词。" },
                  { blank: 8, answer: "leurs", explanation: "leurs cousins = 他们的表兄弟（复数），leur + s。" },
                  { blank: 9, answer: "l'", explanation: "l'art，art 以元音 a 开头，定冠词缩写为 l'。" },
                  { blank: 10, answer: "fait", explanation: "on = nous，对应第三人称单数变位 fait（faire 不规则动词）。" }
                ]
              },
              {
                type: "表达练习",
                instruction: "用 50-70 个词写一封简短的邮件，介绍你目前的生活状态。包含：你住在哪里（城市/街区/类型）、你的爱好（至少两种）、你的一位家人及其职业。",
                items: [
                  {
                    prompt: "你的法语笔友 Victoire 想了解你现在的生活，给她写封邮件。",
                    modelAnswer: "Salut Victoire !\nMaintenant, j'habite à Montréal, dans un appartement sympa. Mon quartier est calme et il y a beaucoup de cafés. J'adore la musique et je joue de la guitare le soir. J'aime aussi marcher dans le quartier.\nMon frère habite avec moi. Il est informaticien. Et toi, tu habites où ?\nBises !",
                    keyPoints: [
                      "居住地点用正确介词（à + 城市，dans + un/une + 名词）",
                      "爱好前有定冠词（j'adore la musique，不是 j'adore musique）",
                      "动词 jouer + de + 定冠词 + 乐器（jouer de la guitare）",
                      "物主代词正确（Mon frère，阳性单数用 mon）",
                      "职业不加冠词：Il est informaticien（不是 Il est un informaticien）",
                      "邮件结尾用 Bises（朋友间）或 Cordialement（正式）"
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u3",
            code: "Unité 3",
            title: "Qu’est-ce qu’on mange ?",
            focus: "食物、点餐、价格、数量、餐馆场景",
            lecture: {
              summary: "这一单元非常实用，和听力里的生活场景重合度很高。",
              canDo: ["点餐、询价", "表达想吃什么", "理解简单菜单"],
              grammar: ["部分冠词", "数量表达", "aller / faire / acheter"],
              vocabulary: ["aliments, boissons, dessert", "restaurant, serveur, addition", "un peu de, beaucoup de"],
              tcf: "适合价格、菜单、日常消费类听读。"
            },
            exercises: [
              { type: "填空", prompt: "Je prends _____ café et _____ croissant.", answer: "un / un" },
              { type: "改错", prompt: "Corrigez : Je voudrais de eau.", answer: "Je voudrais de l'eau." },
              { type: "表达", prompt: "写一段在咖啡馆点单的 3 句对话。", answer: "示例含 Je voudrais..., C'est combien ?, Merci." }
            ]
          },
          {
            id: "a1-u4",
            code: "Unité 4",
            title: "C’est où ?",
            focus: "城市、方位、交通、问路指路、路线理解",
            lecture: {
              summary: "问路和看路线是 TCF Canada 听阅很典型的任务场景。",
              canDo: ["问地点在哪儿", "理解路线指令", "说交通方式"],
              grammar: ["命令式基础", "地点介词", "频率副词"],
              vocabulary: ["à gauche, à droite, tout droit", "métro, bus, gare", "quartier, monument"],
              tcf: "适合路线类听力和城市信息类阅读。"
            },
            exercises: [
              { type: "填空", prompt: "La banque est _____ droite de la poste.", answer: "à" },
              { type: "选择", prompt: "“一直走”对应哪一句？ A. Tournez. B. Allez tout droit.", answer: "B. Allez tout droit." },
              { type: "表达", prompt: "写两句给别人指路。", answer: "示例：Prenez le bus. Tournez à gauche." }
            ]
          },
          {
            id: "a1-u5",
            code: "Unité 5",
            title: "C’est tendance !",
            focus: "衣物、天气、物品描述、购物和实用表达",
            lecture: {
              summary: "购物、天气、描述物品在口语和阅读里都很高频。",
              canDo: ["描述衣物和颜色", "询问尺码", "谈论天气和简单计划"],
              grammar: ["近未来时", "指示形容词", "形容词位置"],
              vocabulary: ["vêtements, couleurs, météo", "chaud, froid, joli", "taille, pointure"],
              tcf: "适合购物和天气类情景题。"
            },
            exercises: [
              { type: "填空", prompt: "Cette robe est _____ et il fait _____.", answer: "bleue / froid" },
              { type: "改错", prompt: "Corrigez : Je vais acheter ce chaussures.", answer: "Je vais acheter ces chaussures." },
              { type: "表达", prompt: "写 3 句话描述你今天穿什么和天气怎样。", answer: "开放题，检查颜色和天气表达。" }
            ]
          },
          {
            id: "a1-u6",
            code: "Unité 6",
            title: "Qu’est-ce qu’on fait aujourd’hui ?",
            focus: "日程、时间、活动安排、邀约与回应",
            lecture: {
              summary: "从这里开始，你会更频繁用法语安排一天的活动。",
              canDo: ["说时间", "发出邀约", "接受或拒绝建议"],
              grammar: ["现在时补充", "过去最近时", "频率副词扩展"],
              vocabulary: ["heure, rendez-vous, sortie", "cinéma, musée, sport", "accepter, refuser"],
              tcf: "适合活动安排、时间信息、邀约场景听力。"
            },
            exercises: [
              { type: "填空", prompt: "Il est six heures et demie. On _____ au cinéma ?", answer: "va" },
              { type: "选择", prompt: "拒绝邀约更合适的是？ A. Oui, avec plaisir. B. Désolé, je ne peux pas.", answer: "B. Désolé, je ne peux pas." },
              { type: "表达", prompt: "写一个邀请朋友周末出门的 3 句小对话。", answer: "开放题，检查时间和邀约表达。" }
            ]
          },
          {
            id: "a1-u7",
            code: "Unité 7",
            title: "Chez moi !",
            focus: "住房、家具、合租规则、居家问题与说明",
            lecture: {
              summary: "住房和公告类文本很适合拿来做阅读基础训练。",
              canDo: ["描述房间和家具", "说明家中问题", "理解简单居住规则"],
              grammar: ["地点介词扩展", "COD 代词 le/la/les", "义务和禁止基础"],
              vocabulary: ["appartement, cuisine, salle de bains", "meuble, lit, table", "interdit, réparation"],
              tcf: "适合租房启事、居住规则、报修场景。"
            },
            exercises: [
              { type: "填空", prompt: "La table est _____ la cuisine.", answer: "dans" },
              { type: "改错", prompt: "Corrigez : Je le cherche mes clés.", answer: "Je cherche mes clés. / Je les cherche." },
              { type: "表达", prompt: "用 4 句话描述你的房间或理想住房。", answer: "开放题，检查房间词汇和位置表达。" }
            ]
          },
          {
            id: "a1-u8",
            code: "Unité 8",
            title: "En forme !",
            focus: "身体、健康、症状、建议、运动与情绪表达",
            lecture: {
              summary: "健康是很典型的生活主题，也常和建议句型一起考。",
              canDo: ["描述不舒服", "说身体部位", "给出简单建议"],
              grammar: ["passé composé 入门", "devoir 表示义务", "建议表达"],
              vocabulary: ["tête, ventre, dos", "maladie, médecin, médicament", "être fatigué, stressé"],
              tcf: "适合看病、建议、健康提示类材料。"
            },
            exercises: [
              { type: "填空", prompt: "J'ai mal _____ tête. Tu dois _____ médecin.", answer: "à la / voir un" },
              { type: "选择", prompt: "给建议哪句更自然？ A. Tu dois te reposer. B. Tu reposes.", answer: "A. Tu dois te reposer." },
              { type: "表达", prompt: "写 3 句说明你不舒服并向朋友求建议。", answer: "开放题，检查症状和建议表达。" }
            ]
          },
          {
            id: "a1-u9",
            code: "Unité 9",
            title: "Bonnes vacances !",
            focus: "旅游、订房、地点描述、比较与过去经历",
            lecture: {
              summary: "旅行类词汇和场景在 TCF 阅读里很常见，也适合做说明文练习。",
              canDo: ["询问酒店信息", "描述旅行地", "写简单明信片"],
              grammar: ["比较级", "地点介词扩展", "être + aller 的过去时基础"],
              vocabulary: ["voyage, hôtel, réservation", "mer, montagne, ville", "plus... que, moins... que"],
              tcf: "适合旅游广告、酒店信息、行程安排类阅读。"
            },
            exercises: [
              { type: "填空", prompt: "Paris est _____ grand _____ ma ville.", answer: "plus / que" },
              { type: "改错", prompt: "Corrigez : Je suis allé à Canada.", answer: "Je suis allé au Canada." },
              { type: "表达", prompt: "写一张 4 句法语明信片。", answer: "开放题，检查地点、天气、活动表达。" }
            ]
          },
          {
            id: "a1-u10",
            code: "Unité 10",
            title: "Au travail !",
            focus: "学习、工作、能力、职业计划与基础输出",
            lecture: {
              summary: "A1 末尾把学习和工作场景串起来，是衔接 A2 的重要一步。",
              canDo: ["说专业、工作和能力", "描述简单职业目标", "介绍学习环境"],
              grammar: ["COD/COI 基础延伸", "持续时间表达", "关系代词 qui / que 入门"],
              vocabulary: ["études, université, métier", "compétence, projet, équipe", "ordinateur, bureau, campus"],
              tcf: "适合学校和工作信息类短文、介绍类口语。"
            },
            exercises: [
              { type: "填空", prompt: "Je veux travailler _____ une école internationale.", answer: "dans" },
              { type: "选择", prompt: "介绍能力时更自然的是？ A. Je peux travailler en équipe. B. Je suis équipe.", answer: "A. Je peux travailler en équipe." },
              { type: "表达", prompt: "写 4 句介绍你的学习或工作计划。", answer: "开放题，检查项目和能力表达。" }
            ]
          }
        ]
      },
      {
        level: "Édito A2",
        caption: "A2 继续扩大输入，开始为 TCF 听力和阅读的任务型理解做准备。",
        units: [
          {
            id: "a2-u1",
            code: "Unité 1",
            title: "Nouvelles vies",
            focus: "人生经历、兴趣、外出活动、否定结构和时间表达",
            lecture: {
              summary: "A2 的起点是会讲经历，会说过去到现在的变化。",
              canDo: ["谈论个人经历", "表达从前到现在的变化", "提议活动并回应"],
              grammar: ["否定结构 ne... rien / jamais / plus", "depuis / pendant / il y a", "参与过去分词识别"],
              vocabulary: ["parcours, formation, sortie", "loisirs, activité, culture", "commencer, continuer"],
              tcf: "适合人物经历和时间顺序类听读。"
            },
            exercises: [
              { type: "填空", prompt: "Je n'ai _____ visité Paris.", answer: "jamais" },
              { type: "改错", prompt: "Corrigez : J'étudie le français depuis trois mois il y a.", answer: "J'étudie le français depuis trois mois." },
              { type: "表达", prompt: "用 4 句介绍你最近一年学习上的变化。", answer: "开放题，检查时间表达。" }
            ]
          },
          {
            id: "a2-u2",
            code: "Unité 2",
            title: "Je me souviens",
            focus: "回忆、感受、天气风景、形容记忆与过去体验",
            lecture: {
              summary: "这个单元非常适合做“过去经历 + 情感反应”的训练。",
              canDo: ["谈回忆和感受", "描述景色与天气", "讲一段简单过去体验"],
              grammar: ["y / en 基础", "形容词位置", "过去经历表达"],
              vocabulary: ["souvenir, enfance, vacances", "mer, montagne, météo", "joyeux, triste, calme"],
              tcf: "适合回忆类叙述和景物描写阅读。"
            },
            exercises: [
              { type: "填空", prompt: "Je me souviens _____ mes vacances d'enfance.", answer: "de" },
              { type: "选择", prompt: "表示“我去过那儿”的正确句子是？ A. J'y suis allé. B. Je en suis allé.", answer: "A. J'y suis allé." },
              { type: "表达", prompt: "写 4 句回忆一次让你开心的旅行。", answer: "开放题，检查过去体验和情感表达。" }
            ]
          },
          {
            id: "a2-u3",
            code: "Unité 3",
            title: "Comme à la maison",
            focus: "租房、住房条件、比较、条件表达和生活环境",
            lecture: {
              summary: "从 A1 的住房词汇升级到比较和条件表达。",
              canDo: ["比较两个住房", "表达理想条件", "理解房屋广告信息"],
              grammar: ["比较级扩展", "关系代词 qui / que / où", "条件句 si"],
              vocabulary: ["location, colocation, quartier", "services, charges, voisinage", "calme, pratique, lumineux"],
              tcf: "适合租房广告、生活环境类阅读。"
            },
            exercises: [
              { type: "填空", prompt: "Cet appartement est plus _____ que l'autre.", answer: "grand / calme 等合理形容词" },
              { type: "改错", prompt: "Corrigez : Si j'ai un grand appartement, je invite mes amis.", answer: "Si j'ai un grand appartement, j'invite mes amis." },
              { type: "表达", prompt: "写 4 句说明你理想住房的条件。", answer: "开放题，检查条件和比较表达。" }
            ]
          },
          {
            id: "a2-u4",
            code: "Unité 4",
            title: "Tous pareils, tous différents",
            focus: "外貌性格、评价、比较与人物描述",
            lecture: {
              summary: "人物描述是 A2 很实用的写作和口语训练入口。",
              canDo: ["描述外貌和性格", "表达欣赏或评价", "比较两个人物"],
              grammar: ["不定形容词", "物主代词", "相似与不同表达"],
              vocabulary: ["visage, caractère, défaut, qualité", "généreux, timide, drôle", "ressembler à"],
              tcf: "适合人物介绍和描述性短文。"
            },
            exercises: [
              { type: "填空", prompt: "Elle est très gentille, mais _____ peu timide.", answer: "un / un peu" },
              { type: "选择", prompt: "“每个人都有优点”更接近： A. Chaque personne a des qualités. B. Tout personne a des qualités.", answer: "A. Chaque personne a des qualités." },
              { type: "表达", prompt: "用 4 句描述一个你熟悉的人。", answer: "开放题，检查外貌和性格词汇。" }
            ]
          },
          {
            id: "a2-u5",
            code: "Unité 5",
            title: "En route vers le futur !",
            focus: "未来、科技、功能用途、希望与条件句",
            lecture: {
              summary: "科技和未来类文本非常适合训练 A2 阅读。",
              canDo: ["表达希望和设想", "说物品用途", "谈未来生活变化"],
              grammar: ["条件句 si", "on 的泛指用法", "不规则动词识别"],
              vocabulary: ["innovation, technologie, machine", "servir à, permettre de", "avenir, progrès"],
              tcf: "适合科技新闻和说明文。"
            },
            exercises: [
              { type: "填空", prompt: "Ce téléphone sert _____ apprendre le français.", answer: "à" },
              { type: "改错", prompt: "Corrigez : Si il fait beau, on sortira.", answer: "S'il fait beau, on sortira." },
              { type: "表达", prompt: "写 4 句想象 10 年后的学习方式。", answer: "开放题，检查未来和用途表达。" }
            ]
          },
          {
            id: "a2-u6",
            code: "Unité 6",
            title: "En cuisine",
            focus: "做饭、餐馆、满意与不满、限制和指令表达",
            lecture: {
              summary: "饮食主题从 A1 的点餐升级到说明步骤和表达评价。",
              canDo: ["写简单菜谱步骤", "在餐厅表达满意或不满", "理解厨房指令"],
              grammar: ["en 代词", "义务和禁止", "ne... que"],
              vocabulary: ["recette, cuisson, épices", "restaurant, serveur, plat", "délicieux, trop salé"],
              tcf: "适合说明步骤和餐馆评价类材料。"
            },
            exercises: [
              { type: "填空", prompt: "Je n'aime _____ les plats trop salés.", answer: "que / pas du tout，根据句意可扩展" },
              { type: "选择", prompt: "表达不满意更自然的是？ A. Ce plat est bon. B. Ce plat est trop froid.", answer: "B. Ce plat est trop froid." },
              { type: "表达", prompt: "写一个 4 步的简单食谱。", answer: "开放题，检查命令和步骤表达。" }
            ]
          },
          {
            id: "a2-u7",
            code: "Unité 7",
            title: "À votre santé !",
            focus: "健康问题、看病、观点表达、身体与急救场景",
            lecture: {
              summary: "这个单元会把健康主题推进到“能解释问题和表达看法”。",
              canDo: ["描述症状和感受", "表达自己的观点", "理解基本医疗建议"],
              grammar: ["COD / COI 代词", "最高级", "疑问代词"],
              vocabulary: ["douleur, urgence, médicament", "mieux, pire, le plus", "conseiller, consulter"],
              tcf: "适合健康信息、说明和建议类听读。"
            },
            exercises: [
              { type: "填空", prompt: "C'est le médicament le plus _____ pour moi.", answer: "utile / efficace" },
              { type: "改错", prompt: "Corrigez : Je lui vois demain chez le médecin.", answer: "Je le vois demain chez le médecin." },
              { type: "表达", prompt: "写 4 句说明你的健康问题并表达你的看法。", answer: "开放题，检查症状和观点表达。" }
            ]
          },
          {
            id: "a2-u8",
            code: "Unité 8",
            title: "Dans les médias",
            focus: "新闻媒体、评价、信息来源、观点和批判性理解",
            lecture: {
              summary: "媒体主题很适合练 TCF 阅读里的观点和信息识别。",
              canDo: ["说明从哪里获取信息", "评价媒体内容", "表达兴趣和不信任"],
              grammar: ["结果和原因表达", "subjonctif 入门", "COD / COI 位置"],
              vocabulary: ["médias, réseaux sociaux, podcast", "article, reportage, info", "fiable, intéressant, utile"],
              tcf: "适合新闻摘要和观点类阅读。"
            },
            exercises: [
              { type: "填空", prompt: "Je regarde ce podcast parce qu'il est très _____.", answer: "intéressant / utile" },
              { type: "选择", prompt: "表达“我希望媒体更清楚”更接近哪句？ A. J'espère que les médias soient clairs. B. Je souhaite que les médias soient plus clairs.", answer: "B. Je souhaite que les médias soient plus clairs." },
              { type: "表达", prompt: "写 4 句说说你平时怎么获取信息。", answer: "开放题，检查媒体词汇和原因表达。" }
            ]
          },
          {
            id: "a2-u9",
            code: "Unité 9",
            title: "Consommer responsable",
            focus: "消费、服务、建议、环保与日常社会话题",
            lecture: {
              summary: "这类社会性日常主题，和 TCF Canada 的阅读材料很接近。",
              canDo: ["提出建议", "请求帮助", "谈论环保消费"],
              grammar: ["条件式现在时", "副动词", "条件式用法扩展"],
              vocabulary: ["réparer, recycler, acheter", "service, aide, échange", "écologique, durable"],
              tcf: "适合建议型、服务型、社会生活类材料。"
            },
            exercises: [
              { type: "填空", prompt: "On peut économiser de l'argent _____ réparant ses objets.", answer: "en" },
              { type: "改错", prompt: "Corrigez : Je voudrais de l'aide, peux-tu de m'aider ?", answer: "Je voudrais de l'aide, peux-tu m'aider ?" },
              { type: "表达", prompt: "写 4 句介绍一种你觉得更环保的消费方式。", answer: "开放题，检查建议和环保词汇。" }
            ]
          },
          {
            id: "a2-u10",
            code: "Unité 10",
            title: "Envies d’ailleurs ?",
            focus: "旅行咨询、游记叙述、过去时组合和旅游表达",
            lecture: {
              summary: "旅行主题在 A2 需要能讲经历，也要能问清信息。",
              canDo: ["咨询旅行安排", "讲一段旅行经历", "写简单旅行博客"],
              grammar: ["passé composé 和 imparfait 配合", "过去分词配合基础", "指示代词"],
              vocabulary: ["voyage, séjour, tourisme", "visite guidée, site, hébergement", "agacé, ravi, curieux"],
              tcf: "适合旅游说明、游记和咨询对话。"
            },
            exercises: [
              { type: "填空", prompt: "Quand je suis arrivé, il _____ déjà nuit.", answer: "faisait" },
              { type: "选择", prompt: "“那家酒店”可替换为： A. celui hôtel B. cet hôtel / celui-là selon contexte", answer: "根据语境可用 cet hôtel 或 celui-là。" },
              { type: "表达", prompt: "写 5 句讲一次你想去的旅行。", answer: "开放题，检查过去/未来旅行表达。" }
            ]
          },
          {
            id: "a2-u11",
            code: "Unité 11",
            title: "De jolis parcours",
            focus: "学习经历、求职、正式信息、职业规划与感谢表达",
            lecture: {
              summary: "这一单元会更接近现实中的简历、邮件、求职场景。",
              canDo: ["谈学习经历", "写正式信息", "说职业目标和感谢"],
              grammar: ["直接引语转述入门", "COI y", "表达显而易见"],
              vocabulary: ["CV, diplôme, entretien", "emploi, secteur, compétence", "remercier, postuler"],
              tcf: "适合正式信息、工作和学习类文本。"
            },
            exercises: [
              { type: "填空", prompt: "Je vous remercie _____ votre réponse.", answer: "pour" },
              { type: "改错", prompt: "Corrigez : J'ai besoin y réfléchir.", answer: "J'ai besoin d'y réfléchir." },
              { type: "表达", prompt: "写一则简短正式留言，表达感谢并说明你的计划。", answer: "开放题，检查正式语气。" }
            ]
          },
          {
            id: "a2-u12",
            code: "Unité 12",
            title: "Soif de nature",
            focus: "环境、动物、能力、目的和被动表达",
            lecture: {
              summary: "A2 末尾会接触更公共议题的语言材料。",
              canDo: ["谈环境问题", "表达能力和目的", "理解简单被动句"],
              grammar: ["目的表达", "被动态入门", "否定中的代词"],
              vocabulary: ["nature, pollution, environnement", "protéger, agir, participer", "animal, forêt, planète"],
              tcf: "适合环保宣传、公共议题短文、倡议类文本。"
            },
            exercises: [
              { type: "填空", prompt: "Nous trions les déchets _____ protéger la planète.", answer: "pour" },
              { type: "选择", prompt: "“这些动物受保护”更接近： A. Ces animaux protègent. B. Ces animaux sont protégés.", answer: "B. Ces animaux sont protégés." },
              { type: "表达", prompt: "写 4 句介绍你能为环境做什么。", answer: "开放题，检查能力和目的表达。" }
            ]
          }
        ]
      }
    ],
    tcfBridge: {
      title: "与 TCF Canada 的连接方式",
      items: [
        "A1 会优先关联身份信息、时间数字、地点路线、消费、住房、健康、工作等生活场景题。",
        "A2 会优先关联经历、比较、建议、媒体、旅游、消费、环境等更完整的任务型听读材料。",
        "后续每个单元都会继续拆成更细的知识点，再和真题题号建立映射。"
      ]
    }
  },

  questionBank: {
    title: "题库中心",
    stats: [
      { label: "阅读文件", value: "40+" },
      { label: "听力文件", value: "2700+" },
      { label: "题型覆盖", value: "听阅写说" }
    ],
    modules: [
      { name: "听力", description: "按音频、文本、级别和题号管理，支持学后自动匹配。" },
      { name: "阅读", description: "按 PDF 套题管理，后续拆成单题并标知识点。" },
      { name: "口语", description: "整理题卡、任务类型、答题框架和常用模板。" },
      { name: "写作", description: "整理任务要求、题目场景、评分点和优秀范式。" }
    ],
    flows: [
      "按知识点反查题目：学了某个语法点后，直接看到对应题。",
      "按能力刷题：只练听力、阅读，适合你当前优先级。",
      "按错题重练：所有错题按错因自动聚合。",
      "按阶段推荐：基础阶段只推不会过度打击信心的题目。"
    ]
  },

  mistakes: {
    title: "错题复盘",
    categories: ["词汇不认识", "语法规则没掌握", "听力辨音不清", "阅读定位不准", "审题错误", "输出表达不足"],
    loop: [
      "做题后自动进入错题池",
      "系统给错题打错因标签",
      "24 小时后先做一次短复习",
      "72 小时后做相似题再练",
      "一周后做综合回顾"
    ]
  },

  youtube: {
    title: "YouTube 补充学习",
    cards: [
      { title: "输入视频链接", body: "后续可粘贴 YouTube 课程链接，自动生成本节总结、讲义和练习。" },
      { title: "挂到知识点下面", body: "视频不是孤立收藏，而是作为某个知识点的补充解释资源。" },
      { title: "卡住时补讲", body: "如果某个语法点没学懂，系统就推荐更适合的补充视频。" }
    ]
  }
};
