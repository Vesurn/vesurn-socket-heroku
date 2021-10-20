const username = localStorage.getItem('username');
console.log(username);
//const socket = io()

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

import * as Components from "./ui-components"

customElements.define("chat-message", Components.ChatMessage)
customElements.define("chat-window", Components.ChatWindow)
customElements.define("panel-button", Components.PanelButton)
customElements.define("menu-panel", Components.MenuPanel)
customElements.define("burger-menu", Components.BurgerMenu)
customElements.define("navigation-bar", Components.NavigationBar)



/* TODO: separate custom elements to a module */
const chatWindow = document.querySelector("chat-window")
const Gen = (function* () {
    while(true) {
        yield true
        yield false
    }
})()
const messages = new Array(15).fill().map(() => ({
    textContent: "Hello world lorem ipsum dolor sit amet er tempor incididunt ut labore",
    date: new Date(),
    seen: false,
    sentbyme: Gen.next().value
}))
messages.forEach(message => {
    chatWindow.appendChild(document.createElement("chat-message").render(message))
})
const navbar = document.querySelector("navigation-bar")
const div = document.createElement("div")
navbar.appendChild(div)
div.slot = "right"
setInterval(() => {
    div.innerHTML = `${window.innerWidth}x${window.innerHeight}`
}, 100)