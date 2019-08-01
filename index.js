document.addEventListener('DOMContentLoaded', function () {
    chrome.storage.local.get(['timeKeyData', 'selectedYear', 'selectedMonth'], function (data) {

        let container = document.getElementById('container');

        let years = [];
        for (let i = 2018; i < 2018 + 10; i++) {
            years.push(i);
        }
        let yearSelect = createSelect("year", years);
        yearSelect.value = data['selectedYear'];
        yearSelect.addEventListener('change', function (e) {

            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(createTable(yearSelect.value, data['selectedMonth'], data['timeKeyData']));

            chrome.storage.local.set({ 'selectedYear': yearSelect.value }, function (data) {
                console.log('year select change saved.')
            });
        });
        container.appendChild(yearSelect);

        let tableWrapper = document.createElement('div');
        tableWrapper.setAttribute('id', 'tableWrapper');
        tableWrapper.appendChild(createTable(data['selectedYear'], data['selectedMonth'], data['timeKeyData']));

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
        monthSelect.value = data['selectedMonth'];
        monthSelect.addEventListener('change', function (e) {
            tableWrapper.innerHTML = '';
            tableWrapper.appendChild(createTable(data['selectedYear'], monthSelect.value, data['timeKeyData']));

            chrome.storage.local.set({ 'selectedMonth': monthSelect.value }, function (data) {
                console.log('month select change saved.');
            });
        });
        container.appendChild(monthSelect);
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
                table.appendChild(createRow(date, dateData['totalTime'], dateData['projTime']));
            }

            return table;
        }

        function createSelect(name, options) {
            let select = document.createElement("select");
            select.setAttribute("name", name);
            select.setAttribute("id", name);

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
                let cell = createCell(columns[i] || "", true);
                cell.addEventListener('input', function (e) {
                    console.log(data);
                    if (!data['timeKeyData'].hasOwnProperty(date_str)) {
                        data['timeKeyData'][date_str] = { 'totalTime': 0, 'projTime': [] }
                    }
                    data['timeKeyData'][date_str]['projTime'][i] = cell.innerText;
                    chrome.storage.local.set({ 'timeKeyData': data['timeKeyData'] }, function (e) {
                        console.log(e);
                    })
                });
                row.appendChild(cell);
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



    });

});

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

function daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}
