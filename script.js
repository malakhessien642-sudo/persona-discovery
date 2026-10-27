/* =========================================
   PERSONA — DISCOVER YOUR INNER SELF
   JavaScript | PART 1
========================================= */

"use strict";

/* =========================================
   1. APP STATE
========================================= */

const state = {
    language: "en",
    currentQuestion: 0,
    answers: {},
    completed: false,
    soundEnabled: false
};

/* =========================================
   2. SELECT HTML ELEMENTS
========================================= */

const elements = {
    welcomeScreen: document.getElementById("welcomeScreen"),
    quizScreen: document.getElementById("quizScreen"),
    resultsScreen: document.getElementById("resultsScreen"),

    startButton: document.getElementById("startButton"),
    languageToggle: document.getElementById("languageToggle"),
    soundToggle: document.getElementById("soundToggle"),

    questionCounter: document.getElementById("questionCounter"),
    progressFill: document.getElementById("progressFill"),
    dimensionName: document.getElementById("dimensionName"),
    questionNumber: document.getElementById("questionNumber"),
    questionTitle: document.getElementById("questionTitle"),
    questionSubtitle: document.getElementById("questionSubtitle"),
    answerList: document.getElementById("answerList"),

    previousButton: document.getElementById("previousButton"),
    nextButton: document.getElementById("nextButton"),

    personalityName: document.getElementById("personalityName"),
    personalityDescription:
        document.getElementById("personalityDescription"),
    resultSymbol: document.getElementById("resultSymbol"),
    resultTags: document.getElementById("resultTags"),
    dimensionResults: document.getElementById("dimensionResults"),
    reflectionText: document.getElementById("reflectionText"),

    restartButton: document.getElementById("restartButton"),
    shareButton: document.getElementById("shareButton"),
    toastMessage: document.getElementById("toastMessage")
};

/* =========================================
   3. TRANSLATIONS
========================================= */

const translations = {

    en: {
        eyebrow: "YOUR INNER WORLD AWAITS",
        titleLineOne: "Discover",
        titleLineTwo: "Your Inner Self",

        heroDescription:
            "A journey beyond the surface. Explore your thoughts, values, emotions, and the hidden patterns that make you unique.",

        questionsLabel: "QUESTIONS",
        dimensionsLabel: "DIMENSIONS",
        discoverLabel: "DISCOVERIES",

        startButton: "Begin Your Journey",
        privacyNote: "✦ A personal journey of self-reflection",

        journeyTag: "THE JOURNEY",
        previousButton: "Previous",
        nextButton: "Continue",

        quizFootnote:
            "There are no right or wrong answers. Be honest with yourself.",

        resultsTag: "YOUR INNER PORTRAIT",
        resultsTitle: "A Little Closer to You",

        resultsDescription:
            "Your answers reveal patterns to reflect on, not limits on who you can become.",

        yourProfile: "YOUR REFLECTION PROFILE",
        dimensionsTag: "SIX DIMENSIONS",
        dimensionsTitle: "Your Inner Landscape",

        dimensionsDescription:
            "Explore the different patterns in your answers.",

        reflectionTitle: "A Thought to Carry With You",
        restartButton: "Begin Again",
        shareButton: "Share My Results",

        resultsDisclaimer:
            "PERSONA is a self-reflection experience, not a clinical or psychological diagnosis.",

        footerText: "An invitation to understand yourself.",

        chooseAnswer: "Choose an answer to continue.",
        firstQuestion: "You are already at the first question.",
        resultsReady: "Your reflection profile is ready.",
        copied: "Your result has been copied.",
        shareUnavailable: "Sharing is unavailable on this device.",

        questionLabel: "QUESTION",
        resultFallback: "The Thoughtful Explorer",

        dimensionNames: [
            "Emotional Awareness",
            "Relationships & Trust",
            "Thinking & Decisions",
            "Values & Principles",
            "Ambition & Challenges",
            "Inner World"
        ]
    },

    ar: {
        eyebrow: "عالمك الداخلي في انتظارك",
        titleLineOne: "اكتشفي",
        titleLineTwo: "عالمك الداخلي",

        heroDescription:
            "رحلة تتجاوز المظاهر لتستكشفي أفكارك وقيمك ومشاعرك والأنماط التي تجعل شخصيتك فريدة.",

        questionsLabel: "سؤالًا",
        dimensionsLabel: "محاور",
        discoverLabel: "اكتشافات",

        startButton: "ابدئي رحلتك",
        privacyNote: "✦ رحلة شخصية لاكتشاف الذات",

        journeyTag: "رحلة الاكتشاف",
        previousButton: "السابق",
        nextButton: "متابعة",

        quizFootnote:
            "لا توجد إجابات صحيحة أو خاطئة. كوني صادقة مع نفسك.",

        resultsTag: "صورتك الداخلية",
        resultsTitle: "خطوة أقرب إلى نفسك",

        resultsDescription:
            "إجاباتك تساعدك على ملاحظة أنماطك الشخصية، لكنها لا تحدد من يمكنك أن تصبحي.",

        yourProfile: "ملامح شخصيتك",
        dimensionsTag: "ستة محاور",
        dimensionsTitle: "عالمك من الداخل",

        dimensionsDescription:
            "اكتشفي الأنماط المختلفة التي تعكسها إجاباتك.",

        reflectionTitle: "فكرة تأخذيها معك",
        restartButton: "ابدئي من جديد",
        shareButton: "شاركي نتيجتك",

        resultsDisclaimer:
            "PERSONA تجربة للتأمل واكتشاف الذات، وليست تشخيصًا نفسيًا أو طبيًا.",

        footerText: "دعوة لفهم نفسك بصورة أعمق.",

        chooseAnswer: "اختاري إجابة عشان تكملي.",
        firstQuestion: "أنتِ بالفعل عند أول سؤال.",
        resultsReady: "نتيجتك جاهزة.",
        copied: "تم نسخ النتيجة.",
        shareUnavailable: "المشاركة غير متاحة على هذا الجهاز.",

        questionLabel: "السؤال",
        resultFallback: "المستكشفة المتأملة",

        dimensionNames: [
            "الوعي بالمشاعر",
            "العلاقات والثقة",
            "التفكير والقرارات",
            "القيم والمبادئ",
            "الطموح والتحديات",
            "العالم الداخلي"
        ]
    }

};/* =========================================
   4. PERSONALITY DIMENSIONS
========================================= */

const dimensions = [
    {
        id: "emotions",
        color: "#37C9A0",
        icon: "✧",
        en: "Emotional Awareness",
        ar: "الوعي بالمشاعر",
        descriptionEn:
            "How you notice, understand, and respond to emotions.",
        descriptionAr:
            "كيف تلاحظين مشاعرك وتفهمينها وتتعاملين معها."
    },
    {
        id: "relationships",
        color: "#D5BC8A",
        icon: "♡",
        en: "Relationships & Trust",
        ar: "العلاقات والثقة",
        descriptionEn:
            "How you build connections, boundaries, and trust.",
        descriptionAr:
            "كيف تبنين علاقاتك وتحددين حدودك وتمنحين الثقة."
    },
    {
        id: "thinking",
        color: "#83B8A4",
        icon: "◇",
        en: "Thinking & Decisions",
        ar: "التفكير والقرارات",
        descriptionEn:
            "How you process information and approach choices.",
        descriptionAr:
            "كيف تعالجين المعلومات وتتعاملين مع الاختيارات."
    },
    {
        id: "values",
        color: "#E5D6B8",
        icon: "✦",
        en: "Values & Principles",
        ar: "القيم والمبادئ",
        descriptionEn:
            "What matters to you and guides your actions.",
        descriptionAr:
            "ما الذي يهمك ويوجه تصرفاتك وقراراتك."
    },
    {
        id: "ambition",
        color: "#0E8F70",
        icon: "↗",
        en: "Ambition & Challenges",
        ar: "الطموح والتحديات",
        descriptionEn:
            "How you approach goals, change, and challenges.",
        descriptionAr:
            "كيف تتعاملين مع الأهداف والتغيير والتحديات."
    },
    {
        id: "innerWorld",
        color: "#B7A5D9",
        icon: "☾",
        en: "Inner World",
        ar: "العالم الداخلي",
        descriptionEn:
            "Your need for reflection, meaning, and personal space.",
        descriptionAr:
            "احتياجك للتأمل والمعنى والمساحة الشخصية."
    }
];

/* =========================================
   5. QUESTION BUILDER
   Each answer has six dimension scores.
========================================= */

function makeQuestion(dimension, en, ar, answers) {
    return {
        dimension,
        en,
        ar,
        answers: answers.map((answer, index) => ({
            id: `a${index + 1}`,
            en: answer.en,
            ar: answer.ar,
            scores: answer.scores
        }))
    };
}

/*
   Score order:
   emotions, relationships, thinking,
   values, ambition, innerWorld

   Scores are reflection indicators, not
   scientific personality measurements.
*//* =========================================
   6. QUESTIONS 01–10
   Dimension: Emotional Awareness
========================================= */

const questions = [

    makeQuestion("emotions",
        "When a strong emotion appears, what do you usually do first?",
        "لما شعور قوي يسيطر عليكِ، إيه أول حاجة بتعمليها؟",
        [
            { en: "I pause and try to understand what I feel.", ar: "بهدأ شوية وبحاول أفهم أنا حاسة بإيه.", scores: [3,0,2,1,0,2] },
            { en: "I talk to someone I trust.", ar: "بتكلم مع شخص بثق فيه.", scores: [2,3,0,0,0,1] },
            { en: "I focus on solving what caused it.", ar: "بركز على حل السبب اللي خلاني أحس كده.", scores: [1,0,3,1,2,0] },
            { en: "I need some time and space before responding.", ar: "بحتاج وقت ومساحة لنفسي قبل ما أتصرف.", scores: [2,0,1,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "How easy is it for you to name what you are feeling?",
        "قد إيه سهل عليكِ تحددي اسم الشعور اللي جواكِ؟",
        [
            { en: "Usually easy; I can describe it clearly.", ar: "غالبًا سهل، وبعرف أوصفه بوضوح.", scores: [3,0,1,0,0,2] },
            { en: "I understand it better after talking.", ar: "بفهمه أكتر لما أتكلم عنه.", scores: [2,3,0,0,0,1] },
            { en: "I analyze the situation before naming the feeling.", ar: "بحلل الموقف الأول قبل ما أحدد شعوري.", scores: [1,0,3,0,1,1] },
            { en: "Sometimes I feel several things at once.", ar: "أحيانًا بحس بأكتر من شعور في نفس الوقت.", scores: [1,0,1,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "When someone misunderstands your intentions, what matters most?",
        "لما حد يفهم نيتك غلط، إيه أكتر حاجة بتهمك؟",
        [
            { en: "Explaining myself calmly.", ar: "إني أوضح قصدي بهدوء.", scores: [2,2,2,2,0,0] },
            { en: "Knowing that our relationship is still okay.", ar: "إني أتأكد إن علاقتنا لسه كويسة.", scores: [2,3,0,1,0,0] },
            { en: "Finding out exactly where the misunderstanding happened.", ar: "إني أعرف بالضبط سوء الفهم حصل فين.", scores: [1,0,3,1,0,1] },
            { en: "Accepting that not everyone will understand me.", ar: "إني أتقبل إن مش كل الناس هتفهمني.", scores: [2,1,1,2,0,2] }
        ]
    ),

    makeQuestion("emotions",
        "How do you usually react when plans suddenly change?",
        "بتتعاملي إزاي غالبًا لما الخطط تتغير فجأة؟",
        [
            { en: "I notice my feelings and adapt gradually.", ar: "بلاحظ مشاعري وبحاول أتأقلم بالتدريج.", scores: [3,0,1,0,1,1] },
            { en: "I check how the change affects everyone involved.", ar: "بشوف التغيير هيأثر على كل الموجودين إزاي.", scores: [1,3,1,1,0,0] },
            { en: "I quickly make a new plan.", ar: "بحط خطة جديدة بسرعة.", scores: [0,0,3,0,3,0] },
            { en: "I need a moment to adjust internally.", ar: "بحتاج لحظة أستوعب التغيير من جوايا.", scores: [2,0,1,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "What helps you recover after a difficult day?",
        "إيه اللي بيساعدك ترجعي لتوازنك بعد يوم صعب؟",
        [
            { en: "Reflecting on what happened and what I learned.", ar: "إني أفكر في اللي حصل واتعلمت منه إيه.", scores: [2,0,3,1,1,2] },
            { en: "Spending time with people who make me feel safe.", ar: "إني أقضي وقت مع ناس بحس معاهم بالأمان.", scores: [1,3,0,0,0,1] },
            { en: "Doing something productive or practical.", ar: "إني أعمل حاجة عملية أو أنجز مهمة.", scores: [0,0,2,0,3,0] },
            { en: "Quiet time alone, without pressure.", ar: "وقت هادي لوحدي من غير ضغط.", scores: [2,0,0,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "When you feel disappointed, what do you tend to focus on?",
        "لما بتحسي بخيبة أمل، بتركزي غالبًا على إيه؟",
        [
            { en: "Understanding why it affected me so much.", ar: "فهم ليه الموقف أثر فيا بالشكل ده.", scores: [3,0,2,0,0,2] },
            { en: "How to communicate my feelings to the people involved.", ar: "إزاي أوصل مشاعري للناس اللي ليهم علاقة بالموقف.", scores: [2,3,0,1,0,0] },
            { en: "What I can change next time.", ar: "إيه اللي أقدر أغيره المرة الجاية.", scores: [1,0,3,0,3,0] },
            { en: "What the experience taught me about myself.", ar: "التجربة علمتني إيه عن نفسي.", scores: [2,0,2,2,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "How do you handle moments when you feel overwhelmed?",
        "بتتعاملي إزاي مع اللحظات اللي بتحسي فيها إن كل حاجة كتير عليكِ؟",
        [
            { en: "I identify what is bothering me most.", ar: "بحدد أكتر حاجة مضايقاني.", scores: [3,0,2,0,1,1] },
            { en: "I reach out to someone supportive.", ar: "بلجأ لشخص بيدعمني.", scores: [2,3,0,0,0,0] },
            { en: "I organize tasks into smaller steps.", ar: "بقسم المهام لخطوات أصغر وأنظمها.", scores: [0,0,3,0,3,0] },
            { en: "I step back and give myself some quiet.", ar: "ببعد شوية وبدي نفسي وقت هادي.", scores: [2,0,0,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "What role does intuition play when you understand your feelings?",
        "الحدس بيلعب دور إزاي في فهمك لمشاعرك؟",
        [
            { en: "It often helps me notice what is happening inside me.", ar: "غالبًا بيساعدني ألاحظ اللي بيحصل جوايا.", scores: [3,0,1,0,0,2] },
            { en: "I compare my feelings with conversations and feedback.", ar: "بقارن مشاعري بالكلام والنقاشات مع الآخرين.", scores: [1,3,1,0,0,0] },
            { en: "I prefer evidence and careful reasoning.", ar: "بفضل الأدلة والتفكير المنطقي.", scores: [0,0,3,1,1,0] },
            { en: "I listen to intuition, then reflect privately.", ar: "بسمع حدسي وبعدها بفكر مع نفسي.", scores: [2,0,2,0,0,3] }
        ]
    ),

    makeQuestion("emotions",
        "When you look back on an important memory, what stands out?",
        "لما تفتكري ذكرى مهمة، إيه أكتر حاجة بتلفت انتباهك؟",
        [
            { en: "How I felt and how I changed.", ar: "كنت حاسة بإيه وإزاي اتغيرت.", scores: [3,0,1,1,0,3] },
            { en: "The people and the connections I experienced.", ar: "الناس والعلاقات اللي عشتها.", scores: [1,3,0,1,0,1] },
            { en: "The decisions and events that shaped the outcome.", ar: "القرارات والأحداث اللي أثرت في النتيجة.", scores: [0,0,3,1,2,0] },
            { en: "The lesson that still guides me today.", ar: "الدرس اللي لسه بيوجهني لحد النهارده.", scores: [1,0,2,3,1,1] }
        ]
    ),

    makeQuestion("emotions",
        "Which statement feels closest to your relationship with your emotions?",
        "أنهي جملة أقرب لطريقتك في التعامل مع مشاعرك؟",
        [
            { en: "My emotions help me understand what matters to me.", ar: "مشاعري بتساعدني أفهم إيه المهم بالنسبالي.", scores: [3,0,1,2,0,1] },
            { en: "My emotions often make more sense when I share them.", ar: "مشاعري بتبقى أوضح لما أشاركها مع حد.", scores: [2,3,0,0,0,0] },
            { en: "I try to understand my emotions without letting them decide everything.", ar: "بحاول أفهم مشاعري من غير ما أخليها تقرر كل حاجة.", scores: [2,0,3,2,1,0] },
            { en: "My emotions are part of a private world I keep exploring.", ar: "مشاعري جزء من عالم خاص جوايا لسه بستكشفه.", scores: [2,0,1,0,0,3] }
        ]
    )

];/* =========================================
   QUESTIONS 11–20
   Dimensions: Relationships & Trust
========================================= */

    ,

    makeQuestion("relationships",
        "What helps you trust someone over time?",
        "إيه اللي بيخليكي تثقي في شخص مع الوقت؟",
        [
            { en: "Their actions consistently match their words.", ar: "أفعاله تكون دايمًا متوافقة مع كلامه.", scores: [1,3,1,3,0,0] },
            { en: "I feel comfortable being honest around them.", ar: "أحس إني مرتاحة أكون صريحة معاه.", scores: [2,3,0,1,0,1] },
            { en: "They respect my boundaries and decisions.", ar: "يحترم حدودي وقراراتي.", scores: [1,3,1,3,0,1] },
            { en: "Trust develops naturally as I get to know them.", ar: "الثقة بتتكون بالتدريج كل ما أعرفه أكتر.", scores: [1,2,2,1,0,2] }
        ]
    ),

    makeQuestion("relationships",
        "When a friend is upset, what do you usually do?",
        "لما صديقة ليكي تكون متضايقة، بتعملي إيه غالبًا؟",
        [
            { en: "Listen carefully without rushing to give advice.", ar: "بسمعها كويس من غير ما أستعجل وأدي نصايح.", scores: [2,3,0,1,0,0] },
            { en: "Help her look for practical solutions.", ar: "بساعدها تدور على حلول عملية.", scores: [1,2,3,0,2,0] },
            { en: "Give her space if she seems to need it.", ar: "بديها مساحتها لو حاسة إنها محتاجاها.", scores: [2,2,1,2,0,2] },
            { en: "Ask what kind of support would help most.", ar: "بسألها إيه نوع الدعم اللي محتاجاه.", scores: [2,3,2,1,0,0] }
        ]
    ),

    makeQuestion("relationships",
        "How do you usually respond when someone sets a boundary?",
        "بتتعاملي إزاي لما حد يحدد حدود في التعامل معاكي؟",
        [
            { en: "I respect it, even when I feel disappointed.", ar: "بحترمها حتى لو كنت متضايقة.", scores: [2,3,0,3,0,0] },
            { en: "I ask questions if I need to understand it better.", ar: "بسأل لو محتاجة أفهمها أكتر.", scores: [1,2,3,1,0,0] },
            { en: "I reflect on whether I crossed a line.", ar: "براجع نفسي وأشوف إذا كنت تجاوزت حدودي.", scores: [2,1,2,3,0,2] },
            { en: "I appreciate clear boundaries because they reduce confusion.", ar: "بقدر الحدود الواضحة لأنها بتقلل سوء الفهم.", scores: [1,3,2,3,0,0] }
        ]
    ),

    makeQuestion("relationships",
        "What matters most during a disagreement?",
        "إيه أكتر حاجة بتهمك وقت الخلاف؟",
        [
            { en: "Understanding each other's feelings.", ar: "إن كل واحد يفهم مشاعر التاني.", scores: [2,3,0,1,0,0] },
            { en: "Finding a fair and logical solution.", ar: "نوصل لحل عادل ومنطقي.", scores: [1,1,3,3,1,0] },
            { en: "Protecting respect, even when we disagree.", ar: "نحافظ على الاحترام حتى لو مختلفين.", scores: [1,3,1,3,0,0] },
            { en: "Taking time to think before continuing.", ar: "ناخد وقت نفكر قبل ما نكمل النقاش.", scores: [2,1,2,0,0,3] }
        ]
    ),

    makeQuestion("relationships",
        "How do you feel about asking others for help?",
        "إحساسك إيه تجاه إنك تطلبي مساعدة من غيرك؟",
        [
            { en: "I can ask when I genuinely need support.", ar: "بقدر أطلب المساعدة لما أحتاجها فعلًا.", scores: [2,3,1,1,0,0] },
            { en: "I prefer trying independently first.", ar: "بفضل أحاول بنفسي الأول.", scores: [1,1,2,1,3,1] },
            { en: "It depends on how safe and understood I feel.", ar: "الموضوع بيعتمد على مدى إحساسي بالأمان والتفاهم.", scores: [2,3,0,1,0,2] },
            { en: "I am learning that asking for help can be a strength.", ar: "لسه بتعلم إن طلب المساعدة ممكن يكون قوة.", scores: [2,2,2,2,2,1] }
        ]
    ),

    makeQuestion("relationships",
        "When someone gives you constructive criticism, what is your first response?",
        "لما حد يوجهلك نقد هدفه التحسين، إيه أول رد فعل عندك؟",
        [
            { en: "I consider whether the feedback is fair.", ar: "بفكر إذا كان النقد عادل ومفيد.", scores: [1,1,3,2,1,0] },
            { en: "I notice how the words make me feel.", ar: "بلاحظ الكلام خلاني أحس بإيه.", scores: [3,2,0,0,0,1] },
            { en: "I look for something I can improve.", ar: "بدور على حاجة أقدر أحسنها.", scores: [1,0,2,1,3,0] },
            { en: "I need time before deciding how to respond.", ar: "بحتاج وقت قبل ما أحدد هرد إزاي.", scores: [2,1,2,0,0,3] }
        ]
    ),

    makeQuestion("relationships",
        "What makes a conversation feel meaningful to you?",
        "إيه اللي بيخلي الحوار بالنسبة لكِ له معنى؟",
        [
            { en: "Being able to speak honestly and feel heard.", ar: "إني أتكلم بصراحة وأحس إن الطرف التاني سامعني.", scores: [2,3,0,2,0,1] },
            { en: "Exchanging thoughtful ideas and perspectives.", ar: "نتبادل أفكار ووجهات نظر عميقة.", scores: [1,1,3,1,0,2] },
            { en: "Learning something that changes my perspective.", ar: "أتعلم حاجة تغير وجهة نظري.", scores: [1,1,3,2,2,1] },
            { en: "Feeling connected without needing many words.", ar: "أحس بالتواصل حتى من غير كلام كتير.", scores: [2,3,0,1,0,2] }
        ]
    ),

    makeQuestion("relationships",
        "If a relationship starts feeling one-sided, what would you do?",
        "لو حسيتي إن العلاقة بقت من طرف واحد، غالبًا هتعملي إيه؟",
        [
            { en: "Talk openly about what feels unbalanced.", ar: "أتكلم بصراحة عن الحاجات اللي مش متوازنة.", scores: [2,3,2,2,0,0] },
            { en: "Observe whether the pattern changes over time.", ar: "أراقب إذا كان الوضع هيتغير مع الوقت.", scores: [1,1,3,1,0,2] },
            { en: "Set clearer limits on what I can give.", ar: "أحدد حدود أوضح للي أقدر أقدمه.", scores: [2,2,1,3,0,1] },
            { en: "Reflect on what I need from the relationship.", ar: "أفكر في احتياجاتي من العلاقة.", scores: [2,2,2,2,0,3] }
        ]
    ),

    makeQuestion("relationships",
        "How do you approach meeting people with different views?",
        "بتتعاملي إزاي مع ناس عندهم وجهات نظر مختلفة عنكِ؟",
        [
            { en: "I listen and try to understand their perspective.", ar: "بسمعهم وبحاول أفهم وجهة نظرهم.", scores: [1,3,2,2,0,0] },
            { en: "I respectfully explain my own position.", ar: "بشرح وجهة نظري باحترام.", scores: [1,2,2,3,0,0] },
            { en: "I enjoy comparing ideas and questioning assumptions.", ar: "بحب أقارن الأفكار وأراجع المسلّمات.", scores: [0,1,3,1,1,1] },
            { en: "I accept that we may not reach the same conclusion.", ar: "بتقبل إننا ممكن مانتفقش في النهاية.", scores: [2,2,1,3,0,2] }
        ]
    ),

    makeQuestion("relationships",
        "What do you value most in a close friendship?",
        "إيه أكتر حاجة بتقدريها في الصداقة القريبة؟",
        [
            { en: "Honesty and reliability.", ar: "الصدق والاعتمادية.", scores: [1,3,1,3,0,0] },
            { en: "Emotional support and understanding.", ar: "الدعم العاطفي والتفاهم.", scores: [3,3,0,1,0,0] },
            { en: "Encouraging each other to grow.", ar: "إننا نشجع بعض على التطور.", scores: [1,2,1,2,3,0] },
            { en: "Respecting each other's independence.", ar: "احترام استقلال كل واحد فينا.", scores: [1,2,1,3,0,2] }
        ]
    ),/* =========================================
   QUESTIONS 21–30
   Dimension: Thinking & Decisions
========================================= */

    makeQuestion("thinking",
        "When facing an important decision, where do you begin?",
        "لما تواجهي قرار مهم، بتبدأي منين؟",
        [
            { en: "I compare the facts and possible outcomes.", ar: "بقارن الحقائق والنتائج المحتملة.", scores: [0,0,3,2,1,0] },
            { en: "I consider how the decision will affect people.", ar: "بفكر القرار هيأثر على الناس إزاي.", scores: [1,3,2,2,0,0] },
            { en: "I consider what feels right for me.", ar: "بفكر إيه الاختيار اللي حاسة إنه مناسب ليا.", scores: [2,0,1,2,0,2] },
            { en: "I define my goal and work backward.", ar: "بحدد هدفي وببدأ أخطط من النتيجة للخطوات.", scores: [0,0,2,1,3,0] }
        ]
    ),

    makeQuestion("thinking",
        "What do you usually do when information is unclear?",
        "بتعملي إيه لما المعلومات تكون مش واضحة؟",
        [
            { en: "Research until I understand the situation better.", ar: "بدور وأبحث لحد ما أفهم الموقف أكتر.", scores: [0,0,3,1,1,1] },
            { en: "Ask someone knowledgeable for another perspective.", ar: "بسأل شخص عنده معرفة عشان أشوف وجهة نظر تانية.", scores: [0,2,3,0,0,0] },
            { en: "Accept uncertainty until more becomes clear.", ar: "بتقبل إن في حاجات مش واضحة لحد ما الصورة تكمل.", scores: [1,0,2,1,0,3] },
            { en: "Make the best decision possible with what I know.", ar: "باخد أفضل قرار أقدر عليه بالمعلومات المتاحة.", scores: [0,0,3,1,3,0] }
        ]
    ),

    makeQuestion("thinking",
        "When a problem seems complicated, what helps you most?",
        "لما المشكلة تبقى معقدة، إيه أكتر حاجة بتساعدك؟",
        [
            { en: "Breaking it into smaller parts.", ar: "إني أقسمها لأجزاء صغيرة.", scores: [0,0,3,0,3,0] },
            { en: "Discussing it with someone who thinks differently.", ar: "إني أناقشها مع حد بيفكر بطريقة مختلفة.", scores: [0,2,3,0,1,0] },
            { en: "Stepping back to see the bigger picture.", ar: "إني أبعد خطوة وأشوف الصورة كاملة.", scores: [1,0,2,1,0,3] },
            { en: "Trying different approaches until one works.", ar: "إني أجرب طرق مختلفة لحد ما أوصل لحل.", scores: [0,0,2,0,3,0] }
        ]
    ),

    makeQuestion("thinking",
        "How do you react when someone challenges your opinion?",
        "بتتفاعلي إزاي لما حد يعترض على رأيك؟",
        [
            { en: "I examine their reasons and reconsider my view.", ar: "براجع أسباب اعتراضه وبفكر في رأيي من جديد.", scores: [1,1,3,2,0,1] },
            { en: "I explain my reasoning and listen to theirs.", ar: "بشرح أسباب رأيي وبسمع أسباب رأيه.", scores: [0,2,3,2,0,0] },
            { en: "I need time to think before discussing it.", ar: "بحتاج وقت أفكر قبل ما أناقش الموضوع.", scores: [1,0,2,0,0,3] },
            { en: "I change my mind when the evidence supports it.", ar: "بغير رأيي لما ألاقي أدلة تدعم وجهة النظر التانية.", scores: [0,0,3,3,1,0] }
        ]
    ),

    makeQuestion("thinking",
        "Which best describes your planning style?",
        "أنهي وصف أقرب لطريقتك في التخطيط؟",
        [
            { en: "I prefer clear steps and organized plans.", ar: "بفضل الخطوات الواضحة والخطط المنظمة.", scores: [0,0,3,1,3,0] },
            { en: "I set a direction but leave room for change.", ar: "بحدد اتجاه عام وبسيب مساحة للتغيير.", scores: [0,0,2,1,3,2] },
            { en: "I think things through privately before acting.", ar: "بفكر في التفاصيل مع نفسي قبل ما أتصرف.", scores: [1,0,3,1,0,3] },
            { en: "I adapt as new opportunities appear.", ar: "بتأقلم مع الظروف والفرص الجديدة.", scores: [0,1,2,0,3,1] }
        ]
    ),

    makeQuestion("thinking",
        "When you make a mistake, what do you focus on first?",
        "لما تغلطي في حاجة، بتركزي على إيه الأول؟",
        [
            { en: "Understanding exactly what went wrong.", ar: "إني أفهم بالضبط إيه اللي حصل غلط.", scores: [1,0,3,1,1,1] },
            { en: "Making things right with anyone affected.", ar: "إني أصلح الموقف مع أي حد اتأثر.", scores: [1,3,1,3,0,0] },
            { en: "Learning a lesson for next time.", ar: "إني أتعلم درس يفيدني المرة الجاية.", scores: [1,0,2,2,3,1] },
            { en: "Understanding why I reacted the way I did.", ar: "إني أفهم ليه تصرفت بالطريقة دي.", scores: [3,0,2,0,0,2] }
        ]
    ),

    makeQuestion("thinking",
        "How do you handle having several options to choose from?",
        "بتتعاملي إزاي لما يكون قدامك اختيارات كتير؟",
        [
            { en: "Compare the advantages and disadvantages.", ar: "بقارن المميزات والعيوب.", scores: [0,0,3,1,1,0] },
            { en: "Choose the option that aligns with my values.", ar: "باختار اللي يتوافق مع قيمي ومبادئي.", scores: [1,0,2,3,1,0] },
            { en: "Consider which option supports my long-term goals.", ar: "بشوف أنهي اختيار يخدم أهدافي على المدى البعيد.", scores: [0,0,2,1,3,1] },
            { en: "Take time to notice what matters most to me.", ar: "بدي نفسي وقت عشان أحدد إيه الأهم بالنسبالي.", scores: [2,0,1,2,0,3] }
        ]
    ),

    makeQuestion("thinking",
        "What do you do when a plan fails unexpectedly?",
        "بتعملي إيه لما خطة تفشل بشكل غير متوقع؟",
        [
            { en: "Analyze the cause and adjust the plan.", ar: "بحلل السبب وبعدل الخطة.", scores: [0,0,3,0,3,0] },
            { en: "Look for an alternative solution quickly.", ar: "بدور بسرعة على حل بديل.", scores: [0,0,2,0,3,0] },
            { en: "Pause and process my reaction before continuing.", ar: "بقف شوية وأستوعب رد فعلي قبل ما أكمل.", scores: [3,0,1,0,0,2] },
            { en: "Ask others for ideas I may have missed.", ar: "بطلب أفكار من غيري يمكن تكون غابت عني.", scores: [0,2,3,0,1,0] }
        ]
    ),

    makeQuestion("thinking",
        "Which question do you ask yourself most often?",
        "أنهي سؤال بتسأليه لنفسك كتير؟",
        [
            { en: "What is the evidence behind this?", ar: "إيه الدليل اللي بيدعم الكلام ده؟", scores: [0,0,3,1,0,0] },
            { en: "How will this affect the people involved?", ar: "ده هيأثر على الناس المعنية إزاي؟", scores: [1,3,1,2,0,0] },
            { en: "Does this fit the person I want to become?", ar: "هل ده مناسب للشخص اللي عايزة أبقى عليه؟", scores: [1,0,2,3,2,1] },
            { en: "What might I discover if I look deeper?", ar: "ممكن أكتشف إيه لو بصيت للموضوع بعمق أكتر؟", scores: [1,0,2,0,0,3] }
        ]
    ),

    makeQuestion("thinking",
        "How do you decide whether to continue or change direction?",
        "بتحددي إزاي إذا كنتِ تكملي في طريقك أو تغيري اتجاهك؟",
        [
            { en: "I review the results and available evidence.", ar: "براجع النتائج والأدلة المتاحة.", scores: [0,0,3,1,2,0] },
            { en: "I compare the path with my core values.", ar: "بشوف الطريق ده متوافق مع مبادئي ولا لأ.", scores: [1,0,2,3,1,1] },
            { en: "I consider what I have learned about myself.", ar: "بفكر في اللي اتعلمته عن نفسي.", scores: [2,0,2,1,1,3] },
            { en: "I focus on which choice gives me room to grow.", ar: "بركز على الاختيار اللي هيديني فرصة أكبر للتطور.", scores: [0,0,2,1,3,1] }
        ]
    ),/* =========================================
   QUESTIONS 31–40
   Dimension: Values & Principles
========================================= */

    makeQuestion("values",
        "When making a difficult choice, what guides you most?",
        "لما تاخدي قرار صعب، إيه أكتر حاجة بتوجّهك؟",
        [
            { en: "Staying true to my principles.", ar: "إني أتمسك بمبادئي.", scores: [1,0,1,3,1,1] },
            { en: "Considering how my choice affects others.", ar: "إني أراعي تأثير قراري على الآخرين.", scores: [1,3,1,3,0,0] },
            { en: "Choosing the most logical option.", ar: "إني أختار الحل الأكثر منطقية.", scores: [0,0,3,1,1,0] },
            { en: "Choosing the path that feels meaningful to me.", ar: "إني أختار الطريق اللي له معنى بالنسبالي.", scores: [2,0,1,2,1,3] }
        ]
    ),

    makeQuestion("values",
        "What does honesty mean to you?",
        "الصدق معناه إيه بالنسبة لكِ؟",
        [
            { en: "Being truthful, even when it is uncomfortable.", ar: "إني أقول الحقيقة حتى لو كانت صعبة.", scores: [1,2,1,3,0,0] },
            { en: "Being sincere while respecting people's feelings.", ar: "إني أكون صادقة مع مراعاة مشاعر الناس.", scores: [2,3,0,3,0,0] },
            { en: "Being accurate and avoiding assumptions.", ar: "إني أكون دقيقة وأتجنب الافتراضات.", scores: [0,0,3,2,0,0] },
            { en: "Being honest with myself about who I am.", ar: "إني أكون صادقة مع نفسي بشأن حقيقتي.", scores: [2,0,1,3,0,3] }
        ]
    ),

    makeQuestion("values",
        "When your values differ from those around you, what do you do?",
        "لما مبادئك تختلف عن مبادئ اللي حواليكِ، بتتصرفي إزاي؟",
        [
            { en: "Stand by my values while remaining respectful.", ar: "بتمسك بمبادئي مع احترام الآخرين.", scores: [1,2,1,3,0,1] },
            { en: "Listen carefully and reconsider if needed.", ar: "بسمع كويس وبراجع موقفي لو لزم الأمر.", scores: [1,2,3,2,0,0] },
            { en: "Look for common ground without abandoning what matters.", ar: "بدور على نقطة مشتركة من غير ما أتنازل عن المهم بالنسبالي.", scores: [1,3,2,3,0,0] },
            { en: "Reflect privately before deciding how to respond.", ar: "بفكر مع نفسي قبل ما أحدد هرد إزاي.", scores: [1,0,1,2,0,3] }
        ]
    ),

    makeQuestion("values",
        "What makes you feel proud of a decision?",
        "إيه اللي بيخليكي فخورة بقرار أخدتيه؟",
        [
            { en: "It reflects my principles.", ar: "إنه بيعكس مبادئي.", scores: [1,0,1,3,1,0] },
            { en: "It helped someone without compromising fairness.", ar: "إنه ساعد حد من غير ما يخل بالعدل.", scores: [1,3,1,3,0,0] },
            { en: "I considered the consequences carefully.", ar: "إني درست النتائج بعناية.", scores: [0,0,3,2,1,0] },
            { en: "It helped me grow into a person I respect.", ar: "إنه ساعدني أبقى شخص أنا بحترمه.", scores: [2,0,1,2,2,2] }
        ]
    ),

    makeQuestion("values",
        "How do you define success for yourself?",
        "بتعرّفي النجاح بالنسبة لنفسك إزاي؟",
        [
            { en: "Living according to what I believe matters.", ar: "إني أعيش وفقًا للحاجات اللي مؤمنة بأهميتها.", scores: [1,0,1,3,1,1] },
            { en: "Building meaningful connections with others.", ar: "إني أبني علاقات إنسانية لها معنى.", scores: [2,3,0,2,0,1] },
            { en: "Achieving goals through thoughtful effort.", ar: "إني أحقق أهدافي بمجهود وتفكير.", scores: [0,0,2,1,3,0] },
            { en: "Understanding myself and living with purpose.", ar: "إني أفهم نفسي وأعيش بهدف ومعنى.", scores: [2,0,1,2,1,3] }
        ]
    ),

    makeQuestion("values",
        "When you witness something unfair, what matters most?",
        "لما تشوفي موقف غير عادل، إيه أكتر حاجة بتهمك؟",
        [
            { en: "Speaking up for what is right.", ar: "إني أتكلم وأدافع عن الصح.", scores: [1,2,1,3,1,0] },
            { en: "Understanding everyone involved before acting.", ar: "إني أفهم كل الأطراف قبل ما أتصرف.", scores: [1,2,3,2,0,0] },
            { en: "Finding a practical way to improve the situation.", ar: "إني ألاقي طريقة عملية لتحسين الموقف.", scores: [0,1,2,2,3,0] },
            { en: "Reflecting on why the situation conflicts with my values.", ar: "إني أفكر ليه الموقف بيتعارض مع مبادئي.", scores: [2,0,1,3,0,2] }
        ]
    ),

    makeQuestion("values",
        "What role does responsibility play in your life?",
        "المسؤولية بتمثل إيه في حياتك؟",
        [
            { en: "Keeping my promises and commitments.", ar: "إني أوفي بوعودي والتزاماتي.", scores: [0,2,1,3,2,0] },
            { en: "Being dependable for people I care about.", ar: "إني أكون شخص يُعتمد عليه بالنسبة للناس اللي بهتم بيهم.", scores: [1,3,0,3,1,0] },
            { en: "Taking ownership and learning from outcomes.", ar: "إني أتحمل نتيجة قراراتي وأتعلم منها.", scores: [1,0,2,3,2,1] },
            { en: "Balancing obligations with personal well-being.", ar: "إني أوازن بين مسؤولياتي وراحتي الشخصية.", scores: [2,1,1,2,0,3] }
        ]
    ),

    makeQuestion("values",
        "How do you respond when success requires compromising a principle?",
        "بتتصرفي إزاي لو النجاح محتاج منك تتنازلي عن مبدأ؟",
        [
            { en: "I would rather protect the principle.", ar: "أفضل إني أحافظ على مبدئي.", scores: [1,0,1,3,0,1] },
            { en: "I examine whether the compromise is truly necessary.", ar: "بفحص إذا كان التنازل ضروري فعلًا.", scores: [0,0,3,2,1,0] },
            { en: "I search for another path that respects both.", ar: "بدور على طريق تاني يحترم الاتنين.", scores: [0,1,2,3,3,0] },
            { en: "I take time to understand what the choice means to me.", ar: "باخد وقت أفهم الاختيار ده معناه إيه بالنسبالي.", scores: [2,0,1,2,0,3] }
        ]
    ),

    makeQuestion("values",
        "Which quality do you most admire in another person?",
        "أنهي صفة بتعجِبك أكتر في شخص تاني؟",
        [
            { en: "Integrity: doing what is right consistently.", ar: "النزاهة: إنه يعمل الصح باستمرار.", scores: [0,1,1,3,1,0] },
            { en: "Compassion: caring about how others feel.", ar: "التعاطف: إنه يهتم بمشاعر الآخرين.", scores: [2,3,0,2,0,0] },
            { en: "Wisdom: thinking carefully before acting.", ar: "الحكمة: إنه يفكر بعناية قبل ما يتصرف.", scores: [0,0,3,2,0,1] },
            { en: "Courage: growing despite uncertainty.", ar: "الشجاعة: إنه يتطور رغم عدم اليقين.", scores: [1,0,1,2,3,1] }
        ]
    ),

    makeQuestion("values",
        "What do you hope people remember about you?",
        "تتمني الناس تفتكرك بإيه؟",
        [
            { en: "That I stayed true to who I am.", ar: "إني فضلت متمسكة بحقيقتي ومبادئي.", scores: [1,0,1,3,1,2] },
            { en: "That I made people feel respected and understood.", ar: "إني خليت الناس تحس بالاحترام والتفاهم.", scores: [2,3,0,2,0,0] },
            { en: "That I contributed something useful.", ar: "إني قدمت حاجة مفيدة.", scores: [0,1,2,2,3,0] },
            { en: "That I kept learning and growing.", ar: "إني فضلت أتعلم وأتطور.", scores: [1,0,2,1,3,2] }
        ]
    ),/* =========================================
   QUESTIONS 41–50
   Dimension: Ambition & Challenges
========================================= */

    makeQuestion("ambition",
        "When you set a meaningful goal, what motivates you most?",
        "لما بتحطي هدف مهم ليكي، إيه أكتر حاجة بتحفزك؟",
        [
            { en: "Seeing measurable progress.", ar: "إني أشوف تقدم واضح أقدر أقيسه.", scores: [0,0,2,1,3,0] },
            { en: "Knowing the goal has personal meaning.", ar: "إني أكون عارفة إن الهدف له معنى بالنسبالي.", scores: [1,0,1,2,2,2] },
            { en: "Sharing the journey with supportive people.", ar: "إني أشارك الرحلة مع ناس بتدعمني.", scores: [1,3,0,1,2,0] },
            { en: "Discovering what I am capable of learning.", ar: "إني أكتشف قدراتي والحاجات اللي أقدر أتعلمها.", scores: [0,0,2,1,3,2] }
        ]
    ),

    makeQuestion("ambition",
        "How do you approach a challenge you have never faced before?",
        "بتتعاملي إزاي مع تحدٍ جديد عمرك ما واجهتيه قبل كده؟",
        [
            { en: "Research it and prepare carefully.", ar: "ببحث عنه وبستعد له بعناية.", scores: [0,0,3,1,2,0] },
            { en: "Start small and learn along the way.", ar: "ببدأ بخطوات صغيرة وبتعلم في الطريق.", scores: [0,0,2,0,3,0] },
            { en: "Ask experienced people for guidance.", ar: "بطلب التوجيه من ناس عندها خبرة.", scores: [0,2,2,0,2,0] },
            { en: "Reflect on what makes the challenge meaningful to me.", ar: "بفكر في إيه اللي بيخلي التحدي ده مهم بالنسبالي.", scores: [1,0,1,2,1,3] }
        ]
    ),

    makeQuestion("ambition",
        "What do you usually do when progress feels slow?",
        "بتعملي إيه لما تحسي إن تقدمك بطيء؟",
        [
            { en: "Review my strategy and adjust it.", ar: "براجع طريقتي وبحاول أعدلها.", scores: [0,0,3,0,3,0] },
            { en: "Remind myself why I started.", ar: "بفكر نفسي أنا بدأت ليه من الأساس.", scores: [1,0,1,2,3,1] },
            { en: "Recognize small achievements along the way.", ar: "بقدر الإنجازات الصغيرة اللي حققتها.", scores: [2,0,1,1,2,1] },
            { en: "Take a break and return with a clearer mind.", ar: "باخد راحة وبرجع بذهن أصفى.", scores: [2,0,1,0,1,3] }
        ]
    ),

    makeQuestion("ambition",
        "How do you define a worthwhile challenge?",
        "إيه اللي بيخلي التحدي يستحق إنك تخوضيه؟",
        [
            { en: "It helps me develop useful skills.", ar: "إنه يساعدني أطور مهارات مفيدة.", scores: [0,0,2,1,3,0] },
            { en: "It aligns with my values and purpose.", ar: "إنه يتوافق مع قيمي والهدف اللي بسعى له.", scores: [1,0,1,3,2,1] },
            { en: "It creates a chance to contribute to others.", ar: "إنه يفتح فرصة إني أقدم حاجة مفيدة للآخرين.", scores: [1,2,1,2,2,0] },
            { en: "It teaches me something about myself.", ar: "إنه يعلمني حاجة جديدة عن نفسي.", scores: [2,0,1,1,1,3] }
        ]
    ),

    makeQuestion("ambition",
        "When you receive an unexpected opportunity, what do you consider first?",
        "لما تيجي لك فرصة غير متوقعة، إيه أول حاجة بتفكري فيها؟",
        [
            { en: "Whether it supports my long-term goals.", ar: "هل هتساعدني أحقق أهدافي على المدى البعيد؟", scores: [0,0,2,1,3,0] },
            { en: "Whether I can manage the responsibilities involved.", ar: "هل أقدر أتحمل المسؤوليات اللي هتيجي معاها؟", scores: [0,0,3,2,2,0] },
            { en: "How it fits with my current priorities.", ar: "هل مناسبة لأولوياتي الحالية؟", scores: [1,0,2,3,1,1] },
            { en: "What new experiences I might gain.", ar: "إيه الخبرات الجديدة اللي ممكن أكتسبها؟", scores: [0,0,1,0,3,2] }
        ]
    ),

    makeQuestion("ambition",
        "How do you respond when something you worked for does not succeed?",
        "بتتعاملي إزاي لما حاجة تعبتي عشانها ما تنجحش؟",
        [
            { en: "Study what happened and try a different approach.", ar: "بفهم اللي حصل وبجرب طريقة مختلفة.", scores: [1,0,3,0,3,0] },
            { en: "Give myself time to process the disappointment.", ar: "بدي نفسي وقت أستوعب خيبة الأمل.", scores: [3,0,1,0,0,2] },
            { en: "Ask for feedback and learn from others.", ar: "بطلب آراء الآخرين وبتعلم منهم.", scores: [0,2,3,0,2,0] },
            { en: "Reconsider whether the goal still matters to me.", ar: "براجع إذا كان الهدف لسه مهم بالنسبالي.", scores: [1,0,2,3,1,2] }
        ]
    ),

    makeQuestion("ambition",
        "Which working style suits you best?",
        "أنهي طريقة شغل بتناسبك أكتر؟",
        [
            { en: "A structured plan with clear milestones.", ar: "خطة منظمة بمراحل واضحة.", scores: [0,0,3,1,3,0] },
            { en: "Freedom to experiment and explore ideas.", ar: "حرية التجربة واستكشاف الأفكار.", scores: [0,0,2,0,3,2] },
            { en: "Collaborating with people toward a shared goal.", ar: "التعاون مع ناس عشان نحقق هدف مشترك.", scores: [0,3,1,1,3,0] },
            { en: "Independent work with time to think deeply.", ar: "شغل مستقل مع وقت كافي للتفكير العميق.", scores: [1,0,2,0,2,3] }
        ]
    ),

    makeQuestion("ambition",
        "How do you decide when to leave your comfort zone?",
        "بتحددي إزاي إمتى تخرجي من منطقة راحتك؟",
        [
            { en: "When staying still limits my growth.", ar: "لما أحس إن الاستمرار زي ما أنا بيحد من تطوري.", scores: [0,0,1,1,3,1] },
            { en: "When the change aligns with my values.", ar: "لما التغيير يكون متوافق مع مبادئي.", scores: [1,0,1,3,2,1] },
            { en: "After understanding the risks and possible outcomes.", ar: "بعد ما أفهم المخاطر والنتائج المحتملة.", scores: [0,0,3,1,2,0] },
            { en: "When I feel ready to explore something new.", ar: "لما أحس إني مستعدة أستكشف حاجة جديدة.", scores: [2,0,1,0,2,2] }
        ]
    ),

    makeQuestion("ambition",
        "What does personal growth mean to you?",
        "التطور الشخصي معناه إيه بالنسبة لكِ؟",
        [
            { en: "Becoming more capable and skilled.", ar: "إني أبقى أكثر كفاءة ومهارة.", scores: [0,0,2,1,3,0] },
            { en: "Becoming more aware of my emotions and choices.", ar: "إني أبقى أكثر وعيًا بمشاعري واختياراتي.", scores: [3,0,1,1,1,2] },
            { en: "Building healthier and more meaningful relationships.", ar: "إني أبني علاقات أصح وليها معنى.", scores: [1,3,0,2,1,0] },
            { en: "Living more consistently with my beliefs.", ar: "إني أعيش بطريقة أقرب لمبادئي ومعتقداتي.", scores: [1,0,1,3,1,2] }
        ]
    ),

    makeQuestion("ambition",
        "When several goals compete for your attention, what do you do?",
        "لما يكون عندك أكتر من هدف محتاج اهتمامك، بتعملي إيه؟",
        [
            { en: "Rank them by importance and urgency.", ar: "برتبهم حسب الأهمية والاستعجال.", scores: [0,0,3,1,3,0] },
            { en: "Choose the one most aligned with my priorities.", ar: "باختار الهدف الأقرب لأولوياتي.", scores: [0,0,2,3,2,0] },
            { en: "Consider which one matters most in the long run.", ar: "بفكر أنهي هدف أهم على المدى البعيد.", scores: [0,0,2,1,3,1] },
            { en: "Pause to reflect before committing my time.", ar: "بقف شوية أفكر قبل ما ألتزم بوقتي.", scores: [1,0,1,1,1,3] }
        ]
    ),/* =========================================
   QUESTIONS 51–60
   Dimension: Inner World
========================================= */

    makeQuestion("innerWorld",
        "When you have time alone, what do you enjoy most?",
        "لما يكون عندك وقت تقضيه لوحدك، إيه أكتر حاجة بتحبيها؟",
        [
            { en: "Reflecting on my experiences and feelings.", ar: "إني أتأمل تجاربي ومشاعري.", scores: [2,0,1,1,0,3] },
            { en: "Learning something new or exploring ideas.", ar: "إني أتعلم حاجة جديدة أو أستكشف أفكار.", scores: [0,0,3,1,2,2] },
            { en: "Planning what I want to achieve next.", ar: "إني أخطط للحاجات اللي عايزة أحققها بعد كده.", scores: [0,0,2,1,3,0] },
            { en: "Enjoying quiet activities that help me recharge.", ar: "إني أستمتع بحاجات هادية بتساعدني أستعيد طاقتي.", scores: [2,0,0,0,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "How often do you question your own assumptions?",
        "قد إيه بتراجعي الأفكار اللي بتعتبريها مسلّمات عندك؟",
        [
            { en: "Often; I like examining why I believe something.", ar: "كتير، بحب أفهم ليه مؤمنة بفكرة معينة.", scores: [1,0,3,2,0,2] },
            { en: "When new evidence or experiences appear.", ar: "لما تظهر أدلة أو تجارب جديدة.", scores: [0,0,3,2,0,1] },
            { en: "When discussing ideas with different people.", ar: "لما أناقش أفكاري مع ناس مختلفة.", scores: [0,2,3,1,0,1] },
            { en: "Mostly when a belief no longer feels meaningful.", ar: "غالبًا لما أحس إن الفكرة مبقاش ليها معنى.", scores: [2,0,1,2,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "What helps you feel connected to yourself?",
        "إيه اللي بيساعدك تحسي إنك قريبة من نفسك؟",
        [
            { en: "Writing down my thoughts and feelings.", ar: "إني أكتب أفكاري ومشاعري.", scores: [3,0,1,0,0,3] },
            { en: "Spending meaningful time with people I trust.", ar: "إني أقضي وقت له معنى مع ناس بثق فيهم.", scores: [2,3,0,1,0,1] },
            { en: "Working toward something important to me.", ar: "إني أشتغل على حاجة مهمة بالنسبالي.", scores: [0,0,1,2,3,1] },
            { en: "Making space for silence and contemplation.", ar: "إني أخصص مساحة للهدوء والتأمل.", scores: [2,0,0,1,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "How do you think about the person you may become?",
        "بتفكري إزاي في الشخص اللي ممكن تبقيه في المستقبل؟",
        [
            { en: "I imagine possibilities and set intentions.", ar: "بتخيل احتمالات مختلفة وبحدد نواياي.", scores: [1,0,1,1,3,2] },
            { en: "I consider the values I want to live by.", ar: "بفكر في القيم اللي عايزة أعيش بيها.", scores: [1,0,1,3,1,2] },
            { en: "I identify skills and habits I want to develop.", ar: "بحدد المهارات والعادات اللي عايزة أطورها.", scores: [0,0,2,1,3,1] },
            { en: "I reflect on what a meaningful life means to me.", ar: "بتأمل معنى الحياة اللي ليها قيمة بالنسبة لي.", scores: [2,0,1,2,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "When you experience a strong sense of curiosity, what do you do?",
        "لما تحسي بفضول قوي تجاه حاجة، بتعملي إيه؟",
        [
            { en: "Explore the subject deeply and follow new questions.", ar: "بستكشف الموضوع بعمق وبتابع الأسئلة الجديدة.", scores: [0,0,3,0,2,3] },
            { en: "Discuss it with others to hear different perspectives.", ar: "بناقشه مع الآخرين عشان أسمع وجهات نظر مختلفة.", scores: [0,2,3,0,1,1] },
            { en: "Look for ways to apply what I discover.", ar: "بدور على طرق أطبق بيها اللي اكتشفته.", scores: [0,0,2,0,3,1] },
            { en: "Think about why the subject fascinates me.", ar: "بفكر إيه اللي بيخليني مهتمة بالموضوع ده.", scores: [2,0,1,1,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "What do you do when your thoughts feel scattered?",
        "بتعملي إيه لما تحسي إن أفكارك متلخبطة؟",
        [
            { en: "Write them down and organize them.", ar: "بكتبها وبنظمها.", scores: [1,0,3,0,2,2] },
            { en: "Talk through them with someone I trust.", ar: "بتكلم عنها مع شخص بثق فيه.", scores: [2,3,1,0,0,1] },
            { en: "Focus on one practical next step.", ar: "بركز على خطوة عملية واحدة أقدر أعملها.", scores: [0,0,2,0,3,0] },
            { en: "Take a quiet break before returning to them.", ar: "باخد استراحة هادية وبعدين برجع أفكر فيها.", scores: [2,0,0,0,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "Which question do you find most meaningful?",
        "أنهي سؤال بتحسي إنه بيفتح لك باب للتفكير بعمق؟",
        [
            { en: "What do my emotions tell me about my needs?", ar: "مشاعري بتقول لي إيه عن احتياجاتي؟", scores: [3,0,1,1,0,2] },
            { en: "How can I build more meaningful connections?", ar: "إزاي أبني علاقات أعمق وليها معنى؟", scores: [1,3,0,1,0,2] },
            { en: "What can I learn to improve my decisions?", ar: "إيه اللي ممكن أتعلمه عشان أحسن قراراتي؟", scores: [0,0,3,1,2,1] },
            { en: "What gives my life a sense of purpose?", ar: "إيه اللي بيدي لحياتي إحساس بالهدف والمعنى؟", scores: [1,0,1,2,1,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "How do you relate to uncertainty about the future?",
        "بتتعاملي إزاي مع عدم وضوح المستقبل؟",
        [
            { en: "I focus on what I can influence today.", ar: "بركز على الحاجات اللي أقدر أأثر فيها النهارده.", scores: [1,0,2,1,3,0] },
            { en: "I explore different possibilities without rushing.", ar: "بستكشف احتمالات مختلفة من غير استعجال.", scores: [1,0,2,0,1,3] },
            { en: "I make a flexible plan and prepare for change.", ar: "بحط خطة مرنة وبستعد للتغيير.", scores: [0,0,3,1,3,0] },
            { en: "I talk with people whose perspective I value.", ar: "بتكلم مع ناس بقدر وجهة نظرهم.", scores: [1,3,1,1,0,1] }
        ]
    ),

    makeQuestion("innerWorld",
        "What does understanding yourself mean to you?",
        "فهم نفسك معناه إيه بالنسبة لكِ؟",
        [
            { en: "Recognizing my emotions and what influences them.", ar: "إني أفهم مشاعري والحاجات اللي بتأثر فيها.", scores: [3,0,2,1,0,2] },
            { en: "Understanding how I connect with other people.", ar: "إني أفهم طريقتي في التواصل مع الناس.", scores: [1,3,1,1,0,1] },
            { en: "Knowing my strengths and how to develop them.", ar: "إني أعرف نقاط قوتي وإزاي أطورها.", scores: [1,0,2,1,3,1] },
            { en: "Exploring my values, beliefs, and sense of purpose.", ar: "إني أستكشف قيمي ومعتقداتي وإحساسي بالهدف.", scores: [1,0,1,3,0,3] }
        ]
    ),

    makeQuestion("innerWorld",
        "What would you most like to understand better about yourself?",
        "إيه أكتر حاجة تحبي تفهميها عن نفسك بشكل أعمق؟",
        [
            { en: "How I experience and express emotions.", ar: "إزاي بعيش مشاعري وبعبر عنها.", scores: [3,1,0,0,0,2] },
            { en: "How I build trust and choose relationships.", ar: "إزاي ببني الثقة وبختار علاقاتي.", scores: [1,3,1,1,0,1] },
            { en: "How I think, decide, and solve problems.", ar: "إزاي بفكر وباخد قرارات وبحل المشكلات.", scores: [0,0,3,1,2,0] },
            { en: "What gives my choices meaning and direction.", ar: "إيه اللي بيدي لاختياراتي معنى واتجاه.", scores: [1,0,1,3,1,3] }
        ]
    )];

/* =========================================
   END OF QUESTION DATA
========================================= */
/* =========================================
   PERSONA — PART 10
   Core quiz functions
========================================= */

// Get the translation for the current language
function t(key) {
    return translations[state.language][key];
}

// Find a dimension by its ID
function getDimension(id) {
    return dimensions.find(dimension => dimension.id === id);
}

// Show a small message on the screen
function showToast(message) {
    if (!elements.toast) return;

    elements.toast.textContent = message;
    elements.toast.classList.add("show");

    setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 2500);
}

// Apply translated text to the page
function applyTranslations() {
    document.documentElement.lang = state.language;
    document.documentElement.dir =
        state.language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.dataset.i18n;

        if (t(key) !== undefined) {
            element.textContent = t(key);
        }
    });

    if (elements.languageToggle) {
        elements.languageToggle.textContent =
            state.language === "en" ? "العربية" : "English";
    }
}

// Update the progress bar
function updateProgress() {
    const total = questions.length;
    const current = state.currentQuestion + 1;
    const percentage = (current / total) * 100;

    if (elements.questionNumber) {
        elements.questionNumber.textContent =
            `${String(current).padStart(2, "0")} / ${total}`;
    }

    if (elements.progressFill) {
        elements.progressFill.style.width = `${percentage}%`;
    }

    if (elements.previousButton) {
        elements.previousButton.disabled =
            state.currentQuestion === 0;
    }

    if (elements.nextButton) {
        elements.nextButton.textContent =
            current === total
                ? (state.language === "ar" ? "عرض النتيجة" : "Reveal Results")
                : t("nextButton");
    }
}

// Display the current question and its answers
function renderQuestion() {
    const question = questions[state.currentQuestion];

    if (!question) return;

    const dimension = getDimension(question.dimension);

    updateProgress();

    if (elements.dimensionName && dimension) {
        elements.dimensionName.textContent =
            state.language === "ar"
                ? dimension.nameAr
                : dimension.name;
    }

    if (elements.questionTitle) {
        elements.questionTitle.textContent =
            state.language === "ar"
                ? question.ar
                : question.en;
    }

    if (elements.questionSubtitle) {
        elements.questionSubtitle.textContent =
            state.language === "ar"
                ? "اختاري الإجابة الأقرب لطريقتك الحقيقية."
                : "Choose the answer that feels closest to you.";
    }

    if (!elements.answerList) return;

    elements.answerList.innerHTML = "";

    question.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "answer-option";

        button.textContent =
            state.language === "ar" ? answer.ar : answer.en;

        const isSelected =
            state.answers[state.currentQuestion] === index;

        if (isSelected) {
            button.classList.add("selected");
        }

        button.setAttribute("aria-pressed", String(isSelected));

        button.addEventListener("click", () => {
            state.answers[state.currentQuestion] = index;
            renderQuestion();
        });

        elements.answerList.appendChild(button);
    });
}

// Open the quiz
function startQuiz() {
    state.currentQuestion = 0;
    state.answers = {};
    state.completed = false;

    elements.welcomeScreen.classList.add("hidden");
    elements.resultsScreen.classList.add("hidden");
    elements.quizScreen.classList.remove("hidden");

    renderQuestion();
}

/* =========================================
   PERSONA — PART 11
   Navigation and score calculation
========================================= */

// Move to the next question
function nextQuestion() {
    const selectedAnswer = state.answers[state.currentQuestion];

    if (selectedAnswer === undefined) {
        showToast(t("chooseAnswer"));
        return;
    }

    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion++;
        renderQuestion();
    } else {
        calculateResults();
    }
}

// Move to the previous question
function previousQuestion() {
    if (state.currentQuestion > 0) {
        state.currentQuestion--;
        renderQuestion();
    }
}

// Calculate scores across the six dimensions
function calculateResults() {
    const scores = {};

    dimensions.forEach(dimension => {
        scores[dimension.id] = 0;
    });

    questions.forEach((question, questionIndex) => {
        const answerIndex = state.answers[questionIndex];

        if (answerIndex === undefined) return;

        const answer = question.answers[answerIndex];

        answer.scores.forEach((score, dimensionIndex) => {
            const dimension = dimensions[dimensionIndex];

            if (dimension) {
                scores[dimension.id] += score;
            }
        });
    });

    state.completed = true;

    state.results = dimensions
        .map(dimension => ({
            ...dimension,
            score: scores[dimension.id]
        }))
        .sort((a, b) => b.score - a.score);

    renderResults();
}

// Restart the quiz
function restartQuiz() {
    state.currentQuestion = 0;
    state.answers = {};
    state.completed = false;
    state.results = null;

    elements.resultsScreen.classList.add("hidden");
    elements.quizScreen.classList.add("hidden");
    elements.welcomeScreen.classList.remove("hidden");

    if (elements.progressFill) {
        elements.progressFill.style.width = "0%";
    }
}

/* =========================================
   PERSONA — PART 12
   Results and dimension visualization
========================================= */

const resultProfiles = {
    emotions: {
        en: {
            name: "The Emotional Explorer",
            description:
                "You may notice emotional details that others overlook. Understanding your feelings can help you respond with greater clarity."
        },
        relationships: {
            name: "The Connection Seeker",
            description:
                "Trust and meaningful connections may play an important role in how you understand yourself and the people around you."
        },
        thinking: {
            name: "The Thoughtful Analyst",
            description:
                "You may enjoy examining ideas, comparing possibilities, and understanding the reasons behind your decisions."
        },
        values: {
            name: "The Values Guardian",
            description:
                "Your principles and personal meaning may be important guides when you make choices and decide what matters."
        },
        ambition: {
            name: "The Growth Seeker",
            description:
                "You may be drawn to learning, progress, and discovering new ways to develop your abilities."
        },
        innerWorld: {
            name: "The Inner Explorer",
            description:
                "Reflection and self-understanding may help you explore what gives your life meaning and direction."
        }
    },
    ar: {
        emotions: {
            name: "مستكشفة المشاعر",
            description:
                "قد تنتبهين لتفاصيل عاطفية لا يلاحظها الآخرون. فهم مشاعرك يساعدك على التعامل معها بوعي ووضوح."
        },
        relationships: {
            name: "باحثة عن التواصل",
            description:
                "قد تكون الثقة والعلاقات ذات المعنى جزءًا مهمًا من فهمك لنفسك وللأشخاص من حولك."
        },
        thinking: {
            name: "المحللة المتأملة",
            description:
                "قد تستمتعين بفحص الأفكار ومقارنة الاحتمالات وفهم الأسباب وراء قراراتك."
        },
        values: {
            name: "حارسة المبادئ",
            description:
                "قد تكون مبادئك وما ترينه ذا معنى من أهم الأشياء التي تسترشدين بها عند اتخاذ القرارات."
        },
        ambition: {
            name: "باحثة عن التطور",
            description:
                "قد يجذبك التعلم والتقدم واكتشاف طرق جديدة لتطوير قدراتك."
        },
        innerWorld: {
            name: "مستكشفة العالم الداخلي",
            description:
                "قد يساعدك التأمل في نفسك على اكتشاف ما يمنح حياتك المعنى والاتجاه."
        }
    }
};

// Display the results screen
function renderResults() {
    if (!state.results || state.results.length === 0) return;

    elements.welcomeScreen.classList.add("hidden");
    elements.quizScreen.classList.add("hidden");
    elements.resultsScreen.classList.remove("hidden");

    const topProfile = state.results[0];
    const profile = resultProfiles[state.language][topProfile.id];

    if (elements.personalityName) {
        elements.personalityName.textContent = profile.name;
    }

    if (elements.personalityDescription) {
        elements.personalityDescription.textContent =
            profile.description;
    }

    // Show the three highest-scoring dimensions
    if (elements.resultTags) {
        elements.resultTags.innerHTML = "";

        state.results.slice(0, 3).forEach(dimension => {
            const tag = document.createElement("span");
            tag.className = "result-tag";
            tag.textContent =
                state.language === "ar"
                    ? dimension.nameAr
                    : dimension.name;

            elements.resultTags.appendChild(tag);
        });
    }

    // Display all six dimensions
    if (elements.dimensionResults) {
        elements.dimensionResults.innerHTML = "";

        const highestScore = Math.max(
            ...state.results.map(dimension => dimension.score),
            1
        );

        state.results.forEach(dimension => {
            const card = document.createElement("div");
            card.className = "dimension-result";

            const heading = document.createElement("div");
            heading.className = "dimension-result-heading";

            const name = document.createElement("span");
            name.textContent =
                state.language === "ar"
                    ? dimension.nameAr
                    : dimension.name;

            const score = document.createElement("span");
            score.textContent = String(dimension.score);

            heading.append(name, score);

            const track = document.createElement("div");
            track.className = "dimension-bar";

            const fill = document.createElement("div");
            fill.className = "dimension-bar-fill";

            fill.style.width =
                `${(dimension.score / highestScore) * 100}%`;

            fill.style.backgroundColor = dimension.color;

            track.appendChild(fill);
            card.append(heading, track);

            elements.dimensionResults.appendChild(card);
        });
    }

    // Show a reflection prompt
    if (elements.reflectionText) {
        elements.reflectionText.textContent =
            state.language === "ar"
                ? "ما النتيجة التي شعرتِ أنها تعبّر عنكِ؟ وما الجانب الذي ترغبين في فهمه بصورة أعمق؟ تذكّري أن شخصيتك أوسع من أي اختبار."
                : "Which part of this reflection felt most familiar? What would you like to understand more deeply? Remember, your personality is bigger than any quiz.";
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* =========================================
   PERSONA — PART 13
   Events, language and sharing
========================================= */

// Start button
if (elements.startButton) {
    elements.startButton.addEventListener("click", startQuiz);
}

// Next and previous buttons
if (elements.nextButton) {
    elements.nextButton.addEventListener("click", nextQuestion);
}

if (elements.previousButton) {
    elements.previousButton.addEventListener("click", previousQuestion);
}

// Restart button
if (elements.restartButton) {
    elements.restartButton.addEventListener("click", restartQuiz);
}

// Switch between Arabic and English
if (elements.languageToggle) {
    elements.languageToggle.addEventListener("click", () => {
        state.language = state.language === "en" ? "ar" : "en";

        applyTranslations();

        if (!elements.quizScreen.classList.contains("hidden")) {
            renderQuestion();
        }

        if (!elements.resultsScreen.classList.contains("hidden")) {
            renderResults();
        }
    });
}

// Toggle the sound setting
if (elements.soundToggle) {
    elements.soundToggle.setAttribute(
        "aria-pressed",
        String(state.soundEnabled)
    );

    elements.soundToggle.addEventListener("click", () => {
        state.soundEnabled = !state.soundEnabled;

        elements.soundToggle.setAttribute(
            "aria-pressed",
            String(state.soundEnabled)
        );

        elements.soundToggle.textContent =
            state.soundEnabled ? "♪" : "♫";

        showToast(
            state.language === "ar"
                ? (state.soundEnabled
                    ? "تم تفعيل إعداد الصوت"
                    : "تم إيقاف إعداد الصوت")
                : (state.soundEnabled
                    ? "Sound setting enabled"
                    : "Sound setting disabled")
        );
    });
}

// Share the result
if (elements.shareButton) {
    elements.shareButton.addEventListener("click", async () => {
        const profile = state.results?.[0];

        if (!profile) return;

        const profileName =
            resultProfiles[state.language][profile.id].name;

        const message = state.language === "ar"
            ? `نتيجتي في PERSONA: ${profileName}\nاختبار للتأمل وفهم الذات.`
            : `My PERSONA reflection: ${profileName}\nA self-reflection quiz, not a diagnosis.`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: "PERSONA",
                    text: message,
                    url: window.location.href
                });
            } else if (navigator.clipboard) {
                await navigator.clipboard.writeText(
                    `${message}\n${window.location.href}`
                );

                showToast(t("copied"));
            } else {
                showToast(t("shareUnavailable"));
            }
        } catch (error) {
            if (error.name !== "AbortError") {
                showToast(t("shareUnavailable"));
            }
        }
    });
}

// Set the initial language and interface
applyTranslations();

/* =========================================
   PERSONA — PART 14
   Safe startup diagnostics
========================================= */

window.addEventListener("load", () => {
    const requiredElements = {
        welcomeScreen: elements.welcomeScreen,
        quizScreen: elements.quizScreen,
        resultsScreen: elements.resultsScreen,
        startButton: elements.startButton,
        nextButton: elements.nextButton,
        previousButton: elements.previousButton,
        answerList: elements.answerList,
        questionTitle: elements.questionTitle,
        personalityName: elements.personalityName,
        dimensionResults: elements.dimensionResults
    };

    const missing = Object.entries(requiredElements)
        .filter(([name, element]) => !element)
        .map(([name]) => name);

    console.log("PERSONA startup check");
    console.log("Questions:", questions.length);
    console.log("Dimensions:", dimensions.length);
    console.log("Missing HTML elements:", missing);

    if (questions.length !== 60) {
        console.error("Expected 60 questions.");
        return;
    }

    if (missing.length > 0) {
        console.warn("Some HTML element references need checking.");
        return;
    }

    console.log("PERSONA interface references are available.");
});
/* PERSONA — Button connection check */
console.log("PERSONA script loaded");

window.addEventListener("DOMContentLoaded", () => {
    console.log("PERSONA page ready");

    const start = document.querySelector("#startButton");
    const language = document.querySelector("#languageToggle");
    const sound = document.querySelector("#soundToggle");

    console.log({
        startButtonFound: !!start,
        languageButtonFound: !!language,
        soundButtonFound: !!sound,
        startQuizFunction: typeof startQuiz,
        applyTranslationsFunction: typeof applyTranslations
    });
});

