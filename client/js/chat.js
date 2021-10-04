const username = localStorage.getItem('username');
console.log(username);
const socket = io()

class Navbar extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const wrapper = document.createElement('div')
        wrapper.id = "wrapper"
        const burgerMenu = wrapper.appendChild(document.createElement('div'))
        burgerMenu.id = 'burgerMenu'
        burgerMenu.innerHTML = "burgerMenu"
        const style = document.createElement('style')
        style.innerHTML = `
        #wrapper {
            position: fixed;
            display: flex;
            top: 0;
            width: 100%;
            height: 3rem;
            border: 1px solid black;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            align-content: center;
        }
        div {
            border: 1px solid black;
        }
        `
        shadow.append(style, wrapper)
    }
}
customElements.define("navigation-bar", Navbar)