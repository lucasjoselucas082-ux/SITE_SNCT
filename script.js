
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

// =========================================
// MODO ESCURO
// =========================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

// Recupera o tema salvo ou utiliza o tema claro.
const savedTheme = localStorage.getItem("theme") || "light";

// Aplica o tema
function applyTheme(theme) {

    document.documentElement.setAttribute("data-theme", theme);

    const isDark = theme === "dark";

    // Atualiza o ícone
    themeIcon.className = isDark
        ? "bi bi-sun-fill"
        : "bi bi-moon-stars-fill";

    // Atualiza acessibilidade
    themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar modo claro" : "Ativar modo escuro"
    );

    themeToggle.setAttribute("aria-pressed", String(isDark));

    // Salva a preferência
    localStorage.setItem("theme", theme);
}

// Alterna entre os temas
themeToggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);

});

// Aplica o tema ao carregar a página
applyTheme(savedTheme);

// =========================================
// SCROLL REVEAL
// =========================================

// Elementos que receberão a animação
const revealElements = [
    ".intro-grid",
    ".history .section-heading",
    ".timeline-item .year",
    ".timeline-item > div:last-child",
    ".discovery-inner > .section-kicker",
    ".discovery-inner > h2",
    ".discovery-card",
    ".note-light",
    ".game-grid > div",
    ".mechanics > div",
    ".quiz-box",
    ".women .section-heading",
    ".women-grid article",
    ".project-inner > div"
].join(",");

// Configuração do observador
const scrollObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            // Para de observar depois que o elemento aparece
            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
});

// Identifica os elementos e inicia a observação
function iniciarScrollReveal() {

    document.querySelectorAll(revealElements).forEach((elemento, index) => {

        // Evita observar novamente elementos já revelados
        if (elemento.classList.contains("visible")) return;

        elemento.classList.add("reveal");

        // Pequeno atraso para criar uma sequência de aparição
        elemento.style.setProperty(
            "--reveal-delay",
            `${(index % 5) * 100}ms`
        );

        // Não observa elementos de abas que estão escondidas
        if (elemento.closest(".tab-panel[hidden]")) return;

        scrollObserver.observe(elemento);

    });

}

// Detecta quando o usuário troca de seção
const tabMutationObserver = new MutationObserver(() => {

    document.querySelectorAll(".tab-panel").forEach(painel => {

        // Verifica se a seção está ativa
        if (!painel.hidden) {

            const elementos = painel.querySelectorAll(".reveal");

            elementos.forEach(elemento => {

                // Interrompe a observação anterior
                scrollObserver.unobserve(elemento);

                // Reinicia a animação
                elemento.classList.remove("visible");

            });

            // Aguarda a atualização visual antes de observar novamente
            requestAnimationFrame(() => {

                elementos.forEach(elemento => {
                    scrollObserver.observe(elemento);
                });

            });

        }

    });

});

// Observa as alterações nas abas
document.querySelectorAll(".tab-panel").forEach(painel => {

    tabMutationObserver.observe(painel, {
        attributes: true,
        attributeFilter: ["hidden"]
    });

});

// Inicia o efeito
iniciarScrollReveal();