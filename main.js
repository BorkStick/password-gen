// dom elements 

const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');


const randomFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// password length
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // generate event listen 
    resultEl.innerText = generatePassword(length, hasUpper, hasLower, hasNumber, hasSymbol);

    //console.log(length, hasLower, hasUpper, hasNumber, hasSymbol);
    
});

// copy to clipboard 
clipboardEl.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultEl.innerText;

    if(!password) {
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Copied to clipboard!');

})


// generate password function 
function generatePassword(length, upper, lower, number, symbol) {
    let generatePassword = '';

    const typesCount =  upper + lower + number + symbol;
    // console.log('typesCount: ', typesCount);

    const typesArr = [ {upper}, {lower}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    // console.log('typesArr: ', typesArr);
    
    if(typesCount === 0) {
        return '';
    }

    for(let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName);

            generatePassword += randomFunc[funcName]();
        });
    }
    //console.log(generatePassword.slice(0, length));
    const finalPassword = generatePassword.slice(0, length);

    return finalPassword;
    
}

// generator functions
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random()* 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random()* 10) + 48);
}

function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

//console.log(getRandomSymbol());
