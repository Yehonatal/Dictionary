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

const storedFontFamily = localStorage.getItem("fontFamily");

window.onload = () => {
    font.querySelector("p").innerText = storedFontFamily;
    body.setAttribute("id", storedFontFamily);
};

arrow.addEventListener("click", (e) => {
    menu.classList.toggle("hidden");
    menu.parentNode.querySelector("img").style.transform =
        menu.classList.contains("hidden") ? "rotate(360deg)" : "rotate(180deg)";
});

menu.addEventListener("click", (e) => {
    if (e.target.nodeName === "LI") {
        const selectedLi = e.target;
        const selectedText = selectedLi.innerText;

        font.querySelector("p").innerText = selectedText;
        body.setAttribute("id", selectedText);

        // Store the users choice in the local storage
        localStorage.setItem("fontFamily", selectedText);
    }
});
