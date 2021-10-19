(()=>{"use strict";class e extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=this.appendChild(document.createElement("div"));t.id="wrapper",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="left",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="right";const n=document.createElement("style");n.innerHTML="\n        #wrapper{\n            position: fixed;\n            display: flex;\n            box-shadow: 3px 0 5px gray;\n            top: 0;\n            width: 100%;\n            height: 3rem;\n            flex-wrap: nowrap;\n            align-items: center;\n            justify-content: space-between;\n            align-content: center;\n            background-color: rgba(255, 255, 255 ,0.95);\n        }\n        ",e.append(n,t)}makeTranslucent(e){this.shadowRoot.querySelector("#wrapper").style["background-color"]=e?"rgba(255, 255, 255, 0.95)":"rgba(255, 255, 255, 1)"}}class t extends HTMLElement{constructor(){super(),this.clickedState=!1;const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("button"));n.ariaLabel="Menu",e.appendChild(document.createElement("slot"));const a=[n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div"))];n.append(...a),t.innerHTML="\n            button {\n                display: flex;\n                flex-direction: column;\n                justify-content: space-evenly;\n                margin: 0 5px;\n                min-width: 2.5rem;\n                min-height: 2.5rem;\n                background-color: transparent;\n                border: 0;\n                border-radius: 50%;\n            }\n            button:hover {\n                background-color: rgba(0,0,0,0.1);\n                box-shadow: 0px 0px 5px 0px lightgrey;\n            }\n\n            @keyframes top {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(9px) rotate(45deg);\n                }\n            }\n            @keyframes middle {\n                0% {\n                    opacity: 1;\n                }\n                100% {\n                    opacity: 0;\n                }\n            }\n            @keyframes bottom {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(-9px) rotate(-45deg);\n                }\n            }\n            button > div {\n                background-color: black;\n                width: 100%;\n                height: 2px;\n            }\n           \n        ",this.open=()=>{this.clickedState=!0,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),this.parentElement.makeTranslucent(!1),a[0].style.animation="top 0.25s forwards",a[1].style.animation="middle 0.25s forwards",a[2].style.animation="bottom 0.25s forwards"},this.close=()=>{this.clickedState=!1,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),a.forEach((e=>{e.style.animation="",e.offsetWidth})),this.parentElement.makeTranslucent(!0),a[0].style.animation="top 0.25s reverse",a[1].style.animation="middle 0.25s reverse",a[2].style.animation="bottom 0.25s reverse"},n.addEventListener("click",(e=>{this.clickedState?this.close():this.open()}))}}class n extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("div")),n=this.parentElement,a=t.appendChild(document.createElement("div")),r=(a.appendChild(document.createElement("slot")),e.appendChild(document.createElement("style")));if(t.id="wrapper",t.style.display="none",r.innerHTML="\n            #wrapper {  /* Gray seethrough background */\n                position: fixed;\n                top: 3rem;\n                left: 0;\n                width: 100%;\n                height: calc(100vh - 3rem);\n                background-color: hsla(0, 0%, 10%, 50%);\n            }\n            @keyframes fadeIn {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n            @keyframes slideIn {\n                0% {\n                    transform: translateX(-100%);\n                }\n                100% {\n                    transform: translateX(0%);\n                }\n            }\n            #wrapper > div {    /*Left panel */\n                background-color: white;\n                width: 15rem;\n                height: 100%;\n                opacity: 1;\n                overflow: auto;\n                padding: 5px;\n                box-shadow: inset 0px 3px 5px -3px grey;\n            }\n            @media screen and (max-width: 325px) {\n                #wrapper > div {\n                    width: 100%;\n                }\n            }\n        ","burger-menu"!==n.localName)throw new Error("menu-panel must be a child of burger-menu");n.addEventListener("clickStateChange",(e=>{function r(){t.style.animation="",a.style.animation="",t.offsetWidth,a.offsetWidth}e.detail.clickedState?(r(),t.style.display="block",t.style.animation="fadeIn 0.2s forwards",a.style.animation="slideIn 0.2s forwards"):(r(),t.style.animation="fadeIn 0.2s reverse forwards",a.style.animation="slideIn 0.2s reverse forwards",setTimeout((()=>{n.clickedState||(t.style.display="none")}),200))})),t.addEventListener("click",(e=>{e.path[0]===t&&n.close()}))}}class a extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div")),a=n.appendChild(document.createElement("button"));let r;if(a.appendChild(document.createElement("h1")),a.appendChild(document.createElement("p")),"burger-menu"!==this.parentElement.parentElement.localName)throw new Error("panel-button must be a child of menu-panel");r=this.parentElement.parentElement,n.id="wrapper",t.innerHTML="\n            #wrapper {\n                position: relative;\n                width: calc(100% - 10px);\n                height: 2.5rem;\n                margin: 0;\n            }\n            button {\n                width: 100%;\n                height: 100%;\n                text-align: left;\n                border: none;\n                background-color: white;\n                border-radius: 5px;\n            }\n            h1 {\n                font-weight: bold;\n                font-size: 1rem;\n                margin: 0;\n            }\n            p {\n                margin: 0;\n            }\n            button:hover {\n                background-color: lightgrey;\n            }\n\n        ",this.addEventListener("click",(e=>{r.close(),this.setAttribute("seen",!1)}))}static get observedAttributes(){return["seen","header","text"]}attributeChangedCallback(e,t,n){const a=this.shadowRoot.querySelector("#wrapper").children[0],r=a.querySelector("h1"),o=a.querySelector("p");switch(e){case"seen":"true"===n?(a.style["border-right"]="none",a.style["background-color"]="white"):"false"===n&&(a.style["border-right"]="6px solid blue",a.style["background-color"]="lightblue");case"header":r.textContent=n;case"text":o.textContent=n}}}class r extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div"));n.appendChild(document.createElement("slot")),n.id="wrapper",t.innerHTML="\n            #wrapper {\n                padding: 5px 0;\n                width: 100%;\n                height: calc(100% - 10px);\n            }\n        "}}class o extends HTMLElement{constructor(){super();const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("div")),a=n.appendChild(document.createElement("div")),r=n.appendChild(document.createElement("div"));n.id="wrapper",a.id="message",r.id="extraInfo",t.innerHTML="\n            #wrapper {\n                padding: 0 5px;\n                width: calc(100% - 10px);\n                height: fit-content;\n                margin: 5px 0;\n                font-size: 1.3rem;\n                display: flex;\n                align-items: center;\n                justify-content: flex-end;\n                flex-wrap: wrap;\n            }\n            #message {\n                padding: 2px 7px;\n                border-radius: 15px;\n            }\n            #extraInfo {\n                display: none;\n                flex-basis: 100%;\n                font-size: 1rem;\n                color: gray;\n            }\n            @media screen and (min-width: 300px) {\n                #message {\n                    max-width: 80%;\n                }\n            }\n        ",a.addEventListener("mouseover",(()=>{var e;e=this.getAttribute("sentbyme"),a.style["background-color"]="true"==e||"false"!=e&&e?"hsl(195, 53%, 75%)":"hsl(0, 0%, 75%)"})),a.addEventListener("mouseout",(()=>{var e;e=this.getAttribute("sentbyme"),a.style["background-color"]="true"==e||"false"!=e&&e?"hsl(195, 53%, 80%)":"hsl(0, 0%, 80%)"})),a.addEventListener("click",(()=>{function e(e){const t=function*(e){let t=0;const n=1/e;for(e<0&&(t=1,e=-e);e--;)t+=n,yield t}(e);let n=setInterval((()=>{r.style.opacity=t.next().value,(r.style.opacity>=1||r.style.opacity<=0)&&clearInterval(n)}),10)}this.selected?(this.selected=!this.selected,r.style.opacity=0,r.style.display="block",e(20)):(this.selected=!this.selected,e(-20),setTimeout((()=>r.style.display="none"),200))}))}selected=!0;render(e={textContent:"Empty",date:new Date,seen:!1,sentbyme:!0}){if(e.date=new Date,!1 in e)throw new Error("No textContent provided");!1 in e&&(e.sentbyme=!0);const t=this.shadowRoot.querySelector("#wrapper"),n=this.shadowRoot.querySelector("#message"),a=t.querySelector("#extraInfo"),{date:r}=e,o=`${r.getDate()}.${r.getMonth()}.${r.getFullYear()} - ${r.getHours()}:${r.getMinutes()}`;return this.setAttribute("sentbyme",e.sentbyme?"true":"false"),a.textContent=o+""+(e.seen?" - Seen":""),n.textContent=e.textContent,this}static get observedAttributes(){return["sentbyme"]}attributeChangedCallback(e,t,n){switch(e){case"sentbyme":{const e=this.shadowRoot.querySelector("#wrapper"),t=e.querySelector("#message"),a=e.querySelector("#extraInfo");"true"===n?(e.style["justify-content"]="flex-end",t.style["background-color"]="hsl(195, 53%, 79%)",a.style["text-align"]="right"):"false"===n&&(e.style["justify-content"]="flex-start",t.style["background-color"]="hsl(0, 0%, 83%)",a.style["text-align"]="left")}}}}const s=localStorage.getItem("username");console.log(s),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/sw.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))})),customElements.define("chat-message",o),customElements.define("chat-window",r),customElements.define("panel-button",a),customElements.define("menu-panel",n),customElements.define("burger-menu",t),customElements.define("navigation-bar",e);const i=document.querySelector("chat-window"),l=function*(){for(;;)yield!0,yield!1}();new Array(15).fill().map((()=>({textContent:"Hello",date:new Date,seen:!1,sentbyme:l.next().value}))).forEach((e=>{i.appendChild(document.createElement("chat-message").render(e))}));const d=document.querySelector("navigation-bar"),c=document.createElement("div");d.appendChild(c),c.slot="right",setInterval((()=>{c.innerHTML=`${window.innerWidth}x${window.innerHeight}`}),100)})();
//# sourceMappingURL=chat.bundle.js.map