const count = document.querySelector('.count')
const plushBtn = document.querySelector('.plush-btn')
const minusBtn = document.querySelector('.minus-btn')
const changeBy = document.querySelector('.incDec')

minusBtn.addEventListener('click',() =>{
    // console.log('minus clicked');
    const countValue = parseInt(count.innerText)
    const changeByValue = parseInt(changeBy.value)
    // count.innerText = countValue - 1
    count.innerText = countValue - changeByValue
})

plushBtn.addEventListener('click',() =>{
    // console.log('minus clicked')
    const countValue = parseInt(count.innerText)
    const changeByValue = parseInt(changeBy.value)
    // count.innerText = countValue + 1
    count.innerText = countValue + changeByValue

})
