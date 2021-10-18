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
            background-color: white;
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
        button.ariaLabel = "Menu"
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
        this.open = () => {
            this.clickedState = true
            this.dispatchEvent(new CustomEvent('clickStateChange', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {clickedState: this.clickedState}
            }))
            lines.forEach(line =>  {
                line.style.animation = ""
                line.offsetWidth   //cause a DOM reflow
            })
            lines[0].style.animation = "top 0.25s forwards"
            lines[1].style.animation = "middle 0.25s forwards"
            lines[2].style.animation = "bottom 0.25s forwards"
        }
        
        this.close = () => {
            this.clickedState = false
            this.dispatchEvent(new CustomEvent('clickStateChange', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {clickedState: this.clickedState}
            }))
            lines.forEach(line =>  {
                line.style.animation = ""
                line.offsetWidth
            })
            lines[0].style.animation = "top 0.25s reverse"
            lines[1].style.animation = "middle 0.25s reverse"
            lines[2].style.animation = "bottom 0.25s reverse"
        }

        button.addEventListener('click', (e) => {
            if (!this.clickedState) {
                this.open()
            } else {
                this.close()
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
        wrapper.style.display = "none" // Hide the panel until the user clicks the parent burger-menu
        style.innerHTML = `
            #wrapper {  /* Gray seethrough background */
                position: fixed;
                top: 3rem;
                left: 0;
                width: 100%;
                height: calc(100vh - 3rem);
                background-color: hsla(0, 0%, 10%, 50%);
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
            #wrapper > div {    /*Left panel */
                background-color: white;
                width: 30%;
                height: 100%;
                border: 1px solid black;
                opacity: 1;
                overflow: auto;
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
            if (e.detail.clickedState) {
                updateAnimation()
                wrapper.style.display = 'block'
                wrapper.style.animation = 'fadeIn 0.2s forwards'
                panel.style.animation = 'slideIn 0.2s forwards'
            } else {
                updateAnimation()
                wrapper.style.animation = 'fadeIn 0.2s reverse forwards'
                panel.style.animation = "slideIn 0.2s reverse forwards"
                setTimeout(() => {
                    if (!hamburgerMenu.clickedState) {
                        wrapper.style.display = 'none'
                    }
                }, 200)
            }
        })
        /* The panel closes if the user clicks outside the panel*/
        wrapper.addEventListener('click', (e) => {
            if (e.path[0] === wrapper) {
                hamburgerMenu.close()
            }
        })
    }
}
class PanelButton extends HTMLElement {
    /** 
     * Exposed attribues: 
     * - seen: boolean
     * - header: string - Bold header text
     * - text: string - normal text (used for last message)
     */
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const style = shadow.appendChild(document.createElement('style'))
        const wrapper = shadow.appendChild(document.createElement('div'))
        const button = wrapper.appendChild(document.createElement("button"))
        const HamburgerMenu = this.parentElement.parentElement
        wrapper.id = 'wrapper'

        style.innerHTML = `
            #wrapper {
                position: relative;
                width: calc(100% - 10px);
                height: 2.5rem;
                margin: 0 5px;
            }
            button {
                width: 100%;
                height: 100%;
                font-weight: bold;
                text-align: left;
                border: none;
                background-color: white;
                border-radius: 5px;
            }
            button > div {
                font-weight: normal;
            }
            button:hover {
                background-color: lightgrey;
            }

        `
        const header = this.getAttribute("header")
        const text = this.getAttribute("text")
        this.setAttribute("seen", true)
        const seen = this.getAttribute("seen")
        if (header && text) {
            button.textContent = header
            button.appendChild(document.createElement("div")).textContent = text
        } else {
            throw new Error("panel-button missing header and text attributes")
        }
        this.addEventListener('click', (e) => {
            HamburgerMenu.close()
            this.setAttribute("seen", false)
        })
    }

    static get observedAttributes() {
        return ['seen']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const wrapper = this.shadowRoot.querySelector("#wrapper")
        const button = wrapper.children[0]
        console.log(newValue)
        switch (name) {
            case "seen": {
                if (newValue === "true") {
                    button.style['border-right'] = "none"
                    button.style['background-color'] = "white"
                } else if (newValue === "false") {
                    button.style['border-right'] = "6px solid blue"
                    button.style['background-color'] = "lightblue"
                }
            }
        }
    }
}

class ChatWindow extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const style = shadow.appendChild(document.createElement('style'))
        const wrapper = shadow.appendChild(document.createElement('div'))
        const slot = wrapper.appendChild(document.createElement('slot'))
        wrapper.id = "wrapper"

        style.innerHTML = `
            #wrapper {
                padding: 5px 0;
                width: 100%;
                height: calc(100% - 10px);
            }
        `

    }
}
class ChatMessage extends HTMLElement {
    /** - Exposed attributes: sentbyme: boolean */
    constructor() {
        super()
        const shadow = this.attachShadow({mode: "open"})
        const style = shadow.appendChild(document.createElement('style'))
        const wrapper = shadow.appendChild(document.createElement('div'))
        const message = wrapper.appendChild(document.createElement('div'))
        const extraInfo = wrapper.appendChild(document.createElement("div"))
        wrapper.id = "wrapper"
        message.id = "message"
        extraInfo.id = "extraInfo"
        style.innerHTML = `
            #wrapper {
                padding: 0 5px;
                width: calc(100% - 10px);
                height: fit-content;
                margin: 5px 0;
                font-size: 1.3rem;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                flex-wrap: wrap;
            }
            #message {
                padding: 2px 7px;
                border-radius: 15px;
            }
            #extraInfo {
                display: none;
                flex-basis: 100%;
                font-size: 1rem;
                color: gray;
            }
            @media screen and (min-width: 300px) {
                #message {
                    max-width: 80%;
                }
            }
        `
        if(!this.getAttribute('sentbyme')) {
            this.setAttribute('sentbyme', "true")
        }
        if (this.getAttribute('sentbyme') === "true") {
            extraInfo.style['text-align'] = "right"
        }
        message.addEventListener('mouseover', () => {
            function toBool(string) {
                if (string == "true") return true
                if (string == "false") return false
                return string
             }
            if (toBool(this.getAttribute("sentbyme"))) {
                message.style['background-color'] = "hsl(195, 53%, 75%)"
            } else {
                message.style['background-color'] = "hsl(0, 0%, 75%)"
            }
        })
        message.addEventListener('mouseout', () => {
            function toBool(string) {
               if (string == "true") return true
               if (string == "false") return false
               return string
            }
            if (toBool(this.getAttribute("sentbyme"))) {
               message.style['background-color'] = "hsl(195, 53%, 80%)"
            } else {
                message.style['background-color'] = "hsl(0, 0%, 80%)"
            }
        })
        function* alternator() {
            while (true) {
                yield false
                yield true
            }
        }
        const Alternator = alternator()
        message.addEventListener('click', () => {
            function playAnimation(iterations) {
                function* opacity(iterations) {
                    let result = 0
                    const step = 1 / iterations
                    if (iterations < 0) {
                        result = 1
                        iterations = -iterations
                    }
                    while (iterations--) {
                        result += step
                        yield result
                    }
                }
                const opacityGen = opacity(iterations)
                let interval = setInterval(() => {
                    extraInfo.style.opacity = opacityGen.next().value
                    if (extraInfo.style.opacity >= 1 || extraInfo.style.opacity <= 0) clearInterval(interval)
                }, 10)
            }
            if (Alternator.next().value) {
                playAnimation(-20)
                setTimeout(() => extraInfo.style.display = "none", 200)
            } else {
                extraInfo.style.opacity = 0
                extraInfo.style.display = "block"
                playAnimation(20)
            }
        })
        if (!this.textContent) this.render()
        this.render({seen: true, textContent: "Hello world!"})
        message.textContent = this.textContent
    }

    render(options = {textContent: "Empty", date: new Date(), seen: false}) {
        if (!options.date) options.date = new Date()
        if (!options.textContent) throw new Error("No textContent provided")

        const wrapper = this.shadowRoot.querySelector("#wrapper")
        const extraInfo = wrapper.querySelector("#extraInfo")
        const { date } = options
        const dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`

        extraInfo.textContent = dateStr + `${options.seen ? " - Seen" : ""}`
        this.textContent = options.textContent
    }

    static get observedAttributes() {
        return ['sentbyme']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'sentbyme': {
                const wrapper = this.shadowRoot.querySelector("#wrapper")
                const message = wrapper.children[0]
                if (newValue === 'true') {
                    wrapper.style['justify-content'] = "flex-end"
                    message.style['background-color'] = "hsl(195, 53%, 79%)"
                } else if (newValue === 'false'){
                    wrapper.style['justify-content'] = "flex-start"
                    message.style['background-color'] = "hsl(0, 0%, 83%)"

                }
            }
        }
    }
}
customElements.define("chat-message", ChatMessage)
customElements.define("chat-window", ChatWindow)
customElements.define("panel-button", PanelButton)
customElements.define("menu-panel", MenuPanel)
customElements.define("burger-menu", burgerMenu)
customElements.define("navigation-bar", Navbar)

/* TODO: separate custom elements to a module */