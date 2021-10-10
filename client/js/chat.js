const username = localStorage.getItem('username');
console.log(username);
//const socket = io()

class Navbar extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const wrapper = this.appendChild(document.createElement('div'))
        wrapper.id = 'wrapper'
        
        const left = wrapper.appendChild(document.createElement('div'))
        const slotLeft = left.appendChild(document.createElement('slot'))
        slotLeft.name = "left"

        const right = wrapper.appendChild(document.createElement('div'))
        const slotRight = right.appendChild(document.createElement('slot'))
        slotRight.name = "right"
        
        const style = document.createElement('style')
        style.innerHTML = `
        #wrapper{
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
        `
        
        shadow.append(style, wrapper)
    }
}
class burgerMenu extends HTMLElement {
    constructor() {
        super()
        this.clickedState = false
        const shadow = this.attachShadow({mode: "open"})
        const style = shadow.appendChild(document.createElement('style'))
        const button = shadow.appendChild(document.createElement('button'))
        /* This slot displays the menu that pops up
         * when the user clicks the hamburger menu button.
         * The menu-panel class is used for this functionality. 
        */
        const slot = shadow.appendChild(document.createElement('slot'))
        /* The three lines in the hamburger menu logo */
        const lines = [
            button.appendChild(document.createElement('div')),
            button.appendChild(document.createElement('div')),
            button.appendChild(document.createElement('div'))
        ]
        button.append(...lines)
        style.innerHTML = `
            button {
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                margin: 0 5px;
                min-width: 2.5rem;
                min-height: 2.5rem;
                background-color: transparent;
                border: 0;
                border-radius: 50%;
            }
            button:hover {
                background-color: rgba(0,0,0,0.1);
                box-shadow: 0px 0px 5px 0px lightgrey;
            }

            @keyframes top {
                0% {
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(9px) rotate(45deg);
                }
            }
            @keyframes middle {
                0% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                }
            }
            @keyframes bottom {
                0% {
                    transform: translateY(0px);
                }
                100% {
                    transform: translateY(-9px) rotate(-45deg);
                }
            }
            button > div {
                background-color: black;
                width: 100%;
                height: 2px;
            }
           
        `
       
        button.addEventListener('click', (e) => {
            this.clickedState = !this.clickedState
            this.dispatchEvent(new CustomEvent('clickStateChange', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: this.clickedState
            }))
            if (this.clickedState) {
                lines.forEach(line =>  {
                    line.style.animation = ""
                    line.offsetWidth   //cause a DOM reflow
                })
                lines[0].style.animation = "top 0.25s forwards"
                lines[1].style.animation = "middle 0.25s forwards"
                lines[2].style.animation = "bottom 0.25s forwards"
            } else {
                lines.forEach(line =>  {
                    line.style.animation = ""
                    line.offsetWidth
                })
                lines[0].style.animation = "top 0.25s reverse"
                lines[1].style.animation = "middle 0.25s reverse"
                lines[2].style.animation = "bottom 0.25s reverse"
            }
        })
    }
}
/* Must be a child of the burger-menu web component */
class MenuPanel extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const wrapper = shadow.appendChild(document.createElement('div'))
        const hamburgerMenu = this.parentElement
        const panel = wrapper.appendChild(document.createElement('div'))
        const slot = panel.appendChild(document.createElement('slot'))
        const style = shadow.appendChild(document.createElement('style'))

        wrapper.id = 'wrapper'
        wrapper.style.display = "none"
        style.innerHTML = `
            #wrapper {
                position: fixed;
                top: 3rem;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: hsla(0, 0%, 10%, 50%)
            }
            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            @keyframes slideIn {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(0%);
                }
            }
            #wrapper > div {
                background-color: white;
                width: 30%;
                height: 100%;
                border: 1px solid black;
                opacity: 1;
            }
        `
        
        if (hamburgerMenu.localName !== "burger-menu") {
            throw new Error("menu-panel must be a child of burger-menu")
        }
        hamburgerMenu.addEventListener('clickStateChange', (e) => {
            function updateAnimation() {
                wrapper.style.animation = ''
                panel.style.animation = ''
                wrapper.offsetWidth
                panel.offsetWidth
            }
            if (e.detail) {
                updateAnimation()
                wrapper.style.display = 'block'
                wrapper.style.animation = 'fadeIn 0.2s forwards'
                panel.style.animation = 'slideIn 0.2s forwards'
            } else {
                updateAnimation()
                wrapper.style.animation = 'fadeIn 0.2s reverse forwards'
                panel.style.animation = "slideIn 0.2s reverse forwards"
                setTimeout(() => wrapper.style.display = 'none', 200)

            }
        })
    }
}

customElements.define("menu-panel", MenuPanel)
customElements.define("burger-menu", burgerMenu)
customElements.define("navigation-bar", Navbar)

/* TODO: separate custom elements to a module */