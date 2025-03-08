const display = document.querySelector(".display");
let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let shouldResetScreen = false;

const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const decimal = document.querySelector(".decimal");

numbers.forEach(button =>
    button.addEventListener("click", () => appendNumber(button.textContent))
);

operators.forEach(button =>
    button.addEventListener("click", () => setOperator(button.textContent))
);

equals.addEventListener("click", evaluate);
clear.addEventListener("click", resetCalculator);
backspace.addEventListener("click", deleteLastDigit);
decimal.addEventListener("click", appendDecimal);

function appendNumber(number) {
    if (shouldResetScreen) {
        display.textContent = "";
        shouldResetScreen = false;
    }
    display.textContent += number;
}

function setOperator(operator) {
    if (currentOperator !== "") evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (currentOperator === "" || shouldResetScreen) return;
    secondNumber = display.textContent;
    display.textContent = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));
    currentOperator = "";
}

function resetCalculator() {
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
}

function deleteLastDigit() {
    display.textContent = display.textContent.slice(0, -1);
    if (display.textContent === "") display.textContent = "0";
}

function appendDecimal() {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return b === 0 ? "Error" : a / b;
        default: return b;
    }
}