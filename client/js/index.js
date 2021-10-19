const inputField = document.getElementById('username')
const button = document.getElementById('button')
inputField.value = localStorage.getItem('username')

button.addEventListener('click', (e) => {
    e.preventDefault()
    if (inputField.value) {
        localStorage.setItem('username', inputField.value)
    } else {
        throw new Error('Username is required')
    }
    
    if (localStorage.getItem("user")) {
        let user = JSON.parse(localStorage.getItem("user"))
        if (user.username === localStorage.getItem("username")) {
            window.location.pathname = "/chat"
        } else {
            sendPostRequest()
        }
    } else {
       sendPostRequest()
    }

})
function sendPostRequest() {
    const request = new XMLHttpRequest()
    request.open("POST", "/login")
    request.setRequestHeader("Content-Type", "application/json")
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            localStorage.setItem('user', request.responseText)
            console.log("success")
            window.location.pathname = "/login"
        } else {
            console.log("error")
        }
    }
    request.send(JSON.stringify({
        username: localStorage.getItem('username')
    }))
}