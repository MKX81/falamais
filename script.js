fetch("verbs.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load verbs.json");
        }

        return response.json();

    })

    .then(verbs => {


        // Select today's verb

        const day =
            Math.floor(Date.now() / 86400000);


        const verb =
            verbs[day % verbs.length];



        // Main information

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



        // Gerund

        document.getElementById("gerund").textContent =
            verb.gerund;



        // Conjugation table

        createConjugationTable(verb);



        // Example sentences

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
                    ${example.pt}
                </p>

                <p class="example-en">
                    ${example.en}
                </p>

            `;


            examples.appendChild(block);


        });



        // Vocabulary

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

        console.error(error);


        document.getElementById("verb").textContent =
            "Error loading verb";

    });





function createConjugationTable(verb) {


    const table =
        document.getElementById("conjugation");


    table.innerHTML = "";


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

            <td>
                ${verb.present[person]}
            </td>

            <td>
                ${verb.perfect[person]}
            </td>

            <td>
                ${verb.imperfect[person]}
            </td>

            <td>
                ${verb.future[person]}
            </td>

        `;


        table.appendChild(row);


    });


}
