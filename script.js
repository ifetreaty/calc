class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = '' //when the clear button is clicked, we don't want anything showing on the currrent operand
        this.previousOperand = ''
        this.operation = undefined //since no operation is selected
    }

    delete () { //To remove one figure 
        this.currentOperand = this.currentOperand.toString().slice(0, -1) //convert to string first, and then becomes the value from the first number until the second to the last number
    }

    appendNumber(number) { //To add a number to the calc. screen
        if (number === '.' && this.currentOperand.includes('.')) return //to make the period not appear more than once
        this.currentOperand = this.currentOperand.toString() + number.toString() //to let numbers keep adding on screen with each button clicked
    }

    chooseOperation(operation) { //To select an operation +, *, etc
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) //e.g for 10.00, returns 10; for 10.33, returns 10.33
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return //if it doesn't have a previous or current value, equals value shouldn't run
        switch (this.operation) { //switch acts as a multiple 'if' statements, works with case for each condition
            case '+':
              computation = prev + current 
              break //do not execute other case statements here..
            case '*':
              computation = prev * current
              break
            case '-':
              computation = prev - current
              break
            case '/':
              computation = prev / current
              break
            default: //if none of the operation values is selected
              return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''

    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement) //used to define classes and what we want in them

numberButtons.forEach(button => { //what happens with each number button
    button.addEventListener('click', () => { //what happens when each button is clicked
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay() //keeps updating the figures with each clicked button
    })
})

operationButtons.forEach(button => { //what happens with each operation button
    button.addEventListener('click', () => { //what happens when each button is clicked
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay() //keeps updating the figures
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})