(()=>{"use strict";class e extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this);t.id="wrapper",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="left",t.appendChild(document.createElement("div")).appendChild(document.createElement("slot")).name="right",t.style["z-index"]=this.getAttribute("z-index"),n.innerHTML="\n        #wrapper{\n            position: fixed;\n            display: flex;\n            box-shadow: 3px 0 5px gray;\n            top: 0;\n            width: 100%;\n            height: 3rem;\n            flex-wrap: nowrap;\n            align-items: center;\n            justify-content: space-between;\n            align-content: center;\n            background-color: rgba(255, 255, 255 ,0.95);\n        }\n        ",e.append(n,t)}makeTranslucent(e){this.shadowRoot.querySelector("#wrapper").style["background-color"]=e?"rgba(255, 255, 255, 0.95)":"rgba(255, 255, 255, 1)"}static get observedAttributes(){return["z-index"]}attributeChangedCallback(e,t,n){switch(e){case"z-index":this.shadowRoot.querySelector("#wrapper").style["z-index"]=n}}}class t extends HTMLElement{constructor(){super(),this.clickedState=!1;const e=this.attachShadow({mode:"open"}),t=e.appendChild(document.createElement("style")),n=e.appendChild(document.createElement("button"));n.ariaLabel="Menu",e.appendChild(document.createElement("slot"));const r=[n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div")),n.appendChild(document.createElement("div"))];n.append(...r),t.innerHTML="\n            button {\n                display: flex;\n                flex-direction: column;\n                justify-content: space-evenly;\n                margin: 0 5px;\n                min-width: 2.5rem;\n                min-height: 2.5rem;\n                background-color: transparent;\n                border: 0;\n                border-radius: 50%;\n            }\n            button:hover {\n                background-color: rgba(0,0,0,0.1);\n                box-shadow: 0px 0px 5px 0px lightgrey;\n            }\n\n            @keyframes top {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(9px) rotate(45deg);\n                }\n            }\n            @keyframes middle {\n                0% {\n                    opacity: 1;\n                }\n                100% {\n                    opacity: 0;\n                }\n            }\n            @keyframes bottom {\n                0% {\n                    transform: translateY(0px);\n                }\n                100% {\n                    transform: translateY(-9px) rotate(-45deg);\n                }\n            }\n            button > div {\n                background-color: black;\n                width: 100%;\n                height: 2px;\n            }\n           \n        ",this.open=()=>{this.clickedState=!0,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),window.history.replaceState("",null,"./"),window.history.pushState("",null,"./"),r.forEach((e=>{e.style.animation="",e.offsetWidth})),this.parentElement.makeTranslucent(!1),r[0].style.animation="top 0.25s forwards",r[1].style.animation="middle 0.25s forwards",r[2].style.animation="bottom 0.25s forwards"},this.close=()=>{this.clickedState=!1,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),window.history.back(),r.forEach((e=>{e.style.animation="",e.offsetWidth})),this.parentElement.makeTranslucent(!0),r[0].style.animation="top 0.25s reverse",r[1].style.animation="middle 0.25s reverse",r[2].style.animation="bottom 0.25s reverse"},n.addEventListener("click",(e=>{this.clickedState?this.close():this.open()}));const a=()=>{this.clickedState=!1,this.dispatchEvent(new CustomEvent("clickStateChange",{bubbles:!0,cancelable:!0,composed:!0,detail:{clickedState:this.clickedState}})),r.forEach((e=>{e.style.animation="",e.offsetWidth})),this.parentElement.makeTranslucent(!0),r[0].style.animation="top 0.25s reverse",r[1].style.animation="middle 0.25s reverse",r[2].style.animation="bottom 0.25s reverse"};window.addEventListener("popstate",(e=>{window.history&&window.history.pushState&&this.clickedState&&(a(),e.stopPropagation())}))}}class n extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this),r=this.parentElement,a=t.appendChild(document.createElement("div"));if(a.appendChild(document.createElement("slot")),e.appendChild(document.querySelector("#scrollbar-template").content.cloneNode(!0)),t.id="wrapper",t.style.display="none",n.innerHTML="\n            #wrapper {  /* Gray seethrough background */\n                position: fixed;\n                top: 3rem;\n                left: 0;\n                width: 100%;\n                height: calc(100vh - 3rem);\n                background-color: hsla(0, 0%, 10%, 50%);\n            }\n            @keyframes fadeIn {\n                from {\n                    opacity: 0;\n                }\n                to {\n                    opacity: 1;\n                }\n            }\n            @keyframes slideIn {\n                0% {\n                    transform: translateX(-100%);\n                }\n                100% {\n                    transform: translateX(0%);\n                }\n            }\n            #wrapper > div {    /*Left panel */\n                background-color: white;\n                width: 15rem;\n                height: 100%;\n                opacity: 1;\n                overflow: auto;\n                padding: 5px;\n                box-shadow: inset 0px 3px 5px -3px grey;\n            }\n            @media screen and (max-width: 325px) {\n                #wrapper > div {\n                    width: calc(100% - 10px);\n                    padding-right: 5px;\n                }\n            }\n            \n        ","burger-menu"!==r.localName)throw new Error("menu-panel must be a child of burger-menu");r.addEventListener("clickStateChange",(e=>{function n(){t.style.animation="",a.style.animation="",t.offsetWidth,a.offsetWidth}e.detail.clickedState?(n(),t.style.display="block",t.style.animation="fadeIn 0.2s forwards",a.style.animation="slideIn 0.2s forwards"):(n(),t.style.animation="fadeIn 0.2s reverse forwards",a.style.animation="slideIn 0.2s reverse forwards",setTimeout((()=>{r.clickedState||(t.style.display="none")}),200))})),t.addEventListener("click",(e=>{e.path[0]===t&&r.close()}))}}class r extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this),r=t.appendChild(document.createElement("button"));let a;if(r.appendChild(document.createElement("h1")),r.appendChild(document.createElement("p")),"burger-menu"!==this.parentElement.parentElement.localName)throw new Error("panel-button must be a child of menu-panel");a=this.parentElement.parentElement,t.id="wrapper",n.innerHTML="\n            #wrapper {\n                position: relative;\n                width: 100%;\n                height: 2.5rem;\n                margin: 0;\n            }\n            button {\n                width: 100%;\n                height: 100%;\n                text-align: left;\n                border: none;\n                background-color: rgba(255, 255, 255, 0);\n                border-radius: 5px;\n            }\n            h1 {\n                font-weight: bold;\n                font-size: 1rem;\n                margin: 0;\n            }\n            p {\n                margin: 0;\n            }\n            button:hover {\n                background-color: hsla(0, 0%, 60%, 0.3);\n            }\n\n        ",this.addEventListener("click",(e=>{a.close(),this.setAttribute("seen",!1)}))}static get observedAttributes(){return["seen","header","text"]}attributeChangedCallback(e,t,n){const r=this.shadowRoot.querySelector("#wrapper").children[0],a=r.querySelector("h1"),o=r.querySelector("p");switch(e){case"seen":"true"===n?(r.style["border-right"]="none",r.style["background-color"]="rgba(255, 255, 255, 0)"):"false"===n&&(r.style["border-right"]="6px solid blue",r.style["background-color"]="rgba(173, 216, 230, 0.5)");break;case"header":a.textContent=n;break;case"text":o.textContent=n}}}class a extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this);function r(e){return e.scrollHeight>e.clientHeight}t.appendChild(document.createElement("slot")),e.appendChild(document.querySelector("#scrollbar-template").content.cloneNode(!0)),t.id="wrapper",t.classList.add("scrollbar-margin-top","scrollbar-margin-bottom"),n.innerHTML="\n        #wrapper {\n            padding: calc(5px + 3rem) 0;\n            width: 100%;\n            max-height: calc(100% - calc(10px + 6rem));\n            overflow: auto;\n        }\n        /* Custom scrollbar track */\n        .scrollbar::after {\n            content:'';\n            position: absolute;\n            z-index: -1;\n            height: calc(100% - calc(3rem + 10px));\n            top: 10px;\n            right: 4px;\n            width: 2px;\n            background: hsl(0, 0%, 75%);\n        }\n        ",window.addEventListener("load",(()=>{t.scrollTo(0,t.scrollHeight),r(t)&&t.classList.add("scrollbar")})),window.addEventListener("resize",(()=>{r(t)?t.classList.add("scrollbar"):t.classList.remove("scrollbar")}))}}class o extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this),r=t.appendChild(document.createElement("div")),a=t.appendChild(document.createElement("div"));t.id="wrapper",r.id="message",a.id="extraInfo",n.innerHTML="\n            #wrapper {\n                padding: 0 5px;\n                width: calc(100% - 10px);\n                height: fit-content;\n                margin: 5px 0;\n                font-size: 1.3rem;\n                display: flex;\n                align-items: center;\n                justify-content: flex-end;\n                flex-wrap: wrap;\n            }\n            #message {\n                padding: 2px 7px;\n                border-radius: 15px;\n            }\n            #extraInfo {\n                display: none;\n                flex-basis: 100%;\n                font-size: 1rem;\n                color: gray;\n            }\n            @media screen and (min-width: 300px) {\n                #message {\n                    max-width: 80%;\n                }\n            }\n        ",r.addEventListener("mouseover",(()=>{var e;e=this.getAttribute("sentbyme"),r.style["background-color"]="true"==e||"false"!=e&&e?"hsl(195, 53%, 75%)":"hsl(0, 0%, 75%)"})),r.addEventListener("mouseout",(()=>{var e;e=this.getAttribute("sentbyme"),r.style["background-color"]="true"==e||"false"!=e&&e?"hsl(195, 53%, 80%)":"hsl(0, 0%, 80%)"})),r.addEventListener("click",(()=>{function e(e){const t=function*(e){let t=0;const n=1/e;for(e<0&&(t=1,e=-e);e--;)t+=n,yield t}(e);let n=setInterval((()=>{a.style.opacity=t.next().value,(a.style.opacity>=1||a.style.opacity<=0)&&clearInterval(n)}),10)}this.selected?(this.selected=!this.selected,a.style.opacity=0,a.style.display="block",e(20)):(this.selected=!this.selected,e(-20),setTimeout((()=>a.style.display="none"),200))}))}selected=!0;render(e={textContent:"Empty",date:new Date,seen:!1,sentbyme:!0}){if(e.date=new Date,!1 in e)throw new Error("No textContent provided");!1 in e&&(e.sentbyme=!0);const t=this.shadowRoot.querySelector("#wrapper"),n=this.shadowRoot.querySelector("#message"),r=t.querySelector("#extraInfo"),{date:a}=e,o=`${a.getDate()}.${a.getMonth()+1}.${a.getFullYear()} - ${a.getHours()}:${a.getMinutes()}`;return this.setAttribute("sentbyme",e.sentbyme?"true":"false"),r.textContent=o+""+(e.seen?" - Seen":""),n.textContent=e.textContent,this}static get observedAttributes(){return["sentbyme"]}attributeChangedCallback(e,t,n){switch(e){case"sentbyme":{const e=this.shadowRoot.querySelector("#wrapper"),t=e.querySelector("#message"),r=e.querySelector("#extraInfo");"true"===n?(e.style["justify-content"]="flex-end",t.style["background-color"]="hsl(195, 53%, 79%)",r.style["text-align"]="right"):"false"===n&&(e.style["justify-content"]="flex-start",t.style["background-color"]="hsl(0, 0%, 83%)",r.style["text-align"]="left")}}}}class s extends HTMLElement{constructor(){super();const{shadow:e,wrapper:t,style:n}=i(this);t.appendChild(document.createElement("input")),this.parentElement.shadowRoot.querySelector("#wrapper").style.height=`calc(100% - calc(10px + calc(3rem + ${this.getAttribute("height")}))`,n.innerHTML="\n            #wrapper {\n                position: fixed;\n                background-color: red;\n                width: 100%;\n                bottom: 0;\n            }\n        "}static get observedAttributes(){return["height"]}attributeChangedCallback(e,t,n){switch(e){case"height":{const e=this.parentElement;this.shadowRoot.querySelector("#wrapper").style.height=n,e.shadowRoot.querySelector("#wrapper").style.height=`calc(100% - calc(10px + calc(3rem + ${n}))`}}}}function i(e){const t=e.attachShadow({mode:"open"}),n=t.appendChild(document.createElement("div")),r=t.appendChild(document.createElement("style"));return n.id="wrapper",{shadow:t,wrapper:n,style:r}}const l=localStorage.getItem("username");console.log(l),"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/sw.js").then((function(e){console.log("ServiceWorker registration successful with scope: ",e.scope)}),(function(e){console.log("ServiceWorker registration failed: ",e)}))})),customElements.define("chat-message",o),customElements.define("chat-window",a),customElements.define("panel-button",r),customElements.define("menu-panel",n),customElements.define("burger-menu",t),customElements.define("navigation-bar",e),customElements.define("chat-input",s);const c=document.querySelector("chat-window"),d=function*(){for(;;)yield!0,yield!1}();new Array(15).fill().map((()=>({textContent:"Hello world lorem ipsum dolor sit amet er tempor incididunt ut labore",date:new Date,seen:!1,sentbyme:d.next().value}))).forEach((e=>{c.appendChild(document.createElement("chat-message").render(e))}));const p=document.querySelector("navigation-bar"),h=document.createElement("div");p.appendChild(h),h.slot="right",setInterval((()=>{h.innerHTML=`${window.innerWidth}x${window.innerHeight}`}),100)})();
//# sourceMappingURL=chat.bundle.js.map