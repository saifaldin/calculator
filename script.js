class Calculator {
    constructor(prevOperandElement, currOperandElement) {
        this.prevOperandElement = prevOperandElement;
        this.currOperandElement = currOperandElement;
        this.operation = '';
        this.allClear();
    }

    allClear() {
        this.currOperand = '';
        this.prevOperand = '';
        this.operation = '';
    }

    delete() {
        this.currOperand = this.currOperand.toString().slice(0, -1);
    }

    compute() {
        if (isNaN(parseInt(this.currOperand)) || isNaN(parseInt(this.prevOperand))) return;
        this.doOperation(this.operation);
        this.currOperand = this.prevOperand.split(' ')[0];
        this.prevOperand = '';
    }

    appendNumber(number) {
        this.currOperand = this.currOperand.toString() + number.toString();
    }

    doOperation(operation) {
        if (isNaN(parseInt(this.currOperand))) return;
        if (isNaN(parseInt(this.prevOperand))) {
            this.prevOperand = `${this.currOperand} ${operation}`;
            this.currOperand = '';
            this.operation = operation;
            return;
        }
        switch (this.operation) {
            case '+':
                this.prevOperand = `${parseFloat(this.prevOperand) + parseFloat(this.currOperand)} ${operation}`;
                this.operation = operation;
                break;
            case '-':
                this.prevOperand = `${parseFloat(this.prevOperand) - parseFloat(this.currOperand)} ${operation}`;
                this.operation = operation;
                break;
            case '÷':
                if (this.currOperand === '0') break;
                this.prevOperand = `${parseFloat(this.prevOperand) / parseFloat(this.currOperand)} ${operation}`;
                this.operation = operation;
                break;
            case '×':
                this.prevOperand = `${parseFloat(this.prevOperand) * parseFloat(this.currOperand)} ${operation}`;
                this.operation = operation;
                break;
            default:
        }
        this.currOperand = '';

    }
    updateDisplay() {
        this.currOperandElement.innerText = this.currOperand;
        this.prevOperandElement.innerText = this.prevOperand;

    }
}

const numberBtns = document.querySelectorAll('[data-number]');
console.dir(numberBtns);
const opertaionBtns = document.querySelectorAll('[data-operation]');
const acBtn = document.querySelector('[data-all-clear]');
const delBtn = document.querySelector('[data-delete]');
let prevOperandElement = document.querySelector('[data-prev-operand]');
let currOperandElement = document.querySelector('[data-curr-operand]');
const equalBtn = document.querySelector('[data-equal]');

let calculator = new Calculator(prevOperandElement, currOperandElement);

numberBtns.forEach(numberBtn => {
    numberBtn.addEventListener('click', () => {
        calculator.appendNumber(numberBtn.innerText);
        calculator.updateDisplay();
    });
});
opertaionBtns.forEach(operationBtn => {
    operationBtn.addEventListener('click', () => {
        calculator.doOperation(operationBtn.innerText);
        calculator.updateDisplay();
    });
});

acBtn.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay();
});

delBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
});

equalBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

