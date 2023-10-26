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

export function operate(a, opr, b) {
    return getOperator(opr)(a, b)
}

function getOperator(opr) {
    const operators = {
        '+': add,
        '-': subtract,
        x: multiply,
        '/': divide,
    }
    return operators[opr]
}

export function isNumber(c) {
    return (
        c != '+' &&
        c != '-' &&
        c != 'x' &&
        c != '/' &&
        c != '.'
    )
}
