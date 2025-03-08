document.addEventListener("DOMContentLoaded", () => {
    const display = document.querySelector(".display");
    const buttons = document.querySelector(".buttons");

    let firstOperand = "";
    let secondOperand = "";
    let currentOperator = null;
    let shouldResetDisplay = false;

    function add(a, b) { return a + b; }
    function subtract(a, b) { return a - b; }
    function multiply(a, b) { return a * b; }
    function divide(a, b) {
        if (b === 0) {
            alert("Error: No se puede dividir por 0");
            return null;
        }
        return a / b;
    }

    function operate(operator, a, b) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (isNaN(a) || isNaN(b)) return "";
        switch (operator) {
            case "+": return add(a, b);
            case "-": return subtract(a, b);
            case "*": return multiply(a, b);
            case "/": return divide(a, b);
            default: return null;
        }
    }

    function updateDisplay(value) {
        display.textContent = value;
    }

    function handleNumberClick(number) {
        if (shouldResetDisplay) {
            display.textContent = "";
            shouldResetDisplay = false;
        }
        display.textContent = display.textContent === "0" ? number : display.textContent + number;
    }

    function handleOperatorClick(operator) {
        if (currentOperator !== null) {
            firstOperand = operate(currentOperator, firstOperand, display.textContent);
            updateDisplay(firstOperand);
        } else {
            firstOperand = display.textContent;
        }
        currentOperator = operator;
        shouldResetDisplay = true;
    }

    function handleEqualsClick() {
        if (currentOperator === null || shouldResetDisplay) return;
        secondOperand = display.textContent;
        const result = operate(currentOperator, firstOperand, secondOperand);
        updateDisplay(result);
        firstOperand = result;
        currentOperator = null;
    }

    function handleClear() {
        firstOperand = "";
        secondOperand = "";
        currentOperator = null;
        updateDisplay("0");
    }

    function handleBackspace() {
        display.textContent = display.textContent.slice(0, -1) || "0";
    }

    function handleDecimal() {
        if (!display.textContent.includes(".")) {
            display.textContent += ".";
        }
    }

    buttons.addEventListener("click", (event) => {
        const target = event.target;
        if (target.classList.contains("number")) {
            handleNumberClick(target.textContent);
        } else if (target.classList.contains("operator")) {
            handleOperatorClick(target.textContent);
        } else if (target.classList.contains("equals")) {
            handleEqualsClick();
        } else if (target.classList.contains("clear")) {
            handleClear();
        } else if (target.classList.contains("backspace")) {
            handleBackspace();
        } else if (target.classList.contains("decimal")) {
            handleDecimal();
        }
    });
});
