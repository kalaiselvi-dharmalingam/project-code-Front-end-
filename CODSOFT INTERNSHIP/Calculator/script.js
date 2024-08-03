// script.js
document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('btn'));
    let currentInput = '0';
    let operator = '';
    let operand1 = '';
    let operand2 = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = this.getAttribute('data-value');

            if (value === 'C') {
                display.textContent = '0';
                currentInput = '0';
                operand1 = '';
                operand2 = '';
                operator = '';
                shouldResetDisplay = false;
            } else if (value === '=') {
                if (operator && operand1) {
                    operand2 = currentInput;
                    display.textContent = `${operand1} ${operator} ${operand2} = ${calculateResult(operand1, operator, operand2)}`;
                    currentInput = display.textContent;
                    operand1 = '';
                    operand2 = '';
                    operator = '';
                    shouldResetDisplay = true;
                }
            } else if (this.classList.contains('operator')) {
                if (operator && operand1 && !shouldResetDisplay) {
                    operand2 = currentInput;
                    display.textContent = calculateResult(operand1, operator, operand2);
                    operand1 = display.textContent;
                    operand2 = '';
                } else {
                    operand1 = currentInput;
                }
                operator = value;
                display.textContent += ` ${operator} `;
                shouldResetDisplay = true;
            } else {
                if (shouldResetDisplay) {
                    currentInput = value;
                    shouldResetDisplay = false;
                } else {
                    currentInput = currentInput === '0' ? value : currentInput + value;
                }
                display.textContent = operator ? `${operand1} ${operator} ${currentInput}` : currentInput;
            }
        });
    });

    function calculateResult(operand1, operator, operand2) {
        let result = 0;
        switch (operator) {
            case '+':
                result = parseFloat(operand1) + parseFloat(operand2);
                break;
            case '-':
                result = parseFloat(operand1) - parseFloat(operand2);
                break;
            case '*':
                result = parseFloat(operand1) * parseFloat(operand2);
                break;
            case '/':
                result = parseFloat(operand1) / parseFloat(operand2);
                break;
        }
        return result.toString();
    }
});

