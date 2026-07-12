fetch("verbs.json")
    .then(response => response.json())
    .then(verbs => {
        const day = Math.floor(Date.now() / 86400000);
        const verb = verbs[day % verbs.length];

        const firstExample = verb.examples[0];
        const verbForm = verb.present.eu;
        const highlightedSentence = firstExample.pt.replace(
            new RegExp("\\b" + verbForm + "\\b", "i"),
            `<span class="highlight-verb">${verbForm}</span>`
        );

        document.getElementById("main-example-pt").innerHTML = highlightedSentence;
        document.getElementById("main-example-en").textContent = firstExample.en;

        document.getElementById("verb").textContent = verb.infinitive.toUpperCase();
        document.getElementById("pronunciation").textContent = "[" + verb.pronunciation + "]";
        document.getElementById("translation").textContent = "to " + verb.english;
        document.getElementById("type").textContent = verb.type;

        const conjugation = document.getElementById("conjugation");
        conjugation.innerHTML = "";
        const persons = ["eu", "você", "ele/ela", "nós", "eles/elas"];

        persons.forEach(person => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${person}</td>
                <td>${verb.present[person]}</td>
                <td>${verb.perfect[person]}</td>
                <td>${verb.imperfect[person]}</td>
                <td>${verb.future[person]}</td>
            `;
            conjugation.appendChild(row);
        });

        document.getElementById("gerund").textContent = verb.gerund;

        const examples = document.getElementById("examples");
        examples.innerHTML = "";
        verb.examples.forEach(example => {
            const block = document.createElement("div");
            block.className = "example-block";
            block.innerHTML = `
                <p class="example-pt">${example.pt}</p>
                <p class="example-en">${example.en}</p>
            `;
            examples.appendChild(block);
        });

        const vocabulary = document.getElementById("vocabulary");
        vocabulary.innerHTML = "";
        verb.vocabulary.forEach(word => {
            const item = document.createElement("div");
            item.className = "vocabulary-item";
            item.innerHTML = `
                <span class="pt">${word.pt}</span>
                <span class="vocab-split"></span>
                <span class="en">${word.en}</span>
            `;
            vocabulary.appendChild(item);
        });
    })
    .catch(error => {
        console.error("Error loading verbs:", error);
    });

function highlightVerb(sentence, verb) {
    const regex = new RegExp("\\b" + verb + "\\b", "i");
    return sentence.replace(regex, `<span class="highlight-verb">${verb}</span>`);
}

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const sunIcon = `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>`;
const moonIcon = `<svg viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>`;

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    themeToggle.innerHTML = moonIcon;
} else {
    htmlElement.classList.remove('dark');
    themeToggle.innerHTML = sunIcon;
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeToggle.innerHTML = sunIcon;
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        themeToggle.innerHTML = moonIcon;
        localStorage.setItem('theme', 'dark');
    }
});
