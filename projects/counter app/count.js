const count = document.querySelector('.count');
const plushBtn = document.querySelector('.plush-btn');
const minusBtn = document.querySelector('.minus-btn');
const changeBy = document.querySelector('.incDec');
const resetBtn = document.querySelector('.reset');

// Decrement the count
minusBtn.addEventListener('click', () => {
    const countValue = parseInt(count.innerText);
    const changeByValue = parseInt(changeBy.value);
    count.innerText = countValue - changeByValue;
});

// Increment the count
plushBtn.addEventListener('click', () => {
    const countValue = parseInt(count.innerText);
    const changeByValue = parseInt(changeBy.value);
    count.innerText = countValue + changeByValue;
});

// Reset the count
resetBtn.addEventListener('click', () => {
    count.innerText = 0; 
    changeBy.value = 1; 
});
