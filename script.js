// use the class to store the information of what numbers is currently typed or what operations are typed

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}
	// All clear function
	clear() {
		this.currentOperand = "";
		this.previousOperand = "";
		this.operation = undefined;
	}
	// Delete function
	delete() {
		this.currentOperand = this.currentOperand.toString().slice(0, -1);
	}
	// Number button click function
	appendNumber(number) {
		// check for more than one period keys
		if (number === "." && this.currentOperand.includes(".")) return;
		// to append numbers
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}
	// Operation buttons click function
	chooseOperation(operation) {
		if (this.currentOperand === "") return;
		if (this.previousOperand !== "") {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = "";
	}
	// compute() takes the values inputted by the user to display a single value

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);

		if (isNaN(prev) || isNaN(current)) return;

		switch (this.operation) {
			case "+":
				computation = prev + current;
				break;
			case "-":
				computation = prev - current;
				break;
			case "*":
				computation = prev * current;
				break;
			case "÷":
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = "";
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split(".")[0]);
		const decimalDigits = stringNumber.split(".")[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = "";
		} else {
			integerDisplay = integerDigits.toLocaleString("en", {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	// updates the values inside our output
	updateDisplay() {
		this.currentOperandTextElement.innerText = this.getDisplayNumber(
			this.currentOperand
		);
		if (this.operation != null) {
			this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
				this.previousOperand
			)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.innerText = "";
		}
	}
}
// -------------------The Calculator Class ends here ------------------->

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals ]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
	"[data-previous-operand]"
);
const currentOperandTextElement = document.querySelector(
	"[data-current-operand]"
);

// Instantiating the class Calculator - creating an instance of Calculator
const calculator = new Calculator(
	previousOperandTextElement,
	currentOperandTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operationButtons.forEach((button) => {
	button.addEventListener("click", () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener("click", () => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener("click", () => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
	calculator.delete();
	calculator.updateDisplay();
});
