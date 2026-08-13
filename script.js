// =============================
// MOOD CHECK-IN
// =============================

function selectMood(mood) {

    localStorage.setItem("todayMood", mood);

    const result = document.getElementById("moodResult");

    let message = "";

    if (mood === "Good") {
        message = "😊 That's great! Let's use your energy for one small goal.";
    }

    if (mood === "Okay") {
        message = "🙂 That's completely okay. Let's make today a little better.";
    }

    if (mood === "Stressed") {
        message = "😟 Take a breath. You don't have to solve everything today.";
    }

    if (mood === "Overwhelmed") {
        message = "🧘 Let's stop for a moment. Try the 60-second reset below.";
    }

    if (mood === "Lonely") {
        message = "🤝 You don't have to go through everything alone. Consider talking to someone you trust.";
    }

    result.innerHTML = message;
}


// =============================
// BREATHING RESET
// =============================

let breathingRunning = false;

function startBreathing() {

    if (breathingRunning) return;

    breathingRunning = true;

    const circle = document.getElementById("breathingCircle");
    const text = document.getElementById("breathingText");

    let cycle = 0;

    function breathingCycle() {

        if (cycle >= 5) {

            text.innerText = "🌱 You completed the reset. Take the next small step.";

            circle.innerText = "Done ✓";
            circle.classList.remove("breathing");

            breathingRunning = false;

            return;
        }

        text.innerText = "Breathe in slowly...";

        circle.innerText = "Inhale";

        circle.classList.add("breathing");

        setTimeout(() => {

            text.innerText = "Now breathe out slowly...";

            circle.innerText = "Exhale";

            circle.classList.remove("breathing");

        }, 4000);

        setTimeout(() => {

            cycle++;

            breathingCycle();

        }, 8000);
    }

    breathingCycle();
}


// =============================
// STUDY TIMER
// =============================

let timeLeft = 25 * 60;
let timerInterval = null;

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    document.getElementById("timer").innerText =
        `${minutes}:${seconds}`;
}


function startTimer() {

    if (timerInterval !== null) return;

    timerInterval = setInterval(() => {

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            timerInterval = null;

            alert("🎉 Great job! You completed your focus session.");

            addPoints(10);

            return;
        }

        timeLeft--;

        updateTimer();

    }, 1000);
}


function pauseTimer() {

    clearInterval(timerInterval);

    timerInterval = null;
}


function resetTimer() {

    clearInterval(timerInterval);

    timerInterval = null;

    timeLeft = 25 * 60;

    updateTimer();
}


// =============================
// DAILY GOAL
// =============================

function saveGoal() {

    const goal = document.getElementById("goalInput").value;

    if (goal.trim() === "") {
        alert("Please enter a goal.");
        return;
    }

    localStorage.setItem("goal", goal);

    displayGoal();
}


function displayGoal() {

    const goal = localStorage.getItem("goal");

    if (goal) {

        document.getElementById("goalDisplay").innerHTML =
            `🎯 Today's goal:<br><strong>${goal}</strong>`;
    }
}


// =============================
// GAMIFICATION
// =============================

let points = Number(localStorage.getItem("points")) || 0;

function addPoints(amount) {

    points += amount;

    localStorage.setItem("points", points);

    updatePlant();
}


function completeSmallWin() {

    addPoints(5);

    alert("🌱 Small win recorded! Keep going.");
}


function updatePlant() {

    const plant = document.getElementById("plant");

    document.getElementById("pointsText").innerText =
        `Your plant has ${points} points.`;

    if (points < 20) {
        plant.innerText = "🌱";
    }

    else if (points < 50) {
        plant.innerText = "🌿";
    }

    else if (points < 100) {
        plant.innerText = "🪴";
    }

    else {
        plant.innerText = "🌳";
    }
}


// =============================
// STUDY ROOM
// =============================

function joinRoom() {

    document.getElementById("roomMessage").innerText =
        "🎧 You're in the focus room. Start your timer and study together!";
}


// =============================
// HELP
// =============================

function showHelp() {

    document.getElementById("helpMessage").innerHTML = `
        <p>
        ❤️ You don't have to handle this alone.
        </p>

        <p>
        Talk to a parent, teacher, friend, counsellor,
        or another trusted person right now.
        </p>

        <p>
        <strong>India: Tele-MANAS — 14416</strong>
        </p>

        <p>
        If you are in immediate danger, contact local
        emergency services or go to the nearest emergency department.
        </p>
    `;
}


// =============================
// SCROLL
// =============================

function scrollToSection(id) {

    document.getElementById(id).scrollIntoView({
        behavior: "smooth"
    });
}


// =============================
// LOAD SAVED DATA
// =============================

window.onload = function() {

    displayGoal();

    updatePlant();

    updateTimer();

};




// =========================
// FOCUS SHIELD GAME
// =========================

let gameTime = 60;

let gameScore = 100;

let gameTimer = null;

let distractionTimer = null;

let gameRunning = false;


const distractions = [
    "📱 Instagram",
    "🎮 Game",
    "📺 YouTube",
    "💬 Message",
    "🔔 Notification",
    "🎬 Reel",
    "🛒 Shopping",
    "🎵 Music"
];


// =========================
// START GAME
// =========================

function startFocusGame() {

    if (gameRunning) return;

    gameRunning = true;

    gameTime = 60;

    gameScore = 100;


    document.getElementById("game-start-screen")
        .classList.add("hidden");


    document.getElementById("game-result")
        .classList.add("hidden");


    document.getElementById("game-time")
        .innerText = gameTime;


    document.getElementById("focus-score")
        .innerText = gameScore;


    document.getElementById("game-message")
        .innerText =
        "🛡️ Protect your focus";


    // Start countdown

    gameTimer = setInterval(function() {

        gameTime--;

        document.getElementById("game-time")
            .innerText = gameTime;


        if (gameTime <= 0) {

            finishFocusGame();

        }

    }, 1000);


    // Create distractions

    distractionTimer = setInterval(function() {

        createDistraction();

    }, 2500);

}


// =========================
// CREATE DISTRACTION
// =========================

function createDistraction() {

    if (!gameRunning) return;


    const gameArea =
        document.getElementById("game-area");


    const distraction =
        document.createElement("div");


    distraction.className =
        "distraction";


    const randomIndex =
        Math.floor(
            Math.random() *
            distractions.length
        );


    distraction.innerText =
        distractions[randomIndex];


    // Random position

    const maxX =
        gameArea.clientWidth - 130;

    const maxY =
        gameArea.clientHeight - 60;


    const x =
        Math.random() * maxX;

    const y =
        Math.random() * maxY;


    distraction.style.left =
        `${x}px`;


    distraction.style.top =
        `${y}px`;


    // If student clicks distraction

    distraction.onclick = function() {

        distractionClicked(distraction);

    };


    gameArea.appendChild(distraction);


    // Automatically disappear

    setTimeout(function() {

        if (distraction.parentElement) {

            distraction.remove();

        }

    }, 1800);

}


// =========================
// DISTRACTION CLICKED
// =========================

function distractionClicked(distraction) {

    if (!gameRunning) return;


    distraction.remove();


    gameScore -= 10;


    if (gameScore < 0) {

        gameScore = 0;

    }


    document.getElementById("focus-score")
        .innerText = gameScore;


    document.getElementById("game-message")
        .innerText =
        "😅 Distraction caught you! Refocus.";


    // If score becomes zero

    if (gameScore <= 0) {

        endGameBecauseOfDistractions();

    }

}


// =========================
// SUCCESS
// =========================

function finishFocusGame() {

    clearInterval(gameTimer);

    clearInterval(distractionTimer);


    gameRunning = false;


    removeDistractions();


    const result =
        document.getElementById("game-result");


    result.classList.remove("hidden");


    result.innerHTML = `
        <h3>🎉 Focus Protected!</h3>

        <p>
            You stayed focused for one full minute.
        </p>

        <p>
            🎯 Focus Score:
            <strong>${gameScore}</strong>
        </p>

        <p>
            🌱 You earned a small win.
        </p>

        <button onclick="restartFocusGame()">
            PLAY AGAIN
        </button>
    `;


    // Give ExamBuddy points

    if (typeof points !== "undefined") {

        points += 10;

        updatePlant();

    }

}


// =========================
// FAILED GAME
// =========================

function endGameBecauseOfDistractions() {

    clearInterval(gameTimer);

    clearInterval(distractionTimer);


    gameRunning = false;


    removeDistractions();


    const result =
        document.getElementById("game-result");


    result.classList.remove("hidden");


    result.innerHTML = `
        <h3>🧘 Your focus got distracted.</h3>

        <p>
            That's okay. The goal isn't perfection.
        </p>

        <p>
            Take a breath and try again.
        </p>

        <button onclick="restartFocusGame()">
            TRY AGAIN
        </button>
    `;

}


// =========================
// REMOVE DISTRACTIONS
// =========================

function removeDistractions() {

    const items =
        document.querySelectorAll(".distraction");


    items.forEach(function(item) {

        item.remove();

    });

}


// =========================
// RESTART
// =========================

function restartFocusGame() {

    document.getElementById("game-result")
        .classList.add("hidden");


    document.getElementById("game-start-screen")
        .classList.remove("hidden");


    document.getElementById("game-time")
        .innerText = "60";


    document.getElementById("focus-score")
        .innerText = "100";

}

function openStressRadar() {

    window.location.href = "stress-radar.html";

}
// =========================
// OPEN FOCUS GAME
// =========================

function openFocusGame() {

    window.location.href = "focus-game.html";

}



















