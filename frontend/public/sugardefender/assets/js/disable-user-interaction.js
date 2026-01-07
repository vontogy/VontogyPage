// Disable user interaction on elements with data-disable-user-interaction attribute
document.querySelectorAll("[data-disable-user-interaction]").forEach((function (e) { 
    e.classList.add("no-user-interaction"), 
    e.addEventListener("contextmenu", (function (e) { 
        e.preventDefault() 
    })) 
}))
