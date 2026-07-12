fetch("verbs.json")
    .then(response => {

        if (!response.ok) {
            throw new Error("Could not load verbs.json");
        }

        return response.json();

    })

    .then(verbs => {

        const day =
            Math.floor(Date.now() / 86400000);

        const verb =
            verbs[day % verbs.length];


        // Heading

        document.getElementById("verb").textContent =
            verb.infinitive;

        document.getElementById("translation").textContent =
            "to " + verb.english;


        // Conjugation tables

        fillTable("present", verb.present);

        fillTable("perfect", verb.perfect);

        fillTable("imperfect", verb.imperfect);


        // Examples

        const examplesContainer =
            document.getElementById("examples");

        examplesContainer.innerHTML = "";

        verb.examples.forEach(example => {

            const block =
                document.createElement("div");

            block.className =
                "example-block";

            block.innerHTML = `
                <p class="example-pt">${example.pt}</p>
                <p class="example-en">${example.en}</p>
            `;

            examplesContainer.appendChild(block);

        });

    })

    .catch(error => {

        console.error(error);

    });


function fillTable(tableId, forms) {

    const tbody =
        document.getElementById(tableId);

    tbody.innerHTML = "";

    Object.entries(forms)
        .forEach(([pronoun, form]) => {

            const row =
                document.createElement("tr");

            row.innerHTML = `
                <td>${pronoun}</td>
                <td>${form}</td>
            `;

            tbody.appendChild(row);

        });

}
