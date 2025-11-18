// Funcionalidad del menú hamburguesa
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    // Alternar menú al hacer clic en el botón hamburguesa
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Cerrar menú al hacer clic en un enlace
    navItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Datos del cuestionario
const quizData = [
    {
        question: "¿Cuál de estos es un síntoma común del asma?",
        options: [
            "Dolor de estómago",
            "Dificultad para respirar",
            "Dolor de cabeza",
            "Dolor de espalda"
        ],
        correct: 1
    },
    {
        question: "¿Qué medida ayuda a prevenir enfermedades respiratorias?",
        options: [
            "Fumar cigarrillos",
            "Lavarse las manos frecuentemente",
            "No vacunarse contra la influenza",
            "Evitar el ejercicio físico"
        ],
        correct: 1
    },
    {
        question: "¿Cuál es la función principal del sistema respiratorio?",
        options: [
            "Bombear sangre",
            "Procesar alimentos",
            "Intercambiar oxígeno y dióxido de carbono",
            "Producir hormonas"
        ],
        correct: 2
    }
];

// Variables del DOM
const quizContainer = document.getElementById('quiz-container');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result');
const scoreContainer = document.getElementById('score');
const restartButton = document.getElementById('restart-btn');

// Variables del estado del cuestionario
let currentQuestion = 0;
let score = 0;
let userAnswers = new Array(quizData.length).fill(null);

// Cargar pregunta actual
function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionElement.textContent = `Pregunta ${currentQuestion + 1}: ${currentQuizData.question}`;
    
    optionsContainer.innerHTML = '';
    currentQuizData.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.classList.add('quiz-option');
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Actualizar estado de los botones
    prevButton.disabled = currentQuestion === 0;
    nextButton.textContent = currentQuestion === quizData.length - 1 ? 'Ver resultados' : 'Siguiente';
    
    // Ocultar contenedor de resultados si está visible
    resultContainer.classList.add('hidden');
}

// Seleccionar una opción
function selectOption(selected) {
    // Remover selección previa
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Marcar opción seleccionada
    options[selected].classList.add('selected');
    userAnswers[currentQuestion] = selected;
}

// Ir a la siguiente pregunta
function nextQuestion() {
    if (userAnswers[currentQuestion] === null) {
        alert('Por favor selecciona una opción');
        return;
    }
    
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showResults();
    }
}

// Volver a la pregunta anterior
function prevQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Mostrar resultados
function showResults() {
    // Calcular puntuación
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Mostrar puntuación
    const percentage = Math.round((score / quizData.length) * 100);
    scoreContainer.textContent = `Tu puntuación: ${score} de ${quizData.length} (${percentage}%)`;
    
    // Mostrar respuestas correctas/incorrectas
    optionsContainer.innerHTML = '';
    quizData.forEach((question, qIndex) => {
        const questionElement = document.createElement('div');
        questionElement.classList.add('quiz-question');
        questionElement.textContent = `Pregunta ${qIndex + 1}: ${question.question}`;
        optionsContainer.appendChild(questionElement);
        
        const optionsList = document.createElement('div');
        optionsList.classList.add('quiz-options');
        
        question.options.forEach((option, oIndex) => {
            const optionElement = document.createElement('div');
            optionElement.classList.add('quiz-option');
            
            if (oIndex === question.correct) {
                optionElement.classList.add('correct');
            } else if (userAnswers[qIndex] === oIndex && userAnswers[qIndex] !== question.correct) {
                optionElement.classList.add('incorrect');
            }
            
            optionElement.textContent = option;
            optionsList.appendChild(optionElement);
        });
        
        optionsContainer.appendChild(optionsList);
    });
    
    // Actualizar UI
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    nextButton.classList.add('hidden');
    prevButton.classList.add('hidden');
    restartButton.classList.remove('hidden');
}

// Reiniciar cuestionario
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(quizData.length).fill(null);
    
    // Restaurar UI
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    nextButton.classList.remove('hidden');
    prevButton.classList.remove('hidden');
    restartButton.classList.add('hidden');
    
    // Cargar primera pregunta
    loadQuestion();
}

// Event listeners
// Hacer las secciones del footer colapsables en móviles
const setupFooterAccordion = () => {
    const footerSections = document.querySelectorAll('.footer-section');
    
    // Solo activar en móviles
    if (window.innerWidth <= 768) {
        // Cerrar todas las secciones por defecto
        footerSections.forEach(section => {
            const content = section.querySelector('.footer-section-content');
            if (content) {
                content.style.maxHeight = '0';
            } else {
                // Si no existe el contenedor de contenido, lo creamos
                const sectionContent = document.createElement('div');
                sectionContent.className = 'footer-section-content';
                while (section.childNodes.length > 0) {
                    if (!section.childNodes[0].classList.contains('footer-section-title')) {
                        sectionContent.appendChild(section.childNodes[0]);
                    } else {
                        break;
                    }
                }
                section.insertBefore(sectionContent, section.firstChild.nextSibling);
                sectionContent.style.maxHeight = '0';
            }
            
            // Asegurarse de que el título sea clickeable
            const title = section.querySelector('h3');
            if (title && !title.classList.contains('footer-section-title')) {
                title.classList.add('footer-section-title');
                title.style.cursor = 'pointer';
                title.addEventListener('click', () => {
                    section.classList.toggle('active');
                    const content = section.querySelector('.footer-section-content');
                    if (content) {
                        if (section.classList.contains('active')) {
                            content.style.maxHeight = content.scrollHeight + 'px';
                        } else {
                            content.style.maxHeight = '0';
                        }
                    }
                });
            }
        });
        
        // Abrir la primera sección por defecto
        if (footerSections[0]) {
            footerSections[0].classList.add('active');
            const firstContent = footerSections[0].querySelector('.footer-section-content');
            if (firstContent) {
                firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
            }
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar cuestionario
    loadQuestion();
    
    // Configurar el acordeón del footer
    setupFooterAccordion();
    
    // Actualizar en caso de redimensionamiento
    window.addEventListener('resize', setupFooterAccordion);
    
    // Botones de navegación
    nextButton.addEventListener('click', nextQuestion);
    prevButton.addEventListener('click', prevQuestion);
    restartButton.addEventListener('click', restartQuiz);
    
    // Navegación por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextQuestion();
        } else if (e.key === 'ArrowLeft') {
            prevQuestion();
        } else if (e.key >= 1 && e.key <= 4) {
            const optionIndex = parseInt(e.key) - 1;
            const options = document.querySelectorAll('.quiz-option');
            if (optionIndex < options.length) {
                selectOption(optionIndex);
            }
        } else if (e.key === 'Enter' && !resultContainer.classList.contains('hidden')) {
            restartQuiz();
        } else if (e.key === 'Enter') {
            nextQuestion();
        }
    });
});
