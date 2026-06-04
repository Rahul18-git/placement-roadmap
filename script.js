/* =====================================
   PLACEMENT ROADMAP - SCRIPT.JS
   Local Storage + Progress Tracker
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const checkboxes = document.querySelectorAll(
        'input[type="checkbox"]'
    );

    /* ==========================
       LOAD SAVED STATES
    ========================== */

    checkboxes.forEach((checkbox) => {

        const savedState =
            localStorage.getItem(checkbox.id);

        if (savedState === "true") {
            checkbox.checked = true;
        }

        checkbox.addEventListener(
            "change",
            handleCheckboxChange
        );
    });

    updateProgress();
});

/* ==========================
   SAVE CHECKBOX STATE
========================== */

function handleCheckboxChange(event) {

    const checkbox = event.target;

    localStorage.setItem(
        checkbox.id,
        checkbox.checked
    );

    updateProgress();
}

/* ==========================
   CALCULATE PROGRESS
========================== */

function updateProgress() {

    const allCheckboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );

    let completedTasks = 0;

    allCheckboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            completedTasks++;
        }
    });

    const totalTasks =
        allCheckboxes.length;

    let progressPercentage = 0;

    if (totalTasks > 0) {

        progressPercentage = Math.round(
            (completedTasks / totalTasks) * 100
        );

    }

    updateProgressBar(
        progressPercentage,
        completedTasks,
        totalTasks
    );
}

/* ==========================
   UPDATE UI ELEMENTS
========================== */

function updateProgressBar(
    percentage,
    completed,
    total
) {

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    const completedTasksElement =
        document.getElementById(
            "completedTasks"
        );

    /* Home Page Progress Bar */

    if (progressFill) {

        progressFill.style.width =
            percentage + "%";
    }

    if (progressText) {

        progressText.textContent =
            percentage + "% Completed";
    }

    /* Completed Tasks Counter */

    if (completedTasksElement) {

        completedTasksElement.textContent =
            completed;
    }

    /* Save overall progress */

    localStorage.setItem(
        "overallProgress",
        percentage
    );

    localStorage.setItem(
        "completedTasks",
        completed
    );

    localStorage.setItem(
        "totalTasks",
        total
    );
}

/* ==========================
   LOAD SAVED PROGRESS
   FOR INDEX PAGE
========================== */

window.addEventListener("load", () => {

    const progressFill =
        document.getElementById(
            "progressFill"
        );

    const progressText =
        document.getElementById(
            "progressText"
        );

    const completedTasksElement =
        document.getElementById(
            "completedTasks"
        );

    const savedProgress =
        localStorage.getItem(
            "overallProgress"
        );

    const completedTasks =
        localStorage.getItem(
            "completedTasks"
        );

    if (
        savedProgress &&
        progressFill
    ) {

        progressFill.style.width =
            savedProgress + "%";
    }

    if (
        savedProgress &&
        progressText
    ) {

        progressText.textContent =
            savedProgress +
            "% Completed";
    }

    if (
        completedTasks &&
        completedTasksElement
    ) {

        completedTasksElement.textContent =
            completedTasks;
    }

});