(()=>{const e=localStorage.getItem("username");console.log(e),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/js/sw.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))}));class t extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=this.appendChild(document.createElement("div"));t.id="wrapper",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="left",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="right";const n=document.createElement("style");n.innerHTML="\n        #wrapper{\n            position: fixed;\n            display: flex;\n            top: 0;\n            width: 100%;\n            height: 3rem;\n            border: 1px solid black;\n            flex-wrap: nowrap;\n            align-items: center;\n            justify-content: space-between;\n            align-content: center;\n            background-color: white;\n        }\n        ",e.append(n,t)}}class n extends HTMLElement{constructor(){super(),this.clickedState=!1;const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("button"));n.ariaLabel="Menu",e.appendChild(document.createElement("slot"));const a=[n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div"))];n.append(...a),t.innerHTML="\n            button {\n                display: flex;\n                flex-direction: column;\n                justify-content: space-evenly;\n                margin: 0 5px;\n                min-width: 2.5rem;\n                min-height: 2.5rem;\n                background-color: transparent;\n                border: 0;\n                border-radius: 50%;\n            }\n            button:hover {\n                background-color: rgba(0,0,0,0.1);\n                box-shadow: 0px 0px 5px 0px lightgrey;\n            }\n\n            @keyframes top {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(9px) rotate(45deg);\n                }\n            }\n            @keyframes middle {\n                0% {\n                    opacity: 1;\n                }\n                100% {\n                    opacity: 0;\n                }\n            }\n            @keyframes bottom {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(-9px) rotate(-45deg);\n                }\n            }\n            button > div {\n                background-color: black;\n                width: 100%;\n                height: 2px;\n            }\n           \n        ",this.open=()=>{this.clickedState=!0,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),a[0].style.animation="top 0.25s forwards",a[1].style.animation="middle 0.25s forwards",a[2].style.animation="bottom 0.25s forwards"},this.close=()=>{this.clickedState=!1,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),a[0].style.animation="top 0.25s reverse",a[1].style.animation="middle 0.25s reverse",a[2].style.animation="bottom 0.25s reverse"},n.addEventListener("click",(e=>{this.clickedState?this.close():this.open()}))}}class a extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("div")),n=this.parentElement,a=t.appendChild(document.createElement("div")),o=(a.appendChild(document.createElement("slot")),e.appendChild(document.createElement("style")));if(t.id="wrapper",t.style.display="none",o.innerHTML="\n            #wrapper {  /* Gray seethrough background */\n                position: fixed;\n                top: 3rem;\n                left: 0;\n                width: 100%;\n                height: calc(100vh - 3rem);\n                background-color: hsla(0, 0%, 10%, 50%);\n            }\n            @keyframes fadeIn {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n            @keyframes slideIn {\n                0% {\n                    transform: translateX(-100%);\n                }\n                100% {\n                    transform: translateX(0%);\n                }\n            }\n            #wrapper > div {    /*Left panel */\n                background-color: white;\n                width: 30%;\n                height: 100%;\n                border: 1px solid black;\n                opacity: 1;\n                overflow: auto;\n            }\n        ","burger-menu"!==n.localName)throw new Error("menu-panel must be a child of burger-menu");n.addEventListener("clickStateChange",(e=>{function o(){t.style.animation="",a.style.animation="",t.offsetWidth,a.offsetWidth}e.detail.clickedState?(o(),t.style.display="block",t.style.animation="fadeIn 0.2s forwards",a.style.animation="slideIn 0.2s forwards"):(o(),t.style.animation="fadeIn 0.2s reverse forwards",a.style.animation="slideIn 0.2s reverse forwards",setTimeout((()=>{n.clickedState||(t.style.display="none")}),200))})),t.addEventListener("click",(e=>{e.path[0]===t&&n.close()}))}}class o extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div")),a=n.appendChild(document.createElement("button")),o=this.parentElement.parentElement;n.id="wrapper",t.innerHTML="\n            #wrapper {\n                position: relative;\n                width: calc(100% - 10px);\n                height: 2.5rem;\n                margin: 0 5px;\n            }\n            button {\n                width: 100%;\n                height: 100%;\n                font-weight: bold;\n                text-align: left;\n                border: none;\n                background-color: white;\n                border-radius: 5px;\n            }\n            button > div {\n                font-weight: normal;\n            }\n            button:hover {\n                background-color: lightgrey;\n            }\n\n        ";const r=this.getAttribute("header"),i=this.getAttribute("text");if(this.setAttribute("seen",!0),this.getAttribute("seen"),!r||!i)throw new Error("panel-button missing header and text attributes");a.textContent=r,a.appendChild(document.createElement("div")).textContent=i,this.addEventListener("click",(e=>{o.close(),this.setAttribute("seen",!1)}))}static get observedAttributes(){return["seen"]}attributeChangedCallback(e,t,n){const a=this.shadowRoot.querySelector("#wrapper").children[0];switch(console.log(n),e){case"seen":"true"===n?(a.style["border-right"]="none",a.style["background-color"]="white"):"false"===n&&(a.style["border-right"]="6px solid blue",a.style["background-color"]="lightblue")}}}class r extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div"));n.appendChild(document.createElement("slot")),n.id="wrapper",t.innerHTML="\n            #wrapper {\n                padding: 5px 0;\n                width: 100%;\n                height: calc(100% - 10px);\n            }\n        "}}class i extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div")),a=n.appendChild(document.createElement("div"));n.id="wrapper",t.innerHTML="\n            #wrapper {\n                padding: 0 5px;\n                width: calc(100% - 10px);\n                height: fit-content;\n                margin: 5px 0;\n                font-size: 1.3rem;\n                display: flex;\n                align-items: center;\n                justify-content: flex-end;\n            }\n            #wrapper > div {\n                padding: 2px 7px;\n                border-radius: 15px;\n                background-color: lightblue;\n            }\n            @media screen and (min-width: 300px) {\n                #wrapper > div {\n                    max-width: 80%;\n                }\n            }\n        ",this.setAttribute("sentbyme","true"),a.textContent=this.textContent}static get observedAttributes(){return["sentbyme"]}attributeChangedCallback(e,t,n){switch(e){case"sentbyme":{const e=this.shadowRoot.querySelector("#wrapper"),t=e.children[0];"true"===n?(e.style["justify-content"]="flex-end",t.style["background-color"]="lightblue"):"false"===n&&(e.style["justify-content"]="flex-start",t.style["background-color"]="lightgray")}}}}customElements.define("chat-message",i),customElements.define("chat-window",r),customElements.define("panel-button",o),customElements.define("menu-panel",a),customElements.define("burger-menu",n),customElements.define("navigation-bar",t)})();
//# sourceMappingURL=chat.bundle.js.map