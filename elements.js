function createYearSelect(selectedYear, callback) {
    let years = [];
    for (let i = 2018; i < 2018 + 10; i++) {
        years.push(i);
    }
    let yearSelect = createSelect("year", years);
    yearSelect.value = selectedYear;

    yearSelect.addEventListener('change', callback);

    return yearSelect;
}

function createMonthSelect(selectedMonth, callback) {
    let monthSelect = createSelect("month", [
        ["January", 1],
        ["February", 2],
        ["March", 3],
        ["April", 4],
        ["May", 5],
        ["June", 6],
        ["July", 7],
        ["August", 8],
        ["September", 9],
        ["October", 10],
        ["November", 11],
        ["December", 12]
    ]);
    monthSelect.value = selectedMonth;

    monthSelect.addEventListener('change', callback);

    return monthSelect;
}

function createCell(data, type = "td") {
    let cell = document.createElement(type);
    cell.innerText = data;
    return cell;
}

function createSelect(name, options) {
    let select = document.createElement("select");
    select.setAttribute("name", name);
    select.setAttribute("id", name);
    select.addClass('select-css');

    for (let i = 0; i < options.length; i++) {
        if (!Array.isArray(options[i])) {
            select.appendChild(createOption(options[i], options[i]));
        }
        else {
            select.appendChild(createOption(options[i][0], options[i][1]));
        }
    }

    return select;
}

function createOption(name, value) {
    let option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerText = name;

    return option;
}

function createButton(id, text, callback) {
    let button = document.createElement('input');
    button.value = text;
    button.setAttribute('id', id)
    button.setAttribute('type', 'button')

    button.addEventListener('click', callback);

    return button;
}
