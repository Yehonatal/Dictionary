const body = document.querySelector("body");

const arrow = document.querySelector(".font");
const menu = document.querySelector(".menu");
const font = document.querySelector(".font");

arrow.addEventListener("click", (event) => {
    menu.classList.toggle("hidden");
    const img = menu.parentNode.querySelector("img");
    img.style.transform = menu.classList.contains("hidden")
        ? "rotate(360deg)"
        : "rotate(180deg)";
});

menu.addEventListener("click", (event) => {
    if (event.target.nodeName === "LI") {
        const selectedText = event.target.innerText;

        font.querySelector("p").innerText = selectedText;
        body.setAttribute("id", selectedText);

        // Store the user's choice in local storage
        localStorage.setItem("fontFamily", selectedText);
    }
});

// Theme picker
const picker = document.querySelector(".picker");
const input = picker.querySelector("input");

input.addEventListener("change", (event) => {
    const themeType = input.checked ? "dark" : "light";
    document.body.className = themeType;
    localStorage.setItem("themePreference", themeType);
});

window.onload = () => {
    const storedFontFamily = localStorage.getItem("fontFamily");
    const storedTheme = localStorage.getItem("themePreference");
    if (storedFontFamily) {
        font.querySelector("p").innerText = storedFontFamily;
        body.setAttribute("id", storedFontFamily);
        body.classList.add(storedTheme);
    }

    if (body.classList.contains("dark")) {
        input.checked = true;
    }

    body.classList.contains("dark")
        ? (input.checked = true)
        : (input.checked = false);
};
