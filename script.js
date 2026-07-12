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
                =
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

if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
    htmlElement.classList.add('dark');
    themeToggle.textContent = '🌙';
} else {
    htmlElement.classList.remove('dark');
    themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        themeToggle.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        themeToggle.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
});
