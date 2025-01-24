function multiplynumbers() {
    const num1 = parseFloat(document.getElementById('numb1').value);
    const num2 = parseFloat(document.getElementById('numb2').value);

    if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 * num2;
        document.getElementById('result').innerText = `Result: ${result}`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
    }
}

function addNumbers() {
    const num1 = parseFloat(document.getElementById('numb1').value);
    const num2 = parseFloat(document.getElementById('numb2').value);

    if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 + num2;
        document.getElementById('result').innerText = `Result: ${result}`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
    }
}

function subtractnumbers() {
    const num1 = parseFloat(document.getElementById('numb1').value);
    const num2 = parseFloat(document.getElementById('numb2').value);

    if (!isNaN(num1) && !isNaN(num2)) {
        const result = num1 - num2;
        document.getElementById('result').innerText = `Result: ${result}`;
    } else {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
    }
}

function dividenumbers() {
    const num1 = parseFloat(document.getElementById('numb1').value);
    const num2 = parseFloat(document.getElementById('numb2').value);

    if (!isNaN(num1) && !isNaN(num2)) {
        if (num2 !== 0) {
            const result = num1 / num2;
            document.getElementById('result').innerText = `Result: ${result}`;
        } else {
            document.getElementById('result').innerText = 'Cannot divide by zero.';
        }
    } else {
        document.getElementById('result').innerText = 'Please enter valid numbers.';
    }
}
