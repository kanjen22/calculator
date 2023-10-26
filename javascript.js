function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    return a / b
}

function operate(a, opr, b) {
    return getOperator(opr)(a, b)
}

function getOperator(opr) {
    operators = {
        '+': add,
        '-': subtract,
        x: multiply,
        '/': divide,
    }
    return operators[opr]
}
a = operate(5, 'x', 3)
console.log(operate(5, '+', 3))
