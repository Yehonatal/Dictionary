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

// Data Access and Render
const searchBtn = document.querySelector("#search-btn");
const inputBtn = document.querySelector("#input-btn");
const main = document.querySelector("#main");

// Get the data from the API
async function fetchData(word) {
    const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Network response was not ok.");
    }
}

// Render the data to page
function renderData(data) {
    console.log(data);
    // Remove old Renders
    const containers = document.querySelectorAll(".container");
    containers.forEach((div) => div.remove());

    // Add New Render
    data.forEach((entry, index) => {
        const container = document.createElement("div");
        container.className = "container";

        const title = document.createElement("h1");
        title.innerText = titleCase(entry.word);

        const phonetic = document.createElement("h3");
        phonetic.innerText = entry.phonetic;

        const subtitle = document.createElement("span");
        subtitle.innerText = `${index + 1}/${data.length}`;

        title.appendChild(subtitle);
        container.appendChild(title);
        container.appendChild(phonetic);
        main.appendChild(container);
    });
}

function titleCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

// Even listener for Search
searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    const word = inputBtn.value.trim();

    try {
        const data = await fetchData(word);
        renderData(data);
    } catch (err) {
        console.log(err);
    }
});
