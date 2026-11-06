
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });
});

// Perguntas do desafio educativo

const questions = [
    {
        question: "Qual elemento químico recebeu esse nome em homenagem à Polônia?",
        options: ["A) Rádio", "B) Polônio", "C) Urânio"],
        answer: 1,
        explanation: "Correto! O polônio foi nomeado em referência à Polônia, país de nascimento de Marie Curie."
    },
    {
        question: "Em qual área Marie Curie recebeu seu segundo Prêmio Nobel, em 1911?",
        options: ["A) Química", "B) Literatura", "C) Medicina"],
        answer: 0,
        explanation: "Correto! Em 1911, Marie Curie recebeu o Nobel de Química."
    },
    {
        question: "Em que ano Marie Curie recebeu seu primeiro Prêmio Nobel?",
        options: ["A) 1898", "B) 1903", "C) 1911"],
        answer: 1,
        explanation: "Correto! Em 1903, recebeu o Nobel de Física."
    }
];

let currentQuestion = 0;
let answered = false;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextButton = document.getElementById("nextQuestion");

function renderQuestion() {
    const item = questions[currentQuestion];

    questionEl.textContent = item.question;
    optionsEl.innerHTML = "";

    item.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.className = "quiz-option";
        button.textContent = option;
        button.type = "button";

        button.addEventListener("click", () => {
            chooseAnswer(index);
        });

        optionsEl.appendChild(button);
    });

    feedbackEl.textContent =
        "Selecione uma alternativa para conferir sua resposta.";

    nextButton.hidden = true;
    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Recomeçar desafio ↻"
            : "Próxima pergunta →";

    answered = false;
}

function chooseAnswer(index) {
    if (answered) return;

    answered = true;

    const item = questions[currentQuestion];

    const buttons = [
        ...optionsEl.querySelectorAll("button")
    ];

    buttons.forEach((button, i) => {
        button.disabled = true;

        if (i === item.answer) {
            button.classList.add("correct");
        } else if (i === index) {
            button.classList.add("wrong");
        }
    });

    feedbackEl.textContent =
        index === item.answer
            ? item.explanation
            : `Resposta incorreta. ${item.explanation}`;

    nextButton.hidden = false;
}

nextButton.addEventListener("click", () => {
    currentQuestion = (currentQuestion + 1) % questions.length;
    renderQuestion();
});

renderQuestion();

const botoesAbas = document.querySelectorAll(".tab-button");
const paineisAbas = document.querySelectorAll(".tab-panel");

function abrirAba(nome) {
    botoesAbas.forEach(botao => {
        const selecionado = botao.dataset.tab === nome;

        botao.classList.toggle("active", selecionado);
        botao.setAttribute("aria-selected", selecionado);
    });

    paineisAbas.forEach(painel => {
        const selecionado = painel.dataset.panel === nome;

        painel.hidden = !selecionado;
        painel.classList.toggle("active", selecionado);
    });
}

botoesAbas.forEach(botao => {
    botao.addEventListener("click", () => {
        abrirAba(botao.dataset.tab);
    });
});

// Permite que links internos abram a aba correspondente.
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", () => {
        const destino = link.getAttribute("href").substring(1);
        const elemento = document.getElementById(destino);

        if (!elemento) return;

        const painel = elemento.closest(".tab-panel");

        if (painel) {
            abrirAba(painel.dataset.panel);
        }
    });
});

// Abre inicialmente a aba História.
abrirAba("historia");
