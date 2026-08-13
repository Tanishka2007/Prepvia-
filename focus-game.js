// ======================================
// FOCUS LOCK GAME
// ======================================


let target;

let score = 0;

let totalClicks = 0;

let correctClicks = 0;

let timeLeft = 30;

let gameTimer = null;

let spawnTimer = null;

let gameRunning = false;


// Possible targets

const targets = [

    "🔵",
    "🔴",
    "🟢",
    "🟡",
    "🟣"

];


// Distractions

const distractions = [

    "📱 Instagram",

    "🎮 Game",

    "📺 YouTube",

    "💬 Message",

    "🔔 Notification",

    "🎬 Reel"

];


// ======================================
// NAVIGATION
// ======================================

function goBack() {

    window.location.href = "index.html";

}


// ======================================
// START GAME
// ======================================

function startGame() {

    document.getElementById("intro")
        .classList.add("hidden");


    document.getElementById("target-screen")
        .classList.remove("hidden");


    // Choose random target

    target =
        targets[
            Math.floor(
                Math.random() * targets.length
            )
        ];


    document.getElementById("target-display")
        .innerText = target;


    // Show target for 2 seconds

    setTimeout(function() {

        document.getElementById("target-screen")
            .classList.add("hidden");


        document.getElementById("game-screen")
            .classList.remove("hidden");


        beginGame();

    }, 2000);

}


// ======================================
// BEGIN GAME
// ======================================

function beginGame() {

    gameRunning = true;

    score = 0;

    totalClicks = 0;

    correctClicks = 0;

    timeLeft = 30;


    document.getElementById("time")
        .innerText = timeLeft;


    document.getElementById("score")
        .innerText = "0";


    gameTimer =
        setInterval(function() {

            timeLeft--;

            document.getElementById("time")
                .innerText = timeLeft;


            calculateScore();


            if (timeLeft <= 0) {

                finishGame();

            }

        }, 1000);


    spawnTimer =
        setInterval(function() {

            spawnObject();

        }, 900);


    // First object

    spawnObject();

}


// ======================================
// SPAWN OBJECT
// ======================================

function spawnObject() {

    if (!gameRunning) return;


    const area =
        document.getElementById("game-area");


    const isTarget =
        Math.random() < 0.55;


    const object =
        document.createElement("div");


    if (isTarget) {

        object.className = "target";

        object.innerText = target;

        object.dataset.type = "correct";

    }

    else {

        object.className = "distraction";

        object.innerText =
            distractions[
                Math.floor(
                    Math.random() *
                    distractions.length
                )
            ];

        object.dataset.type = "wrong";

    }


    const maxX =
        area.clientWidth - 100;


    const maxY =
        area.clientHeight - 80;


    object.style.left =
        Math.random() * maxX + "px";


    object.style.top =
        Math.random() * maxY + "px";


    object.onclick = function() {

        objectClicked(object);

    };


    area.appendChild(object);


    // Automatically disappear

    setTimeout(function() {

        if (object.parentElement) {

            object.remove();

        }

    }, 1100);

}


// ======================================
// OBJECT CLICKED
// ======================================

function objectClicked(object) {

    if (!gameRunning) return;


    totalClicks++;


    if (object.dataset.type === "correct") {

        correctClicks++;

        object.remove();

    }

    else {

        // Wrong click

        object.remove();

    }


    calculateScore();

}


// ======================================
// CALCULATE SCORE
// ======================================

function calculateScore() {

    if (totalClicks === 0) {

        score = 0;

    }

    else {

        score =
            Math.round(
                (correctClicks / totalClicks) * 100
            );

    }


    document.getElementById("score")
        .innerText = score;

}


// ======================================
// FINISH GAME
// ======================================

function finishGame() {

    if (!gameRunning) return;


    clearInterval(gameTimer);

    clearInterval(spawnTimer);


    gameRunning = false;


    // Remove objects

    document
        .querySelectorAll(
            "#game-area .target, #game-area .distraction"
        )
        .forEach(function(item) {

            item.remove();

        });


    calculateScore();


    document.getElementById("game-screen")
        .classList.add("hidden");


    document.getElementById("result-screen")
        .classList.remove("hidden");


    document.getElementById("final-score")
        .innerText =
        score + "%";


    // ==================================
    // 80% OR MORE
    // ==================================

    if (score >= 80) {

        document.getElementById("result-icon")
            .innerText = "🎉";


        document.getElementById("result-title")
            .innerText =
            "Focus Unlocked!";


        document.getElementById("result-message")
            .innerText =
            "Excellent! You protected your attention and scored 80% or more.";


        document.getElementById("study-unlock")
            .classList.remove("hidden");


        document.getElementById("try-again")
            .classList.add("hidden");

    }

    else {

        document.getElementById("result-icon")
            .innerText = "🧠";


        document.getElementById("result-title")
            .innerText =
            "Keep Practicing";


        document.getElementById("result-message")
            .innerText =
            "You scored below 80%. That's okay — focus is a skill you can practice.";


        document.getElementById("study-unlock")
            .classList.add("hidden");


        document.getElementById("try-again")
            .classList.remove("hidden");

    }

}


// ======================================
// RESTART
// ======================================

function restartGame() {

    document.getElementById("result-screen")
        .classList.add("hidden");


    document.getElementById("intro")
        .classList.remove("hidden");


    document.getElementById("time")
        .innerText = "30";


    document.getElementById("score")
        .innerText = "0";

}


// ======================================
// START STUDYING
// ======================================

function startStudying() {

    // Go back to PrepMate's
    // study section

    window.location.href =
        "index.html#study";

}




























