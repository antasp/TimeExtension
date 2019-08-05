document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['timeKeyData', 'selectedYear', 'selectedMonth'], function (data) {

        // --------------------------------------------------------------------
        // Navigation
        // --------------------------------------------------------------------

        let yearSelect = createYearSelect(data['selectedYear'], function (e) {

            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(createTable(this.value, data['selectedMonth'], data['timeKeyData']));

            chrome.storage.local.set({ 'selectedYear': this.value }, function (data) {
                console.log('year select change saved.')
            });
        });

        let monthSelect = createMonthSelect(data['selectedMonth'], function (e) {
            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(createTable(data['selectedYear'], this.value, data['timeKeyData']));

            chrome.storage.local.set({ 'selectedMonth': this.value }, function (data) {
                console.log('month select change saved.');
            });
        });

        let importButton = createButton('importButton', 'Import timeKey data', function (e) {
            console.log('clicked import button');

            uploadCSV(function (timeKeyData) {
                for (key in timeKeyData) {
                    if (!data['timeKeyData'].hasOwnProperty(key)) {
                        data['timeKeyData'][key] = { 'totalTime': 0, 'projTime': new Array(4) };
                    }
                    data['timeKeyData'][key]['totalTime'] = timeKeyData[key].HHMMToHours();
                }

                console.log(data['timeKeyData']);

                tableWrapper.innerHTML = '';
                tableWrapper.appendChild(createTable(yearSelect.value, monthSelect.value, data['timeKeyData']));

                chrome.storage.local.set({ 'timeKeyData': data['timeKeyData'] }, function (e) {
                    console.log('imported data');
                });


            });
        });

        let exportButton = createButton('exportButton', 'Export data', function (e) {
            console.log('clicked export button');

            exportTableToCSV(yearSelect.value + '-' + monthSelect.value + '-export.csv');
        });

        let navBar = document.getElementById('navbar');
        navBar.appendChild(yearSelect);
        navBar.appendChild(monthSelect);
        navBar.appendChild(importButton);
        navBar.appendChild(exportButton);

        // --------------------------------------------------------------------
        // Table
        // --------------------------------------------------------------------

        let tableWrapper = document.createElement('div');
        tableWrapper.setAttribute('id', 'tableWrapper');
        tableWrapper.appendChild(createTable(data['selectedYear'], data['selectedMonth'], data['timeKeyData']));

        let container = document.getElementById('container');
        container.appendChild(tableWrapper);

        function createTable(year, month, data) {
            data = data || {}
            let table = document.createElement("table");
            table.setAttribute("class", "timeTable");
            table.setAttribute('id', 'timeTable');

            let lastDay = daysInMonth(year, month);

            let projNr = ["A3204", "A3224", "P100", "+"];
            table.appendChild(createHeader(projNr));

            for (let day = 1; day <= lastDay; day++) {
                let date = new Date(year + "-" + month + "-" + day).yyyymmdd();
                let dateData = data[date] || { 'totalTime': 0, 'projTime': new Array(projNr.length) };
                table.appendChild(createRow(date, projNr, dateData['totalTime'], dateData['projTime']));
            }

            return table;
        }

        function createHeader(columns) {
            let header = document.createElement("tr");
            header.appendChild(createCell("Date", "th"));
            header.appendChild(createCell("Total Time", "th"));

            for (let i = 0; i < columns.length; i++) {
                let cell = createCell("", "th");
                let input = document.createElement('input');
                input.setAttribute('type', 'text');
                input.value = columns[i] || "";

                cell.appendChild(input);
                cell.setAttribute('class', 'nopadding');
                header.appendChild(cell);
            }

            return header;
        }

        function createRow(date_str, projNr, time, columns) {
            let date = new Date(date_str);
            let row = document.createElement("tr");
            row.appendChild(createCell(date.yyyymmdd()));
            row.appendChild(createCell(time.hoursToHHMM()));

            if (date.weekend()) {
                row.addClass('weekend')
            }

            if (date.yyyymmdd() == (new Date()).yyyymmdd()) {
                row.addClass('today');
            }

            for (let i = 0; i < projNr.length; i++) {
                let cell = createCell("");

                let input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.value = columns[i] || "";
                input.addEventListener('input', function (e) {
                    if (!data['timeKeyData'].hasOwnProperty(date_str)) {
                        data['timeKeyData'][date_str] = { 'totalTime': 0, 'projTime': [] }
                    }
                    data['timeKeyData'][date_str]['projTime'][i] = input.value;
                    chrome.storage.local.set({ 'timeKeyData': data['timeKeyData'] }, function (e) {
                        console.log(e);
                    })
                });
                cell.appendChild(input);
                cell.setAttribute('class', 'nopadding');

                row.appendChild(cell);
            }



            return row;
        }


    });

});

HTMLElement.prototype.addClass = function (newClass) {
    let currentClass = this.getAttribute('class') || '';
    this.setAttribute('class', newClass + ' ' + currentClass);
};

Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
};

Date.prototype.weekend = function () {
    return !(this.getDay() % 6);
}

Number.prototype.hoursToHHMM = function () {

    var num = this;
    var rhours = Math.floor(num);
    var minutes = (num - rhours) * 60;
    var rminutes = Math.round(minutes);
    return [rhours, (rminutes > 9 ? '' : '0') + rminutes].join(":");
}

String.prototype.HHMMToHours = function () {

    temp = this.split(':');

    return Number(temp[0]) + (Number(temp[1] / 60));
}

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function validate(s) {
    var rgx = /^[0-9]*\,?[0-9]*$/;
    return s.match(rgx);
}

const get = (p, o) =>
    p.reduce((xs, x) => (xs && xs[x]) ? xs[x] : null, o)


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
    let button = document.createElement('button');
    button.innerText = text;
    button.setAttribute('id', id)

    button.addEventListener('click', callback);

    return button;
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++) {
            let input = cols[j].querySelector('input');
            if (input) {
                row.push(input.value);
            }
            else {
                row.push(cols[j].innerText);
            }
        }

        csv.push(row.join(";"));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename || 'export.csv';

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function uploadCSV(callback) {
    var input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', '.csv');
    input.click();

    var form = document.createElement('form');
    form.appendChild(input);

    input.addEventListener('change', function (e) {
        var file = this.files[0];

        var reader = new FileReader();
        reader.onload = function () {
            var data = reader.result;
            importCSV(data, callback);
        };
        reader.readAsText(file);
        form.reset();   // <-- Resets the input so we do get a `change` event, even if the user chooses the same file
    })
}

function importCSV(csv, callback) {
    let data = {};
    let rows = csv.split('\n');
    let dateRegEx = RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')
    let lastDate = '';

    for (let r = 0; r < rows.length; r++) {
        let cols = rows[r].split(';');
        let match = dateRegEx.exec(cols[0]);
        if (match) {
            lastDate = match[0];
        }

        if (cols[2] == 'Total time' || cols[2] == 'Totaltid') {
            data[lastDate] = cols[5];
        }
    }

    callback(data);
}
