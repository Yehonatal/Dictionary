const body = document.querySelector("body");
const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

if (isDarkMode) {
    // body.classList.add("dark");
    body.classList.add("light");
} else {
    body.classList.add("light");
}
