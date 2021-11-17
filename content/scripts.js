function showTemplate(target, template, modifier) {
    let instance = template.content.cloneNode(true);
    if (modifier) {
        const replacing = modifier(instance);
        if (replacing) instance = replacing;
    }
    target.innerHTML = "";
    target.appendChild(instance);
}

function populateTable(table, data, callback, filter) {
    const tbody = table.querySelector("tbody");
    data.forEach(item => {
        if (filter && !filter(item)) return;

        const row = document.createElement("tr");
        Object.keys(item).forEach(key => {
            if (key === "_id") return;
            const value = item[key];
            const cell = document.createElement("td");
            cell.innerText = value;
            row.appendChild(cell);
        });
        callback(row, item["_id"]);
        tbody.appendChild(row);
    });
}

function getFormData(formEvent, fields) {
    const data = {};
    fields.forEach(field => {
        const { value } = formEvent.target.elements[field];
        data[field] = value;
    });
    return data;
}

function wrapInCard(component, title) {
    const cardContainerWrapper = document.createElement("div");
    cardContainerWrapper.classList.add("card-content");
    if (title) {
        const span = document.createElement("span");
        span.classList.add("card-title");
        span.innerHTML = title;
        cardContainerWrapper.appendChild(span);
    }
    cardContainerWrapper.appendChild(component);

    const cardWrapper = document.createElement("div");
    cardWrapper.classList.add("card");
    cardWrapper.appendChild(cardContainerWrapper);

    return cardWrapper;
}