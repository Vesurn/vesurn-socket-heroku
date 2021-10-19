
class NavigationBar extends HTMLElement {
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
            box-shadow: 3px 0 5px gray;
            top: 0;
            width: 100%;
            height: 3rem;
            flex-wrap: nowrap;
            align-items: center;
            justify-content: space-between;
            align-content: center;
            background-color: rgba(255, 255, 255 ,0.95);
        }
        `
        shadow.append(style, wrapper)
    }
    makeTranslucent(boolean) {
        const wrapper = this.shadowRoot.querySelector('#wrapper')
        if (boolean) {
            wrapper.style['background-color'] = "rgba(255, 255, 255, 0.95)"
        } else {
            wrapper.style['background-color'] = "rgba(255, 255, 255, 1)"
        }
    }
}

class BurgerMenu extends HTMLElement {
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
            this.parentElement.makeTranslucent(false)
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
            this.parentElement.makeTranslucent(true)
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
                width: 15rem;
                height: 100%;
                opacity: 1;
                overflow: auto;
                padding: 5px;
                box-shadow: inset 0px 3px 5px -3px grey;
            }
            @media screen and (max-width: 325px) {
                #wrapper > div {
                    width: 100%;
                }
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
     * Static element should be declared in the HTML document
     * - Exposed attribues: 
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
        const header = button.appendChild(document.createElement("h1"))
        const text = button.appendChild(document.createElement("p"))
        let HamburgerMenu
        if (this.parentElement.parentElement.localName === "burger-menu") {
            HamburgerMenu = this.parentElement.parentElement
        } else {
            throw new Error("panel-button must be a child of menu-panel")
        }
        
        wrapper.id = 'wrapper'

        style.innerHTML = `
            #wrapper {
                position: relative;
                width: calc(100% - 10px);
                height: 2.5rem;
                margin: 0;
            }
            button {
                width: 100%;
                height: 100%;
                text-align: left;
                border: none;
                background-color: rgba(255, 255, 255, 0);
                border-radius: 5px;
            }
            h1 {
                font-weight: bold;
                font-size: 1rem;
                margin: 0;
            }
            p {
                margin: 0;
            }
            button:hover {
                background-color: hsla(0, 0%, 60%, 0.3);
            }

        `

        
        this.addEventListener('click', (e) => {
            HamburgerMenu.close()
            this.setAttribute("seen", false)
        })
    }

    static get observedAttributes() {
        return ['seen',"header","text"]
    }
    attributeChangedCallback(name, oldValue, newValue) {
        const wrapper = this.shadowRoot.querySelector("#wrapper")
        const button = wrapper.children[0]
        const header = button.querySelector("h1")
        const text = button.querySelector("p")
        function onSeenChange() {
            if (newValue === "true") {
                button.style['border-right'] = "none"
                button.style['background-color'] = "rgba(255, 255, 255, 0)"
            } else if (newValue === "false") {
                button.style['border-right'] = "6px solid blue"
                button.style['background-color'] = "rgba(173, 216, 230, 0.5)"
            }
        }

        function onHeaderChange() {
            header.textContent = newValue
        }
        function onTextChange() {
            text.textContent = newValue
        }
        switch (name) {
            case "seen": {
               onSeenChange()
               break
            }
            case "header": {
                onHeaderChange()
                break
            }
            case "text": {
                onTextChange()
                break
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
        /* On hover animation */
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
        
        /* Display more information when the message is clicked*/
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
            if (!this.selected) {
                this.selected = !this.selected
                playAnimation(-20)
                setTimeout(() => extraInfo.style.display = "none", 200)
            } else {
                this.selected = !this.selected
                extraInfo.style.opacity = 0
                extraInfo.style.display = "block"
                playAnimation(20)
            }
        })
    }
    selected = true

    render(options = {textContent: "Empty", date: new Date(), seen: false, sentbyme: true}) {
        if (!"date" in options) {}options.date = new Date()
        if (!"textContent" in options) throw new Error("No textContent provided")
        if (!"sentbyme" in options) options.sentbyme = true
        const wrapper = this.shadowRoot.querySelector("#wrapper")
        const message = this.shadowRoot.querySelector("#message")
        const extraInfo = wrapper.querySelector("#extraInfo")
        const { date } = options
        const dateStr = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`

        this.setAttribute("sentbyme", options.sentbyme ? "true" : "false")
        extraInfo.textContent = dateStr + `${options.seen ? " - Seen" : ""}`
        message.textContent = options.textContent
        return this
    }

    static get observedAttributes() {
        return ['sentbyme']
    }
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'sentbyme': {
                const wrapper = this.shadowRoot.querySelector("#wrapper")
                const message = wrapper.querySelector("#message")
                const extraInfo = wrapper.querySelector("#extraInfo")
                if (newValue === 'true') {
                    wrapper.style['justify-content'] = "flex-end"
                    message.style['background-color'] = "hsl(195, 53%, 79%)"
                    extraInfo.style['text-align'] = 'right'
                } else if (newValue === 'false'){
                    wrapper.style['justify-content'] = "flex-start"
                    message.style['background-color'] = "hsl(0, 0%, 83%)"
                    extraInfo.style['text-align'] = 'left'
                }
            }
        }
    }
}

export { NavigationBar, BurgerMenu, MenuPanel, PanelButton, ChatWindow, ChatMessage }