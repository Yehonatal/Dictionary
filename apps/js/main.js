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

        let audio =
            entry.length == 2
                ? entry.phonetics[1].audio
                : entry.phonetics[index].audio;

        let card = `
        <div class="container">
                <div class="top">
                    <div>
                        <h1>${titleCase(entry.word)}<span>${index + 1} of ${
            data.length
        }</span></h1>
                        <h3>${entry.phonetic}</h3>
                    </div>

                    <div>
                            <button onclick="playAudio('${audio}')">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="75"
                                    height="75"
                                    viewBox="0 0 75 75"
                                >
                                    <g fill="#A445ED" fill-rule="evenodd">
                                        <circle
                                            cx="37.5"
                                            cy="37.5"
                                            r="37.5"
                                            opacity=".25"
                                        />
                                        <path d="M29 27v21l21-10.5z" />
                                    </g>
                                </svg>
                            </button>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = card;

        const block = document.createElement("div");
        block.className = "bottom";

        // List of Definitions
        entry.meanings.forEach(function (meaning) {
            const meaningDiv = document.createElement("div");
            meaningDiv.classList.add("meaning");

            const speechTypeDiv = document.createElement("div");
            speechTypeDiv.classList.add("speech-type");

            const speechTypeH2 = document.createElement("h2");
            speechTypeH2.innerText = meaning.partOfSpeech;
            speechTypeDiv.appendChild(speechTypeH2);

            meaningDiv.appendChild(speechTypeDiv);

            const hr = document.createElement("hr");
            meaningDiv.appendChild(hr);

            const h4 = document.createElement("h4");
            h4.innerText = "Meaning";

            const definitions = meaning.definitions;
            const ul = document.createElement("ol");

            definitions.forEach(function (def) {
                const li = document.createElement("li");
                li.innerText = def.definition;
                ul.appendChild(li);
            });

            block.appendChild(meaningDiv);
            block.appendChild(h4);
            block.appendChild(ul);

            container.appendChild(block);
        });

        main.appendChild(container);
    });
}

function titleCase(str) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase();
}

// Even listener for Search
searchBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    let word = inputBtn.value.trim();
    inputBtn.value = "";
    // word = "Love";
    word.length > 0 ? (word = word) : (word = "error");

    try {
        const data = await fetchData(word);
        renderData(data);
    } catch (err) {
        console.log(err);
    }
});

function playAudio(url) {
    var audio = new Audio(url);
    audio.play();
}
