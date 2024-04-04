fetch("./data/location.json")
    .then((r) => r.json())
    .then((d) => {
    
    const fakeDb = d.maps;
    const tb = document.querySelector("#t_body");

    function populateTable()
    {
        const children = fakeDb
                            .filter(e => e.saved === "true")
                            .map(e => createRow([e.code, e.origin, e.dest, e.link]));

        tb.replaceChildren(...children);
    }
    populateTable();

    function button(parent, text)
    {
        const button = document.createElement("button");
        button.textContent = text;

        button.addEventListener("click", () => {
            parent.style.display = "none";
        })

        return button;
    }

    function createRow(vals)
    {
        const tr = document.createElement("tr");

        for (let i = 0; i < vals.length; i++)
        {
            if (i === 3 && vals[i] !== "[LINK TO MAP]")
            {
                const a1 = document.createElement("a");
                const a2 = document.createElement("a");
                const td = document.createElement("td");
                const div = document.createElement("div");

                div.appendChild(a1);
                div.appendChild(document.createElement("br"));
                div.appendChild(a2);
                td.appendChild(div);
                a1.href = vals[i][0];
                a2.href = vals[i][1];

                a1.textContent = "Common";
                a2.textContent = "Alternative";

                tr.appendChild(td);
            }
            else
            {
                const td = document.createElement("td");
                td.textContent = vals[i];
                tr.appendChild(td);
            }
        }
        tr.appendChild(button(tr, "Unsave"));
        return tr;
    }
})