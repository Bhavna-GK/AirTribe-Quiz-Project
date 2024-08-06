const questions = [
    {
        text: "Which language is primarily used for web app development?",
        options: ["C#", "Python", "JavaScript", "Swift"],
        correct: 2
    },
    {
        text: "Which of the following is a relational database management system?",
        options: ["Oracle", "Scala", "Perl", "Java"],
        correct: 0
    },
    {
        text: "What does HTML stand for?",
        options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
        correct: 2
    },
    {
        text: "What does CSS stand for?",
        options: ["Cascading Stylesheets", "Cascading Styling Styles", "Cascading Sheets for Stylings", "Cascaded Stylesheets"],
        correct: 0
    },
    {
        text: "Which of the following is not an object-oriented programming language?",
        options: ["Java", "C#", "Scala", "C"],
        correct: 3
    },
    {
        text: "Which tool is used to ensure code quality in JavaScript?",
        options: ["JSLint", "TypeScript", "Babel", "Webpack"],
        correct: 0
    },
    {
        text: "What is the primary use of the Git command 'clone'?",
        options: ["To stage changes", "To copy a repository", "To switch to a different branch", "To list all the files in a repository"],
        correct: 1
    },
    {
        text: "What does API stand for in the context of programming?",
        options: ["Apple Pie Interface", "Application Programming Interface", "Advanced Peripheral Integration", "Application Process Integration"],
        correct: 1
    },
    {
        text: "Javascript is a single threaded programming language",
        options: ["True", "False"],
        correct: 0
    },
    {
        text: "API calls in Javascript can be done using the following method",
        options: ["setTimeout()", "setInterval()", "fetch()", "get()"],
        correct: 2
    },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerListElement = document.getElementById("answer-list");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.text;

    answerListElement.innerHTML = ""; // Clear previous options

    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.textContent = option;
        li.setAttribute("data-index", index);
        answerListElement.appendChild(li);
    });
}

answerListElement.addEventListener("click", (e) => {
    const selected = document.querySelector("#answer-list li.selected");
    if (selected) {
        selected.classList.remove("selected");
    }
    if (e.target.tagName === "LI") {
        e.target.classList.add("selected");
    }
});

submitButton.addEventListener("click", () => {
    const selected = document.querySelector("#answer-list li.selected");

    if (!selected) {
        alert("Please select an option!");
        return;
    }

    const answer = parseInt(selected.getAttribute("data-index"));

    if (answer === questions[currentQuestionIndex].correct) {
        score++;
    }

    // Disable submit button until next question is loaded
    submitButton.disabled = true;
});

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        submitButton.disabled = false; // Re-enable submit button
    } else {
        questionElement.textContent = `Quiz Completed! Final Score: ${score}/${questions.length}`;
        answerListElement.innerHTML = "";
        submitButton.style.display = "none";
        nextButton.style.display = "none";
    }
});

// Load the first question on startup
loadQuestion();
