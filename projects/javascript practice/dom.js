document.getElementById('click').addEventListener('click',()=>{
    document.getElementById('main').textContent = "Abnormal text"
})
document.getElementById('clicking').addEventListener('click',()=>{
   document.getElementById('first').style.color = 'red';
   document.getElementById('second').style.color = 'red';
})

document.getElementById('add').addEventListener('click',()=>{
    const num1= parseFloat(document.getElementById('num1').value)
    const num2= parseFloat(document.getElementById('num2').value)
    const sum = num1 + num2
    document.getElementById('ans').innerHTML = `${sum}`
})
