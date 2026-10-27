"use strict";

/* =========================================
   PERSONA — CLEAN REBUILD
   PART 1: CORE, ELEMENTS AND LANGUAGE
========================================= */

const state = {
    language: "en",
    currentQuestion: 0,
    answers: {},
    results: [],
    soundEnabled: false,
    completed: false
};

const $ = id => document.getElementById(id);

const elements = {
    welcome: $("welcomeScreen"),
    quiz: $("quizScreen"),
    results: $("resultsScreen"),

    start: $("startButton"),
    language: $("languageToggle"),
    sound: $("soundToggle"),

    counter: $("questionCounter"),
    progress: $("progressFill"),
    dimension: $("dimensionName"),
    number: $("questionNumber"),
    title: $("questionTitle"),
    subtitle: $("questionSubtitle"),
    answers: $("answerList"),

    previous: $("previousButton"),
    next: $("nextButton"),

    personality: $("personalityName"),
    description: $("personalityDescription"),
    symbol: $("resultSymbol"),
    tags: $("resultTags"),
    dimensionResults: $("dimensionResults"),
    reflection: $("reflectionText"),

    restart: $("restartButton"),
    share: $("shareButton"),
    toast: $("toastMessage")
};

const translations = {
    en: {
        start: "Begin Your Journey",
        previous: "Previous",
        next: "Continue",
        reveal: "Reveal Results",
        choose: "Choose an answer to continue.",
        first: "You're already at the first question.",
        question: "QUESTION",
        reflection:
            "Which part of this reflection felt familiar? What would you like to understand better about yourself?",
        copied: "Your result has been copied.",
        shareUnavailable: "Sharing is unavailable on this device.",
        footer: "An invitation to understand yourself.",
        resultDisclaimer:
            "This quiz is for self-reflection, not psychological diagnosis.",
        languageLabel: "العربية"
    },

    ar: {
        start: "ابدأ رحلتك",
        previous: "السابق",
        next: "متابعة",
        reveal: "اعرف نتيجتك",
        choose: "اختار إجابة عشان تكمل.",
        first: "إنت بالفعل عند أول سؤال.",
        question: "السؤال",
        reflection:
            "إيه أكتر جزء في النتيجة حسّيته قريب منك؟ وإيه الجانب اللي حابب تفهمه عن نفسك أكتر؟",
        copied: "تم نسخ النتيجة.",
        shareUnavailable: "المشاركة مش متاحة على الجهاز ده.",
        footer: "رحلة لفهم الذات بصورة أعمق.",
        resultDisclaimer:
            "الاختبار للتأمل وفهم الذات، مش للتشخيص النفسي.",
        languageLabel: "English"
    }
};

function t(key) {
    return translations[state.language][key]
        || translations.en[key]
        || key;
}

function localized(item) {
    return state.language === "ar"
        ? item.ar
        : item.en;
}

function showToast(message) {
    if (!elements.toast) return;

    elements.toast.textContent = message;
    elements.toast.classList.remove("hidden");
    elements.toast.setAttribute("role", "status");
}

function showScreen(screen) {
    [
        elements.welcome,
        elements.quiz,
        elements.results
    ].forEach(section => {
        if (section) {
            section.classList.add("hidden");
        }
    });

    if (screen) {
        screen.classList.remove("hidden");
    }

    window.scrollTo({
        top: 0,
        behavior: "auto"
    });
}
/* =========================================
   PART 2: DIMENSIONS + QUESTIONS 1–10
========================================= */

const dimensions = {
    emotions: {
        en: "Emotional Awareness",
        ar: "فهم المشاعر",
        color: "#0E8F70"
    },
    relationships: {
        en: "Relationships",
        ar: "العلاقات",
        color: "#D5BC8A"
    },
    thinking: {
        en: "Thinking Patterns",
        ar: "طريقة التفكير",
        color: "#73A9E8"
    },
    values: {
        en: "Personal Values",
        ar: "المبادئ والقيم",
        color: "#C39BE8"
    },
    ambition: {
        en: "Ambition & Growth",
        ar: "الطموح والتطور",
        color: "#E8A477"
    },
    innerWorld: {
        en: "Inner World",
        ar: "العالم الداخلي",
        color: "#8BC7C0"
    }
};

const questions = [
    {
        dimension: "emotions",
        en: "When a strong emotion shows up, what usually happens?",
        ar: "لما مشاعر قوية تظهر، غالبًا بيحصل إيه؟",
        answers: [
            { en: "I can name the emotion and understand what triggered it.", ar: "بقدر أحدد الشعور وأفهم إيه اللي سببه.", score: 4 },
            { en: "I recognize the feeling after thinking about the situation.", ar: "بفهم إحساسي بعد ما أفكر في الموقف شوية.", score: 3 },
            { en: "I know something is wrong, but naming it is difficult.", ar: "بعرف إن في حاجة مضايقاني، بس صعب أحددها.", score: 2 },
            { en: "My feelings often confuse me in the moment.", ar: "مشاعري ساعات بتلخبطني ومبفهمهاش وقتها.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "When someone upsets you, what do you tend to do first?",
        ar: "لما حد يضايقك، أول رد فعل بيكون إيه غالبًا؟",
        answers: [
            { en: "Pause and figure out exactly what hurt me.", ar: "بهدى وأحاول أفهم إيه بالظبط اللي ضايقني.", score: 4 },
            { en: "Take some space, then think about what happened.", ar: "باخد مسافة شوية وبعدها أفكر في اللي حصل.", score: 3 },
            { en: "React quickly, then reconsider my response later.", ar: "برد بسرعة، وبعدها أراجع رد فعلي.", score: 2 },
            { en: "Keep it inside until the feeling becomes overwhelming.", ar: "بكتم جوايا لحد ما الموضوع يبقى تقيل عليّ.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "How do you usually handle disappointment?",
        ar: "بتتعامل إزاي غالبًا مع خيبة الأمل؟",
        answers: [
            { en: "Accept the feeling and look for a way forward.", ar: "بتقبل إحساسي وبفكر في خطوة أقدر أعملها.", score: 4 },
            { en: "Give myself time before deciding what to do.", ar: "بدي لنفسي وقت قبل ما أقرر أعمل إيه.", score: 3 },
            { en: "Keep replaying what went wrong in my mind.", ar: "بفضل أعيد الموقف في دماغي وأفكر إيه اللي غلط.", score: 2 },
            { en: "Lose motivation because the outcome hurts too much.", ar: "حماسي بيقل جدًا لأن النتيجة بتكون صعبة عليّ.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "When you feel stressed, what helps you most?",
        ar: "لما تحس بضغط، إيه أكتر حاجة بتساعدك؟",
        answers: [
            { en: "Identify the source and break it into manageable steps.", ar: "أحدد مصدر الضغط وأقسمه لخطوات أقدر أتعامل معاها.", score: 4 },
            { en: "Talk to someone I trust and sort through my thoughts.", ar: "أكلم حد بثق فيه وأرتب أفكاري معاه.", score: 3 },
            { en: "Distract myself until I feel calmer.", ar: "أشغل نفسي بحاجة تانية لحد ما أهدى.", score: 2 },
            { en: "I struggle to find what actually makes me feel better.", ar: "بلاقي صعوبة أعرف إيه اللي ممكن يريحني فعلًا.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "How comfortable are you expressing what you feel?",
        ar: "قد إيه سهل عليك تعبّر عن اللي جواك؟",
        answers: [
            { en: "I can express it clearly and respectfully.", ar: "بقدر أوصل إحساسي بوضوح ومن غير ما أجرح حد.", score: 4 },
            { en: "I express myself once I feel safe with the person.", ar: "بعرف أعبّر لما أحس بالأمان مع الشخص.", score: 3 },
            { en: "I hint at my feelings instead of saying them directly.", ar: "بلمّح للي حاسس بيه بدل ما أقوله بشكل مباشر.", score: 2 },
            { en: "I usually keep my feelings to myself.", ar: "غالبًا بحتفظ بمشاعري لنفسي.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "When your mood changes unexpectedly, how do you respond?",
        ar: "لما مزاجك يتغير فجأة، بتتعامل مع ده إزاي؟",
        answers: [
            { en: "Notice the change and look for a possible reason.", ar: "بلاحظ التغيير وبحاول أفهم سببه.", score: 4 },
            { en: "Give myself time and check in with how I'm feeling.", ar: "بدي لنفسي وقت وأراجع إحساسي.", score: 3 },
            { en: "Carry on with my day and hope it passes.", ar: "بكمل يومي ومستني الإحساس يعدّي.", score: 2 },
            { en: "Feel thrown off without understanding why.", ar: "بتلخبط ومببقاش فاهم إيه اللي حصل.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "How do you react when you make a mistake?",
        ar: "لما تغلط في حاجة، بتتعامل مع نفسك إزاي؟",
        answers: [
            { en: "Learn from it without letting it define me.", ar: "بتعلم من الغلطة من غير ما أحكم على نفسي كلها بسببها.", score: 4 },
            { en: "Feel bad at first, then try to move on.", ar: "بضايق في الأول، وبعدها بحاول أتجاوز الموضوع.", score: 3 },
            { en: "Keep thinking about it long after it happens.", ar: "بفضل أفكر في الغلطة حتى بعد ما الموقف يخلص.", score: 2 },
            { en: "Blame myself harshly and struggle to let it go.", ar: "بلوم نفسي بقسوة وبلاقي صعوبة أتجاوزها.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "When you feel happy, how do you experience that feeling?",
        ar: "لما تكون مبسوط، بتعيش الإحساس ده إزاي؟",
        answers: [
            { en: "I enjoy the moment and understand what made it meaningful.", ar: "بستمتع باللحظة وبفهم إيه اللي خلاها مميزة.", score: 4 },
            { en: "I enjoy it, even if I don't think much about why.", ar: "بستمتع باللحظة حتى لو مش بفكر كتير في سبب سعادتي.", score: 3 },
            { en: "I quickly shift my attention to what comes next.", ar: "سرعان ما بفكر في اللي جاي بدل ما أعيش اللحظة.", score: 2 },
            { en: "I find it difficult to relax into a good moment.", ar: "بلاقي صعوبة أسيب نفسي أستمتع باللحظة الحلوة.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "How well can you tell the difference between fear and intuition?",
        ar: "قد إيه بتقدر تفرّق بين الخوف وإحساسك الداخلي؟",
        answers: [
            { en: "I examine the facts and notice what is driving the feeling.", ar: "براجع الحقائق وبلاحظ إيه اللي ورا الإحساس.", score: 4 },
            { en: "I can often tell, but some situations leave me unsure.", ar: "غالبًا بقدر أفرّق، بس في مواقف بتخليني محتار.", score: 3 },
            { en: "I tend to treat worry as a warning sign.", ar: "غالبًا بعتبر القلق علامة إن في حاجة غلط.", score: 2 },
            { en: "I find it hard to know whether to trust the feeling.", ar: "بلاقي صعوبة أعرف أثق في إحساسي ولا لأ.", score: 1 }
        ]
    },
    {
        dimension: "emotions",
        en: "After an emotionally difficult day, what helps you recover?",
        ar: "بعد يوم متعب نفسيًا، إيه اللي بيساعدك تستعيد هدوءك؟",
        answers: [
            { en: "Reflect on the day and choose what I need next.", ar: "أراجع يومي وأحدد إيه اللي محتاجه بعد كده.", score: 4 },
            { en: "Rest, do something comforting, and give it time.", ar: "أرتاح وأعمل حاجة مريحة وأدي نفسي وقت.", score: 3 },
            { en: "Stay busy so I don't have to think about it.", ar: "أفضل مشغول عشان مفضلش أفكر في اللي حصل.", score: 2 },
            { en: "Carry the feelings with me without knowing how to process them.", ar: "بفضل شايل الإحساس جوايا ومش عارف أتعامل معاه.", score: 1 }
        ]
    },

    {
        dimension: "relationships",
        en: "When someone close to you is upset, what do you usually do?",
        ar: "لما حد قريب منك يكون متضايق، بتعمل إيه غالبًا؟",
        answers: [
            { en: "Listen carefully and ask what kind of support they need.", ar: "بسمع له كويس وبسأله محتاج دعم إزاي.", score: 4 },
            { en: "Try to comfort them and offer a practical suggestion.", ar: "بحاول أواسيه وأقترح عليه حل عملي.", score: 3 },
            { en: "Feel unsure what to say, so I wait for them to open up.", ar: "ببقى مش عارف أقول إيه، فبستنى لحد ما يتكلم.", score: 2 },
            { en: "Avoid the conversation because strong emotions feel difficult.", ar: "بتجنب الكلام لأن المشاعر القوية بتكون صعبة عليّ.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "How do you usually handle disagreements with someone important to you?",
        ar: "لما تختلف مع حد مهم في حياتك، بتتصرف إزاي؟",
        answers: [
            { en: "Explain my view and try to understand theirs too.", ar: "بشرح وجهة نظري وبحاول أفهم وجهة نظره كمان.", score: 4 },
            { en: "Take a break, then return to the discussion calmly.", ar: "باخد وقت أهدى، وبعدها برجع أتكلم بهدوء.", score: 3 },
            { en: "Focus on proving my point before listening fully.", ar: "بركز إني أثبت وجهة نظري قبل ما أسمع للآخر.", score: 2 },
            { en: "Withdraw from the discussion and leave things unresolved.", ar: "بنسحب من النقاش وبسيب الخلاف من غير حل.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "How comfortable are you setting boundaries with others?",
        ar: "قد إيه سهل عليك تحط حدود في تعاملك مع الناس؟",
        answers: [
            { en: "I can say no respectfully without overexplaining.", ar: "بقدر أرفض باحترام من غير ما أبرر كتير.", score: 4 },
            { en: "I set boundaries when I have had time to think.", ar: "بحط حدود لما آخد وقت أفكر في الموضوع.", score: 3 },
            { en: "I agree sometimes even when I don't want to.", ar: "ساعات بوافق رغم إني مش عايز.", score: 2 },
            { en: "I often put others' wishes ahead of my own needs.", ar: "غالبًا بقدم رغبات الناس على احتياجاتي.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "What matters most to you when building trust?",
        ar: "إيه أهم حاجة عندك عشان تثق في حد؟",
        answers: [
            { en: "Consistent actions that match what the person says.", ar: "إن أفعاله تكون دايمًا متوافقة مع كلامه.", score: 4 },
            { en: "Honest conversations and willingness to admit mistakes.", ar: "الصراحة والاستعداد للاعتراف بالغلط.", score: 3 },
            { en: "A strong connection, even if some things remain unclear.", ar: "إحساس القرب بينا حتى لو في حاجات مش واضحة.", score: 2 },
            { en: "I find it difficult to trust without frequent reassurance.", ar: "بلاقي صعوبة أثق من غير تطمين مستمر.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "When you feel misunderstood, what do you tend to do?",
        ar: "لما تحس إن حد مش فاهمك، بتعمل إيه غالبًا؟",
        answers: [
            { en: "Explain my meaning in a different way and check their understanding.", ar: "بشرح قصدي بطريقة تانية وبشوف إذا كان وصل له ولا لأ.", score: 4 },
            { en: "Ask questions to find where the misunderstanding started.", ar: "بسأل عشان أفهم سوء الفهم بدأ منين.", score: 3 },
            { en: "Repeat my point more strongly because I feel frustrated.", ar: "بكرر كلامي بشكل أقوى عشان بكون متضايق.", score: 2 },
            { en: "Stop explaining because it feels pointless.", ar: "ببطل أشرح لأني بحس إن الكلام مش هيفيد.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "How do you show appreciation to people you care about?",
        ar: "بتعبّر إزاي عن تقديرك للناس اللي فارقين معاك؟",
        answers: [
            { en: "Through thoughtful actions and clear words.", ar: "بأفعال فيها اهتمام وكلام واضح.", score: 4 },
            { en: "Mostly by spending time with them and checking in.", ar: "غالبًا بقضي وقت معاهم وبطمن عليهم.", score: 3 },
            { en: "I feel appreciation strongly but don't express it often.", ar: "بكون مقدّرهم جدًا بس مش بعبّر عن ده كتير.", score: 2 },
            { en: "I assume they already know how I feel.", ar: "بفترض إنهم عارفين أنا مقدّرهم قد إيه.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "When a friend gives you feedback, how do you respond?",
        ar: "لما صاحبك يقولك ملاحظة عن تصرف عملته، بتتعامل إزاي؟",
        answers: [
            { en: "Listen, consider the point, and decide what is useful.", ar: "بسمع الملاحظة وبفكر فيها وبحدد إيه المفيد منها.", score: 4 },
            { en: "Feel a little uncomfortable, then think it over later.", ar: "بتضايق شوية، وبعدها بفكر في الكلام.", score: 3 },
            { en: "Explain my reasons immediately so I am not misunderstood.", ar: "بشرح أسبابي فورًا عشان متفهمش غلط.", score: 2 },
            { en: "Take it as a personal rejection, even if that wasn't intended.", ar: "بحس إن الكلام رفض ليا شخصيًا حتى لو مش ده المقصود.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "How do you usually build new friendships?",
        ar: "بتبدأ صداقات جديدة إزاي غالبًا؟",
        answers: [
            { en: "Show genuine interest and let trust develop naturally.", ar: "ببدي اهتمام حقيقي وبسيب الثقة تتبني بالتدريج.", score: 4 },
            { en: "Start with shared interests and gradually open up.", ar: "ببدأ بحاجات مشتركة وبفتح كلام عن نفسي بالتدريج.", score: 3 },
            { en: "Wait for the other person to make the first move.", ar: "بستنى الشخص التاني هو اللي يبدأ التقرب.", score: 2 },
            { en: "Keep a distance because opening up feels risky.", ar: "بحافظ على مسافة لأن الانفتاح على الناس بيقلقني.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "If someone you care about needs space, what is your response?",
        ar: "لو حد فارق معاك محتاج مساحة لنفسه، بتتصرف إزاي؟",
        answers: [
            { en: "Respect the space and agree on how to reconnect.", ar: "بحترم مساحته ونتفق على طريقة نرجع نتواصل بيها.", score: 4 },
            { en: "Give them time, while checking in occasionally if appropriate.", ar: "بديه وقت، وبطمن عليه من وقت للتاني لو مناسب.", score: 3 },
            { en: "Worry about the relationship and seek reassurance.", ar: "بقلق على العلاقة وبحتاج تطمين.", score: 2 },
            { en: "Assume something is wrong and struggle to give space.", ar: "بفترض إن في مشكلة وبلاقي صعوبة أسيب له مساحة.", score: 1 }
        ]
    },
    {
        dimension: "relationships",
        en: "What helps a relationship feel healthy to you?",
        ar: "إيه اللي بيخلي العلاقة مريحة وصحية بالنسبة لك؟",
        answers: [
            { en: "Mutual respect, honest communication, and room to be myself.", ar: "احترام متبادل وصراحة ومساحة أكون فيها على طبيعتي.", score: 4 },
            { en: "Feeling supported while working through occasional problems.", ar: "إحساس بالدعم وإحنا بنحل المشاكل اللي بتحصل.", score: 3 },
            { en: "Frequent contact so I know the relationship is secure.", ar: "تواصل مستمر يطمني إن العلاقة مستقرة.", score: 2 },
            { en: "Avoiding difficult conversations to keep the peace.", ar: "تجنب الكلام الصعب عشان المشاكل متكبرش.", score: 1 }
        ]
    },

    {
        dimension: "thinking",
        en: "When facing a difficult problem, where do you begin?",
        ar: "لما تواجه مشكلة صعبة، بتبدأ منين؟",
        answers: [
            { en: "Break it into smaller parts and tackle them one by one.", ar: "بقسمها لأجزاء صغيرة وبحل كل جزء لوحده.", score: 4 },
            { en: "Gather information before deciding on a direction.", ar: "بجمع معلومات الأول قبل ما أحدد هتصرف إزاي.", score: 3 },
            { en: "Try the first solution that seems promising.", ar: "بجرب أول حل أحس إنه ممكن ينفع.", score: 2 },
            { en: "Feel overwhelmed because I don't know where to start.", ar: "بحس إن الموضوع كبير ومش عارف أبدأ منين.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "When making an important decision, what guides you most?",
        ar: "لما تاخد قرار مهم، إيه أكتر حاجة بتوجّهك؟",
        answers: [
            { en: "Compare the options, evidence, and likely consequences.", ar: "بقارن بين الاختيارات والأدلة والنتائج المتوقعة.", score: 4 },
            { en: "Balance practical facts with my personal feelings.", ar: "بوازن بين الحقائق العملية وإحساسي الشخصي.", score: 3 },
            { en: "Choose what feels right in the moment.", ar: "باختار اللي حاسس إنه صح في اللحظة دي.", score: 2 },
            { en: "Keep postponing the choice because every option worries me.", ar: "بفضل أأجل القرار لأن كل اختيار بيقلقني.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "When you encounter an unfamiliar idea, what do you do?",
        ar: "لما تقابل فكرة جديدة مش مألوفة، بتعمل إيه؟",
        answers: [
            { en: "Explore it, ask questions, and test whether it makes sense.", ar: "بستكشفها وبسأل وبشوف إذا كانت منطقية.", score: 4 },
            { en: "Look for reliable explanations before forming an opinion.", ar: "بدور على شرح موثوق قبل ما أكون رأي.", score: 3 },
            { en: "Accept it if it sounds convincing at first.", ar: "بقتنع بيها لو كلامها مقنع من البداية.", score: 2 },
            { en: "Dismiss it quickly because unfamiliar ideas feel uncomfortable.", ar: "برفضها بسرعة لأن الأفكار الغريبة عني بتقلقني.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "How do you react when your plans suddenly change?",
        ar: "لما خططك تتغير فجأة، بتتعامل إزاي؟",
        answers: [
            { en: "Reassess the situation and create a new plan.", ar: "براجع الوضع وبحط خطة جديدة.", score: 4 },
            { en: "Take a moment to adjust, then continue.", ar: "باخد وقت أتأقلم، وبعدها بكمل.", score: 3 },
            { en: "Try to keep the original plan whenever possible.", ar: "بحاول أحافظ على الخطة الأصلية على قد ما أقدر.", score: 2 },
            { en: "Struggle to focus because the change disrupts me.", ar: "بلاقي صعوبة أركز لأن التغيير بيلخبطني.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "When you make a mistake in your reasoning, what happens?",
        ar: "لما تكتشف إن استنتاجك كان غلط، بتعمل إيه؟",
        answers: [
            { en: "Update my view when the evidence shows I was wrong.", ar: "بغيّر رأيي لما الأدلة توضح إني كنت غلط.", score: 4 },
            { en: "Review the new information before changing my mind.", ar: "براجع المعلومات الجديدة قبل ما أغيّر رأيي.", score: 3 },
            { en: "Look for reasons my original conclusion might still be right.", ar: "بدور على أسباب تخلي استنتاجي الأول ممكن يكون صح.", score: 2 },
            { en: "Find it difficult to admit that my conclusion was mistaken.", ar: "بلاقي صعوبة أعترف إن استنتاجي كان غلط.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "How do you handle having many thoughts at the same time?",
        ar: "لما أفكار كتير تيجي في دماغك مرة واحدة، بتعمل إيه؟",
        answers: [
            { en: "Write them down and sort them by priority.", ar: "بكتب الأفكار وبرتبها حسب الأولوية.", score: 4 },
            { en: "Focus on one thought at a time until things feel clearer.", ar: "بركز على فكرة واحدة لحد ما الصورة توضح.", score: 3 },
            { en: "Move between thoughts until one catches my attention.", ar: "بتنقل بين الأفكار لحد ما واحدة تشد انتباهي.", score: 2 },
            { en: "Get stuck thinking about everything without reaching a decision.", ar: "بفضل أفكر في كل حاجة من غير ما أوصل لقرار.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "When someone disagrees with your opinion, what do you do?",
        ar: "لما حد يختلف مع رأيك، بتتصرف إزاي؟",
        answers: [
            { en: "Ask how they reached their conclusion and compare perspectives.", ar: "بسأله وصل لرأيه إزاي وبقارن بين وجهات النظر.", score: 4 },
            { en: "Explain my reasoning and listen to their response.", ar: "بشرح أسباب رأيي وبسمع رده.", score: 3 },
            { en: "Repeat my argument more firmly to defend my view.", ar: "بأكد على حجتي أكتر عشان أدافع عن رأيي.", score: 2 },
            { en: "End the conversation because disagreement feels personal.", ar: "بأنهي النقاش لأن الاختلاف بحسه بشكل شخصي.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "How do you learn best when a topic is complicated?",
        ar: "لما موضوع يكون معقد، إيه الطريقة اللي بتساعدك تفهمه؟",
        answers: [
            { en: "Connect the main concepts and work through examples.", ar: "بربط الأفكار الأساسية ببعض وبحل أمثلة عليها.", score: 4 },
            { en: "Follow a clear explanation step by step.", ar: "بتابع شرح واضح خطوة بخطوة.", score: 3 },
            { en: "Memorize the key points and try to recall them later.", ar: "بحفظ النقط الأساسية وبحاول أفتكرها بعدين.", score: 2 },
            { en: "Give up on the topic when I don't understand it quickly.", ar: "بفقد حماسي للموضوع لو مفهمتوش بسرعة.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "When you suspect that you may be wrong, what helps you check?",
        ar: "لما تشك إن ممكن تكون غلط، إيه اللي بيساعدك تتأكد؟",
        answers: [
            { en: "Look for evidence that could support or challenge my view.", ar: "بدور على أدلة ممكن تأكد رأيي أو تثبت عكسه.", score: 4 },
            { en: "Ask a knowledgeable person and compare explanations.", ar: "بسأل حد عنده معرفة وبقارن بين التفسيرات.", score: 3 },
            { en: "Trust the source that agrees with what I already think.", ar: "بميل للمصدر اللي بيوافق اللي أنا مقتنع بيه.", score: 2 },
            { en: "Avoid checking because I don't want my view challenged.", ar: "بتجنب المراجعة عشان مش عايز رأيي يتعارض مع معلومات جديدة.", score: 1 }
        ]
    },
    {
        dimension: "thinking",
        en: "After a difficult experience, how do you make sense of it?",
        ar: "بعد تجربة صعبة، بتفهم اللي حصل إزاي؟",
        answers: [
            { en: "Identify what I learned and what I can change next time.", ar: "بحدد اتعلمت إيه وإيه اللي ممكن أغيره المرة الجاية.", score: 4 },
            { en: "Talk it through or write down the important parts.", ar: "بتكلم عن التجربة أو بكتب أهم اللي حصل.", score: 3 },
            { en: "Focus mainly on what went wrong.", ar: "بركز بشكل أساسي على الحاجات اللي باظت.", score: 2 },
            { en: "Avoid revisiting the experience even when it keeps affecting me.", ar: "بتجنب التفكير في التجربة حتى لو لسه مأثرة عليّ.", score: 1 }
        ]
    },

    {
        dimension: "values",
        en: "When you have to choose between convenience and honesty, what matters most?",
        ar: "لما تختار بين الأسهل وبين إنك تكون صريح، إيه الأهم عندك؟",
        answers: [
            { en: "Be honest, even when telling the truth is uncomfortable.", ar: "أكون صريح حتى لو الحقيقة مش مريحة.", score: 4 },
            { en: "Tell the truth thoughtfully, choosing the right way and time.", ar: "أقول الحقيقة بحكمة وأختار الوقت والطريقة المناسبة.", score: 3 },
            { en: "Avoid the truth if I think it will cause unnecessary trouble.", ar: "أتجنب الحقيقة لو شايف إنها هتعمل مشاكل ملهاش لازمة.", score: 2 },
            { en: "Choose whatever protects my immediate comfort.", ar: "أختار اللي يريحني في اللحظة دي.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "What do you do when your personal values are challenged?",
        ar: "لما حد يعترض على مبدأ مهم عندك، بتتصرف إزاي؟",
        answers: [
            { en: "Explain why it matters to me while respecting their right to differ.", ar: "بوضح ليه المبدأ مهم عندي، مع احترام حقه إنه يختلف.", score: 4 },
            { en: "Listen to their reasoning and reconsider if it makes sense.", ar: "بسمع وجهة نظره وبراجع موقفي لو كلامه منطقي.", score: 3 },
            { en: "Avoid discussing the issue to prevent tension.", ar: "بتجنب مناقشة الموضوع عشان الخلاف.", score: 2 },
            { en: "Change my position mainly to gain approval.", ar: "بغيّر موقفي أساسًا عشان أكسب رضا الناس.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "How do you decide whether an action is fair?",
        ar: "بتحدد إزاي إذا كان التصرف عادل ولا لأ؟",
        answers: [
            { en: "Consider everyone's rights, circumstances, and responsibilities.", ar: "بفكر في حقوق كل الأطراف وظروفهم ومسؤولياتهم.", score: 4 },
            { en: "Compare the situation with clear rules and expectations.", ar: "بقارن الموقف بالقواعد والتوقعات الواضحة.", score: 3 },
            { en: "Rely mostly on what feels fair to me personally.", ar: "بعتمد بشكل أساسي على اللي بحسه عادل بالنسبة لي.", score: 2 },
            { en: "Support whichever outcome benefits the people closest to me.", ar: "بميل للنتيجة اللي تفيد الناس الأقرب ليا.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "When nobody is checking your work, what guides your behavior?",
        ar: "لما محدش بيراجع شغلك، إيه اللي بيحدد تصرفاتك؟",
        answers: [
            { en: "My own standards and responsibility for the outcome.", ar: "معاييري الشخصية وإحساسي بالمسؤولية عن النتيجة.", score: 4 },
            { en: "The expectations I have agreed to meet.", ar: "التوقعات اللي وافقت إني ألتزم بيها.", score: 3 },
            { en: "How much the result is likely to affect me.", ar: "قد إيه النتيجة ممكن تأثر عليّ.", score: 2 },
            { en: "Mostly the chance of being noticed or evaluated.", ar: "غالبًا احتمال إن حد يلاحظ أو يقيّم اللي بعمله.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "What does keeping a promise mean to you?",
        ar: "الوفاء بالوعد معناه إيه بالنسبة لك؟",
        answers: [
            { en: "I make realistic promises and take responsibility for keeping them.", ar: "بوعد على قد قدرتي وبكون مسؤول عن تنفيذ وعدي.", score: 4 },
            { en: "I do my best to follow through and explain if plans change.", ar: "بحاول أنفذ وعدي، ولو الظروف اتغيرت بوضح ده.", score: 3 },
            { en: "I see promises as flexible when something better comes up.", ar: "بشوف إن الوعد ممكن يتغير لو ظهر اختيار أحسن.", score: 2 },
            { en: "I often commit before considering whether I can follow through.", ar: "ساعات بوعد قبل ما أفكر إذا كنت هقدر أنفذ ولا لأ.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "How do you respond when someone needs help but you are busy?",
        ar: "لو حد محتاج مساعدة وإنت مشغول، بتتصرف إزاي؟",
        answers: [
            { en: "Assess what I can realistically offer and communicate clearly.", ar: "بحدد أقدر أساعد بإيه فعلًا وبوضح ده للشخص.", score: 4 },
            { en: "Help if possible, or suggest another way to get support.", ar: "بساعد لو أقدر، أو بحاول أدله على طريقة تانية للمساعدة.", score: 3 },
            { en: "Agree even when it disrupts my own priorities.", ar: "بوافق حتى لو ده بيعطل أولوياتي.", score: 2 },
            { en: "Ignore my own limits because I feel guilty saying no.", ar: "بتجاهل حدود قدرتي عشان بحس بالذنب لو رفضت.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "What role does respect play when you disagree with someone?",
        ar: "الاحترام بيمثل إيه عندك وقت الاختلاف مع حد؟",
        answers: [
            { en: "I can disagree firmly without insulting or belittling them.", ar: "بقدر أختلف بوضوح من غير إهانة أو تقليل من الشخص.", score: 4 },
            { en: "I try to stay respectful, even if I need time to cool down.", ar: "بحاول أحافظ على احترامي حتى لو محتاج وقت أهدى.", score: 3 },
            { en: "My tone becomes harsh when I feel strongly about my opinion.", ar: "أسلوبي بيبقى حاد لما أكون متمسك برأيي جدًا.", score: 2 },
            { en: "I see disagreement as a reason to dismiss the other person.", ar: "بعتبر الاختلاف سبب إني أقلل من رأي الشخص التاني.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "How do you react when you notice an unfair advantage?",
        ar: "لما تلاحظ إنك واخد ميزة مش متاحة لغيرك بشكل عادل، بتعمل إيه؟",
        answers: [
            { en: "Consider whether I should correct the situation or speak up.", ar: "بفكر إذا كان لازم أصحح الوضع أو أتكلم عنه.", score: 4 },
            { en: "Check the facts before deciding whether the advantage is unfair.", ar: "بتأكد من التفاصيل الأول قبل ما أحكم إن الوضع مش عادل.", score: 3 },
            { en: "Accept the advantage because it is already available to me.", ar: "بقبل الميزة لأنها متاحة ليا بالفعل.", score: 2 },
            { en: "Focus on keeping the benefit regardless of its fairness.", ar: "بركز إني أحافظ على الميزة بغض النظر عن عدالتها.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "When your goals conflict with a principle you believe in, what do you do?",
        ar: "لو هدف مهم ليك اتعارض مع مبدأ بتؤمن بيه، بتعمل إيه؟",
        answers: [
            { en: "Look for another route that does not compromise the principle.", ar: "بدور على طريق تاني يوصلني لهدفي من غير ما أتنازل عن المبدأ.", score: 4 },
            { en: "Weigh the consequences carefully before deciding.", ar: "بدرس النتائج كويس قبل ما أخد قرار.", score: 3 },
            { en: "Make an exception because the goal matters a lot to me.", ar: "بستثني المبدأ المرة دي لأن الهدف مهم جدًا بالنسبة لي.", score: 2 },
            { en: "Put the goal first and deal with the conflict later.", ar: "بقدم الهدف الأول وبفكر في التعارض بعدين.", score: 1 }
        ]
    },
    {
        dimension: "values",
        en: "What makes you feel that you acted in line with your values?",
        ar: "إيه اللي بيخليك تحس إن تصرفك كان متوافق مع مبادئك؟",
        answers: [
            { en: "My actions match what I believe, even when no one praises me.", ar: "أفعالي بتوافق مبادئي حتى لو محدش شكرني عليها.", score: 4 },
            { en: "I can explain my decision and accept responsibility for it.", ar: "بقدر أشرح قراري وأتحمل مسؤوليته.", score: 3 },
            { en: "People around me agree that I made the right choice.", ar: "الناس اللي حواليا شايفين إني اخترت صح.", score: 2 },
            { en: "I feel good about my choice mainly when it brings a reward.", ar: "بحس إن اختياري صح بشكل أساسي لما يجيبلي مكسب.", score: 1 }
        ]
    },

    {
        dimension: "ambition",
        en: "When you set a big goal, how do you usually begin?",
        ar: "لما تحط هدف كبير، بتبدأ إزاي؟",
        answers: [
            { en: "Define the outcome and create clear steps toward it.", ar: "بحدد النتيجة اللي عايزها وبقسم الطريق لخطوات واضحة.", score: 4 },
            { en: "Research the goal and make a rough plan.", ar: "ببحث عن الهدف وبحط خطة مبدئية.", score: 3 },
            { en: "Start enthusiastically and figure out the details later.", ar: "ببدأ بحماس وبفكر في التفاصيل بعدين.", score: 2 },
            { en: "Wait until I feel completely ready before taking action.", ar: "بستنى لحد ما أحس إني جاهز تمامًا عشان أبدأ.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "What do you do when progress toward a goal becomes slow?",
        ar: "لما تلاقي تقدمك ناحية هدفك بقى بطيء، بتعمل إيه؟",
        answers: [
            { en: "Review my approach and adjust what isn't working.", ar: "براجع طريقتي وبغيّر اللي مش جايب نتيجة.", score: 4 },
            { en: "Keep going while looking for small improvements.", ar: "بكمل وبحاول أحسن حاجات بسيطة في طريقي.", score: 3 },
            { en: "Lose some motivation and look for a quicker route.", ar: "حماسي بيقل وببدأ أدور على طريق أسرع.", score: 2 },
            { en: "Assume I'm not suited for the goal and stop trying.", ar: "بفترض إن الهدف مش مناسب ليا وببطل أحاول.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "How do you respond when you receive constructive criticism?",
        ar: "لما حد يديك نقد هدفه يساعدك تتطور، بتتعامل إزاي؟",
        answers: [
            { en: "Identify the useful points and apply them where appropriate.", ar: "بحدد النقط المفيدة وبطبقها في المكان المناسب.", score: 4 },
            { en: "Think about the feedback and use what makes sense.", ar: "بفكر في الملاحظات وباخد منها اللي منطقي.", score: 3 },
            { en: "Feel discouraged and question my ability for a while.", ar: "بتحبط شوية وبشك في قدرتي لفترة.", score: 2 },
            { en: "Reject the feedback because it feels like a personal attack.", ar: "برفض الملاحظات لأنها بتحسسني إن الهجوم عليّ شخصيًا.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "How do you manage competing priorities?",
        ar: "لما يكون عندك أكتر من حاجة مهمة، بترتبهم إزاي؟",
        answers: [
            { en: "Rank them by importance, urgency, and available time.", ar: "برتبهم حسب الأهمية والاستعجال والوقت المتاح.", score: 4 },
            { en: "Choose the most urgent task, then plan the rest.", ar: "ببدأ بالأكثر استعجالًا وبعدها برتب الباقي.", score: 3 },
            { en: "Switch between tasks depending on what feels pressing.", ar: "بتنقل بين المهام حسب الحاجة اللي حاسس إنها مستعجلة.", score: 2 },
            { en: "Feel stuck because everything seems equally important.", ar: "بتعطل لأني بحس إن كل حاجة مهمة بنفس الدرجة.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "What does success mean to you personally?",
        ar: "النجاح معناه إيه بالنسبة لك إنت شخصيًا؟",
        answers: [
            { en: "Making meaningful progress toward goals that fit my values.", ar: "إني أتقدم ناحية أهداف ليها معنى ومتوافقة مع مبادئي.", score: 4 },
            { en: "Building skills, stability, and opportunities over time.", ar: "إني أبني مهارات واستقرار وفرص مع الوقت.", score: 3 },
            { en: "Reaching visible milestones that others can recognize.", ar: "إني أحقق إنجازات واضحة الناس تقدر تلاحظها.", score: 2 },
            { en: "Being seen as more successful than the people around me.", ar: "إني أبان أنجح من الناس اللي حواليا.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "When you need to learn a difficult new skill, what do you do?",
        ar: "لما تحتاج تتعلم مهارة جديدة وصعبة، بتبدأ إزاي؟",
        answers: [
            { en: "Practice consistently, seek feedback, and track improvement.", ar: "بتدرب باستمرار وبطلب ملاحظات وبلاحظ تطوري.", score: 4 },
            { en: "Follow a structured course and practice when possible.", ar: "بتابع كورس منظم وبتدرب كل ما يكون عندي فرصة.", score: 3 },
            { en: "Explore different resources before settling into practice.", ar: "بجرب مصادر مختلفة قبل ما أستقر على التدريب.", score: 2 },
            { en: "Avoid starting because being a beginner feels uncomfortable.", ar: "بأجل البداية لأن إحساس إني مبتدئ مش مريح.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "How do you balance ambition with rest?",
        ar: "بتوازن إزاي بين الطموح والراحة؟",
        answers: [
            { en: "Plan sustainable effort and make rest part of the routine.", ar: "بنظم مجهودي بطريقة أقدر أستمر بيها وبخلي الراحة جزء من يومي.", score: 4 },
            { en: "Work toward my goals and rest when I notice I need it.", ar: "بشتغل على أهدافي وباخد راحة لما ألاحظ إني محتاجها.", score: 3 },
            { en: "Feel guilty resting when there is still work to do.", ar: "بحس بالذنب لما أرتاح ولسه في شغل مطلوب.", score: 2 },
            { en: "Push myself without a clear limit until I lose motivation.", ar: "بضغط على نفسي من غير حدود واضحة لحد ما حماسي يخلص.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "When a project fails, how do you move forward?",
        ar: "لما مشروع أو محاولة متنجحش، بتعمل إيه بعدها؟",
        answers: [
            { en: "Review what happened, learn from it, and try a revised approach.", ar: "براجع اللي حصل وبستفيد منه وبجرب طريقة محسنة.", score: 4 },
            { en: "Take a short break, then decide on the next step.", ar: "باخد فترة راحة قصيرة وبعدها أحدد الخطوة الجاية.", score: 3 },
            { en: "Move to a different idea without examining the failure much.", ar: "بنتقل لفكرة تانية من غير ما أحلل سبب الفشل كتير.", score: 2 },
            { en: "Avoid similar projects because I expect another disappointment.", ar: "بتجنب المشاريع المشابهة لأني بتوقع خيبة أمل تانية.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "How do you measure your own progress?",
        ar: "بتعرف منين إنك بتتقدم وبتتطور؟",
        answers: [
            { en: "Compare my current skills and habits with my earlier self.", ar: "بقارن مهاراتي وعاداتي دلوقتي بنفسي في الماضي.", score: 4 },
            { en: "Track completed goals and improvements over time.", ar: "بتابع الأهداف اللي حققتها والتحسن اللي حصل مع الوقت.", score: 3 },
            { en: "Look at how my progress compares with other people.", ar: "ببص على تقدمي مقارنة بالناس التانية.", score: 2 },
            { en: "Judge my progress mainly by how far I still have to go.", ar: "بحكم على تقدمي بشكل أساسي من خلال الحاجات اللي لسه محققتهاش.", score: 1 }
        ]
    },
    {
        dimension: "ambition",
        en: "When an unexpected opportunity appears, how do you decide whether to take it?",
        ar: "لما تظهر فرصة مفاجئة، بتقرر إزاي إذا كانت مناسبة ليك؟",
        answers: [
            { en: "Check how it fits my goals, values, and available resources.", ar: "بشوف مدى توافقها مع أهدافي ومبادئي وإمكانياتي المتاحة.", score: 4 },
            { en: "Gather enough information, then make a considered choice.", ar: "بجمع معلومات كفاية وبعدها باخد قرار مدروس.", score: 3 },
            { en: "Say yes quickly because I don't want to miss out.", ar: "بوافق بسرعة عشان مش عايز الفرصة تفوتني.", score: 2 },
            { en: "Turn it down because unfamiliar changes feel too uncertain.", ar: "برفضها لأن التغيير الجديد بيكون غير مضمون بالنسبة لي.", score: 1 }
        ]
    },

    {
        dimension: "innerWorld",
        en: "When you have quiet time alone, what do you usually notice?",
        ar: "لما تقعد لوحدك في هدوء، إيه أكتر حاجة بتلاحظها؟",
        answers: [
            { en: "My thoughts, feelings, and what they may be telling me.", ar: "أفكاري ومشاعري وإيه اللي ممكن تكون بتوضحهولي.", score: 4 },
            { en: "The things I want to do or understand better.", ar: "الحاجات اللي عايز أعملها أو أفهمها أكتر.", score: 3 },
            { en: "Mostly the events of the day and what comes next.", ar: "غالبًا أحداث اليوم والحاجات اللي هتحصل بعد كده.", score: 2 },
            { en: "I quickly look for something to occupy my attention.", ar: "بسرعة بدور على حاجة تشغل انتباهي.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "How clearly can you describe what matters most to you?",
        ar: "قد إيه تقدر تحدد إيه أكتر حاجات مهمة بالنسبة لك؟",
        answers: [
            { en: "I can name my priorities and explain why they matter.", ar: "بقدر أحدد أولوياتي وأشرح ليه هي مهمة عندي.", score: 4 },
            { en: "I know my main priorities, though some are still changing.", ar: "عارف أهم أولوياتي، رغم إن بعضها لسه بيتغير.", score: 3 },
            { en: "I often discover my priorities through experience.", ar: "غالبًا بكتشف أولوياتي من خلال التجارب.", score: 2 },
            { en: "I find it difficult to tell what I truly want.", ar: "بلاقي صعوبة أحدد أنا عايز إيه فعلًا.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "When you imagine your future, what is your usual experience?",
        ar: "لما تتخيل مستقبلك، بيحصل إيه غالبًا؟",
        answers: [
            { en: "I picture possibilities and consider what steps could lead there.", ar: "بتخيل احتمالات مختلفة وبفكر في الخطوات اللي ممكن توصلني ليها.", score: 4 },
            { en: "I have a general direction, even if the details are unclear.", ar: "عندي اتجاه عام، حتى لو التفاصيل مش واضحة.", score: 3 },
            { en: "My picture changes often depending on my current situation.", ar: "تصوري للمستقبل بيتغير كتير حسب ظروفي الحالية.", score: 2 },
            { en: "Thinking about the future mostly leaves me uncertain.", ar: "التفكير في المستقبل غالبًا بيخليني محتار.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "How often do your actions match the person you want to become?",
        ar: "قد إيه تصرفاتك الحالية بتقربك من الشخص اللي عايز تبقى عليه؟",
        answers: [
            { en: "I regularly check my habits and adjust them to fit my direction.", ar: "براجع عاداتي باستمرار وبظبطها عشان تناسب الطريق اللي اخترته.", score: 4 },
            { en: "Many of my actions fit my goals, though not all of them.", ar: "تصرفات كتير عندي مناسبة لأهدافي، حتى لو مش كلها.", score: 3 },
            { en: "I know what I want to change but haven't built a routine yet.", ar: "عارف إيه اللي محتاج أغيره، بس لسه مبنيتش نظام ثابت.", score: 2 },
            { en: "I rarely think about whether my habits fit my future goals.", ar: "نادرًا ما بفكر إذا كانت عاداتي مناسبة لأهدافي المستقبلية.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "When you feel uncertain about yourself, what helps you regain perspective?",
        ar: "لما تحتار في نفسك، إيه اللي بيساعدك تشوف الأمور بوضوح؟",
        answers: [
            { en: "Reflect on my experiences and separate facts from assumptions.", ar: "براجع تجاربي وبفرّق بين الحقائق والحاجات اللي بفترضها.", score: 4 },
            { en: "Talk with someone I trust who knows me well.", ar: "بتكلم مع حد بثق فيه وعارفني كويس.", score: 3 },
            { en: "Look for reassurance from other people's opinions.", ar: "بدور على تطمين من آراء الناس التانية.", score: 2 },
            { en: "Keep questioning myself without finding a clear answer.", ar: "بفضل أشكك في نفسي من غير ما أوصل لإجابة واضحة.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "How do you relate to parts of yourself that you want to improve?",
        ar: "بتتعامل إزاي مع الجوانب في نفسك اللي عايز تطورها؟",
        answers: [
            { en: "Accept where I am while taking practical steps to grow.", ar: "بتقبل نفسي في مرحلتي الحالية وباخد خطوات عملية للتطور.", score: 4 },
            { en: "Focus on improving gradually without expecting perfection.", ar: "بركز على التحسن بالتدريج من غير ما أطلب الكمال من نفسي.", score: 3 },
            { en: "Compare myself with an ideal version of who I should be.", ar: "بقارن نفسي بصورة مثالية للشخص اللي المفروض أكونه.", score: 2 },
            { en: "Focus on my shortcomings until it becomes hard to notice my strengths.", ar: "بركز على عيوبي لحد ما ببقى مش شايف مميزاتي.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "What happens when your beliefs about yourself are challenged by experience?",
        ar: "لما تجربة تحصل وتخالف فكرتك عن نفسك، بتتعامل إزاي؟",
        answers: [
            { en: "Reconsider my self-image and allow for a more balanced view.", ar: "براجع فكرتي عن نفسي وبسمح لنفسي أشوف الصورة بشكل أعدل.", score: 4 },
            { en: "Think about the experience before deciding what it means.", ar: "بفكر في التجربة قبل ما أحدد معناها بالنسبة لي.", score: 3 },
            { en: "Focus on the parts that confirm what I already believe.", ar: "بركز على الأجزاء اللي بتأكد الفكرة اللي عندي أصلًا.", score: 2 },
            { en: "Dismiss the experience because it conflicts with how I see myself.", ar: "بتجاهل التجربة لأنها بتتعارض مع نظرتي لنفسي.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "How do you decide which influences deserve a place in your life?",
        ar: "بتحدد إزاي مين أو إيه يستحق يكون ليه تأثير في حياتك؟",
        answers: [
            { en: "Consider whether the influence supports my values and wellbeing.", ar: "بشوف إذا كان تأثيره مناسب لمبادئي وراحتي.", score: 4 },
            { en: "Give it time and observe its effect on my choices.", ar: "بدي الموضوع وقت وبلاحظ تأثيره على قراراتي.", score: 3 },
            { en: "Follow it when people I admire approve of it.", ar: "بمشي وراه لما ناس بقدرهم يكونوا موافقين عليه.", score: 2 },
            { en: "Let it shape my choices without thinking much about its impact.", ar: "بسيبه يأثر على اختياراتي من غير ما أفكر كتير في تأثيره.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "When you think about your past, how do you use those memories?",
        ar: "لما تفتكر مواقف من الماضي، بتستفيد منها إزاي؟",
        answers: [
            { en: "Learn from them while remembering that I can keep changing.", ar: "بتعلم منها وبفتكر إن من حقي أتغير وأتطور.", score: 4 },
            { en: "Recognize patterns that may help me make better choices.", ar: "بلاحظ أنماط متكررة ممكن تساعدني أختار بشكل أحسن.", score: 3 },
            { en: "Often compare the present with how things used to be.", ar: "غالبًا بقارن الحاضر باللي كان بيحصل زمان.", score: 2 },
            { en: "Let past experiences define what I think is possible for me.", ar: "بخلي تجارب الماضي تحدد أنا شايف إيه ممكن ليا وإيه لأ.", score: 1 }
        ]
    },
    {
        dimension: "innerWorld",
        en: "What best describes your relationship with your own identity?",
        ar: "إيه أقرب وصف لعلاقتك بهويتك وشخصيتك؟",
        answers: [
            { en: "I understand my core values while staying open to growth.", ar: "فاهم مبادئي الأساسية وفي نفس الوقت متقبل إني أتطور.", score: 4 },
            { en: "I have a growing sense of who I am, with things left to explore.", ar: "عندي فهم بيزيد لشخصيتي، ولسه في حاجات بكتشفها.", score: 3 },
            { en: "My sense of self changes a lot with the people around me.", ar: "نظرتي لنفسي بتتغير كتير حسب الناس اللي حواليا.", score: 2 },
            { en: "I often struggle to describe what makes me who I am.", ar: "غالبًا بلاقي صعوبة أوصف إيه اللي بيميز شخصيتي.", score: 1 }
        ]
    }
];

/* =========================================
   PART 8: SCORING, PROFILES AND RESULTS
========================================= */

const resultProfiles = {
    emotions: [
        {
            min: 10,
            en: "The Feeling Explorer",
            ar: "مستكشف المشاعر",
            descriptionEn: "You may still be learning how to recognize and navigate your feelings. Give yourself time, and remember that emotional understanding grows with practice.",
            descriptionAr: "ممكن تكون لسه بتتعلم تفهم مشاعرك وتتعامل معاها. ادي لنفسك وقت، وافتكر إن فهم المشاعر بيتطور بالممارسة."
        },
        {
            min: 20,
            en: "The Emotional Observer",
            ar: "ملاحظ المشاعر",
            descriptionEn: "You notice some of your emotional patterns and are building ways to respond to them. A little reflection can help you understand yourself more clearly.",
            descriptionAr: "بتلاحظ بعض أنماط مشاعرك وبتتعلم تتعامل معاها. شوية تأمل ومراجعة ممكن يساعدوك تفهم نفسك بشكل أوضح."
        },
        {
            min: 30,
            en: "The Emotion Navigator",
            ar: "فاهم اتجاه مشاعره",
            descriptionEn: "You often recognize what you feel and can use that awareness to make thoughtful choices. Keep balancing self-understanding with kindness toward yourself.",
            descriptionAr: "غالبًا بتعرف تحدد مشاعرك وبتستفيد من فهمها في اختياراتك. استمر في فهم نفسك مع التعامل معاها برحمة."
        }
    ],

    relationships: [
        {
            min: 10,
            en: "The Relationship Learner",
            ar: "متعلم في العلاقات",
            descriptionEn: "You may still be discovering what helps relationships feel safe and balanced. Clear communication and healthy boundaries can develop over time.",
            descriptionAr: "ممكن تكون لسه بتكتشف إيه اللي بيخلي العلاقات مريحة ومتوازنة. التواصل الواضح والحدود الصحية مهارات بتتطور مع الوقت."
        },
        {
            min: 20,
            en: "The Thoughtful Connector",
            ar: "باني علاقات بوعي",
            descriptionEn: "You are developing your own way of connecting with people. Paying attention to communication, trust, and mutual respect can deepen those connections.",
            descriptionAr: "بتكوّن طريقتك الخاصة في التقرب من الناس. الاهتمام بالتواصل والثقة والاحترام المتبادل ممكن يقوي علاقاتك."
        },
        {
            min: 30,
            en: "The Intentional Connector",
            ar: "صاحب العلاقات الواعية",
            descriptionEn: "You often approach relationships with consideration for both your needs and other people's perspectives. Keep making room for honesty and mutual growth.",
            descriptionAr: "غالبًا بتراعي احتياجاتك ووجهات نظر الناس في علاقاتك. حافظ على مساحة للصراحة والتطور المتبادل."
        }
    ],

    thinking: [
        {
            min: 10,
            en: "The Curious Beginner",
            ar: "المفكر المستكشف",
            descriptionEn: "You are still developing your personal approach to solving problems and evaluating ideas. Asking questions and practicing step by step can help.",
            descriptionAr: "لسه بتطور طريقتك في حل المشاكل وتقييم الأفكار. طرح الأسئلة والتدريب خطوة بخطوة ممكن يساعدك."
        },
        {
            min: 20,
            en: "The Reflective Thinker",
            ar: "المفكر المتأمل",
            descriptionEn: "You use several thinking strategies and are learning when to apply them. Taking time to examine assumptions can make your decisions clearer.",
            descriptionAr: "بتستخدم أكتر من طريقة في التفكير وبتتعلم إمتى تستفيد من كل واحدة. مراجعة افتراضاتك ممكن تخلي قراراتك أوضح."
        },
        {
            min: 30,
            en: "The Analytical Explorer",
            ar: "المحلل المستكشف",
            descriptionEn: "You often examine ideas, look for patterns, and learn from new information. Stay curious and leave room to change your mind when evidence changes.",
            descriptionAr: "غالبًا بتفحص الأفكار وبتلاحظ الأنماط وبتستفيد من المعلومات الجديدة. حافظ على فضولك وخليك مستعد تراجع رأيك لما الأدلة تتغير."
        }
    ],

    values: [
        {
            min: 10,
            en: "The Values Seeker",
            ar: "الباحث عن مبادئه",
            descriptionEn: "You may still be defining which principles matter most to you. Reflecting on real-life choices can help you identify what you want to stand for.",
            descriptionAr: "ممكن تكون لسه بتحدد المبادئ الأهم عندك. التفكير في اختياراتك الحقيقية ممكن يساعدك تعرف إيه اللي عايز تتمسك بيه."
        },
        {
            min: 20,
            en: "The Values Builder",
            ar: "باني المبادئ",
            descriptionEn: "You are developing a clearer sense of what matters to you. Practice aligning everyday decisions with the principles you choose.",
            descriptionAr: "بتبني فهم أوضح للحاجات المهمة بالنسبة لك. حاول تخلي قراراتك اليومية متوافقة مع المبادئ اللي اخترتها."
        },
        {
            min: 30,
            en: "The Principle-Guided Mind",
            ar: "صاحب المبادئ الواضحة",
            descriptionEn: "You often consider your principles when making choices. Staying open to other perspectives can help you apply those principles thoughtfully.",
            descriptionAr: "غالبًا بتراعي مبادئك وقت الاختيار. الانفتاح على وجهات نظر مختلفة ممكن يساعدك تطبق مبادئك بحكمة."
        }
    ],

    ambition: [
        {
            min: 10,
            en: "The Goal Discoverer",
            ar: "مكتشف الأهداف",
            descriptionEn: "You may still be finding the goals and routines that work for you. Small, realistic steps can help you build momentum without demanding perfection.",
            descriptionAr: "ممكن تكون لسه بتكتشف الأهداف والأنظمة المناسبة ليك. الخطوات الصغيرة والواقعية ممكن تساعدك تتقدم من غير ما تطلب الكمال من نفسك."
        },
        {
            min: 20,
            en: "The Growing Achiever",
            ar: "الساعي للتطور",
            descriptionEn: "You have developing strategies for moving toward your goals. Reviewing progress and adjusting your plan can help you stay consistent.",
            descriptionAr: "عندك طرق بتتطور بيها ناحية أهدافك. مراجعة تقدمك وتعديل خطتك ممكن يساعدوك تستمر."
        },
        {
            min: 30,
            en: "The Purposeful Builder",
            ar: "صاحب السعي الهادف",
            descriptionEn: "You often connect goals with deliberate action and learning. Keep protecting your wellbeing while making steady progress.",
            descriptionAr: "غالبًا بتربط أهدافك بخطوات مقصودة وتعلم مستمر. حافظ على راحتك وإنت بتتقدم بثبات."
        }
    ],

    innerWorld: [
        {
            min: 10,
            en: "The Self Explorer",
            ar: "مستكشف الذات",
            descriptionEn: "You may still be discovering what shapes your identity and priorities. Give yourself room to explore without needing every answer immediately.",
            descriptionAr: "ممكن تكون لسه بتكتشف إيه اللي بيشكل شخصيتك وأولوياتك. ادي لنفسك مساحة للاستكشاف من غير ما تحتاج إجابة لكل حاجة فورًا."
        },
        {
            min: 20,
            en: "The Self Observer",
            ar: "ملاحظ الذات",
            descriptionEn: "You are building a clearer understanding of your experiences and preferences. Regular reflection can help you recognize patterns and choose what matters.",
            descriptionAr: "بتبني فهم أوضح لتجاربك وتفضيلاتك. مراجعة نفسك من وقت للتاني ممكن تساعدك تلاحظ الأنماط وتحدد المهم بالنسبة لك."
        },
        {
            min: 30,
            en: "The Self-Aware Explorer",
            ar: "المستكشف الواعي بذاته",
            descriptionEn: "You often reflect on your identity while remaining open to growth. Keep allowing yourself to learn, change, and develop in your own way.",
            descriptionAr: "غالبًا بتراجع فهمك لنفسك مع تقبّل التطور. اسمح لنفسك تتعلم وتتغير وتنمو بطريقتك."
        }
    ]
};

function calculateResults() {
    const totals = {};

    Object.keys(dimensions).forEach(key => {
        totals[key] = 0;
    });

    questions.forEach((question, index) => {
        const selectedScore = state.answers[index];

        if (typeof selectedScore === "number") {
            totals[question.dimension] += selectedScore;
        }
    });

    return Object.keys(dimensions).map(key => {
        const score = totals[key];
        const profileList = resultProfiles[key];

        let profile = profileList[0];

        profileList.forEach(item => {
            if (score >= item.min) {
                profile = item;
            }
        });

        return {
            key,
            score,
            percentage: Math.round((score / 40) * 100),
            name: state.language === "ar"
                ? profile.ar
                : profile.en,
            description: state.language === "ar"
                ? profile.descriptionAr
                : profile.descriptionEn
        };
    });
}

function getOverallProfile(results) {
    const average = results.reduce(
        (sum, item) => sum + item.percentage,
        0
    ) / results.length;

    if (average >= 75) {
        return state.language === "ar"
            ? {
                name: "رحلة وعي مستمرة",
                description: "إجاباتك بتشير لوجود جوانب واضحة من الوعي بالذات في أكتر من مجال. خليك منفتح على التعلم والتغيير."
            }
            : {
                name: "The Self-Awareness Journey",
                description: "Your answers suggest several areas of self-awareness across different dimensions. Stay open to learning and change."
            };
    }

    if (average >= 50) {
        return state.language === "ar"
            ? {
                name: "اكتشاف ونمو",
                description: "إجاباتك بتشير إن عندك جوانب بتفهمها عن نفسك، وجوانب تانية لسه بتكتشفها. التطور رحلة مستمرة."
            }
            : {
                name: "Discovery and Growth",
                description: "Your answers suggest that you understand some parts of yourself while continuing to explore others. Growth is an ongoing process."
            };
    }

    return state.language === "ar"
        ? {
            name: "بداية استكشاف الذات",
            description: "إجاباتك بتفتح مساحة للتعرف على نفسك بشكل أعمق. خُد النتيجة كفرصة للتأمل، مش كحكم نهائي على شخصيتك."
        }
        : {
            name: "Beginning Self-Discovery",
            description: "Your answers offer a starting point for exploring yourself more deeply. Treat this result as a reflection prompt, not a final judgment of your personality."
        };
}

function renderResults() {
    state.results = calculateResults();

    const overall = getOverallProfile(state.results);

    if (elements.personality) {
        elements.personality.textContent = overall.name;
    }

    if (elements.description) {
        elements.description.textContent = overall.description;
    }

    if (elements.symbol) {
        elements.symbol.textContent = "✦";
    }

    if (elements.tags) {
        elements.tags.replaceChildren();

        state.results
            .slice()
            .sort((a, b) => b.percentage - a.percentage)
            .slice(0, 3)
            .forEach(item => {
                const tag = document.createElement("span");
                tag.className = "result-tag";
                tag.textContent = item.name;
                elements.tags.appendChild(tag);
            });
    }

    if (elements.dimensionResults) {
        elements.dimensionResults.replaceChildren();

        state.results.forEach(item => {
            const wrapper = document.createElement("div");
            wrapper.className = "dimension-result";

            const heading = document.createElement("div");
            heading.className = "dimension-result-heading";

            const label = document.createElement("span");
            label.textContent = localized(dimensions[item.key]);

            const value = document.createElement("span");
            value.textContent = `${item.percentage}%`;

            heading.append(label, value);

            const bar = document.createElement("div");
            bar.className = "dimension-bar";

            const fill = document.createElement("div");
            fill.className = "dimension-bar-fill";
            fill.style.width = `${item.percentage}%`;
            fill.style.backgroundColor = dimensions[item.key].color;

            bar.appendChild(fill);
            wrapper.append(heading, bar);
            elements.dimensionResults.appendChild(wrapper);
        });
    }

    if (elements.reflection) {
        elements.reflection.textContent = t("reflection");
    }

    showScreen(elements.results);
}

/* =========================================
   PART 9: INTERACTIONS AND INITIALIZATION
========================================= */

function updateLanguageInterface() {
    document.documentElement.lang = state.language;
    document.documentElement.dir =
        state.language === "ar" ? "rtl" : "ltr";

    if (elements.start) {
        elements.start.textContent = t("start");
    }

    if (elements.language) {
        elements.language.textContent = t("languageLabel");
        elements.language.setAttribute(
            "aria-label",
            state.language === "ar"
                ? "Switch to English"
                : "التبديل إلى العربية"
        );
    }

    if (elements.sound) {
        elements.sound.setAttribute(
            "aria-pressed",
            String(state.soundEnabled)
        );
    }

    if (elements.previous) {
        elements.previous.textContent = t("previous");
    }

    if (elements.next) {
        elements.next.textContent =
            state.currentQuestion === questions.length - 1
                ? t("reveal")
                : t("next");
    }

    if (elements.restart) {
        elements.restart.textContent =
            state.language === "ar"
                ? "ابدأ من جديد"
                : "Start Again";
    }

    if (elements.share) {
        elements.share.textContent =
            state.language === "ar"
                ? "شارك نتيجتك"
                : "Share Your Result";
    }

    const pageTexts = {
        en: {
            "Begin Your Journey": "Begin Your Journey",
            "Discover Your Inner Self": "Discover Your Inner Self",
            "Your journey starts here": "Your journey starts here"
        },
        ar: {
            "Begin Your Journey": "ابدأ رحلتك",
            "Discover Your Inner Self": "اكتشف عالمك الداخلي",
            "Your journey starts here": "رحلتك لفهم نفسك بتبدأ هنا"
        }
    };

    document.querySelectorAll("[data-i18n]").forEach(node => {
        const key = node.dataset.i18n;
        const translated = pageTexts[state.language][key];

        if (translated) {
            node.textContent = translated;
        }
    });
}

function renderQuestion() {
    const question = questions[state.currentQuestion];

    if (!question) return;

    updateLanguageInterface();

    if (elements.counter) {
        elements.counter.textContent =
            state.language === "ar"
                ? `السؤال ${state.currentQuestion + 1} من ${questions.length}`
                : `QUESTION ${state.currentQuestion + 1} OF ${questions.length}`;
    }

    if (elements.progress) {
        elements.progress.style.width =
            `${((state.currentQuestion + 1) / questions.length) * 100}%`;
    }

    if (elements.dimension) {
        elements.dimension.textContent =
            localized(dimensions[question.dimension]);
    }

    if (elements.number) {
        elements.number.textContent =
            String(state.currentQuestion + 1).padStart(2, "0");
    }

    if (elements.title) {
        elements.title.textContent = localized(question);
    }

    if (elements.subtitle) {
        elements.subtitle.textContent =
            state.language === "ar"
                ? "اختار الإجابة الأقرب لطريقتك الحقيقية في التفكير أو التصرف."
                : "Choose the answer that best reflects how you really think or act.";
    }

    if (elements.answers) {
        elements.answers.replaceChildren();

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer-option";
            button.textContent = localized(answer);

            button.setAttribute("aria-pressed", "false");

            if (state.answers[state.currentQuestion] === answer.score) {
                button.classList.add("selected");
                button.setAttribute("aria-pressed", "true");
            }

            button.addEventListener("click", () => {
                state.answers[state.currentQuestion] = answer.score;

                elements.answers
                    .querySelectorAll(".answer-option")
                    .forEach(option => {
                        option.classList.remove("selected");
                        option.setAttribute("aria-pressed", "false");
                    });

                button.classList.add("selected");
                button.setAttribute("aria-pressed", "true");

                if (elements.next) {
                    elements.next.disabled = false;
                }

                playSelectionSound();
            });

            elements.answers.appendChild(button);
        });
    }

    if (elements.previous) {
        elements.previous.disabled = state.currentQuestion === 0;
    }

    if (elements.next) {
        elements.next.disabled =
            typeof state.answers[state.currentQuestion] !== "number";
    }
}

function startQuiz() {
    state.currentQuestion = 0;
    state.answers = {};
    state.results = [];
    state.completed = false;

    renderQuestion();
    showScreen(elements.quiz);
}

function goToPreviousQuestion() {
    if (state.currentQuestion <= 0) {
        showToast(t("first"));
        return;
    }

    state.currentQuestion -= 1;
    renderQuestion();
}

function goToNextQuestion() {
    if (
        typeof state.answers[state.currentQuestion] !== "number"
    ) {
        showToast(t("choose"));
        return;
    }

    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion += 1;
        renderQuestion();
        return;
    }

    state.completed = true;
    renderResults();
}

function toggleLanguage() {
    state.language =
        state.language === "en" ? "ar" : "en";

    updateLanguageInterface();

    if (elements.quiz && !elements.quiz.classList.contains("hidden")) {
        renderQuestion();
    }

    if (state.completed) {
        renderResults();
    }
}

function toggleSound() {
    state.soundEnabled = !state.soundEnabled;

    updateLanguageInterface();

    if (elements.sound) {
        elements.sound.textContent =
            state.language === "ar"
                ? (state.soundEnabled ? "الصوت: تشغيل" : "الصوت: إيقاف")
                : (state.soundEnabled ? "Sound: On" : "Sound: Off");
    }

    if (state.soundEnabled) {
        playSelectionSound();
    }
}

function playSelectionSound() {
    if (!state.soundEnabled) return;

    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        const audio = new AudioContextClass();
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = 660;
        gain.gain.value = 0.035;

        oscillator.connect(gain);
        gain.connect(audio.destination);

        oscillator.start();

        gain.gain.exponentialRampToValueAtTime(
            0.001,
            audio.currentTime + 0.12
        );

        oscillator.stop(audio.currentTime + 0.12);
        oscillator.onended = () => audio.close();
    } catch (error) {
        // Sound is optional; the quiz works without it.
    }
}

function restartQuiz() {
    state.currentQuestion = 0;
    state.answers = {};
    state.results = [];
    state.completed = false;

    updateLanguageInterface();
    showScreen(elements.welcome);
}

async function shareResult() {
    const overall = getOverallProfile(
        state.results.length
            ? state.results
            : calculateResults()
    );

    const strongest = state.results
        .slice()
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 2)
        .map(item => item.name)
        .join(state.language === "ar" ? "، " : ", ");

    const shareText = state.language === "ar"
        ? `نتيجتي في PERSONA: ${overall.name}\n${overall.description}\nأبرز الجوانب عندي: ${strongest}\nاختبار للتأمل وفهم الذات، مش تشخيص نفسي.`
        : `My PERSONA result: ${overall.name}\n${overall.description}\nMy strongest dimensions: ${strongest}\nA self-reflection quiz, not a psychological diagnosis.`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "PERSONA — Discover Your Inner Self",
                text: shareText,
                url: window.location.href
            });
            return;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(
                `${shareText}\n${window.location.href}`
            );

            showToast(t("copied"));
            return;
        }

        showToast(t("shareUnavailable"));
    } catch (error) {
        if (error && error.name === "AbortError") return;

        showToast(t("shareUnavailable"));
    }
}

function initializePersona() {
    updateLanguageInterface();

    if (elements.start) {
        elements.start.addEventListener("click", startQuiz);
    }

    if (elements.language) {
        elements.language.addEventListener("click", toggleLanguage);
    }

    if (elements.sound) {
        elements.sound.addEventListener("click", toggleSound);
    }

    if (elements.previous) {
        elements.previous.addEventListener(
            "click",
            goToPreviousQuestion
        );
    }

    if (elements.next) {
        elements.next.addEventListener(
            "click",
            goToNextQuestion
        );
    }

    if (elements.restart) {
        elements.restart.addEventListener("click", restartQuiz);
    }

    if (elements.share) {
        elements.share.addEventListener("click", shareResult);
    }

    showScreen(elements.welcome);
}

if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializePersona,
        { once: true }
    );
} else {
    initializePersona();
}
