/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   app.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: edithsantacana <edithsantacana@student.    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/08/30 10:05:28 by edithsantac       #+#    #+#             */
/*   Updated: 2019/09/02 18:11:35 by edithsantac      ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

/* This program lets the web page react intelligently and handles the logic.  */
/* The user enters an arithmetic expression by clicking on the buttons, the   */
/* program evaluates it and returns the result when the user clicks on the    */
/* equal button.                                                              */
/* If the expression string is not a valid arithmetic expression the formula  */
/* is not updated and the user can  either:                                   */
/*      - reset the formula by clicking on the _All Clear_ button,            */
/*      - click on any other button to enter a valid expression.              */

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalsButtons = document.querySelector('[data-equal]');
const allClearButtons = document.querySelector('[data-all-clear]');
let formulaTextElement = document.querySelector('[data-formula]');
const outputTextElement = document.querySelector('[data-output]');

let formula = [];
let output = null;

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        if (formula.length < 20) {
            updateOutput(e.target.innerText);
            updateFormula(e.target.innerText);
        } else {
            output = null;
            updateOutput("digit limit");
            setTimeout(function(){updateOutput(null); updateFormula(null);}, 1000);
        }
    })
});

operationsButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        updateOutput(e.target.getAttribute('value'));
        updateFormula(e.target.getAttribute('value'));

    })
});

equalsButtons.addEventListener('click', (e) => {
    compute(formula);
});

allClearButtons.addEventListener('click', (e) => {
    console.log(e.target.innerText);
    document.getElementById("dot").disabled = false;
    updateOutput(null);
    updateFormula(null);
});

function formulaIsValid(aFormula) {
    try {
        eval(aFormula + '1');
        return (aFormula.indexOf('//') === -1);
    } catch (error) {
        return false;
    }
}

function updateFormula(aOutput) {
    if (aOutput === null) {
        formula = [];
        formulaTextElement.innerText = '';
        return;
    } 
    let testedFormula = [...formula];
    testedFormula.push(aOutput);
    let buffer = testedFormula.join('').replace(/^0+/gm ,"").replace(/[\+](0+)/g, "+").replace(/[\-](0+)/g, "-").replace(/[\*](0+)/g, "*").replace(/[\/](0+)/g, "/");
    if (formulaIsValid(buffer)) {
        let temp = buffer.split('');
        formula = [...temp];
        formulaTextElement.innerText = (buffer!== null) ?  buffer : '';
    }
}

function updateOutput (aOutput) {
    if (aOutput === null) {
        output = null;
        outputTextElement.innerText = '0';
        return;
    }
    if (aOutput === '+' || aOutput === '-' || aOutput === '*' || aOutput === '/') {
        output = aOutput;
        outputTextElement.innerText = (output !== null) ? output : '0';
    } else {
        if (output === null || output.indexOf('+') > -1 || output.indexOf('-') > -1 || output.indexOf('*') > -1 || output.indexOf('/') > -1) {
            output = aOutput;
        } else {
            output = output + aOutput;
        }
        document.getElementById("dot").disabled = (output.indexOf('.') > -1);
        outputTextElement.innerText = (output !== null) ? output : '0';
    }
}

function compute(aFormula) {
    let result = aFormula.join('');
    document.getElementById("dot").disabled = false;
    if (result === "42") {
        window.open("https://www.42.us.org");
    }
    outputTextElement.innerText = (result) ? eval(result) : '0';
}