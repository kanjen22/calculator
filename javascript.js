import { operate, isNumber } from './operators.js';

let ans = undefined;
let calcs = [];

const ansScreen = document.querySelector('.ansScreen')
const upperScreen = document.querySelector('.upperScreen');
const lowerScreen = document.querySelector('.lowerScreen');
const btn_ac = document.querySelector('#ac');
const btn_del = document.querySelector('#del');
const btn_plus = document.querySelector('#plus');
const btn_minus = document.querySelector('#minus');
const btn_multiply = document.querySelector('#multiply');
const btn_divide = document.querySelector('#divide');
const btn_equal = document.querySelector('#equal');
const btn_dot = document.querySelector('#dot');
const num_btns = {};
for (let i = 0; i < 10; i++) {
    num_btns[i] = document.querySelector(`[id='${i}']`);
}

// btn_ac event
btn_ac.addEventListener('click', (e) => {
    playClickSound();
    ac();
})

// btn_del event
btn_del.addEventListener('click', (e) => {
    playClickSound();
    del();
})

// btn_equal event
btn_equal.addEventListener('click', (e) => {
    playClickSound();
    equal();
})

// num_plus
btn_plus.addEventListener('click', (e) => {
    playClickSound();
    plus();
})

// btn_minus
btn_minus.addEventListener('click', (e) => {
    playClickSound();
    minus();
})

// btn_multiply
btn_multiply.addEventListener('click', (e) => {
    playClickSound();
    multiply();
})

// btn_divide
btn_divide.addEventListener('click', (e) => {
    playClickSound();
    divide();
})

// btn_dot
btn_dot.addEventListener('click', (e) => {
    playClickSound();
    dot();
})

// num_bts events
for (let key in num_btns) {
    const cur_btn = num_btns[key];
    cur_btn.addEventListener('click', () => {
        playClickSound();
        if (calcs.length == 1 && calcs[0] == '0') {
            calcs = [cur_btn.textContent];
        } else {
            calcs.push(cur_btn.textContent);
        }
        // show on screen
        updateLowerScreen(calcs.join(''));
    })
}

function equal() {
    if (calcs.length > 0 && isNumber(calcs[calcs.length - 1])) {
        // do calculation
        const preProcessedCalcs = preProcess(calcs);
        // last_calc_str = preProcessedCalcs.reverse().join(' ');
        ans = calculate(preProcessedCalcs);
        if (ans == Infinity) return;
        // show results on screen
        updateAnsScreen(`Ans: ${ans}`)
        updateUpperScreen(calcs.join('') + " =");
        calcs = ans.toString().split('');  // reset calcs
        updateLowerScreen(ans);
        // last_calc_str = '';
    }
}

function ac() {
    calcs = [];
    updateAnsScreen('Ans: ');
    updateUpperScreen('');
    updateLowerScreen(0);
    
}

function del() {
    if (calcs.length > 0) {
        calcs.pop();
    }
    if (calcs.length == 0) {
        calcs.push(0);
    }
    updateLowerScreen(calcs.join(''));
}

function plus() {
    if (calcs.length == 0) {
        calcs.push(0);
    }
    if (isNumber(calcs[calcs.length - 1])) {
        calcs.push("+");
    }
    updateLowerScreen(calcs.join(''));
}

function minus() {
    if (calcs.length == 0) {
        calcs.push(0);
    }
    if (isNumber(calcs[calcs.length - 1])) {
        calcs.push("-");
    }
    updateLowerScreen(calcs.join(''));
}

function multiply() {
    if (calcs.length == 0) {
        calcs.push(0);
    }
    if (isNumber(calcs[calcs.length - 1])) {
        calcs.push("x");
    }
    updateLowerScreen(calcs.join(''));
}

function divide() {
    if (calcs.length == 0) {
        calcs.push(0);
    }
    if (isNumber(calcs[calcs.length - 1])) {
        calcs.push("/");
    }
    updateLowerScreen(calcs.join(''));
}

function dot() {
    if (calcs.length == 0) return;
    let hasDot = false, hasOper = false
    for (let i = calcs.length - 1; i >= 0; i--) {
        if (hasDot && !hasOper) return;
        if (
            calcs[i] == "+" ||
            calcs[i] == "-" ||
            calcs[i] == "x" ||
            calcs[i] == "/") {
                hasOper = true;
            }
        if (calcs[i] == '.') hasDot = true;
    }
    calcs.push(".");
    updateLowerScreen(calcs.join(''));
}

function updateAnsScreen(string) {
    ansScreen.textContent = string;
}

function updateUpperScreen(string) {
    upperScreen.textContent = string;
}

function updateLowerScreen(string) {
    lowerScreen.textContent = string;
}

function preProcess(calcs) {
    let processedCalcs = []
    let numString = ''
    for (let i = calcs.length - 1; i >= 0; i--) {
        if ( 
            calcs[i] == '+' ||
            calcs[i] == '-' ||
            calcs[i] == 'x' ||
            calcs[i] == '/') {
                if (i == 0) numString += calcs[i];
                processedCalcs.push(parseFloat(numString.split('').reverse().join('')));
                numString = '';
                if (i != 0) processedCalcs.push(calcs[i]);
                if (i == 0) break;
        } else {
            numString += calcs[i];
        }
        if (i == 0) {
            processedCalcs.push(parseFloat(numString.split('').reverse().join('')));
        }
    }
    return processedCalcs;
}


function calculate(calcs) {
    let res_tmp1 = [];
    while (calcs.length > 0) {
        const last_ops = calcs.pop();
        if (res_tmp1.length == 0 || (typeof last_ops != 'number')) {
            res_tmp1.push(last_ops);
        } else {
            const last_res = res_tmp1[res_tmp1.length - 1];
            if (last_res == 'x' || last_res == '/') {
                const op = res_tmp1.pop(), a = res_tmp1.pop();
                ans = operate(a, op, last_ops);
                if (ans === Infinity || ans === -Infinity || isNaN(ans)) {
                    alert('You cannot divide by 0, check your calculation!')
                    return Infinity
                }
                res_tmp1.push(ans);
            } else {
                res_tmp1.push(last_ops);
            }
        }
    }
    let res_tmp2 = []
    while (res_tmp1.length > 0) {
        res_tmp2.push(res_tmp1.pop());
    }
    let res = []
    while (res_tmp2.length > 0) {
        if (res.length < 2) {
            res.push(res_tmp2.pop())
        } else {
            const op = res.pop(), a = res.pop();
            ans = operate(a, op, res_tmp2.pop());
            if (ans === Infinity || ans === -Infinity || isNaN(ans)) {
                alert('You cannot divide by 0, check your calculation!')
                return Infinity
            }
            res.push(ans)
        }
    }
    return parseFloat(res[res.length - 1].toFixed(3));
}

function playClickSound() {
    const clickSound = document.querySelector("#clickSound")
    clickSound.play()
}

