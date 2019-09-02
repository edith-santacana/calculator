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
        if (formula.length < 20){
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
    if (aOutput === null){
        formula = [];
        formulaTextElement.innerText = '';
        return;
    } 
    let testedFormula = [...formula];
    testedFormula.push(aOutput);
    // let buffer = testedFormula.join('').replace(/^0+/gm ,"").replace(/[+\-\*\/](0+)/g, "");
    let buffer = testedFormula.join('').replace(/^0+/gm ,"").replace(/[\+](0+)/g, "+").replace(/[\-](0+)/g, "-").replace(/[\*](0+)/g, "*").replace(/[\/](0+)/g, "/");
    if (formulaIsValid(buffer)) {
        let temp = buffer.split('');
        formula = [...temp];
        // formula = [...testedFormula];
        formulaTextElement.innerText = (buffer!== null) ?  buffer : '';
    }
}

function updateOutput (aOutput) {
    if (aOutput === null){
        output = null;
        outputTextElement.innerText = '0';
        return;
    }
    if (aOutput === '+' || aOutput === '-' || aOutput === '*' || aOutput === '/'){
        output = aOutput;
        outputTextElement.innerText = (output !== null) ? output : '0';
    } else {
        if (output === null || output.indexOf('+') > -1 || output.indexOf('-') > -1 || output.indexOf('*') > -1 || output.indexOf('/') > -1){
            output = aOutput;
        } else {
            output = output + aOutput;
        }
        document.getElementById("dot").disabled = (output.indexOf('.') > -1);
        outputTextElement.innerText = (output !== null) ? output : '0';
    }
}

function compute(aFormula){
    let result = aFormula.join('');
    document.getElementById("dot").disabled = false;
    outputTextElement.innerText = (result) ? eval(result) : '0';
}