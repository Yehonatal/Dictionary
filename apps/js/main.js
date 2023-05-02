const body = document.querySelector("body");

if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    // body.classList.add("dark");
    body.classList.add("light");
} else {
    body.classList.add("light");
}
