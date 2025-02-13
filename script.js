let input = document.getElementById('input');
let buttons = document.querySelectorAll('button');

let string = "";
let isResultDisplayed = false; // Track if result is displayed

let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
    });
});

// Function to handle input logic
function handleInput(value) {
    if (isResultDisplayed) {
        string = ""; // Clear previous result before new input
        isResultDisplayed = false;
    }

    if (value == '=') {
        calculateResult();
    } 
    else if (value == 'AC') {
        string = "";
        input.value = string;
    }
    else if (value == 'DEL') {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else {
        string += value;
        input.value = string;
    }
}

// Function to calculate result
function calculateResult() {
    try {
        string = Function('"use strict";return (' + string + ')')();
        input.value = string;
        isResultDisplayed = true; // Set flag after showing result
    } catch {
        input.value = "error";
        isResultDisplayed = true;
    }
}

// Add keyboard support
document.addEventListener("keydown", (event) => {
    if (isResultDisplayed) {
        string = ""; // Clear previous result before new input
        isResultDisplayed = false;
    }

    if ((event.key >= '0' && event.key <= '9') || 
        event.key === '+' || event.key === '-' || 
        event.key === '*' || event.key === '/' || 
        event.key === '.' || event.key === '%') {
        string += event.key;
        input.value = string;
    }
    else if (event.key === "Enter" || event.key === "=") {
        calculateResult();
    }
    else if (event.key === "Backspace") {
        string = string.substring(0, string.length - 1);
        input.value = string;
    }
    else if (event.key === "Escape") {
        string = "";
        input.value = string;
    }
});
