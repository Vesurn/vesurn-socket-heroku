const USER = JSON.parse(localStorage.getItem('user'))

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

import { io } from "socket.io-client";
import * as Components from "./ui-components"

customElements.define("chat-message", Components.ChatMessage)
customElements.define("chat-window", Components.ChatWindow)
customElements.define("panel-button", Components.PanelButton)
customElements.define("menu-panel", Components.MenuPanel)
customElements.define("burger-menu", Components.BurgerMenu)
customElements.define("navigation-bar", Components.NavigationBar)
customElements.define("chat-input", Components.ChatInput)

/* Socket.io */
const socket = io()
const chatInput = document.querySelector("chat-input")
const chatWindow = document.querySelector("chat-window")
const menuPanel = document.querySelector("menu-panel")

socket.on("connected", (online) => {
    Object.entries(online).forEach(([socketId, user]) => {
        addPanel(user.username, "Online", true)
    })
    socket.emit("user joined", USER)
})
socket.on("user joined", user => {
    addPanel(user.username, "User Joined", false)
})


chatInput.addEventListener("sendMessage", (e) => {
    const message = {
        textContent: e.detail.message,
        date: new Date(),
        sentbyme: true,
        author: USER
    }
    socket.emit("chat message", message)
    chatWindow.addMessage(message)
    chatWindow.messages.forEach(message => message.setAttribute("seen", true))
})
socket.on("chat message", message => {
    chatWindow.addMessage(message)
})

socket.on("user disconnected", user => {
    Array.from(menuPanel.children).forEach(child => {
        if (child.getAttribute("Header") === user.username) child.remove()
    })
})

function addPanel(header, text, seen = false) {
    const panelButton = document.createElement("panel-button")
    panelButton.setAttribute("seen", seen)
    panelButton.setAttribute("header", header)
    panelButton.setAttribute("text", text)
    menuPanel.appendChild(panelButton)
}