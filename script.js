
"use strict";

/* =========================================
   PERSONA — CLEAN REBUILD
   Part 1: State, elements and translations
========================================= */

const state = {
    language: "en",
    currentQuestion: 0,
    answers: {},
    results: [],
    soundEnabled: false
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
        first: "You are already at the first question.",
        question: "QUESTION",
        reflection: "Which part of this reflection felt most familiar? What would you like to understand better about yourself? Your personality is bigger than any quiz.",
        copied: "Your result has been copied.",
        shareUnavailable: "Sharing is unavailable on this device.",
        resultTitle: "The Thoughtful Explorer",
        resultDescription: "Your answers offer ideas for reflection, not fixed limits on who you are.",
        soundOn: "Sound enabled",
        soundOff: "Sound disabled",
        footer: "An invitation to understand yourself."
    },
    ar: {
        start: "ابدئي رحلتك",
        previous: "السابق",
        next: "متابعة",
        reveal: "عرض النتيجة",
        choose: "اختاري إجابة عشان تكملي.",
        first: "أنتِ بالفعل عند أول سؤال.",
        question: "السؤال",
        reflection: "إيه أكتر جزء من النتيجة حسّيتي إنه قريب منك؟ وإيه الجانب اللي حابة تفهميه عن نفسك بشكل أعمق؟ شخصيتك أكبر من أي اختبار.",
        copied: "تم نسخ نتيجتك.",
        shareUnavailable: "المشاركة غير متاحة على الجهاز ده.",
        resultTitle: "المستكشفة المتأملة",
        resultDescription: "إجاباتك بتساعدك تتأملي في نفسك، لكنها مش أحكام ثابتة على شخصيتك.",
        soundOn: "تم تفعيل الصوت",
        soundOff: "تم إيقاف الصوت",
        footer: "رحلة لفهم نفسك بصورة أعمق."
    }
};

function t(key) {
    return translations[state.language][key]
        || translations.en[key]
        || key;
}
/* =========================================
   PART 2: DIMENSIONS AND QUESTIONS 1–30
========================================= */

const dimensions = [
    {
        id: "emotions",
        en: "Emotional Awareness",
        ar: "الوعي العاطفي",
        color: "#0E8F70",
        icon: "♡"
    },
    {
        id: "relationships",
        en: "Relationships",
        ar: "العلاقات",
        color: "#D5BC8A",
        icon: "◇"
    },
    {
        id: "thinking",
        en: "Thinking Style",
        ar: "أسلوب التفكير",
        color: "#77A9D8",
        icon: "◎"
    },
    {
        id: "values",
        en: "Values & Beliefs",
        ar: "القيم والمبادئ",
        color: "#B7A0D8",
        icon: "✧"
    },
    {
        id: "ambition",
        en: "Ambition & Growth",
        ar: "الطموح والتطور",
        color: "#D99A78",
        icon: "↗"
    },
    {
        id: "innerWorld",
        en: "Inner World",
        ar: "العالم الداخلي",
        color: "#83B6A2",
        icon: "☾"
    }
];

const questionPrompts = [
    // Dimension 1: Emotional Awareness
    {
        dimension: "emotions",
        en: "When a strong emotion appears, what do you usually do?",
        ar: "لما تحسي بمشاعر قوية، غالبًا بتتصرفي إزاي؟"
    },
    {
        dimension: "emotions",
        en: "How easy is it for you to name what you feel?",
        ar: "قد إيه سهل عليكي تحددي إنتِ حاسة بإيه؟"
    },
    {
        dimension: "emotions",
        en: "When something disappoints you, what helps most?",
        ar: "لما حاجة تخيب أملك، إيه أكتر حاجة بتساعدك؟"
    },
    {
        dimension: "emotions",
        en: "How do you usually handle an unexpected change?",
        ar: "غالبًا بتتعاملي إزاي مع التغيير المفاجئ؟"
    },
    {
        dimension: "emotions",
        en: "What do you do when your feelings become confusing?",
        ar: "بتعملي إيه لما مشاعرك تبقى متلخبطة؟"
    },
    {
        dimension: "emotions",
        en: "How do you respond when someone misunderstands you?",
        ar: "بتتصرفي إزاي لما حد يفهمك غلط؟"
    },
    {
        dimension: "emotions",
        en: "What helps you regain balance after a difficult day?",
        ar: "إيه اللي بيساعدك ترجعي لتوازنك بعد يوم صعب؟"
    },
    {
        dimension: "emotions",
        en: "How comfortable are you expressing your feelings?",
        ar: "قد إيه مرتاحة وإنتِ بتعبّري عن مشاعرك؟"
    },
    {
        dimension: "emotions",
        en: "When you make a mistake, how do you treat yourself?",
        ar: "لما بتغلطي، بتعاملي نفسك إزاي؟"
    },
    {
        dimension: "emotions",
        en: "What do you notice first during an emotional moment?",
        ar: "إيه أول حاجة بتلاحظيها وقت المواقف العاطفية؟"
    },

    // Dimension 2: Relationships
    {
        dimension: "relationships",
        en: "What helps you feel safe with another person?",
        ar: "إيه اللي بيخليكي تحسي بالأمان مع شخص؟"
    },
    {
        dimension: "relationships",
        en: "How do you usually handle a disagreement?",
        ar: "غالبًا بتتعاملي إزاي مع الاختلاف في الرأي؟"
    },
    {
        dimension: "relationships",
        en: "What matters most to you in a friendship?",
        ar: "إيه أهم حاجة عندك في الصداقة؟"
    },
    {
        dimension: "relationships",
        en: "How do you react when someone needs your support?",
        ar: "بتتصرفي إزاي لما حد يحتاج دعمك؟"
    },
    {
        dimension: "relationships",
        en: "How comfortable are you setting personal boundaries?",
        ar: "قد إيه مرتاحة وإنتِ بتحطي حدود في التعامل؟"
    },
    {
        dimension: "relationships",
        en: "What do you do when you feel left out?",
        ar: "بتعملي إيه لما تحسي إنك مستبعدة؟"
    },
    {
        dimension: "relationships",
        en: "How do you usually build trust with someone?",
        ar: "غالبًا بتبني الثقة مع حد إزاي؟"
    },
    {
        dimension: "relationships",
        en: "When conflict happens, what do you value most?",
        ar: "لما يحصل خلاف، إيه أكتر حاجة بتهمك؟"
    },
    {
        dimension: "relationships",
        en: "How do you show people that you appreciate them?",
        ar: "بتوضحي للناس تقديرك ليهم إزاي؟"
    },
    {
        dimension: "relationships",
        en: "What makes a conversation feel meaningful to you?",
        ar: "إيه اللي بيخلي الحوار له معنى بالنسبة لك؟"
    },

    // Dimension 3: Thinking Style
    {
        dimension: "thinking",
        en: "When facing a problem, what is your first step?",
        ar: "لما تواجهي مشكلة، إيه أول خطوة بتعمليها؟"
    },
    {
        dimension: "thinking",
        en: "How do you make an important decision?",
        ar: "بتاخدي قرار مهم إزاي؟"
    },
    {
        dimension: "thinking",
        en: "What do you do when information is incomplete?",
        ar: "بتعملي إيه لما المعلومات تكون مش كاملة؟"
    },
    {
        dimension: "thinking",
        en: "How do you react when someone challenges your opinion?",
        ar: "بتتصرفي إزاي لما حد يناقش رأيك أو يعارضه؟"
    },
    {
        dimension: "thinking",
        en: "When learning something new, what helps you most?",
        ar: "لما تتعلمي حاجة جديدة، إيه أكتر حاجة بتساعدك؟"
    },
    {
        dimension: "thinking",
        en: "How do you approach a complicated task?",
        ar: "بتتعاملِي إزاي مع مهمة معقدة؟"
    },
    {
        dimension: "thinking",
        en: "What helps you decide whether an idea makes sense?",
        ar: "إيه اللي بيساعدك تعرفي إذا كانت الفكرة منطقية؟"
    },
    {
        dimension: "thinking",
        en: "How do you respond when your plan does not work?",
        ar: "بتتصرفي إزاي لما خطتك متنجحش؟"
    },
    {
        dimension: "thinking",
        en: "What do you consider before choosing between options?",
        ar: "إيه اللي بتفكري فيه قبل ما تختاري بين بدائل؟"
    },
    {
        dimension: "thinking",
        en: "How do you organize your thoughts under pressure?",
        ar: "بترتبي أفكارك إزاي وقت الضغط؟"
    },    // Dimension 4: Values & Beliefs
    {
        dimension: "values",
        en: "What guides you when making a difficult choice?",
        ar: "إيه اللي بيوجهك لما تاخدي قرار صعب؟"
    },
    {
        dimension: "values",
        en: "What makes you respect another person?",
        ar: "إيه اللي بيخليكي تحترمي شخص؟"
    },
    {
        dimension: "values",
        en: "How do you react when something feels unfair?",
        ar: "بتتصرفي إزاي لما تحسي إن حاجة مش عادلة؟"
    },
    {
        dimension: "values",
        en: "What matters most when keeping a promise?",
        ar: "إيه أهم حاجة عندك في الوفاء بالوعد؟"
    },
    {
        dimension: "values",
        en: "How do you handle pressure to go against your beliefs?",
        ar: "بتتعاملي إزاي مع الضغط عشان تتصرفي عكس مبادئك؟"
    },
    {
        dimension: "values",
        en: "What does being honest mean to you?",
        ar: "الصدق معناه إيه بالنسبة لك؟"
    },
    {
        dimension: "values",
        en: "How do you decide what deserves your time?",
        ar: "بتحددي إزاي إيه اللي يستحق وقتك؟"
    },
    {
        dimension: "values",
        en: "What do you value most in yourself?",
        ar: "إيه أكتر حاجة بتقدريها في نفسك؟"
    },
    {
        dimension: "values",
        en: "How do you respond when your values are challenged?",
        ar: "بتتصرفي إزاي لما حد يتحدى مبادئك؟"
    },
    {
        dimension: "values",
        en: "What makes an achievement meaningful to you?",
        ar: "إيه اللي بيخلي الإنجاز له قيمة عندك؟"
    },

    // Dimension 5: Ambition & Growth
    {
        dimension: "ambition",
        en: "How do you approach a goal that feels difficult?",
        ar: "بتتعاملي إزاي مع هدف حاسة إنه صعب؟"
    },
    {
        dimension: "ambition",
        en: "What motivates you to keep learning?",
        ar: "إيه اللي بيحفزك تكملي تعلُّم؟"
    },
    {
        dimension: "ambition",
        en: "How do you react when progress is slower than expected?",
        ar: "بتتصرفي إزاي لما تقدمك يكون أبطأ من المتوقع؟"
    },
    {
        dimension: "ambition",
        en: "What helps you turn an idea into action?",
        ar: "إيه اللي بيساعدك تحولي الفكرة لخطوة عملية؟"
    },
    {
        dimension: "ambition",
        en: "How do you handle feedback about your work?",
        ar: "بتتعاملي إزاي مع الملاحظات على شغلك؟"
    },
    {
        dimension: "ambition",
        en: "What do you do when you lose motivation?",
        ar: "بتعملي إيه لما حماسك يقل؟"
    },
    {
        dimension: "ambition",
        en: "How do you measure your personal progress?",
        ar: "بتقيسي تطورك الشخصي إزاي؟"
    },
    {
        dimension: "ambition",
        en: "How do you balance planning and taking action?",
        ar: "بتوازني إزاي بين التخطيط والتنفيذ؟"
    },
    {
        dimension: "ambition",
        en: "What do you learn from an unsuccessful attempt?",
        ar: "بتتعلمي إيه من محاولة منجحتش؟"
    },
    {
        dimension: "ambition",
        en: "What kind of future are you working toward?",
        ar: "إنتِ بتسعي لمستقبل شكله إيه؟"
    },

    // Dimension 6: Inner World
    {
        dimension: "innerWorld",
        en: "When do you feel most connected to yourself?",
        ar: "إمتى بتحسي إنك أقرب لنفسك؟"
    },
    {
        dimension: "innerWorld",
        en: "What do you notice when you spend time alone?",
        ar: "إيه اللي بتلاحظيه لما تقضي وقت لوحدك؟"
    },
    {
        dimension: "innerWorld",
        en: "How do you make sense of your experiences?",
        ar: "بتفهمي تجاربك وبتستوعبيها إزاي؟"
    },
    {
        dimension: "innerWorld",
        en: "What helps you understand what you truly need?",
        ar: "إيه اللي بيساعدك تفهمي إنتِ محتاجة إيه فعلًا؟"
    },
    {
        dimension: "innerWorld",
        en: "How do you respond to a quiet moment?",
        ar: "بتتعاملي إزاي مع لحظة هدوء؟"
    },
    {
        dimension: "innerWorld",
        en: "What helps you reconnect with your priorities?",
        ar: "إيه اللي بيساعدك ترجعي تركزي على أولوياتك؟"
    },
    {
        dimension: "innerWorld",
        en: "How do you reflect on an important experience?",
        ar: "بتراجعي تجربة مهمة في حياتك إزاي؟"
    },
    {
        dimension: "innerWorld",
        en: "What makes a place feel peaceful to you?",
        ar: "إيه اللي بيخلي مكان تحسي فيه بالراحة والهدوء؟"
    },
    {
        dimension: "innerWorld",
        en: "How do you explore a question about yourself?",
        ar: "بتستكشفي سؤال عن نفسك إزاي؟"
    },
    {
        dimension: "innerWorld",
        en: "What helps you feel grounded when life gets busy?",
        ar: "إيه اللي بيساعدك تحسي بالثبات لما الحياة تبقى مشغولة؟"
    }
];/* =========================================
   PART 4: ANSWER OPTIONS AND SCORING
========================================= */

const answerOptions = [
    {
        en: "I pause and reflect before responding.",
        ar: "بقف مع نفسي وأفكر قبل ما أتصرف.",
        scores: [3, 1, 1, 2, 1, 3]
    },
    {
        en: "I talk it through with someone I trust.",
        ar: "بتكلم مع شخص بثق فيه.",
        scores: [2, 3, 1, 2, 1, 1]
    },
    {
        en: "I analyze the situation and find a practical step.",
        ar: "بحلل الموقف وبدور على خطوة عملية.",
        scores: [1, 1, 3, 1, 3, 1]
    },
    {
        en: "I take quiet time to understand what matters to me.",
        ar: "باخد وقت هادي أفهم فيه إيه المهم بالنسبة لي.",
        scores: [2, 1, 2, 3, 1, 3]
    }
];

const questions = questionPrompts.map((question, index) => {
    const dimensionIndex = dimensions.findIndex(
        dimension => dimension.id === question.dimension
    );

    return {
        id: index + 1,
        dimension: question.dimension,
        en: question.en,
        ar: question.ar,

        answers: answerOptions.map((option, answerIndex) => ({
            id: `q${index + 1}_a${answerIndex + 1}`,
            en: option.en,
            ar: option.ar,

            scores: option.scores.map((score, scoreIndex) => {
                const targetBonus = [3, 2, 1, 2][answerIndex];

                return score + (
                    scoreIndex === dimensionIndex
                        ? targetBonus
                        : 0
                );
            })
        }))
    };
});

function calculateResults() {
    const totals = dimensions.map(() => 0);

    questions.forEach(question => {
        const selectedAnswerId = state.answers[question.id];

        if (!selectedAnswerId) return;

        const selectedAnswer = question.answers.find(
            answer => answer.id === selectedAnswerId
        );

        if (!selectedAnswer) return;

        selectedAnswer.scores.forEach((score, index) => {
            totals[index] += score;
        });
    });

    const totalScore = totals.reduce(
        (sum, score) => sum + score,
        0
    );

    return dimensions.map((dimension, index) => ({
        id: dimension.id,
        en: dimension.en,
        ar: dimension.ar,
        color: dimension.color,
        score: totals[index],
        percentage: totalScore > 0
            ? Math.round((totals[index] / totalScore) * 100)
            : 0
    })).sort((a, b) => b.score - a.score);
}/* =========================================
   PART 5: QUESTION DISPLAY AND NAVIGATION
========================================= */

function showToast(message) {
    if (!elements.toast) return;

    elements.toast.textContent = message;
    elements.toast.classList.remove("hidden");

    elements.toast.setAttribute("role", "status");
}

function getLocalized(item) {
    return state.language === "ar"
        ? item.ar
        : item.en;
}

function showScreen(screen) {
    [elements.welcome, elements.quiz, elements.results]
        .forEach(section => {
            if (section) section.classList.add("hidden");
        });

    if (screen) screen.classList.remove("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function renderQuestion() {
    const question = questions[state.currentQuestion];

    if (!question) return;

    const dimension = dimensions.find(
        item => item.id === question.dimension
    );

    const currentNumber = state.currentQuestion + 1;
    const isArabic = state.language === "ar";
    const selectedId = state.answers[question.id];

    if (elements.counter) {
        elements.counter.textContent =
            `${currentNumber} / ${questions.length}`;
    }

    if (elements.progress) {
        elements.progress.style.width =
            `${(currentNumber / questions.length) * 100}%`;
    }

    if (elements.dimension) {
        elements.dimension.textContent =
            dimension ? getLocalized(dimension) : "";
    }

    if (elements.number) {
        elements.number.textContent =
            `${t("question")} ${currentNumber}`;
    }

    if (elements.title) {
        elements.title.textContent = getLocalized(question);
    }

    if (elements.subtitle) {
        elements.subtitle.textContent = isArabic
            ? "اختاري الإجابة الأقرب ليكي."
            : "Choose the answer that feels closest to you.";
    }

    if (elements.answers) {
        elements.answers.replaceChildren();

        question.answers.forEach((answer, index) => {
            const button = document.createElement("button");

            button.type = "button";
            button.className = "answer-option";
            button.textContent = getLocalized(answer);
            button.setAttribute(
                "aria-pressed",
                String(answer.id === selectedId)
            );

            if (answer.id === selectedId) {
                button.classList.add("selected");
            }

            button.addEventListener("click", () => {
                state.answers[question.id] = answer.id;

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

                playTone(440 + index * 70);
            });

            elements.answers.appendChild(button);
        });
    }

    if (elements.previous) {
        elements.previous.disabled = state.currentQuestion === 0;
        elements.previous.textContent = t("previous");
    }

    if (elements.next) {
        elements.next.disabled = !selectedId;
        elements.next.textContent =
            currentNumber === questions.length
                ? t("reveal")
                : t("next");
    }
}

function goToNextQuestion() {
    const question = questions[state.currentQuestion];

    if (!question || !state.answers[question.id]) {
        showToast(t("choose"));
        return;
    }

    if (state.currentQuestion < questions.length - 1) {
        state.currentQuestion += 1;
        renderQuestion();
        return;
    }

    showResults();
}

function goToPreviousQuestion() {
    if (state.currentQuestion <= 0) {
        showToast(t("first"));
        return;
    }

    state.currentQuestion -= 1;
    renderQuestion();
}/* =========================================
   PART 6: RESULTS SCREEN
========================================= */

const resultProfiles = {
    emotions: {
        symbol: "♡",
        en: "The Emotional Observer",
        ar: "المتأملة في مشاعرها",
        descriptionEn:
            "You may pay close attention to emotional experiences and the way they affect your choices. Give yourself room to understand your feelings without judging them.",
        descriptionAr:
            "قد تكوني بتهتمي بمشاعرك وتأثيرها على اختياراتك. ادي لنفسك مساحة تفهمي فيها مشاعرك من غير ما تحكمي عليها."
    },
    relationships: {
        symbol: "◇",
        en: "The Thoughtful Connector",
        ar: "صاحبة الروابط العميقة",
        descriptionEn:
            "You may place importance on trust, communication, and meaningful connections. Remember that healthy relationships also leave room for your own needs.",
        descriptionAr:
            "قد تكون الثقة والتواصل والعلاقات اللي ليها معنى حاجات مهمة عندك. افتكري إن العلاقات الصحية بتدي مساحة لاحتياجاتك إنتِ كمان."
    },
    thinking: {
        symbol: "◎",
        en: "The Curious Analyst",
        ar: "المحللة الفضولية",
        descriptionEn:
            "You may enjoy examining situations and looking for ways to understand them. Leave room for uncertainty and for learning from different perspectives.",
        descriptionAr:
            "قد بتحبي تفهمي المواقف وتحلليها. وسيبي مساحة لاحتمالات مختلفة وللتعلم من وجهات النظر المتنوعة."
    },
    values: {
        symbol: "✧",
        en: "The Values-Led Individual",
        ar: "صاحبة المبادئ",
        descriptionEn:
            "You may care about what feels meaningful and consistent with your principles. Reflection can help you balance your values with changing circumstances.",
        descriptionAr:
            "قد بتهتمي بالحاجات اللي ليها معنى وبتتفق مع مبادئك. التأمل ممكن يساعدك توازني بين قيمك والظروف المتغيرة."
    },
    ambition: {
        symbol: "↗",
        en: "The Growth Seeker",
        ar: "الساعية للتطور",
        descriptionEn:
            "You may be drawn to learning, progress, and new possibilities. Remember that growth can include rest, patience, and changing direction when needed.",
        descriptionAr:
            "قد بيجذبك التعلم والتقدم والفرص الجديدة. افتكري إن التطور ممكن يشمل الراحة والصبر وتغيير الاتجاه وقت الحاجة."
    },
    innerWorld: {
        symbol: "☾",
        en: "The Inner Explorer",
        ar: "المستكشفة لعالمها الداخلي",
        descriptionEn:
            "You may value quiet reflection and understanding your inner experiences. There is no single correct way to understand yourself, and that understanding can evolve.",
        descriptionAr:
            "قد بتقدري الهدوء والتأمل وفهم عالمك الداخلي. مفيش طريقة واحدة صحيحة لفهم نفسك، وفهمك لنفسك ممكن يتطور مع الوقت."
    }
};

function showResults() {
    state.results = calculateResults();

    const topResult = state.results[0];

    if (!topResult) return;

    const profile = resultProfiles[topResult.id];
    const isArabic = state.language === "ar";

    if (elements.personality) {
        elements.personality.textContent = isArabic
            ? profile.ar
            : profile.en;
    }

    if (elements.description) {
        elements.description.textContent = isArabic
            ? profile.descriptionAr
            : profile.descriptionEn;
    }

    if (elements.symbol) {
        elements.symbol.textContent = profile.symbol;
    }

    if (elements.tags) {
        elements.tags.replaceChildren();

        state.results.slice(0, 3).forEach(result => {
            const tag = document.createElement("span");
            const dimension = dimensions.find(
                item => item.id === result.id
            );

            tag.className = "result-tag";
            tag.textContent = dimension
                ? getLocalized(dimension)
                : "";

            elements.tags.appendChild(tag);
        });
    }

    if (elements.dimensionResults) {
        elements.dimensionResults.replaceChildren();

        state.results.forEach(result => {
            const row = document.createElement("div");
            row.className = "dimension-result";

            const heading = document.createElement("div");
            heading.className = "dimension-result-heading";

            const name = document.createElement("span");
            const dimension = dimensions.find(
                item => item.id === result.id
            );

            name.textContent = dimension
                ? getLocalized(dimension)
                : result.id;

            const percentage = document.createElement("span");
            percentage.textContent = `${result.percentage}%`;

            heading.append(name, percentage);

            const bar = document.createElement("div");
            bar.className = "dimension-bar";

            const fill = document.createElement("div");
            fill.className = "dimension-bar-fill";
            fill.style.width = `${result.percentage}%`;
            fill.style.backgroundColor = result.color;

            bar.appendChild(fill);
            row.append(heading, bar);
            elements.dimensionResults.appendChild(row);
        });
    }

    if (elements.reflection) {
        elements.reflection.textContent = t("reflection");
    }

    state.completed = true;
    showScreen(elements.results);
}/* =========================================
   PART 7: LANGUAGE, SOUND AND SHARING
========================================= */

const pageTranslations = {
    en: {
        eyebrow: "A JOURNEY INTO YOURSELF",
        titleLineOne: "Discover Your",
        titleLineTwo: "Inner Self",
        heroDescription:
            "A thoughtful journey through your emotions, relationships, values and ambitions.",
        questionsLabel: "60 QUESTIONS",
        dimensionsLabel: "6 DIMENSIONS",
        discoverLabel: "SELF-DISCOVERY",
        startButton: "Begin Your Journey",
        privacyNote: "Your answers stay in this session.",
        journeyTag: "YOUR JOURNEY",
        previousButton: "Previous",
        nextButton: "Continue",
        quizFootnote: "Take your time. There are no right or wrong answers.",
        resultsTag: "YOUR REFLECTION",
        resultsTitle: "Your Inner Profile",
        resultsDescription:
            "Explore the themes that stood out in your answers.",
        yourProfile: "YOUR PROFILE",
        dimensionsTag: "YOUR DIMENSIONS",
        dimensionsTitle: "A Closer Look",
        dimensionsDescription:
            "These percentages represent your answers in this quiz, not a clinical measurement.",
        reflectionTitle: "A Moment to Reflect",
        restartButton: "Start Again",
        shareButton: "Share Result",
        resultsDisclaimer:
            "This quiz is for self-reflection and entertainment, not a psychological diagnosis.",
        footerText: "An invitation to understand yourself."
    },
    ar: {
        eyebrow: "رحلة لاكتشاف ذاتك",
        titleLineOne: "اكتشفي",
        titleLineTwo: "عالمك الداخلي",
        heroDescription:
            "رحلة للتأمل في مشاعرك وعلاقاتك وقيمك وطموحاتك.",
        questionsLabel: "٦٠ سؤال",
        dimensionsLabel: "٦ أبعاد",
        discoverLabel: "اكتشاف الذات",
        startButton: "ابدئي رحلتك",
        privacyNote: "إجاباتك تظل في جلسة التصفح الحالية.",
        journeyTag: "رحلتك",
        previousButton: "السابق",
        nextButton: "متابعة",
        quizFootnote: "خدي وقتك، مفيش إجابات صح أو غلط.",
        resultsTag: "مساحة للتأمل",
        resultsTitle: "ملامح من عالمك الداخلي",
        resultsDescription:
            "اكتشفي الجوانب اللي ظهرت بوضوح في إجاباتك.",
        yourProfile: "ملامح شخصيتك",
        dimensionsTag: "أبعاد شخصيتك",
        dimensionsTitle: "نظرة أقرب",
        dimensionsDescription:
            "النسب دي بتعبّر عن إجاباتك في الاختبار، ومش قياس نفسي أو تشخيص.",
        reflectionTitle: "لحظة للتأمل",
        restartButton: "ابدئي من جديد",
        shareButton: "شاركي النتيجة",
        resultsDisclaimer:
            "الاختبار للتأمل وفهم الذات، وليس تشخيصًا نفسيًا.",
        footerText: "رحلة لفهم نفسك بصورة أعمق."
    }
};

function applyTranslations() {
    const language = state.language;
    const dictionary = pageTranslations[language];

    document.documentElement.lang = language;
    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");

        if (dictionary[key]) {
            element.textContent = dictionary[key];
        }
    });

    if (elements.start) {
        elements.start.textContent = t("start");
    }

    if (elements.language) {
        elements.language.textContent =
            language === "en" ? "العربية" : "English";

        elements.language.setAttribute(
            "aria-label",
            language === "en"
                ? "Switch to Arabic"
                : "التبديل إلى الإنجليزية"
        );
    }

    if (elements.sound) {
        const icon = elements.sound.querySelector(".sound-icon");

        if (icon) {
            icon.textContent = state.soundEnabled ? "♫" : "♪";
        }

        elements.sound.setAttribute(
            "aria-pressed",
            String(state.soundEnabled)
        );

        elements.sound.setAttribute(
            "aria-label",
            language === "ar"
                ? (state.soundEnabled ? "إيقاف الصوت" : "تفعيل الصوت")
                : (state.soundEnabled ? "Turn sound off" : "Turn sound on")
        );
    }

    if (!elements.quiz.classList.contains("hidden")) {
        renderQuestion();
    }

    if (!elements.results.classList.contains("hidden") && state.completed) {
        showResults();
    }
}

let audioContext = null;

function playTone(frequency = 440) {
    if (!state.soundEnabled) return;

    try {
        const AudioContextClass =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContextClass) return;

        if (!audioContext) {
            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = frequency;
        gain.gain.value = 0.035;

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.09);
    } catch (error) {
        console.warn("Sound is unavailable:", error);
    }
}

function restartQuiz() {
    state.currentQuestion = 0;
    state.answers = {};
    state.results = [];
    state.completed = false;

    if (elements.progress) {
        elements.progress.style.width = "0%";
    }

    showScreen(elements.welcome);
    applyTranslations();
}

async function shareResult() {
    if (!state.completed || !state.results.length) {
        showToast(t("choose"));
        return;
    }

    const topResult = state.results[0];
    const profile = resultProfiles[topResult.id];

    const resultName = state.language === "ar"
        ? profile.ar
        : profile.en;

    const shareText = state.language === "ar"
        ? `نتيجتي في PERSONA: ${resultName}\nرحلة للتأمل وفهم الذات.`
        : `My PERSONA reflection: ${resultName}\nA journey of self-discovery.`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: "PERSONA — Discover Your Inner Self",
                text: shareText,
                url: window.location.href
            });
        } else if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(
                `${shareText}\n${window.location.href}`
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
}/* =========================================
   PART 8: INITIALIZATION AND EVENT HANDLERS
========================================= */

function initializePersona() {
    // Check that the expected HTML elements exist.
    const requiredElements = [
        "welcomeScreen",
        "quizScreen",
        "resultsScreen",
        "startButton",
        "languageToggle",
        "soundToggle",
        "answerList",
        "previousButton",
        "nextButton",
        "restartButton",
        "shareButton"
    ];

    const missingElements = requiredElements.filter(
        id => !document.getElementById(id)
    );

    if (missingElements.length > 0) {
        console.error(
            "PERSONA is missing HTML elements:",
            missingElements
        );
        return;
    }

    // Validate the question bank.
    if (questions.length !== 60) {
        console.error(
            "PERSONA requires 60 questions. Found:",
            questions.length
        );
        return;
    }

    if (elements.start) {
        elements.start.addEventListener("click", () => {
            state.currentQuestion = 0;
            state.answers = {};
            state.results = [];
            state.completed = false;

            showScreen(elements.quiz);
            renderQuestion();
            playTone(440);
        });
    }

    if (elements.language) {
        elements.language.addEventListener("click", () => {
            state.language =
                state.language === "en" ? "ar" : "en";

            applyTranslations();
        });
    }

    if (elements.sound) {
        elements.sound.addEventListener("click", () => {
            state.soundEnabled = !state.soundEnabled;
            applyTranslations();

            if (state.soundEnabled) {
                playTone(520);
            }
        });
    }

    if (elements.next) {
        elements.next.addEventListener(
            "click",
            goToNextQuestion
        );
    }

    if (elements.previous) {
        elements.previous.addEventListener(
            "click",
            goToPreviousQuestion
        );
    }

    if (elements.restart) {
        elements.restart.addEventListener(
            "click",
            restartQuiz
        );
    }

    if (elements.share) {
        elements.share.addEventListener(
            "click",
            shareResult
        );
    }

    // Show the welcome screen and apply the default language.
    state.language = "en";
    state.currentQuestion = 0;
    state.answers = {};
    state.results = [];
    state.completed = false;

    showScreen(elements.welcome);
    applyTranslations();

    console.info(
        "PERSONA initialized successfully:",
        questions.length,
        "questions."
    );
}

// Run after the HTML has been loaded.
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializePersona,
        { once: true }
    );
} else {
    initializePersona();
}