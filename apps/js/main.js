const body = document.querySelector("body");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // body.classList.add("dark");
    body.classList.add("light");
} else {
    body.classList.add("light");
}

// Menu Drop
const arrow = document.querySelector(".font");
const menu = document.querySelector(".menu");
const font = document.querySelector(".font");

let currentFont = "Serif";

window.onload = () => {
    font.querySelector("p").innerText = currentFont;
};

arrow.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
    menu.parentNode.querySelector("img").style.transform =
        menu.classList.contains("hidden") ? "rotate(360deg)" : "rotate(180deg)";
});

menu.addEventListener("click", (event) => {
    if (event.target.nodeName === "LI") {
        const selectedLi = event.target;
        const selectedText = selectedLi.innerText;

        font.querySelector("p").innerText = selectedText;
        body.setAttribute("id", selectedText);
    }
});
