/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./client/js/chat.js":
/*!***************************!*\
  !*** ./client/js/chat.js ***!
  \***************************/
/***/ (() => {

eval("const username = localStorage.getItem('username');\r\nconsole.log(username);\r\nconst socket = io()\r\n\r\nclass Navbar extends HTMLElement {\r\n    constructor() {\r\n        super()\r\n        const shadow = this.attachShadow({mode: \"open\"})\r\n        const wrapper = document.createElement('div')\r\n        wrapper.id = \"wrapper\"\r\n        const burgerMenu = wrapper.appendChild(document.createElement('div'))\r\n        burgerMenu.id = 'burgerMenu'\r\n        burgerMenu.innerHTML = \"burgerMenu\"\r\n        const style = document.createElement('style')\r\n        style.innerHTML = `\r\n        #wrapper {\r\n            position: fixed;\r\n            display: flex;\r\n            top: 0;\r\n            width: 100%;\r\n            height: 3rem;\r\n            border: 1px solid black;\r\n            flex-wrap: nowrap;\r\n            align-items: center;\r\n            justify-content: space-between;\r\n            align-content: center;\r\n        }\r\n        div {\r\n            border: 1px solid black;\r\n        }\r\n        `\r\n        shadow.append(style, wrapper)\r\n    }\r\n}\r\ncustomElements.define(\"navigation-bar\", Navbar)\n\n//# sourceURL=webpack://socket.io/./client/js/chat.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./client/js/chat.js"]();
/******/ 	
/******/ })()
;