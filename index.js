document.addEventListener('DOMContentLoaded', function () {

    chrome.storage.local.get(['timeKeyData'], function (data) {

        //data = [["Date", "Total Time", "A3204", "A3224", "P100"], ["2019-04-01", 5.5, 3, 4, 5], ["2019-04-02", 8.1, 3, 4, 5], ["2019-04-03", 7.4, 3, 4, 5], ["2019-04-04", 9.0, 3, 4, 5]];
        console.log(data);
        let table = document.createElement("table");
        table.setAttribute("class", "timeTable");

        let projNr = ["A3204", "A3224", "P100"];
        data = [0,0,0]

        table.appendChild(createHeader(projNr));
        for (let day = 1; day <= 31; day++) {
            table.appendChild(createRow("2019-08-" + day, Math.random() * 3 + 6, data))
        }

        // for (let r = 0; r < data.length; r++) {
        //     let row = document.createElement("tr");

        //     for (let c = 0; c < data[r].length; c++) {

        //         if (r == 0) {
        //             let header = document.createElement("th");
        //             if (c < 2) {
        //                 header.innerText = data[r][c];
        //             }
        //             else {
        //                 let div = document.createElement("div");

        //                 let span = document.createElement("span");
        //                 span.innerText = data[r][c];
        //                 span.setAttribute("contenteditable", "true");
        //                 div.appendChild(span);

        //                 let dropdown = document.createElement("select");
        //                 dropdown.style.cssFloat = "right";
        //                 dropdown.appendChild(createOption("h", 0));
        //                 dropdown.appendChild(createOption("%", 1));
        //                 div.appendChild(dropdown);

        //                 header.appendChild(div);
        //             }

        //             row.appendChild(header);
        //         }
        //         else {

        //             let col = document.createElement("td");
        //             col.innerText = data[r][c];

        //             if (c >= 2)
        //             {
        //                 col.setAttribute("contenteditable", "true");
        //             }

        //             row.appendChild(col);
        //         }

        //     }

        //     table.appendChild(row);
        // }


        document.getElementById('container').appendChild(table);

    });

});

function createSelect(name, options) {
    let select = document.createElement("select");
    select.setAttribute("name", name);
    select.setAttribute("id", name);

    for (let i = 0; i < options.length; i++) {
        select.appendChild(createOption(options[i].name, options[i].value));
    }

    return select;
}

function createOption(name, value) {
    let option = document.createElement("option");
    option.setAttribute("value", value);
    option.innerText = name;

    return option;
}

function createHeader(columns) {
    let header = document.createElement("tr");
    header.appendChild(createCell("Date", false, "th"));
    header.appendChild(createCell("Total Time", false, "th"));

    for (let i = 0; i < columns.length; i++) {
        header.appendChild(createCell(columns[i], true, "th"));
    }

    return header;
}

function createRow(date_str, time, columns) {
    let date = new Date(date_str);
    let row = document.createElement("tr");
    row.appendChild(createCell(date.yyyymmdd(), false));
    row.appendChild(createCell(time.hoursToHHMM(), false));

    for (let i = 0; i < columns.length; i++) {
        row.appendChild(createCell(columns[i], true));
    }

    if (date.weekend()) {
        row.setAttribute("class", "weekend");
    }

    return row;
}

function createCell(data, editable, type = "td") {
    let cell = document.createElement(type);
    cell.innerText = data;
    cell.setAttribute("contenteditable", editable);
    return cell;
}

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
    return [rhours, rminutes].join(":");
}