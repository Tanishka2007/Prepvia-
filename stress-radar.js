// ========================================
// STRESS RADAR GAME
// ========================================


let stressLevel = 5;

let selectedCause = "";

let selectedResponse = "";


// ========================================
// GO BACK
// ========================================

function goBack() {

    window.location.href = "index.html";

}


// ========================================
// START GAME
// ========================================

function startGame() {

    showScreen("stress-screen");

}


// ========================================
// SHOW SCREEN
// ========================================

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".game-screen");


    screens.forEach(function(screen) {

        screen.classList.add("hidden");

    });


    document
        .getElementById(screenId)
        .classList.remove("hidden");

}


// ========================================
// UPDATE STRESS
// ========================================

function updateStress() {

    stressLevel =
        Number(
            document.getElementById("stress-slider").value
        );


    document.getElementById("stress-value")
        .innerText = stressLevel;


    updateMonster();

}


// ========================================
// CHANGE MONSTER
// ========================================

function updateMonster() {

    const monster =
        document.getElementById("monster-display");


    if (stressLevel <= 3) {

        monster.innerText = "🙂";

        monster.style.transform =
            "scale(0.8)";

    }

    else if (stressLevel <= 6) {

        monster.innerText = "😐";

        monster.style.transform =
            "scale(1)";

    }

    else if (stressLevel <= 8) {

        monster.innerText = "😟";

        monster.style.transform =
            "scale(1.15)";

    }

    else {

        monster.innerText = "😈";

        monster.style.transform =
            "scale(1.35)";

    }

}


// ========================================
// NEXT STEP
// ========================================

function nextStep() {

    showScreen("cause-screen");

}


// ========================================
// SELECT CAUSE
// ========================================

function selectCause(cause) {

    selectedCause = cause;


    document.getElementById("cause-message")
        .innerText =
        "Your Stress Monster is being fed by: "
        + cause;


    // Small delay makes the interaction
    // feel more game-like

    setTimeout(function() {

        showScreen("response-screen");

    }, 700);

}


// ========================================
// CHOOSE RESPONSE
// ========================================

function chooseResponse(response) {

    selectedResponse = response;


    showChallenge(response);

}


// ========================================
// CREATE CHALLENGE
// ========================================

function showChallenge(response) {

    const title =
        document.getElementById("challenge-title");


    const text =
        document.getElementById("challenge-text");


    const box =
        document.getElementById("challenge-box");


    if (response === "breathe") {

        title.innerText =
            "🫁 Calm the Monster";


        text.innerText =
            "Take three slow breaths. Breathe in gently and breathe out slowly.";


        box.innerHTML = `
            <div style="font-size:60px;">
                🫁
            </div>

            <p>
                Breathe in for 4 seconds.
                Breathe out for 6 seconds.
            </p>
        `;

    }


    else if (response === "break") {

        title.innerText =
            "📚 Make the Monster Smaller";


        text.innerText =
            "Think about the task stressing you. Turn it into ONE tiny action.";


        box.innerHTML = `
            <p>
                Instead of:
            </p>

            <strong>
                "I have to finish everything."
            </strong>

            <p>
                Try:
            </p>

            <strong>
                "I'll solve one question."
            </strong>
        `;

    }


    else if (response === "disconnect") {

        title.innerText =
            "📵 Protect Your Focus";


        text.innerText =
            "Remove one distraction for the next five minutes.";


        box.innerHTML = `
            <div style="font-size:50px;">
                📱 → 🚫
            </div>

            <p>
                Put your phone away
                or close one distracting app.
            </p>
        `;

    }


    else if (response === "connect") {

        title.innerText =
            "🤝 Reach Out";


        text.innerText =
            "Think of one person you trust and consider telling them how you're feeling.";


        box.innerHTML = `
            <div style="font-size:50px;">
                💬
            </div>

            <p>
                You could simply say:
            </p>

            <strong>
                "I'm having a difficult day.
                Can we talk?"
            </strong>
        `;

    }


    showScreen("challenge-screen");

}


// ========================================
// COMPLETE CHALLENGE
// ========================================

function completeChallenge() {

    showScreen("result-screen");


    const result =
        document.getElementById("result-message");


    const skill =
        document.getElementById("skill-name");


    result.innerText =
        `Today you noticed that ${selectedCause.toLowerCase()}
        was affecting you and chose a way to respond.
        That's a useful skill to practice.`;


    if (selectedResponse === "breathe") {

        skill.innerText =
            "Calm Breathing";

    }

    else if (selectedResponse === "break") {

        skill.innerText =
            "Task Breaker";

    }

    else if (selectedResponse === "disconnect") {

        skill.innerText =
            "Distraction Defender";

    }

    else if (selectedResponse === "connect") {

        skill.innerText =
            "Connection Seeker";

    }


    saveGameResult();

}


// ========================================
// SAVE RESULT
// ========================================

function saveGameResult() {

    const result = {

        date: new Date().toLocaleDateString(),

        stress: stressLevel,

        cause: selectedCause,

        response: selectedResponse

    };


    let history =
        JSON.parse(
            localStorage.getItem("stressRadarHistory")
        ) || [];


    history.push(result);


    localStorage.setItem(
        "stressRadarHistory",
        JSON.stringify(history)
    );

}


// ========================================
// PLAY AGAIN
// ========================================

function playAgain() {

    stressLevel = 5;

    selectedCause = "";

    selectedResponse = "";


    document.getElementById("stress-slider")
        .value = 5;


    document.getElementById("stress-value")
        .innerText = 5;


    document.getElementById("cause-message")
        .innerText = "";


    showScreen("intro-screen");

}








































