fetch("./data/location.json")
    .then((r) => r.json())
    .then((d) => {

    const fakeDb = d.maps;
    const locations = d.places;
    const text1 = document.querySelector("#loc_in")
    const text2 = document.querySelector("#code_in")
    const t_body = document.querySelector("#t_body")
    const num = document.querySelector("#num")

    function populateTable()
    {
        if ((text1.value === null || text1.value === "") && (text2.value === null || text2.value === "")) 
        {
            t_body.replaceChildren(createRow(["...", "...", "...", "..."]));
            num.innerHTML = "No Input";
            num.style.color = "red";
            return;
        } 
        else if (text1.value === null || text1.value === "")
        {
            const re = new RegExp(text2.value.trim().toUpperCase());

            const newChildren = fakeDb
                                    .filter(e => re.test(e.code))
                                    .map(e => createRow([e.code, e.origin, e.dest, e.link]));

            if (newChildren.length === 0)
            {
                t_body.replaceChildren(createRow(["...", "...", "...", "..."]));
                num.innerHTML = "No Results";
                num.style.color = "red";
                return;
            }
            else
            {
                t_body.replaceChildren(...newChildren);
                num.innerHTML = `Found ${newChildren.length} results`;
                num.style.color = "green";
                return;
            }
        }
        else
        {
            const re = new RegExp(text1.value.trim());

            const match = locations
                            .map(loc => loc.replace(/_/g, " "))
                            .filter(loc => re.test(loc))
                            .map(loc => loc.replace(/\b\w/g, l => l.toUpperCase()));

            const newChildren = fakeDb
                                    .filter(e => match.includes(e.origin) || match.includes(e.dest))
                                    .map(e => createRow([e.code, e.origin, e.dest, e.link]));

            if (newChildren.length === 0)
            {
                t_body.replaceChildren(createRow(["...", "...", "...", "..."]));
                num.innerHTML = "No Results";
                num.style.color = "red";
                return;
            }
            else
            {
                t_body.replaceChildren(...newChildren);
                num.innerHTML = `Found ${newChildren.length} results`;
                num.style.color = "green";
                return;
            }
        }
    }

    text1.addEventListener("input", populateTable);
    text2.addEventListener("input", populateTable);

    function createRow(vals)
    {
        const tr = document.createElement("tr");

        for (let i = 0; i < vals.length; i++)
        {
            if (i === 3 && vals[i].constructor === Array)
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
        return tr;
    }
})