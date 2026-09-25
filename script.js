const display = document.getElementById("display");
const historyList = document.getElementById("history-list");
let historyStack = [];

function appendToDisplay(input) {
    const lastChar = display.value.slice(-1);
    const operators = ['+', '-', '*', '/'];

    if (operators.includes(input) && operators.includes(lastChar)) {
        display.value = display.value.slice(0, -1) + input;
        return;
    }

    if (display.value === "" && ['*', '/'].includes(input)) return;

    if (input === '.') {
        const currentNumSegment = display.value.split(/[\+\-\*\/]/).pop();
        if (currentNumSegment.includes('.')) return;
    }

    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    const expression = display.value;
    if (!expression) return;

    try {
        const resultVal = new Function(`return ${expression}`)();
        
        if (isNaN(resultVal) || !isFinite(resultVal)) {
            display.value = "Error";
        } else {
            const formattedResult = Number(Math.round(resultVal + 'e8') + 'e-8');
            display.value = formattedResult;

            // Add calculation to history stack
            addToHistory(expression, formattedResult);
        }
    } catch (error) {
        display.value = "Error";
    }
}

function backspace() {
    display.value = display.value.slice(0, -1);
}

// History Functions
function addToHistory(expression, result) {
    historyStack.unshift({ expression, result });
    renderHistory();
}

function renderHistory() {
    if (historyStack.length === 0) {
        historyList.innerHTML = `<li class="empty-msg">No calculations yet</li>`;
        return;
    }

    historyList.innerHTML = historyStack.map((item) => `
        <li onclick="useHistoryResult('${item.result}')">
            <div class="history-expression">${item.expression} =</div>
            <div class="history-result">${item.result}</div>
        </li>
    `).join('');
}

function useHistoryResult(val) {
    display.value = val;
}

function clearHistory() {
    historyStack = [];
    renderHistory();
}

// Global Keyboard Navigation
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape' || key.toLowerCase() === 'c') {
        clearDisplay();
    }
});