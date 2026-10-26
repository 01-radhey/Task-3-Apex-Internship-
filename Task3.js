const quizData = [
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Cascading Style Sheets",
            "Creative Style System",
            "Colorful Style Sheets"
        ],
        answer: 1 // index of correct option
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        options: ["var", "let", "const", "All of the above"],
        answer: 3
    },
    {
        question: "Inside which HTML element do we put the JavaScript?",
        options: ["<script>", "<js>", "<javascript>", "<code>"],
        answer: 0
    }
];

let currentQuiz = 0;
let score = 0;

let questionText = document.getElementById("question-text");
let optionsContainer = document.getElementById("options-container");
let nextQuizBtn = document.getElementById("next-quiz-btn");
let quizBox = document.getElementById("quiz-box");
let resultBox = document.getElementById("result-box");
let scoreText = document.getElementById("score-text");
let restartBtn = document.getElementById("restart-btn");

function loadQuiz() {
    resetState();
    let currentQuizData = quizData[currentQuiz];
    questionText.textContent = `${currentQuiz + 1}. ${currentQuizData.question}`;
    
    currentQuizData.options.forEach((option, index) => {
        let button = document.createElement("button");
        button.textContent = option;
        button.classList.add("option-btn");
        button.addEventListener("click", () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

function resetState() {
    optionsContainer.innerHTML = "";
    nextQuizBtn.style.display = "none";
}

function selectOption(selectedIndex, selectedButton) {
    let currentQuizData = quizData[currentQuiz];
    
    // Disable all options after selection
    let allButtons = optionsContainer.querySelectorAll(".option-btn");
    allButtons.forEach(btn => btn.disabled = true);
    
    if (selectedIndex === currentQuizData.answer) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
        // Highlight the correct one
        allButtons[currentQuizData.answer].classList.add("correct");
    }
    
    // Show next button or finish quiz
    if (currentQuiz < quizData.length - 1) {
        nextQuizBtn.style.display = "block";
    } else {
        setTimeout(showResults, 1000);
    }
}

function showResults() {
    quizBox.style.display = "none";
    nextQuizBtn.style.display = "none";
    resultBox.style.display = "block";
    scoreText.textContent = `Your Score: ${score} / ${quizData.length}`;
}

nextQuizBtn.addEventListener("click", () => {
    currentQuiz++;
    loadQuiz();
});

restartBtn.addEventListener("click", () => {
    currentQuiz = 0;
    score = 0;
    quizBox.style.display = "block";
    resultBox.style.display = "none";
    loadQuiz();
});

// Initial load for quiz
loadQuiz();


// -------- 2. API DATA FETCHING LOGIC --------

let fetchBtn = document.getElementById("fetch-btn");
let apiSetup = document.getElementById("api-setup");
let apiPunchline = document.getElementById("api-punchline");

async function fetchJokeData() {
    apiSetup.textContent = "Loading new data from API...";
    apiPunchline.textContent = "";

    try {
        let response = await fetch("https://official-joke-api.appspot.com/random_joke");
        
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        let data = await response.json();
        
        apiSetup.textContent = `😂 "${data.setup}"`;
        apiPunchline.textContent = `💡 ${data.punchline}`;
        
    } catch (error) {
        apiSetup.textContent = "Oops! Could not fetch data. Check your internet connection.";
        apiPunchline.textContent = "";
    }
}

fetchBtn.addEventListener("click", fetchJokeData);
