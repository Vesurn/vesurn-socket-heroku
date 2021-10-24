const USERNAME = localStorage.getItem('username');

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
customElements.define("chat-input", Components.ChatInput)



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

chatWindow.setMessages(messages)

/* Socket.io */
const socket = io()
const chatInput = document.querySelector("chat-input")

chatInput.addEventListener("sendMessage", (e) => {
    const message = {
        textContent: e.detail.message,
        date: new Date(),
        seen: false,
        sentbyme: true
    }
    socket.emit("chat message", message)
    chatWindow.addMessage(message)
})
socket.on("chat message", message => {
    chatWindow.addMessage(message)
})
