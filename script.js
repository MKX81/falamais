fetch("verbs.json")
    .then(response => response.json())

    .then(verbs => {


        // Select today's verb

        const day =
            Math.floor(Date.now() / 86400000);


        const verb =
            verbs[day % verbs.length];



        /*
        =========================
        Main example sentence
        =========================
        */


        const firstExample =
            verb.examples[0];


        const verbForm =
            verb.present.eu;


        const highlightedSentence =
            firstExample.pt.replace(
                new RegExp("\\b" + verbForm + "\\b", "i"),
                `<span class="highlight-verb">${verbForm}</span>`
            );


        document.getElementById("main-example-pt").innerHTML =
            highlightedSentence;


        document.getElementById("main-example-en").textContent =
            firstExample.en;





        /*
        =========================
        Verb information
        =========================
        */


        document.getElementById("verb").textContent =
            verb.infinitive.toUpperCase();


        document.getElementById("pronunciation").textContent =
            "[" + verb.pronunciation + "]";


        document.getElementById("translation").textContent =
            "to " + verb.english;


        document.getElementById("type").textContent =
            verb.type;


        document.getElementById("level").textContent =
            verb.learning.level;





        /*
        =========================
        Conjugation table
        =========================
        */


        const conjugation =
            document.getElementById("conjugation");


        conjugation.innerHTML = "";


        const persons = [
            "eu",
            "você",
            "ele/ela",
            "nós",
            "eles/elas"
        ];



        persons.forEach(person => {


            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>${person}</td>

                <td>${verb.present[person]}</td>

                <td>${verb.perfect[person]}</td>

                <td>${verb.imperfect[person]}</td>

                <td>${verb.future[person]}</td>

            `;


            conjugation.appendChild(row);


        });





        /*
        =========================
        Gerund
        =========================
        */


        document.getElementById("gerund").textContent =
            verb.gerund;





        /*
        =========================
        Other examples
        =========================
        */


        const examples =
            document.getElementById("examples");


        examples.innerHTML = "";



        verb.examples.forEach(example => {


            const block =
                document.createElement("div");


            block.className =
                "example-block";


            block.innerHTML = `

                <p class="example-pt">
                    ${highlightVerb(
                        example.pt,
                        verb.present.eu
                    )}
                </p>

                <p class="example-en">
                    ${example.en}
                </p>

            `;


            examples.appendChild(block);


        });





        /*
        =========================
        Vocabulary
        =========================
        */


        const vocabulary =
            document.getElementById("vocabulary");


        vocabulary.innerHTML = "";



        verb.vocabulary.forEach(word => {


            const item =
                document.createElement("div");


            item.className =
                "vocabulary-item";


            item.innerHTML = `

                <span class="pt">
                    ${word.pt}
                </span>

                =
                
                <span class="en">
                    ${word.en}
                </span>

            `;


            vocabulary.appendChild(item);


        });


    })



    .catch(error => {

        console.error(
            "Error loading verbs:",
            error
        );

    });





/*
Highlight Portuguese verb
*/

function highlightVerb(sentence, verb) {


    const regex =
        new RegExp(
            "\\b" + verb + "\\b",
            "i"
        );


    return sentence.replace(
        regex,
        `<span class="highlight-verb">${verb}</span>`
    );

}
