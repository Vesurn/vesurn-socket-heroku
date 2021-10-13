(()=>{const e=localStorage.getItem("username");console.log(e);class t extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=this.appendChild(document.createElement("div"));t.id="wrapper",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="left",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="right";const n=document.createElement("style");n.innerHTML="\n        #wrapper{\n            position: fixed;\n            display: flex;\n            top: 0;\n            width: 100%;\n            height: 3rem;\n            border: 1px solid black;\n            flex-wrap: nowrap;\n            align-items: center;\n            justify-content: space-between;\n            align-content: center;\n        }\n        ",e.append(n,t)}}class n extends HTMLElement{constructor(){super(),this.clickedState=!1;const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("button")),a=(e.appendChild(document.createElement("slot")),[n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div"))]);n.append(...a),t.innerHTML="\n            button {\n                display: flex;\n                flex-direction: column;\n                justify-content: space-evenly;\n                margin: 0 5px;\n                min-width: 2.5rem;\n                min-height: 2.5rem;\n                background-color: transparent;\n                border: 0;\n                border-radius: 50%;\n            }\n            button:hover {\n                background-color: rgba(0,0,0,0.1);\n                box-shadow: 0px 0px 5px 0px lightgrey;\n            }\n\n            @keyframes top {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(9px) rotate(45deg);\n                }\n            }\n            @keyframes middle {\n                0% {\n                    opacity: 1;\n                }\n                100% {\n                    opacity: 0;\n                }\n            }\n            @keyframes bottom {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(-9px) rotate(-45deg);\n                }\n            }\n            button > div {\n                background-color: black;\n                width: 100%;\n                height: 2px;\n            }\n           \n        ",this.open=()=>{this.clickedState=!0,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:this.clickedState})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),a[0].style.animation="top 0.25s forwards",a[1].style.animation="middle 0.25s forwards",a[2].style.animation="bottom 0.25s forwards"},this.close=()=>{this.clickedState=!1,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:this.clickedState})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),a[0].style.animation="top 0.25s reverse",a[1].style.animation="middle 0.25s reverse",a[2].style.animation="bottom 0.25s reverse"},n.addEventListener("click",(e=>{this.clickedState?this.close():this.open()}))}}class a extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("div")),n=this.parentElement,a=t.appendChild(document.createElement("div")),s=(a.appendChild(document.createElement("slot")),e.appendChild(document.createElement("style")));if(t.id="wrapper",t.style.display="none",s.innerHTML="\n            #wrapper {\n                position: fixed;\n                top: 3rem;\n                left: 0;\n                width: 100%;\n                height: 100%;\n                background-color: hsla(0, 0%, 10%, 50%)\n            }\n            @keyframes fadeIn {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n            @keyframes slideIn {\n                0% {\n                    transform: translateX(-100%);\n                }\n                100% {\n                    transform: translateX(0%);\n                }\n            }\n            #wrapper > div {\n                background-color: white;\n                width: 30%;\n                height: 100%;\n                border: 1px solid black;\n                opacity: 1;\n            }\n        ","burger-menu"!==n.localName)throw new Error("menu-panel must be a child of burger-menu");n.addEventListener("clickStateChange",(e=>{function n(){t.style.animation="",a.style.animation="",t.offsetWidth,a.offsetWidth}e.detail?(n(),t.style.display="block",t.style.animation="fadeIn 0.2s forwards",a.style.animation="slideIn 0.2s forwards"):(n(),t.style.animation="fadeIn 0.2s reverse forwards",a.style.animation="slideIn 0.2s reverse forwards",setTimeout((()=>t.style.display="none"),200))})),t.addEventListener("click",(e=>{e.path[0]===t&&n.close()}))}}class s extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div")),a=this.parentElement.parentElement,s=n.appendChild(document.createElement("div")),i=n.appendChild(document.createElement("div"));n.id="wrapper",this.setAttribute("lastmessage","none"),this.setAttribute("unseenmessage",!1),t.innerHTML="\n            #wrapper {\n                position: relative;\n                width: 100%;\n                height: 2.5rem;\n                border: 1px solid black;\n            }\n            #wrapper > div {\n                font-weight: bold;\n            }\n        ",s.textContent=this.textContent,i.textContent=this.getAttribute("lastmessage"),this.addEventListener("click",(e=>{a.close(),this.setAttribute("unseenmessage",!1)}))}static get observedAttributes(){return["lastmessage","unseenmessage"]}attributeChangedCallback(e,t,n){console.log(`${e}: ${n} from ${t}`)}}customElements.define("panel-button",s),customElements.define("menu-panel",a),customElements.define("burger-menu",n),customElements.define("navigation-bar",t)})();
//# sourceMappingURL=chat.bundle.js.map