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
              summary: "这一单元从‘会认菜单’升级到‘能完成一次点餐’。你会系统掌握部分冠词、数量表达和餐馆高频句型，不再只会背单词，而是能在真实场景里说出完整句子。学完后你可以处理最常见的餐饮沟通：点主食、点饮料、问价格、要账单。",
              canDo: [
                "看懂菜单里的基础食物和饮料词",
                "用 Je voudrais / Je prends 完成简单点餐",
                "正确使用 du / de la / de l' / des 表达‘吃/喝一些’",
                "在否定句里把冠词改为 de / d'",
                "用 un peu de / beaucoup de / un kilo de 表达数量",
                "在餐馆场景里询价、确认和礼貌结束对话"
              ],
              grammarSections: [
                {
                  title: "部分冠词：du / de la / de l' / des",
                  explanation: "当你表达‘吃一些、喝一些’时，法语通常用部分冠词。它不强调具体数量，而是表示‘一部分’。名词的性数和首字母决定你要选哪一种形式。",
                  table: [
                    ["名词类型", "冠词", "例子"],
                    ["阳性单数", "du", "du pain"],
                    ["阴性单数", "de la", "de la soupe"],
                    ["元音或哑音 h 开头", "de l'", "de l'eau"],
                    ["复数", "des", "des légumes"]
                  ],
                  examples: [
                    { fr: "Je prends du café et de la salade.", zh: "我要咖啡和沙拉。" },
                    { fr: "Il boit de l'eau.", zh: "他喝水。" },
                    { fr: "Nous achetons des fruits.", zh: "我们买一些水果。" },
                    { fr: "Tu manges du riz ce soir ?", zh: "你今晚吃米饭吗？" }
                  ],
                  pitfall: "中文里常直接说‘我喝水’，但法语不能写 Je bois eau，必须加冠词：Je bois de l'eau。"
                },
                {
                  title: "否定句里的 de / d'",
                  explanation: "很多名词在否定句里会把 du / de la / de l' / des 统一改成 de 或 d'。记忆方式很简单：ne...pas 包起来后，名词前优先想 de。",
                  table: [
                    ["肯定句", "否定句", "变化"],
                    ["Je prends du café.", "Je ne prends pas de café.", "du → de"],
                    ["Elle boit de la soupe.", "Elle ne boit pas de soupe.", "de la → de"],
                    ["Il boit de l'eau.", "Il ne boit pas d'eau.", "de l' → d'"],
                    ["Nous achetons des fruits.", "Nous n'achetons pas de fruits.", "des → de"]
                  ],
                  examples: [
                    { fr: "Je veux du dessert, mais je ne veux pas de sucre.", zh: "我想要甜点，但我不想要糖。" },
                    { fr: "Elle prend de l'eau, elle ne prend pas d'alcool.", zh: "她喝水，不喝酒。" },
                    { fr: "Ils mangent des pâtes, ils ne mangent pas de pain.", zh: "他们吃意面，不吃面包。" }
                  ],
                  pitfall: "最常见错误是把否定句还写成 du/de la/des。看到 ne...pas，就先检查名词前是不是 de/d'。"
                },
                {
                  title: "数量表达：un peu de / beaucoup de / un kilo de",
                  explanation: "只要前面出现数量或程度表达，后面通常都接 de + 名词。这个规则比背词更重要，因为它在购物、点餐、描述饮食习惯时反复出现。",
                  table: [
                    ["表达", "中文", "例子"],
                    ["un peu de", "一点", "un peu de fromage"],
                    ["beaucoup de", "很多", "beaucoup de légumes"],
                    ["un kilo de", "一公斤", "un kilo de pommes"],
                    ["une bouteille de", "一瓶", "une bouteille de jus"],
                    ["un verre de", "一杯", "un verre d'eau"]
                  ],
                  examples: [
                    { fr: "Je prends un peu de riz.", zh: "我要一点米饭。" },
                    { fr: "Nous achetons beaucoup de fruits.", zh: "我们买很多水果。" },
                    { fr: "Il veut une bouteille de jus d'orange.", zh: "他想要一瓶橙汁。" }
                  ],
                  pitfall: "不要写 beaucoup du pain、un kilo des tomates。数量表达后统一用 de。"
                },
                {
                  title: "点餐核心句型：Je voudrais / Je prends / C'est combien ?",
                  explanation: "餐馆里最实用的是固定句型。A1 阶段先把礼貌、清晰、能完成任务放在第一位，不追求复杂句。先会这几句，真实场景就够用了。",
                  table: [
                    ["功能", "法语表达", "说明"],
                    ["礼貌点单", "Je voudrais...", "比 Je veux 更礼貌"],
                    ["直接下单", "Je prends...", "口语很常见"],
                    ["询问价格", "C'est combien ?", "最常用问价句"],
                    ["请求账单", "L'addition, s'il vous plaît.", "结账高频句"],
                    ["表达不要", "Je ne prends pas...", "否定点单"]
                  ],
                  examples: [
                    { fr: "Bonjour, je voudrais un café et un croissant, s'il vous plaît.", zh: "您好，我想要一杯咖啡和一个可颂，谢谢。" },
                    { fr: "Je prends le menu du jour.", zh: "我要今日套餐。" },
                    { fr: "C'est combien ?", zh: "这个多少钱？" },
                    { fr: "L'addition, s'il vous plaît.", zh: "请给我账单。" }
                  ],
                  pitfall: "点餐时一直用 Je veux 会显得太直接，考试和真实场景都更推荐 Je voudrais。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "主食与常见食物",
                  words: [
                    { fr: "le pain", zh: "面包", example: "Je mange du pain le matin.", exampleZh: "我早上吃面包。" },
                    { fr: "le riz", zh: "米饭", example: "Il prend du riz et du poulet.", exampleZh: "他吃米饭和鸡肉。" },
                    { fr: "les pâtes (f.)", zh: "意面", example: "Nous aimons les pâtes.", exampleZh: "我们喜欢意面。" },
                    { fr: "le poulet", zh: "鸡肉", example: "Elle ne mange pas de poulet.", exampleZh: "她不吃鸡肉。" },
                    { fr: "le poisson", zh: "鱼", example: "Je prends du poisson ce soir.", exampleZh: "我今晚点鱼。" },
                    { fr: "la soupe", zh: "汤", example: "Tu veux de la soupe ?", exampleZh: "你想要汤吗？" },
                    { fr: "la salade", zh: "沙拉", example: "Je prends une salade.", exampleZh: "我要一份沙拉。" },
                    { fr: "le fromage", zh: "奶酪", example: "Il y a du fromage dans la salade.", exampleZh: "沙拉里有奶酪。" }
                  ]
                },
                {
                  theme: "饮料与甜点",
                  words: [
                    { fr: "le café", zh: "咖啡", example: "Je voudrais un café.", exampleZh: "我想要一杯咖啡。" },
                    { fr: "le thé", zh: "茶", example: "Elle boit du thé.", exampleZh: "她喝茶。" },
                    { fr: "l'eau (f.)", zh: "水", example: "Donnez-moi de l'eau, s'il vous plaît.", exampleZh: "请给我一点水。" },
                    { fr: "le jus d'orange", zh: "橙汁", example: "Je prends un jus d'orange.", exampleZh: "我要一杯橙汁。" },
                    { fr: "le lait", zh: "牛奶", example: "Il boit du lait.", exampleZh: "他喝牛奶。" },
                    { fr: "le dessert", zh: "甜点", example: "Nous prenons un dessert.", exampleZh: "我们要一份甜点。" },
                    { fr: "le gâteau", zh: "蛋糕", example: "Tu aimes le gâteau au chocolat ?", exampleZh: "你喜欢巧克力蛋糕吗？" },
                    { fr: "la glace", zh: "冰淇淋", example: "En été, elle mange de la glace.", exampleZh: "夏天她吃冰淇淋。" }
                  ]
                },
                {
                  theme: "餐馆场景词汇",
                  words: [
                    { fr: "le restaurant", zh: "餐馆", example: "On va au restaurant ce soir.", exampleZh: "我们今晚去餐馆。" },
                    { fr: "le café", zh: "咖啡馆", example: "Le café est près de la gare.", exampleZh: "这家咖啡馆在火车站附近。" },
                    { fr: "le serveur / la serveuse", zh: "服务员", example: "Le serveur apporte la carte.", exampleZh: "服务员拿来了菜单。" },
                    { fr: "la carte", zh: "菜单", example: "Je lis la carte.", exampleZh: "我在看菜单。" },
                    { fr: "le menu", zh: "套餐/菜单", example: "Je prends le menu du jour.", exampleZh: "我要今日套餐。" },
                    { fr: "le plat", zh: "菜品", example: "Ce plat est très bon.", exampleZh: "这道菜很好吃。" },
                    { fr: "l'addition (f.)", zh: "账单", example: "L'addition, s'il vous plaît.", exampleZh: "请给我账单。" },
                    { fr: "la réservation", zh: "预订", example: "J'ai une réservation pour deux personnes.", exampleZh: "我订了两个人的位置。" }
                  ]
                },
                {
                  theme: "数量与购买表达",
                  words: [
                    { fr: "un peu de", zh: "一点", example: "Je veux un peu de sucre.", exampleZh: "我想要一点糖。" },
                    { fr: "beaucoup de", zh: "很多", example: "Il mange beaucoup de légumes.", exampleZh: "他吃很多蔬菜。" },
                    { fr: "un kilo de", zh: "一公斤", example: "Je prends un kilo de tomates.", exampleZh: "我要一公斤西红柿。" },
                    { fr: "une bouteille de", zh: "一瓶", example: "Nous achetons une bouteille d'eau.", exampleZh: "我们买一瓶水。" },
                    { fr: "un verre de", zh: "一杯", example: "Je prends un verre de jus.", exampleZh: "我要一杯果汁。" },
                    { fr: "combien", zh: "多少/多少钱", example: "C'est combien ?", exampleZh: "这个多少钱？" },
                    { fr: "coûter", zh: "花费/价值", example: "Ce plat coûte 12 euros.", exampleZh: "这道菜12欧元。" },
                    { fr: "payer", zh: "付款", example: "Je paie par carte.", exampleZh: "我刷卡付款。" }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：食物饮料词、部分冠词、数量表达、点餐句型。",
                groups: [
                  {
                    title: "核心词汇默写：食物与饮料",
                    type: "vocab",
                    items: [
                      { prompt: "面包", answer: "le pain", hint: "阳性" },
                      { prompt: "米饭", answer: "le riz", hint: "阳性" },
                      { prompt: "沙拉", answer: "la salade", hint: "阴性" },
                      { prompt: "汤", answer: "la soupe", hint: "阴性" },
                      { prompt: "奶酪", answer: "le fromage", hint: "阳性" },
                      { prompt: "咖啡", answer: "le café", hint: "阳性" },
                      { prompt: "茶", answer: "le thé", hint: "阳性" },
                      { prompt: "水", answer: "l'eau (f.)", hint: "元音开头" },
                      { prompt: "橙汁", answer: "le jus d'orange", hint: "de + 水果" },
                      { prompt: "账单", answer: "l'addition (f.)", hint: "点餐高频" }
                    ]
                  },
                  {
                    title: "部分冠词默写",
                    type: "vocab",
                    items: [
                      { prompt: "一些面包", answer: "du pain", hint: "阳性单数" },
                      { prompt: "一些汤", answer: "de la soupe", hint: "阴性单数" },
                      { prompt: "一些水", answer: "de l'eau", hint: "元音开头" },
                      { prompt: "一些蔬菜", answer: "des légumes", hint: "复数" },
                      { prompt: "我不要咖啡", answer: "je ne prends pas de café", hint: "否定用 de" },
                      { prompt: "她不喝水", answer: "elle ne boit pas d'eau", hint: "de → d'" }
                    ]
                  },
                  {
                    title: "数量表达默写",
                    type: "phrases",
                    items: [
                      { prompt: "一点奶酪", answer: "un peu de fromage", hint: "数量后用 de" },
                      { prompt: "很多水果", answer: "beaucoup de fruits", hint: "固定搭配" },
                      { prompt: "一公斤西红柿", answer: "un kilo de tomates", hint: "kilo de" },
                      { prompt: "一瓶水", answer: "une bouteille d'eau", hint: "de + 元音" },
                      { prompt: "一杯橙汁", answer: "un verre de jus d'orange", hint: "verre de" },
                      { prompt: "我想要一点米饭", answer: "Je voudrais un peu de riz.", hint: "voudrais 更礼貌" }
                    ]
                  },
                  {
                    title: "点餐句型默写",
                    type: "phrases",
                    items: [
                      { prompt: "我想要一杯咖啡。", answer: "Je voudrais un café.", hint: "礼貌点单" },
                      { prompt: "我要今日套餐。", answer: "Je prends le menu du jour.", hint: "prendre" },
                      { prompt: "这个多少钱？", answer: "C'est combien ?", hint: "问价" },
                      { prompt: "请给我账单。", answer: "L'addition, s'il vous plaît.", hint: "结账" },
                      { prompt: "我不想要甜点。", answer: "Je ne prends pas de dessert.", hint: "否定用 de" },
                      { prompt: "我要两杯茶。", answer: "Je prends deux thés.", hint: "复数" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点发音：1）de l'eau、d'orange 这类缩合要连读顺；2）café、thé、riz 词尾发音与拼写不总一致；3）餐馆里说句子时保持节奏组，不要一个词一个词断开。建议把 Je voudrais... / L'addition... 作为固定语块整句跟读。",
              tcf: "TCF Canada 听力里，餐馆和消费场景是高频：点单、问价、结账、偏好表达都会出现。阅读里常见菜单和短公告，重点是快速识别食物词、价格数字和否定信息（不要什么）。"
            },
            exercises: [
              {
                type: "冠词填空",
                instruction: "根据名词性数与首字母，填入 du / de la / de l' / des。",
                items: [
                  { prompt: "Je prends _____ pain et _____ soupe.", answer: "du / de la", explanation: "pain 阳性单数用 du；soupe 阴性单数用 de la。" },
                  { prompt: "Elle boit _____ eau et il mange _____ légumes.", answer: "de l' / des", explanation: "eau 元音开头用 de l'；légumes 复数用 des。" },
                  { prompt: "Nous achetons _____ fromage et _____ fruits.", answer: "du / des", explanation: "fromage 阳性单数；fruits 复数。" },
                  { prompt: "Tu veux _____ salade ou _____ riz ?", answer: "de la / du", explanation: "salade 阴性；riz 阳性。" },
                  { prompt: "Ils commandent _____ jus d'orange.", answer: "du", explanation: "jus 阳性单数，用 du。" }
                ]
              },
              {
                type: "数量表达填空",
                instruction: "选择最合适的数量表达填空：un peu de / beaucoup de / un kilo de / une bouteille de / un verre de。",
                items: [
                  { prompt: "Je prends _____ tomates pour la salade.", answer: "un kilo de", explanation: "表示重量用 un kilo de。" },
                  { prompt: "Elle boit _____ eau après le sport.", answer: "un verre d'eau", explanation: "un verre de + eau 写作 d'eau。" },
                  { prompt: "Nous voulons _____ légumes, pas seulement deux carottes.", answer: "beaucoup de", explanation: "表示数量很多用 beaucoup de。" },
                  { prompt: "Il met _____ sucre dans le café.", answer: "un peu de", explanation: "表示一点点用 un peu de。" },
                  { prompt: "Je commande _____ jus d'orange pour la table.", answer: "une bouteille de", explanation: "表示一整瓶饮料用 une bouteille de。" }
                ]
              },
              {
                type: "改错题",
                instruction: "找出句子中的错误并改正，说明原因。",
                items: [
                  { prompt: "Je voudrais de eau.", answer: "Je voudrais de l'eau.", explanation: "eau 元音开头，de + l'。" },
                  { prompt: "Je ne prends pas du café.", answer: "Je ne prends pas de café.", explanation: "否定句里 du 变 de。" },
                  { prompt: "Nous achetons beaucoup du pain.", answer: "Nous achetons beaucoup de pain.", explanation: "数量表达后统一用 de。" },
                  { prompt: "L'addition je voudrais.", answer: "Je voudrais l'addition.", explanation: "法语陈述句一般主语在前。" },
                  { prompt: "Il boit des eau.", answer: "Il boit de l'eau.", explanation: "eau 不可数，常用 de l'eau。" }
                ]
              },
              {
                type: "连线匹配",
                instruction: "把左列情境和右列最合适的表达连线（选择对应选项）。",
                options: [
                  "a. Je voudrais un café, s'il vous plaît.",
                  "b. C'est combien ?",
                  "c. L'addition, s'il vous plaît.",
                  "d. Je ne prends pas de dessert."
                ],
                items: [
                  { prompt: "① 你准备礼貌地点一杯咖啡", answer: "a. Je voudrais un café, s'il vous plaît.", explanation: "礼貌点单首选 Je voudrais..." },
                  { prompt: "② 你想问这道菜多少钱", answer: "b. C'est combien ?", explanation: "最常用问价句。" },
                  { prompt: "③ 吃完准备结账", answer: "c. L'addition, s'il vous plaît.", explanation: "固定结账表达。" },
                  { prompt: "④ 你明确表示不要甜点", answer: "d. Je ne prends pas de dessert.", explanation: "否定点单，dessert 前用 de。" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读下面的点餐对话，在每个空格填入最恰当的词（冠词、数量表达或动词形式）。",
                passage: "Au café: Bonjour, je (1)_____ un café et un croissant, s'il vous plaît. Je prends aussi (2)_____ eau. — D'accord. Vous voulez (3)_____ dessert ? — Non, je ne prends pas (4)_____ dessert. — Très bien. Et pour votre amie ? — Elle veut (5)_____ soupe et (6)_____ salade. — Vous prenez (7)_____ sucre avec le café ? — Oui, un peu (8)_____. — Voilà. (9)_____ ? — Oui, c'est combien ? — Ça fait 14 euros. — Merci, et (10)_____, s'il vous plaît.",
                items: [
                  { blank: 1, answer: "voudrais", explanation: "礼貌点单常用 Je voudrais。" },
                  { blank: 2, answer: "de l'", explanation: "eau 元音开头，用 de l'。" },
                  { blank: 3, answer: "un", explanation: "dessert 可数单数，点一个用 un。" },
                  { blank: 4, answer: "de", explanation: "否定句里名词前用 de。" },
                  { blank: 5, answer: "de la", explanation: "soupe 阴性单数，用 de la。" },
                  { blank: 6, answer: "une", explanation: "salade 可数单数，点一份用 une。" },
                  { blank: 7, answer: "du", explanation: "sucre 阳性单数，用 du。" },
                  { blank: 8, answer: "de sucre", explanation: "un peu de + 名词。" },
                  { blank: 9, answer: "C'est tout", explanation: "服务场景里常用 C'est tout ? = 就这些吗？" },
                  { blank: 10, answer: "l'addition", explanation: "结账固定表达：l'addition, s'il vous plaît。" }
                ]
              },
              {
                type: "表达练习",
                instruction: "根据场景写 40-60 个词的点餐对话，至少包含：1种主食、1种饮料、1次问价、1次结账表达。",
                items: [
                  {
                    prompt: "你和朋友在咖啡馆点餐，请写一段简短对话（40-60词）。",
                    modelAnswer: "Bonjour, je voudrais un café et une salade, s'il vous plaît. Mon amie prend un jus d'orange et un croissant. Nous ne prenons pas de dessert. C'est combien pour tout ? D'accord, merci. L'addition, s'il vous plaît.",
                    keyPoints: [
                      "使用 Je voudrais / Je prends 完成点单",
                      "食物前冠词正确（une salade, un croissant）",
                      "否定句用 de（pas de dessert）",
                      "包含问价句 C'est combien ?",
                      "包含结账句 L'addition, s'il vous plaît",
                      "整体长度控制在 40-60 词"
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u4",
            code: "Unité 4",
            title: "C’est où ?",
            focus: "城市、方位、交通、问路指路、路线理解",
            lecture: {
              summary: "这一单元解决一个真实高频任务：问路和指路。你会把‘地点词’和‘动作词’组合成完整路线句，不再只会说左和右。学完后你可以在地铁站、街区、商场等场景里问清目的地并给出基础路线说明。",
              canDo: [
                "用 Où est... ? / C'est où ? 提问地点",
                "用 à gauche de / en face de / près de 等表达位置关系",
                "用 Allez / Tournez / Prenez 给出基础路线指令",
                "描述常见交通方式（à pied / en bus / en métro）",
                "听懂并复述两到三步的路线说明",
                "完成 TCF 常见的城市路线类听读任务"
              ],
              grammarSections: [
                {
                  title: "地点介词与方位短语",
                  explanation: "问路题最核心是位置关系。法语里不是只背单词，而是要背‘介词短语’：à gauche de、en face de、près de 等。先掌握这组固定搭配，路线句就能快速拼出来。",
                  table: [
                    ["表达", "中文", "例句"],
                    ["à gauche de", "在……左边", "La banque est à gauche de la poste."],
                    ["à droite de", "在……右边", "Le café est à droite de la gare."],
                    ["en face de", "在……对面", "La pharmacie est en face du parc."],
                    ["près de", "在……附近", "Le musée est près de la station."],
                    ["loin de", "离……远", "Le supermarché est loin d'ici."],
                    ["entre ... et ...", "在……和……之间", "La mairie est entre la banque et l'école."]
                  ],
                  examples: [
                    { fr: "La gare est en face de l'hôpital.", zh: "火车站在医院对面。" },
                    { fr: "Le musée est près de la rivière.", zh: "博物馆在河边附近。" },
                    { fr: "La boulangerie est à droite de la pharmacie.", zh: "面包店在药店右边。" }
                  ],
                  pitfall: "不要把汉语直译成 en gauche / en droite。法语固定说法是 à gauche / à droite。"
                },
                {
                  title: "问路高频句型：Où est... ? / Comment aller à... ?",
                  explanation: "问路时你需要先发问，再确认信息。A1 阶段先掌握三类句：问地点、问路线、问距离。句子短但非常高频，听力和口语都会反复出现。",
                  table: [
                    ["功能", "法语表达", "场景"],
                    ["问地点", "Où est la gare ?", "找具体地点"],
                    ["口语问法", "C'est où, le musée ?", "更口语"],
                    ["问怎么去", "Comment aller à la poste ?", "问路线"],
                    ["问远近", "C'est loin ?", "确认距离"],
                    ["确认是否正确", "C'est bien ici ?", "二次确认"]
                  ],
                  examples: [
                    { fr: "Excusez-moi, où est la station de métro ?", zh: "打扰一下，地铁站在哪里？" },
                    { fr: "Comment aller à la bibliothèque, s'il vous plaît ?", zh: "请问去图书馆怎么走？" },
                    { fr: "C'est loin d'ici ?", zh: "离这里远吗？" }
                  ],
                  pitfall: "问路对陌生人优先用 vous 场景（Excusez-moi, s'il vous plaît），不要一上来用 tu。"
                },
                {
                  title: "命令式指路：Allez / Tournez / Prenez",
                  explanation: "给路线时最常见的是命令式。你可以把它理解成‘导航语气’：直走、左转、坐地铁。A1 先掌握 vous 形式最实用，因为问路对象多为陌生人。",
                  table: [
                    ["动词原形", "vous 命令式", "例句"],
                    ["aller", "allez", "Allez tout droit."],
                    ["tourner", "tournez", "Tournez à gauche."],
                    ["prendre", "prenez", "Prenez la ligne 1."],
                    ["continuer", "continuez", "Continuez jusqu'au carrefour."],
                    ["traverser", "traversez", "Traversez la rue."]
                  ],
                  examples: [
                    { fr: "Allez tout droit, puis tournez à droite.", zh: "一直走，然后右转。" },
                    { fr: "Prenez le métro ligne 2.", zh: "乘坐2号地铁线。" },
                    { fr: "Traversez le pont et continuez tout droit.", zh: "过桥后继续直走。" }
                  ],
                  pitfall: "命令式是‘指令’，和直陈式不同：Vous tournez（你们在转弯）≠ Tournez（请转弯）。"
                },
                {
                  title: "交通方式表达：à pied / en bus / en métro / en voiture",
                  explanation: "说路线时常要补充交通方式。最常用规则：步行用 à pied；其他常见交通工具多用 en + 名词。把这个规则和路线动词合起来，就能组成完整指路句。",
                  table: [
                    ["方式", "法语", "例句"],
                    ["步行", "à pied", "On va à pied."],
                    ["公交", "en bus", "Vous allez en bus."],
                    ["地铁", "en métro", "Je vais en métro."],
                    ["汽车", "en voiture", "Il vient en voiture."],
                    ["自行车", "à vélo", "Elle va à vélo."]
                  ],
                  examples: [
                    { fr: "La gare est proche, vous pouvez y aller à pied.", zh: "火车站很近，您可以步行去。" },
                    { fr: "Pour le centre-ville, prenez le bus 12.", zh: "去市中心请坐12路公交。" },
                    { fr: "Je vais au travail en métro.", zh: "我坐地铁上班。" }
                  ],
                  pitfall: "不要把所有交通方式都套成 à。常见搭配是 en bus/en métro/en voiture，只有 à pied/à vélo 是 à。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "方位与路线词",
                  words: [
                    { fr: "à gauche", zh: "向左/在左边", example: "Tournez à gauche au feu.", exampleZh: "到红绿灯处左转。" },
                    { fr: "à droite", zh: "向右/在右边", example: "La poste est à droite.", exampleZh: "邮局在右边。" },
                    { fr: "tout droit", zh: "一直走", example: "Allez tout droit pendant 5 minutes.", exampleZh: "一直直走5分钟。" },
                    { fr: "en face de", zh: "在……对面", example: "Le café est en face de la gare.", exampleZh: "咖啡馆在火车站对面。" },
                    { fr: "près de", zh: "在……附近", example: "J'habite près du parc.", exampleZh: "我住在公园附近。" },
                    { fr: "loin de", zh: "离……远", example: "L'école est loin d'ici.", exampleZh: "学校离这里很远。" },
                    { fr: "entre ... et ...", zh: "在……和……之间", example: "La banque est entre la poste et la mairie.", exampleZh: "银行在邮局和市政厅之间。" },
                    { fr: "au coin de", zh: "在……拐角", example: "La boulangerie est au coin de la rue.", exampleZh: "面包店在街角。" }
                  ]
                },
                {
                  theme: "城市常见地点",
                  words: [
                    { fr: "la gare", zh: "火车站", example: "La gare est près d'ici.", exampleZh: "火车站离这里很近。" },
                    { fr: "la station de métro", zh: "地铁站", example: "Où est la station de métro ?", exampleZh: "地铁站在哪里？" },
                    { fr: "la poste", zh: "邮局", example: "Je vais à la poste.", exampleZh: "我去邮局。" },
                    { fr: "la banque", zh: "银行", example: "La banque ouvre à neuf heures.", exampleZh: "银行九点开门。" },
                    { fr: "la pharmacie", zh: "药店", example: "La pharmacie est en face du musée.", exampleZh: "药店在博物馆对面。" },
                    { fr: "le musée", zh: "博物馆", example: "Le musée est à gauche de l'hôtel.", exampleZh: "博物馆在酒店左边。" },
                    { fr: "l'hôpital (m.)", zh: "医院", example: "L'hôpital est loin du centre.", exampleZh: "医院离市中心很远。" },
                    { fr: "le supermarché", zh: "超市", example: "Le supermarché est près de la mairie.", exampleZh: "超市在市政厅附近。" }
                  ]
                },
                {
                  theme: "交通方式",
                  words: [
                    { fr: "le bus", zh: "公交车", example: "Prenez le bus 7.", exampleZh: "请坐7路公交车。" },
                    { fr: "le métro", zh: "地铁", example: "Je vais en métro.", exampleZh: "我坐地铁去。" },
                    { fr: "le taxi", zh: "出租车", example: "On prend un taxi ?", exampleZh: "我们打车吗？" },
                    { fr: "la voiture", zh: "汽车", example: "Ils viennent en voiture.", exampleZh: "他们开车来。" },
                    { fr: "le vélo", zh: "自行车", example: "Elle va au travail à vélo.", exampleZh: "她骑自行车去上班。" },
                    { fr: "à pied", zh: "步行", example: "C'est près, allez-y à pied.", exampleZh: "很近，走路去吧。" },
                    { fr: "la ligne", zh: "线路", example: "Prenez la ligne 1.", exampleZh: "请坐1号线。" },
                    { fr: "l'arrêt (m.)", zh: "站点", example: "Descendez à cet arrêt.", exampleZh: "请在这一站下车。" }
                  ]
                },
                {
                  theme: "问路与指路常用表达",
                  words: [
                    { fr: "Où est ... ?", zh: "……在哪里？", example: "Où est la mairie ?", exampleZh: "市政厅在哪里？" },
                    { fr: "C'est où ?", zh: "……在哪？", example: "C'est où, la gare ?", exampleZh: "火车站在哪儿？" },
                    { fr: "Comment aller à ... ?", zh: "怎么去……？", example: "Comment aller au musée ?", exampleZh: "怎么去博物馆？" },
                    { fr: "tourner", zh: "转弯", example: "Tournez à droite.", exampleZh: "右转。" },
                    { fr: "prendre", zh: "乘坐/走（某路）", example: "Prenez la rue Victor-Hugo.", exampleZh: "走维克多·雨果街。" },
                    { fr: "continuer", zh: "继续", example: "Continuez tout droit.", exampleZh: "继续直走。" },
                    { fr: "traverser", zh: "穿过", example: "Traversez la rue.", exampleZh: "过马路。" },
                    { fr: "jusqu'à", zh: "直到", example: "Allez jusqu'à la place centrale.", exampleZh: "一直走到中央广场。" }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：方位词、地点词、路线动词、问路指路句型。",
                groups: [
                  {
                    title: "方位词默写",
                    type: "vocab",
                    items: [
                      { prompt: "在左边", answer: "à gauche", hint: "固定搭配" },
                      { prompt: "在右边", answer: "à droite", hint: "固定搭配" },
                      { prompt: "一直走", answer: "tout droit", hint: "路线高频" },
                      { prompt: "在……对面", answer: "en face de", hint: "介词短语" },
                      { prompt: "在……附近", answer: "près de", hint: "介词短语" },
                      { prompt: "离……远", answer: "loin de", hint: "介词短语" },
                      { prompt: "在……和……之间", answer: "entre ... et ...", hint: "双对象" },
                      { prompt: "在拐角处", answer: "au coin de", hint: "路线常见" }
                    ]
                  },
                  {
                    title: "地点词默写",
                    type: "vocab",
                    items: [
                      { prompt: "火车站", answer: "la gare", hint: "阴性" },
                      { prompt: "地铁站", answer: "la station de métro", hint: "阴性" },
                      { prompt: "邮局", answer: "la poste", hint: "阴性" },
                      { prompt: "银行", answer: "la banque", hint: "阴性" },
                      { prompt: "药店", answer: "la pharmacie", hint: "阴性" },
                      { prompt: "博物馆", answer: "le musée", hint: "阳性" },
                      { prompt: "医院", answer: "l'hôpital (m.)", hint: "元音开头" },
                      { prompt: "超市", answer: "le supermarché", hint: "阳性" }
                    ]
                  },
                  {
                    title: "路线动词默写（命令式）",
                    type: "conjugation",
                    items: [
                      { prompt: "vous + aller（命令式）", answer: "allez", hint: "导航高频" },
                      { prompt: "vous + tourner（命令式）", answer: "tournez", hint: "加 -ez" },
                      { prompt: "vous + prendre（命令式）", answer: "prenez", hint: "不规则词干" },
                      { prompt: "vous + continuer（命令式）", answer: "continuez", hint: "加 -ez" },
                      { prompt: "vous + traverser（命令式）", answer: "traversez", hint: "加 -ez" },
                      { prompt: "tu + aller（命令式）", answer: "va", hint: "去掉 s" },
                      { prompt: "nous + aller（命令式）", answer: "allons", hint: "一起走" }
                    ]
                  },
                  {
                    title: "问路与指路句型默写",
                    type: "phrases",
                    items: [
                      { prompt: "请问，火车站在哪里？", answer: "Excusez-moi, où est la gare ?", hint: "礼貌开头" },
                      { prompt: "请问怎么去博物馆？", answer: "Comment aller au musée, s'il vous plaît ?", hint: "au + 阳性" },
                      { prompt: "一直走，然后左转。", answer: "Allez tout droit, puis tournez à gauche.", hint: "路线两步" },
                      { prompt: "药店在邮局对面。", answer: "La pharmacie est en face de la poste.", hint: "en face de" },
                      { prompt: "很近，你可以步行去。", answer: "C'est près, vous pouvez y aller à pied.", hint: "à pied" },
                      { prompt: "请坐2号地铁线。", answer: "Prenez la ligne 2 de métro.", hint: "prendre + ligne" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点发音：1）à droite、près de、en face de 的连读节奏；2）命令式结尾 -ez（allez、tournez、prenez）发音要稳定；3）地名和地点词常与介词连在一个节奏组里读，如 en face de la gare、près du musée。",
              tcf: "TCF Canada 听力和阅读里，路线类任务通常信息密集：方向词、地点词、交通方式会同时出现。做题时先抓‘起点-动作-参照物-终点’四个信息点，能显著减少听漏和读漏。"
            },
            exercises: [
              {
                type: "介词填空",
                instruction: "选择正确表达填空：à gauche de / à droite de / en face de / près de / entre ... et ...。",
                items: [
                  { prompt: "La banque est _____ la poste.", answer: "à gauche de", explanation: "表示位置‘在左边’用 à gauche de。" },
                  { prompt: "Le musée est _____ l'hôpital.", answer: "en face de", explanation: "表示‘在对面’用 en face de。" },
                  { prompt: "La pharmacie est _____ la gare.", answer: "près de", explanation: "表示‘在附近’用 près de。" },
                  { prompt: "La mairie est _____ la banque _____ l'école.", answer: "entre / et", explanation: "在两者之间用 entre...et...。" },
                  { prompt: "Le café est _____ la station de métro.", answer: "à droite de", explanation: "表示‘在右边’用 à droite de。" }
                ]
              },
              {
                type: "命令式变形",
                instruction: "根据提示，把动词改成合适的命令式形式。",
                items: [
                  { prompt: "(vous / aller) _____ tout droit.", answer: "Allez", explanation: "vous 命令式：allez。" },
                  { prompt: "(vous / tourner) _____ à gauche.", answer: "Tournez", explanation: "规则 -er 动词 vous 命令式常为 -ez。" },
                  { prompt: "(vous / prendre) _____ la ligne 1.", answer: "Prenez", explanation: "prendre 的 vous 命令式是 prenez。" },
                  { prompt: "(tu / aller) _____ jusqu'au feu.", answer: "Va", explanation: "tu 命令式 aller 是 va。" },
                  { prompt: "(nous / continuer) _____ tout droit.", answer: "Continuons", explanation: "nous 命令式：continuons。" }
                ]
              },
              {
                type: "改错题",
                instruction: "找出句子中的错误并改正，说明原因。",
                items: [
                  { prompt: "La gare est en gauche de la poste.", answer: "La gare est à gauche de la poste.", explanation: "固定搭配是 à gauche de，不是 en gauche。" },
                  { prompt: "Prenez à pied le bus 8.", answer: "Prenez le bus 8.", explanation: "prendre le bus 已含交通方式；à pied 只用于步行。" },
                  { prompt: "Tournez vous à droite.", answer: "Tournez à droite.", explanation: "命令式里不加主语 vous。" },
                  { prompt: "Comment aller au la gare ?", answer: "Comment aller à la gare ?", explanation: "gare 阴性，用 à la。" },
                  { prompt: "Le musée est près du la banque.", answer: "Le musée est près de la banque.", explanation: "près de + la banque，不能写 du la。" }
                ]
              },
              {
                type: "连线匹配",
                instruction: "把左列情境和右列最合适的指路表达连线（选择对应选项）。",
                options: [
                  "a. Allez tout droit.",
                  "b. Tournez à droite.",
                  "c. Prenez la ligne 2.",
                  "d. C'est en face de la gare."
                ],
                items: [
                  { prompt: "① 对方问：‘第一步我该怎么走？’你让他直走", answer: "a. Allez tout droit.", explanation: "路线开头常用 Allez tout droit。" },
                  { prompt: "② 到路口后你让他向右转", answer: "b. Tournez à droite.", explanation: "右转固定表达。" },
                  { prompt: "③ 你建议他坐2号线地铁", answer: "c. Prenez la ligne 2.", explanation: "乘线路用 prenez la ligne..." },
                  { prompt: "④ 你说明药店就在火车站对面", answer: "d. C'est en face de la gare.", explanation: "对面用 en face de。" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读下面问路对话，在每个空格填入最恰当的词（介词、命令式或地点词）。",
                passage: "— Excusez-moi, où est (1)_____ gare ? — La gare ? Elle est (2)_____ face de la mairie. — C'est loin (3)_____ ? — Non, pas très loin. (4)_____ tout droit, puis (5)_____ à gauche au deuxième feu. — Je peux y aller (6)_____ pied ? — Oui, bien sûr. Sinon, vous pouvez (7)_____ le bus 4. — Et la pharmacie, c'est où ? — Elle est (8)_____ de la poste, juste (9)_____ la banque et le café. — Merci beaucoup ! — Je vous (10)_____.",
                items: [
                  { blank: 1, answer: "la", explanation: "gare 阴性单数，用 la gare。" },
                  { blank: 2, answer: "en", explanation: "固定短语 en face de。" },
                  { blank: 3, answer: "d'ici", explanation: "问距离常说 C'est loin d'ici ?" },
                  { blank: 4, answer: "Allez", explanation: "给路线用命令式 Allez。" },
                  { blank: 5, answer: "tournez", explanation: "vous 命令式：tournez。" },
                  { blank: 6, answer: "à", explanation: "步行固定说法 à pied。" },
                  { blank: 7, answer: "prendre", explanation: "pouvoir 后接动词原形。" },
                  { blank: 8, answer: "près", explanation: "près de + 地点。" },
                  { blank: 9, answer: "entre", explanation: "在两者之间用 entre...et...。" },
                  { blank: 10, answer: "en prie", explanation: "Je vous en prie = 不客气。" }
                ]
              },
              {
                type: "表达练习",
                instruction: "根据场景写 40-60 个词，给出一段清晰路线说明。至少包含：1个起点、2个路线动作、1个参照物、1种交通方式。",
                items: [
                  {
                    prompt: "朋友在地铁站附近，想去博物馆。请你用法语写一段指路说明（40-60词）。",
                    modelAnswer: "Le musée est près de la rivière. Depuis la station, allez tout droit pendant cinq minutes, puis tournez à gauche. Le musée est en face de la banque. Si vous êtes fatigué, prenez le bus 3 et descendez à l'arrêt Musée.",
                    keyPoints: [
                      "起点明确（Depuis la station）",
                      "至少两个动作（allez, tournez, prenez）",
                      "使用方位介词（en face de, près de）",
                      "交通方式表达正确（en bus / prenez le bus）",
                      "句子顺序清楚，便于执行",
                      "整体长度控制在 40-60 词"
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u5",
            code: "Unité 5",
            title: "C’est tendance !",
            focus: "衣物、天气、物品描述、购物和实用表达",
            lecture: {
              summary: "这一单元把‘会说衣服名词’升级为‘能在店里完成一次购物沟通’。你会系统掌握指示形容词、形容词位置与性数配合、近未来时，并把它们直接用在试穿、询价、描述天气穿搭等真实场景。学完后你可以清楚表达“我想买哪件、它合不合适、我接下来打算怎么穿”。",
              canDo: [
                "用 ce/cet/cette/ces 指向具体衣物",
                "描述衣物颜色和基本外观（大小、新旧、风格）",
                "在购物场景里询问尺码、价格和试穿",
                "用 aller + 动词原形表达接下来要做的事",
                "根据天气说明穿什么更合适",
                "在 TCF 常见消费场景中快速抓取关键信息"
              ],
              grammarSections: [
                {
                  title: "指示形容词：ce / cet / cette / ces",
                  explanation: "当你想说‘这个、这件、这些’时，用指示形容词。选哪个形式取决于名词的性数和首字母。记忆要点：阳性单数一般是 ce，但遇到元音或哑音 h 要用 cet。",
                  table: [
                    ["名词类型", "形式", "例子"],
                    ["阳性单数", "ce", "ce pantalon"],
                    ["阳性单数（元音/h开头）", "cet", "cet imperméable"],
                    ["阴性单数", "cette", "cette robe"],
                    ["复数", "ces", "ces chaussures"]
                  ],
                  examples: [
                    { fr: "Cette veste est très jolie.", zh: "这件外套很好看。" },
                    { fr: "Je préfère ce pull bleu.", zh: "我更喜欢这件蓝色毛衣。" },
                    { fr: "Cet anorak est trop cher.", zh: "这件风衣太贵了。" },
                    { fr: "Ces bottes sont confortables.", zh: "这双靴子很舒服。" }
                  ],
                  pitfall: "最常错的是把 cet 忘掉，写成 ce anorak。阳性名词遇元音开头必须用 cet。"
                },
                {
                  title: "形容词性数配合与常见位置",
                  explanation: "法语形容词通常要和名词性数一致。位置上，大部分颜色和描述词放在名词后；少数常见形容词（如 grand/petit/joli）常放在名词前。先掌握高频规则，写句子就会稳定很多。",
                  table: [
                    ["类别", "规则", "例子"],
                    ["颜色形容词", "通常放名词后", "une robe rouge"],
                    ["大小/评价常见词", "常放名词前", "un petit sac"],
                    ["阴性变化", "一般加 e", "noir → noire"],
                    ["复数变化", "一般加 s", "bleu → bleus"],
                    ["阴性复数", "加 es", "joli → jolies"]
                  ],
                  examples: [
                    { fr: "Je cherche une robe noire.", zh: "我在找一条黑色连衣裙。" },
                    { fr: "C'est un joli manteau.", zh: "这是一件好看的大衣。" },
                    { fr: "Ces chaussures blanches sont neuves.", zh: "这双白鞋是新的。" },
                    { fr: "J'aime les petits sacs rouges.", zh: "我喜欢小红包。" }
                  ],
                  pitfall: "中文里形容词位置很自由，但法语位置错了会很别扭，尤其颜色词一般放名词后。"
                },
                {
                  title: "近未来时：aller + 动词原形",
                  explanation: "想表达‘马上要做某事’，A1 最实用结构就是 aller + 动词原形。它比将来时变位更简单，购物和日常计划里都很常见。",
                  table: [
                    ["主语", "aller 变位", "例句"],
                    ["je", "vais", "Je vais acheter une veste."],
                    ["tu", "vas", "Tu vas essayer cette jupe ?"],
                    ["il/elle", "va", "Elle va prendre la robe bleue."],
                    ["nous", "allons", "Nous allons payer en caisse."],
                    ["vous", "allez", "Vous allez essayer quelle taille ?"],
                    ["ils/elles", "vont", "Ils vont sortir ce soir."]
                  ],
                  examples: [
                    { fr: "Je vais acheter ce manteau demain.", zh: "我明天要买这件大衣。" },
                    { fr: "On va essayer la taille 38.", zh: "我们要试38码。" },
                    { fr: "Elle ne va pas prendre cette jupe.", zh: "她不打算买这条裙子。" }
                  ],
                  pitfall: "不要把两个动词都变位：不能写 Je vais achète，要写 Je vais acheter。"
                },
                {
                  title: "购物高频句型：询价、尺码、试穿",
                  explanation: "在店里最重要的是把需求说清楚。A1 阶段先掌握固定句型：问价格、问尺码、请求试穿、表达合不合适。句型熟了，交流就不会卡住。",
                  table: [
                    ["功能", "法语表达", "说明"],
                    ["询问价格", "C'est combien ?", "最常用问价句"],
                    ["问有没有尺码", "Vous avez la taille 38 ?", "购物高频"],
                    ["请求试穿", "Je peux essayer ?", "试衣间场景"],
                    ["表达太大/太小", "C'est trop grand/petit.", "试穿反馈"],
                    ["表达合适", "C'est parfait.", "确认购买"]
                  ],
                  examples: [
                    { fr: "Bonjour, vous avez cette chemise en noir ?", zh: "您好，这件衬衫有黑色吗？" },
                    { fr: "Je peux essayer cette veste ?", zh: "我可以试这件外套吗？" },
                    { fr: "C'est trop grand, je vais prendre la taille 36.", zh: "太大了，我要拿36码。" },
                    { fr: "D'accord, je prends cette robe.", zh: "好的，我要这条裙子。" }
                  ],
                  pitfall: "只说 taille 38 对方不一定懂你在问什么，最好用完整句 Vous avez la taille 38 ?。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "衣物与配件",
                  words: [
                    { fr: "la robe", zh: "连衣裙", example: "Cette robe est très élégante.", exampleZh: "这条连衣裙很优雅。" },
                    { fr: "la jupe", zh: "裙子", example: "Je vais acheter cette jupe.", exampleZh: "我打算买这条裙子。" },
                    { fr: "le pantalon", zh: "裤子", example: "Ce pantalon est trop long.", exampleZh: "这条裤子太长了。" },
                    { fr: "la chemise", zh: "衬衫", example: "Il porte une chemise blanche.", exampleZh: "他穿着一件白衬衫。" },
                    { fr: "le pull", zh: "毛衣", example: "Ce pull est confortable.", exampleZh: "这件毛衣很舒服。" },
                    { fr: "la veste", zh: "外套", example: "Je prends cette veste noire.", exampleZh: "我要这件黑色外套。" },
                    { fr: "les chaussures (f.)", zh: "鞋子", example: "Ces chaussures sont neuves.", exampleZh: "这双鞋是新的。" },
                    { fr: "le sac", zh: "包", example: "Je cherche un petit sac.", exampleZh: "我在找一个小包。" }
                  ]
                },
                {
                  theme: "颜色与外观描述",
                  words: [
                    { fr: "noir(e)", zh: "黑色的", example: "Je veux une veste noire.", exampleZh: "我想要一件黑色外套。" },
                    { fr: "blanc/blanche", zh: "白色的", example: "Cette chemise blanche est jolie.", exampleZh: "这件白衬衫很好看。" },
                    { fr: "bleu(e)", zh: "蓝色的", example: "Il porte un pull bleu.", exampleZh: "他穿着一件蓝色毛衣。" },
                    { fr: "rouge", zh: "红色的", example: "J'aime cette robe rouge.", exampleZh: "我喜欢这条红色连衣裙。" },
                    { fr: "vert(e)", zh: "绿色的", example: "Ces baskets vertes sont originales.", exampleZh: "这双绿色运动鞋很特别。" },
                    { fr: "grand(e)", zh: "大的", example: "Ce manteau est trop grand.", exampleZh: "这件大衣太大了。" },
                    { fr: "petit(e)", zh: "小的", example: "La taille est trop petite.", exampleZh: "这个尺码太小了。" },
                    { fr: "joli(e)", zh: "好看的", example: "C'est une jolie jupe.", exampleZh: "这是一条好看的裙子。" }
                  ]
                },
                {
                  theme: "天气与季节表达",
                  words: [
                    { fr: "il fait chaud", zh: "天气热", example: "En été, il fait chaud.", exampleZh: "夏天天气很热。" },
                    { fr: "il fait froid", zh: "天气冷", example: "Aujourd'hui, il fait froid.", exampleZh: "今天天气很冷。" },
                    { fr: "il pleut", zh: "下雨", example: "Il pleut, je prends un parapluie.", exampleZh: "下雨了，我带一把伞。" },
                    { fr: "il y a du vent", zh: "有风", example: "Il y a du vent ce matin.", exampleZh: "今天早上有风。" },
                    { fr: "le soleil", zh: "太阳", example: "Il y a du soleil aujourd'hui.", exampleZh: "今天有太阳。" },
                    { fr: "l'hiver (m.)", zh: "冬天", example: "En hiver, je porte un manteau.", exampleZh: "冬天我穿大衣。" },
                    { fr: "l'été (m.)", zh: "夏天", example: "En été, je porte des sandales.", exampleZh: "夏天我穿凉鞋。" },
                    { fr: "la météo", zh: "天气", example: "Je regarde la météo avant de sortir.", exampleZh: "我出门前会看天气预报。" }
                  ]
                },
                {
                  theme: "购物场景高频词",
                  words: [
                    { fr: "la taille", zh: "尺码", example: "Vous avez la taille 38 ?", exampleZh: "你们有38码吗？" },
                    { fr: "essayer", zh: "试穿", example: "Je peux essayer cette veste ?", exampleZh: "我可以试这件外套吗？" },
                    { fr: "cher/chère", zh: "贵的", example: "Ce pull est trop cher.", exampleZh: "这件毛衣太贵了。" },
                    { fr: "pas cher", zh: "不贵", example: "Cette jupe n'est pas chère.", exampleZh: "这条裙子不贵。" },
                    { fr: "le prix", zh: "价格", example: "Quel est le prix de cette robe ?", exampleZh: "这条连衣裙多少钱？" },
                    { fr: "payer", zh: "付款", example: "Je vais payer par carte.", exampleZh: "我打算刷卡付款。" },
                    { fr: "la caisse", zh: "收银台", example: "La caisse est au fond du magasin.", exampleZh: "收银台在店里最里面。" },
                    { fr: "le magasin", zh: "商店", example: "Ce magasin ferme à 20 heures.", exampleZh: "这家店20点关门。" }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：衣物和颜色词、指示形容词、近未来时、购物句型。",
                groups: [
                  {
                    title: "衣物词汇默写",
                    type: "vocab",
                    items: [
                      { prompt: "连衣裙", answer: "la robe", hint: "阴性" },
                      { prompt: "裙子", answer: "la jupe", hint: "阴性" },
                      { prompt: "裤子", answer: "le pantalon", hint: "阳性" },
                      { prompt: "衬衫", answer: "la chemise", hint: "阴性" },
                      { prompt: "毛衣", answer: "le pull", hint: "阳性" },
                      { prompt: "外套", answer: "la veste", hint: "阴性" },
                      { prompt: "鞋子（复数）", answer: "les chaussures", hint: "复数" },
                      { prompt: "包", answer: "le sac", hint: "阳性" }
                    ]
                  },
                  {
                    title: "颜色与指示形容词默写",
                    type: "vocab",
                    items: [
                      { prompt: "这条裙子（阴性单数）", answer: "cette jupe", hint: "cette" },
                      { prompt: "这件大衣（阳性元音开头）", answer: "cet anorak", hint: "cet" },
                      { prompt: "这些鞋子（复数）", answer: "ces chaussures", hint: "ces" },
                      { prompt: "黑色的（阴性）", answer: "noire", hint: "加 e" },
                      { prompt: "白色的（阴性）", answer: "blanche", hint: "特殊拼写" },
                      { prompt: "蓝色的（复数）", answer: "bleus", hint: "加 s" }
                    ]
                  },
                  {
                    title: "近未来时默写：aller + 动词原形",
                    type: "conjugation",
                    items: [
                      { prompt: "je + acheter（近未来）", answer: "je vais acheter", hint: "vais + 原形" },
                      { prompt: "tu + essayer（近未来）", answer: "tu vas essayer", hint: "vas + 原形" },
                      { prompt: "elle + prendre（近未来）", answer: "elle va prendre", hint: "va + 原形" },
                      { prompt: "nous + payer（近未来）", answer: "nous allons payer", hint: "allons + 原形" },
                      { prompt: "vous + choisir（近未来）", answer: "vous allez choisir", hint: "allez + 原形" },
                      { prompt: "ils + sortir（近未来）", answer: "ils vont sortir", hint: "vont + 原形" },
                      { prompt: "je + acheter（否定近未来）", answer: "je ne vais pas acheter", hint: "ne...pas 包 aller" }
                    ]
                  },
                  {
                    title: "购物句型默写",
                    type: "phrases",
                    items: [
                      { prompt: "这个多少钱？", answer: "C'est combien ?", hint: "问价" },
                      { prompt: "你们有38码吗？", answer: "Vous avez la taille 38 ?", hint: "问尺码" },
                      { prompt: "我可以试穿吗？", answer: "Je peux essayer ?", hint: "试穿" },
                      { prompt: "这件太大了。", answer: "C'est trop grand.", hint: "试穿反馈" },
                      { prompt: "我打算买这件黑外套。", answer: "Je vais acheter cette veste noire.", hint: "aller + 原形" },
                      { prompt: "今天天冷，我要穿毛衣。", answer: "Il fait froid, je vais porter un pull.", hint: "天气+计划" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点：1）词尾辅音常不发音（grand/petit 在连读时要注意）；2）颜色词阴阳变化常导致发音变化（blanc/blanche）；3）近未来时连读节奏要顺（je vais acheter、vous allez essayer）。建议把购物句型整句跟读，而不是逐词读。",
              tcf: "TCF Canada 听力常出现购物和天气场景：问价、尺码、颜色、是否合适。阅读常见商品广告和商店公告，重点是快速识别价格、折扣和商品特征。会用近未来时能明显提升口语任务里的自然度。"
            },
            exercises: [
              {
                type: "指示形容词填空",
                instruction: "根据名词性数和首字母，填入 ce / cet / cette / ces。",
                items: [
                  { prompt: "_____ robe est jolie.", answer: "Cette", explanation: "robe 阴性单数，用 cette。" },
                  { prompt: "_____ pantalon est trop grand.", answer: "Ce", explanation: "pantalon 阳性单数，用 ce。" },
                  { prompt: "_____ anorak est cher.", answer: "Cet", explanation: "阳性名词元音开头，用 cet。" },
                  { prompt: "_____ chaussures sont neuves.", answer: "Ces", explanation: "复数名词用 ces。" },
                  { prompt: "Tu préfères _____ chemise ou _____ pull ?", answer: "cette / ce", explanation: "chemise 阴性用 cette；pull 阳性用 ce。" }
                ]
              },
              {
                type: "形容词变形",
                instruction: "根据主语和名词，把括号里的形容词变为正确形式。",
                items: [
                  { prompt: "Cette jupe est (noir) _____.", answer: "noire", explanation: "jupe 阴性单数，noir + e。" },
                  { prompt: "Ces chaussures sont (blanc) _____.", answer: "blanches", explanation: "chaussures 阴性复数，blanche + s。" },
                  { prompt: "Il porte un pull (bleu) _____.", answer: "bleu", explanation: "pull 阳性单数，保持 bleu。" },
                  { prompt: "Elles achètent des sacs (petit) _____.", answer: "petits", explanation: "sacs 阳性复数，加 s。" },
                  { prompt: "J'aime cette veste (rouge) _____.", answer: "rouge", explanation: "rouge 阴阳同形，单数不变。" }
                ]
              },
              {
                type: "近未来时填空",
                instruction: "用 aller + 动词原形完成句子。",
                items: [
                  { prompt: "Je _____ (acheter) cette robe demain.", answer: "vais acheter", explanation: "je + aller 变位是 vais。" },
                  { prompt: "Tu _____ (essayer) cette veste ?", answer: "vas essayer", explanation: "tu + aller 变位是 vas。" },
                  { prompt: "Nous _____ (payer) par carte.", answer: "allons payer", explanation: "nous + aller 变位是 allons。" },
                  { prompt: "Elle ne _____ pas (prendre) cette jupe.", answer: "va prendre", explanation: "否定包 aller：ne va pas + 原形。" },
                  { prompt: "Ils _____ (sortir) ce soir.", answer: "vont sortir", explanation: "ils + aller 变位是 vont。" }
                ]
              },
              {
                type: "改错题",
                instruction: "找出句子中的错误并改正，说明原因。",
                items: [
                  { prompt: "Ce robe est rouge.", answer: "Cette robe est rouge.", explanation: "robe 阴性单数，用 cette。" },
                  { prompt: "Je vais achète cette veste.", answer: "Je vais acheter cette veste.", explanation: "aller 后接动词原形。" },
                  { prompt: "Ces pantalon est trop cher.", answer: "Ce pantalon est trop cher.", explanation: "pantalon 单数不能用 ces。" },
                  { prompt: "Cette chaussures sont jolies.", answer: "Ces chaussures sont jolies.", explanation: "chaussures 复数，用 ces。" },
                  { prompt: "Je peux essayer cette ?", answer: "Je peux essayer cette veste ?", explanation: "指示形容词后必须接名词。" }
                ]
              },
              {
                type: "连线匹配",
                instruction: "把左列购物情境和右列最合适表达连线（选择对应选项）。",
                options: [
                  "a. C'est combien ?",
                  "b. Vous avez la taille 38 ?",
                  "c. Je peux essayer ?",
                  "d. C'est trop petit."
                ],
                items: [
                  { prompt: "① 你想先问价格", answer: "a. C'est combien ?", explanation: "购物第一步常先问价。" },
                  { prompt: "② 你想确认有没有你的尺码", answer: "b. Vous avez la taille 38 ?", explanation: "问尺码固定句型。" },
                  { prompt: "③ 你想进试衣间试穿", answer: "c. Je peux essayer ?", explanation: "试穿高频句。" },
                  { prompt: "④ 试穿后发现偏小", answer: "d. C'est trop petit.", explanation: "反馈尺寸问题。" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读下面购物对话，在每个空格填入最恰当的词（指示形容词、形容词形式或动词形式）。",
                passage: "Au magasin: Bonjour, je cherche (1)_____ veste noire. — D'accord. Vous préférez (2)_____ modèle-ci ou (3)_____ modèle-là ? — Je préfère (4)_____ veste-ci. Je peux (5)_____ ? — Oui, bien sûr. La cabine est là-bas. — Merci. Hmm... c'est un peu grand. Vous avez la taille 36 ? — Oui, voilà. — Parfait ! Je (6)_____ prendre celle-ci. (7)_____ est le prix ? — Elle coûte 45 euros. — D'accord, je vais (8)_____ par carte. Aujourd'hui il (9)_____ froid, donc je vais aussi acheter (10)_____ pull chaud.",
                items: [
                  { blank: 1, answer: "une", explanation: "veste 阴性单数，用 une。" },
                  { blank: 2, answer: "ce", explanation: "modèle 阳性单数，用 ce。" },
                  { blank: 3, answer: "ce", explanation: "同样是 modèle，仍用 ce。" },
                  { blank: 4, answer: "cette", explanation: "veste 阴性单数，用 cette。" },
                  { blank: 5, answer: "essayer", explanation: "pouvoir 后接动词原形。" },
                  { blank: 6, answer: "vais", explanation: "je + aller 变位：vais。" },
                  { blank: 7, answer: "Quel", explanation: "prix 阳性，用 Quel est le prix ?" },
                  { blank: 8, answer: "payer", explanation: "aller 后接动词原形 payer。" },
                  { blank: 9, answer: "fait", explanation: "天气表达固定：il fait froid。" },
                  { blank: 10, answer: "un", explanation: "pull 阳性单数，用 un。" }
                ]
              },
              {
                type: "表达练习",
                instruction: "根据场景写 40-60 个词的购物对话，至少包含：1次问价、1次问尺码、1句近未来时。",
                items: [
                  {
                    prompt: "你在服装店买外套，请写一段简短对话（40-60词）。",
                    modelAnswer: "Bonjour, je cherche cette veste noire. C'est combien ? Vous avez la taille 38 ? Je peux essayer ? Merci. La taille 38 est un peu grande, je vais prendre la taille 36. Parfait, je vais payer par carte.",
                    keyPoints: [
                      "包含问价句（C'est combien ?）",
                      "包含尺码句（Vous avez la taille... ?）",
                      "包含试穿请求（Je peux essayer ?）",
                      "近未来时结构正确（je vais prendre/payer）",
                      "衣物与颜色表达清楚",
                      "整体长度控制在 40-60 词"
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: "a1-u6",
            code: "Unité 6",
            title: "Qu’est-ce qu’on fait aujourd’hui ?",
            focus: "日程、时间、活动安排、邀约与回应",
            lecture: {
              summary: "这一单元的核心是‘把一天说清楚’：几点做什么、多久一次、要不要一起去。你会把时间表达、反身动词、频率副词和邀约句型串起来，形成可直接用于日常沟通的输出模板。学完后你可以更自然地安排活动、发出邀约并礼貌回应。",
              canDo: [
                "用法语准确表达整点、半点和日程时间",
                "描述自己的日常作息和安排",
                "使用常见反身动词说“起床、休息、睡觉”",
                "用频率副词表达习惯（总是、经常、有时、从不）",
                "发出邀约并做接受或拒绝回应",
                "用 venir de + 动词原形表达“刚刚做完”"
              ],
              grammarSections: [
                {
                  title: "时间表达与日程句型",
                  explanation: "先会说时间，才能安排一天。A1 阶段先掌握高频结构：il est + 时间；à + 时间点；de...à... 表示时间区间。",
                  table: [
                    ["功能", "法语", "例子"],
                    ["整点", "Il est + 数字 + heure(s)", "Il est huit heures."],
                    ["半点", "... et demie", "Il est six heures et demie."],
                    ["差一刻", "... moins le quart", "Il est neuf heures moins le quart."],
                    ["在几点", "à + 时间", "On se voit à 18h."],
                    ["时间区间", "de ... à ...", "Je travaille de 9h à 17h."]
                  ],
                  examples: [
                    { fr: "Je me lève à sept heures.", zh: "我七点起床。" },
                    { fr: "Le cours commence à neuf heures et demie.", zh: "课程九点半开始。" },
                    { fr: "On dîne de 19h à 20h.", zh: "我们19点到20点吃晚饭。" },
                    { fr: "Il est dix heures moins le quart.", zh: "现在差一刻十点。" }
                  ],
                  pitfall: "中文常省略介词，但法语说具体时间点时别忘了 à（如 à 18h）。"
                },
                {
                  title: "反身动词入门：se lever / se coucher / se reposer",
                  explanation: "反身动词要带反身代词（me/te/se/nous/vous/se）。记忆方式：先选主语，再选对应代词，最后再放动词变位。",
                  table: [
                    ["主语", "se lever", "se coucher"],
                    ["je", "me lève", "me couche"],
                    ["tu", "te lèves", "te couches"],
                    ["il/elle", "se lève", "se couche"],
                    ["nous", "nous levons", "nous couchons"],
                    ["vous", "vous levez", "vous couchez"],
                    ["ils/elles", "se lèvent", "se couchent"]
                  ],
                  examples: [
                    { fr: "Je me lève à 7h et je me couche à 23h.", zh: "我7点起床，23点睡觉。" },
                    { fr: "Nous nous reposons après le travail.", zh: "我们下班后休息。" },
                    { fr: "Elle se couche tard le samedi.", zh: "她周六睡得晚。" }
                  ],
                  pitfall: "不要漏代词：不能写 Je lève à 7h，必须写 Je me lève。"
                },
                {
                  title: "频率副词：toujours / souvent / parfois / rarement / jamais",
                  explanation: "说习惯时，频率副词很关键。基础规则：它们通常放在变位动词后；否定时用 ne...jamais 表示‘从不’。",
                  table: [
                    ["副词", "中文", "例句"],
                    ["toujours", "总是", "Je prends toujours le bus."],
                    ["souvent", "经常", "On sort souvent le soir."],
                    ["parfois", "有时", "Elle fait parfois du sport."],
                    ["rarement", "很少", "Je regarde rarement la télé."],
                    ["jamais", "从不", "Je ne me couche jamais tôt."]
                  ],
                  examples: [
                    { fr: "Je vais souvent au cinéma le vendredi.", zh: "我周五经常去看电影。" },
                    { fr: "Nous faisons parfois une promenade après le dîner.", zh: "我们晚饭后有时散步。" },
                    { fr: "Il ne prend jamais le métro le dimanche.", zh: "他周日从不坐地铁。" }
                  ],
                  pitfall: "jamais 常和 ne 一起出现：Je ne vais jamais... 不能只写 Je vais jamais。"
                },
                {
                  title: "邀约与回应：On va... ? / Tu veux... ?",
                  explanation: "活动安排里最实用的是邀约句。先会提出，再会回应。A1 先掌握三种回应：接受、婉拒、改时间。",
                  table: [
                    ["功能", "法语表达", "说明"],
                    ["发出邀约", "On va au cinéma ?", "最常见口语邀约"],
                    ["询问意愿", "Tu veux sortir ce soir ?", "直接而自然"],
                    ["接受", "Oui, avec plaisir.", "礼貌接受"],
                    ["婉拒", "Désolé(e), je ne peux pas.", "给出拒绝"],
                    ["改时间", "On peut y aller demain ?", "提出替代方案"]
                  ],
                  examples: [
                    { fr: "On va boire un café après le cours ?", zh: "下课后我们去喝咖啡吗？" },
                    { fr: "Oui, avec plaisir !", zh: "好啊，很乐意！" },
                    { fr: "Désolée, je ne peux pas ce soir. On peut y aller demain ?", zh: "抱歉我今晚不行，我们明天去可以吗？" }
                  ],
                  pitfall: "只说 Non 会显得生硬，考试和真实沟通里最好加一句理由或替代时间。"
                },
                {
                  title: "过去最近时：venir de + 动词原形",
                  explanation: "想表达‘刚刚做完’，最简单结构是 venir de + 动词原形。这个结构在日程沟通里很常用，比如‘我刚下课’‘我刚到家’。",
                  table: [
                    ["主语", "venir 变位", "例句"],
                    ["je", "viens de", "Je viens de finir le cours."],
                    ["tu", "viens de", "Tu viens de rentrer ?"],
                    ["il/elle", "vient de", "Elle vient d'arriver."],
                    ["nous", "venons de", "Nous venons de manger."],
                    ["vous", "venez de", "Vous venez de commencer ?"],
                    ["ils/elles", "viennent de", "Ils viennent de partir."]
                  ],
                  examples: [
                    { fr: "Je viens de rentrer à la maison.", zh: "我刚回到家。" },
                    { fr: "On vient de finir le travail.", zh: "我们刚下班。" },
                    { fr: "Elle vient de m'appeler.", zh: "她刚给我打电话。" }
                  ],
                  pitfall: "venir de 后面必须是动词原形，不能写 Je viens de suis arrivé。"
                }
              ],
              vocabularyGroups: [
                {
                  theme: "时间与日程词汇",
                  words: [
                    { fr: "l'heure (f.)", zh: "时间/几点", example: "Tu as l'heure ?", exampleZh: "你知道现在几点吗？" },
                    { fr: "le matin", zh: "早上", example: "Je travaille le matin.", exampleZh: "我上午工作。" },
                    { fr: "l'après-midi (m.)", zh: "下午", example: "On se voit l'après-midi.", exampleZh: "我们下午见。" },
                    { fr: "le soir", zh: "晚上", example: "Je fais du sport le soir.", exampleZh: "我晚上做运动。" },
                    { fr: "aujourd'hui", zh: "今天", example: "Aujourd'hui, je suis libre.", exampleZh: "我今天有空。" },
                    { fr: "demain", zh: "明天", example: "On sort demain ?", exampleZh: "我们明天出去吗？" },
                    { fr: "ce week-end", zh: "这个周末", example: "Ce week-end, je vais au musée.", exampleZh: "这个周末我去博物馆。" },
                    { fr: "le rendez-vous", zh: "约会/约定", example: "J'ai un rendez-vous à 18h.", exampleZh: "我18点有个约。" }
                  ]
                },
                {
                  theme: "活动与外出动词",
                  words: [
                    { fr: "sortir", zh: "外出", example: "On sort ce soir ?", exampleZh: "我们今晚出去吗？" },
                    { fr: "rester", zh: "待在", example: "Je reste à la maison.", exampleZh: "我待在家里。" },
                    { fr: "se promener", zh: "散步", example: "Nous nous promenons au parc.", exampleZh: "我们在公园散步。" },
                    { fr: "regarder", zh: "看（电影/电视）", example: "Je regarde un film.", exampleZh: "我看一部电影。" },
                    { fr: "écouter", zh: "听", example: "Elle écoute de la musique.", exampleZh: "她在听音乐。" },
                    { fr: "jouer", zh: "玩/演奏", example: "Ils jouent au foot.", exampleZh: "他们踢足球。" },
                    { fr: "faire du sport", zh: "做运动", example: "Je fais du sport trois fois par semaine.", exampleZh: "我每周做三次运动。" },
                    { fr: "se reposer", zh: "休息", example: "Je me repose après le travail.", exampleZh: "我下班后休息。" }
                  ]
                },
                {
                  theme: "邀约与回应表达",
                  words: [
                    { fr: "On va ... ?", zh: "我们去……吗？", example: "On va au cinéma ?", exampleZh: "我们去看电影吗？" },
                    { fr: "Tu veux ... ?", zh: "你想……吗？", example: "Tu veux boire un café ?", exampleZh: "你想喝杯咖啡吗？" },
                    { fr: "Ça te dit ?", zh: "你感兴趣吗？", example: "Un concert ce soir, ça te dit ?", exampleZh: "今晚有场演唱会，你想去吗？" },
                    { fr: "avec plaisir", zh: "很乐意", example: "Oui, avec plaisir !", exampleZh: "好啊，很乐意！" },
                    { fr: "désolé(e)", zh: "抱歉", example: "Désolé, je ne peux pas.", exampleZh: "抱歉，我不行。" },
                    { fr: "pas possible", zh: "不行/没法", example: "Ce soir, ce n'est pas possible.", exampleZh: "今晚不方便。" },
                    { fr: "on peut ... ?", zh: "我们可以……吗？", example: "On peut y aller demain ?", exampleZh: "我们明天去可以吗？" },
                    { fr: "d'accord", zh: "好的", example: "D'accord, à demain !", exampleZh: "好的，明天见！" }
                  ]
                },
                {
                  theme: "频率副词",
                  words: [
                    { fr: "toujours", zh: "总是", example: "Je suis toujours à l'heure.", exampleZh: "我总是准时。" },
                    { fr: "souvent", zh: "经常", example: "On sort souvent le vendredi.", exampleZh: "我们周五经常出去。" },
                    { fr: "parfois", zh: "有时", example: "Je prends parfois le métro.", exampleZh: "我有时坐地铁。" },
                    { fr: "rarement", zh: "很少", example: "Elle regarde rarement la télé.", exampleZh: "她很少看电视。" },
                    { fr: "jamais", zh: "从不", example: "Je ne me couche jamais tôt.", exampleZh: "我从不早睡。" },
                    { fr: "déjà", zh: "已经", example: "J'ai déjà mangé.", exampleZh: "我已经吃过了。" },
                    { fr: "encore", zh: "还/仍然", example: "Il travaille encore.", exampleZh: "他还在工作。" },
                    { fr: "bientôt", zh: "很快", example: "Je vais bientôt partir.", exampleZh: "我很快就要出发了。" }
                  ]
                }
              ],
              dictation: {
                intro: "本单元默写重点：时间表达、活动词汇、反身动词、邀约句型。",
                groups: [
                  {
                    title: "时间默写",
                    type: "numbers",
                    items: [
                      { prompt: "7:00", answer: "sept heures", hint: "整点" },
                      { prompt: "8:30", answer: "huit heures et demie", hint: "半点" },
                      { prompt: "9:45", answer: "dix heures moins le quart", hint: "差一刻" },
                      { prompt: "12:15", answer: "douze heures et quart", hint: "一刻" },
                      { prompt: "18:00", answer: "dix-huit heures", hint: "24小时制" },
                      { prompt: "20:30", answer: "vingt heures et demie", hint: "晚上" }
                    ]
                  },
                  {
                    title: "活动词汇默写",
                    type: "vocab",
                    items: [
                      { prompt: "外出", answer: "sortir", hint: "动词原形" },
                      { prompt: "散步", answer: "se promener", hint: "反身动词" },
                      { prompt: "休息", answer: "se reposer", hint: "反身动词" },
                      { prompt: "做运动", answer: "faire du sport", hint: "固定搭配" },
                      { prompt: "约会/约定", answer: "le rendez-vous", hint: "阳性" },
                      { prompt: "今天", answer: "aujourd'hui", hint: "时间词" },
                      { prompt: "明天", answer: "demain", hint: "时间词" },
                      { prompt: "这个周末", answer: "ce week-end", hint: "固定表达" }
                    ]
                  },
                  {
                    title: "反身动词变位默写",
                    type: "conjugation",
                    items: [
                      { prompt: "je + se lever", answer: "je me lève", hint: "me + lève" },
                      { prompt: "tu + se coucher", answer: "tu te couches", hint: "te + couches" },
                      { prompt: "elle + se reposer", answer: "elle se repose", hint: "se + repose" },
                      { prompt: "nous + se lever", answer: "nous nous levons", hint: "nous nous" },
                      { prompt: "vous + se coucher", answer: "vous vous couchez", hint: "vous vous" },
                      { prompt: "ils + se reposer", answer: "ils se reposent", hint: "se + reposent" },
                      { prompt: "je + se coucher（否定）", answer: "je ne me couche pas", hint: "ne...pas 包代词+动词" }
                    ]
                  },
                  {
                    title: "邀约句型默写",
                    type: "phrases",
                    items: [
                      { prompt: "今晚我们去看电影吗？", answer: "On va au cinéma ce soir ?", hint: "邀约" },
                      { prompt: "你想去喝咖啡吗？", answer: "Tu veux boire un café ?", hint: "询问意愿" },
                      { prompt: "好啊，很乐意。", answer: "Oui, avec plaisir.", hint: "接受" },
                      { prompt: "抱歉，我今晚不行。", answer: "Désolé(e), je ne peux pas ce soir.", hint: "婉拒" },
                      { prompt: "我们明天去可以吗？", answer: "On peut y aller demain ?", hint: "改时间" },
                      { prompt: "我刚下课。", answer: "Je viens de finir le cours.", hint: "venir de" }
                    ]
                  }
                ]
              },
              phonetique: "本单元重点：1）时间表达里的连读和节奏（huit heures、dix heures et demie）；2）反身代词与动词连读（je me lève、on se repose）；3）邀约句语调要自然上扬（On va au cinéma ?）。建议把‘时间+动作’做成整句朗读。",
              tcf: "TCF Canada 听力里，活动安排和邀约对话非常常见，常考‘几点、去哪儿、是否接受’。阅读里会出现活动通知和日程信息。掌握频率副词和时间表达，能明显提升信息定位速度。"
            },
            exercises: [
              {
                type: "时间表达填空",
                instruction: "根据中文提示，用法语写出正确时间表达。",
                items: [
                  { prompt: "8:30（八点半）", answer: "huit heures et demie", explanation: "半点用 et demie。" },
                  { prompt: "9:45（差一刻十点）", answer: "dix heures moins le quart", explanation: "差一刻用 moins le quart。" },
                  { prompt: "18:00（十八点）", answer: "dix-huit heures", explanation: "24小时制常用于日程。" },
                  { prompt: "12:15（十二点一刻）", answer: "douze heures et quart", explanation: "一刻用 et quart。" },
                  { prompt: "我七点起床。", answer: "Je me lève à sept heures.", explanation: "时间点前用 à。" }
                ]
              },
              {
                type: "反身动词变位",
                instruction: "把括号中的反身动词变位为正确形式。",
                items: [
                  { prompt: "Je (se lever) _____ à 7h.", answer: "me lève", explanation: "je 对应 me + lève。" },
                  { prompt: "Tu (se coucher) _____ tard le samedi.", answer: "te couches", explanation: "tu 对应 te + couches。" },
                  { prompt: "Nous (se reposer) _____ après le déjeuner.", answer: "nous reposons", explanation: "nous 对应 nous nous reposons。" },
                  { prompt: "Elle ne (se coucher) _____ pas tôt.", answer: "se couche", explanation: "否定包代词和动词：ne se couche pas。" },
                  { prompt: "Ils (se promener) _____ au parc.", answer: "se promènent", explanation: "ils 对应 se + promènent。" }
                ]
              },
              {
                type: "频率副词填空",
                instruction: "从 toujours / souvent / parfois / rarement / jamais 中选最合适词填空。",
                items: [
                  { prompt: "Je prends _____ le bus pour aller au travail (几乎每天).", answer: "souvent", explanation: "表示经常但非100%。" },
                  { prompt: "Il est _____ en retard (每次都不迟到).", answer: "toujours", explanation: "总是准时用 toujours。" },
                  { prompt: "Nous allons _____ au musée (偶尔).", answer: "parfois", explanation: "有时用 parfois。" },
                  { prompt: "Elle ne sort _____ le lundi.", answer: "jamais", explanation: "ne...jamais = 从不。" },
                  { prompt: "Je regarde _____ la télé (几乎不看).", answer: "rarement", explanation: "很少用 rarement。" }
                ]
              },
              {
                type: "改错题",
                instruction: "找出句子中的错误并改正，说明原因。",
                items: [
                  { prompt: "Je lève à sept heures.", answer: "Je me lève à sept heures.", explanation: "反身动词必须带代词 me。" },
                  { prompt: "On va au cinéma demain ? Oui, je peux pas.", answer: "On va au cinéma demain ? Désolé, je ne peux pas.", explanation: "否定需 ne...pas，回应更自然。" },
                  { prompt: "Je viens de suis arrivé.", answer: "Je viens d'arriver.", explanation: "venir de 后接动词原形。" },
                  { prompt: "Il est huit heures demie.", answer: "Il est huit heures et demie.", explanation: "半点需 et demie。" },
                  { prompt: "Je vais jamais au parc.", answer: "Je ne vais jamais au parc.", explanation: "jamais 常与 ne 连用。" }
                ]
              },
              {
                type: "连线匹配",
                instruction: "把左列邀约情境和右列最合适回应连线（选择对应选项）。",
                options: [
                  "a. Oui, avec plaisir !",
                  "b. Désolé(e), je ne peux pas ce soir.",
                  "c. On peut y aller demain ?",
                  "d. Je viens de finir le travail."
                ],
                items: [
                  { prompt: "① 朋友邀请你周五晚上看电影，你很愿意", answer: "a. Oui, avec plaisir !", explanation: "积极接受邀约。" },
                  { prompt: "② 你今晚确实没空，需要婉拒", answer: "b. Désolé(e), je ne peux pas ce soir.", explanation: "礼貌拒绝。" },
                  { prompt: "③ 你想改约到明天", answer: "c. On peut y aller demain ?", explanation: "提出替代时间。" },
                  { prompt: "④ 对方问你现在为什么晚到，你说刚下班", answer: "d. Je viens de finir le travail.", explanation: "venir de 表示刚刚完成。" }
                ]
              },
              {
                type: "语法填空",
                instruction: "阅读下面对话，在每个空格填入最恰当的词（时间表达、反身动词、频率副词或动词形式）。",
                passage: "— Salut, tu fais quoi aujourd'hui ? — Le matin, je (1)_____ à 7h et je (2)_____ à 8h. Je travaille de 9h à 17h. — Tu sors (3)_____ le soir ? — Oui, je sors (4)_____. Le vendredi, on va souvent au cinéma. — Super ! On va au cinéma ce soir ? — Désolée, je ne peux pas. Je viens de (5)_____ le travail et je suis fatiguée. — D'accord. On peut y aller (6)_____ ? — Oui, avec plaisir. On se retrouve à (7)_____ heures et (8)_____ ? — Parfait. Et après, on va boire un café ? — Oui, mais je ne bois (9)_____ de café le soir. Je prends (10)_____ une tisane.",
                items: [
                  { blank: 1, answer: "me lève", explanation: "反身动词：je me lève。" },
                  { blank: 2, answer: "pars", explanation: "这里表示出门上班：je pars。" },
                  { blank: 3, answer: "souvent", explanation: "问频率常用 souvent。" },
                  { blank: 4, answer: "parfois", explanation: "回答补充频率‘有时’。" },
                  { blank: 5, answer: "finir", explanation: "venir de + 动词原形。" },
                  { blank: 6, answer: "demain", explanation: "改约到明天。" },
                  { blank: 7, answer: "dix-neuf", explanation: "19点。" },
                  { blank: 8, answer: "demie", explanation: "半点：et demie。" },
                  { blank: 9, answer: "jamais", explanation: "ne...jamais = 从不。" },
                  { blank: 10, answer: "plutôt", explanation: "Je prends plutôt... = 我更倾向于..." }
                ]
              },
              {
                type: "表达练习",
                instruction: "根据场景写 40-60 个词，安排一次周末活动。至少包含：1个具体时间、1句邀约、1句接受/拒绝、1个频率副词。",
                items: [
                  {
                    prompt: "给朋友发消息，约周末见面并说明你的日程（40-60词）。",
                    modelAnswer: "Salut ! Samedi, je me lève à 8h et je fais souvent du sport le matin. L'après-midi, je suis libre. On va au musée à 15 heures ? Si tu ne peux pas, on peut y aller dimanche. Moi, je suis partante avec plaisir !",
                    keyPoints: [
                      "包含具体时间（如 à 15 heures）",
                      "包含邀约句（On va... ?）",
                      "包含回应句（avec plaisir / je ne peux pas）",
                      "正确使用一个频率副词（souvent/parfois等）",
                      "句子顺序清楚，信息完整",
                      "整体长度控制在 40-60 词"
                    ]
                  }
                ]
              }
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
