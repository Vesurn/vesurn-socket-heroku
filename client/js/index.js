const inputField = document.getElementById('username')
const button = document.getElementById('button')
inputField.value = localStorage.getItem('username')

button.addEventListener('click', (e) => {
    localStorage.setItem('username', inputField.value)
})