document.addEventListener('DOMContentLoaded', function () {

    chrome.storage.local.get(['timeKeyData', 'selectedYear', 'selectedMonth'], function (data) {

        let ul = document.getElementById('FillForm').querySelector('ul');

        let li = document.createElement('li');
        ul.appendChild(li);

        let yearSelect = createYearSelect(data.selectedYear, function (e) {
            chrome.storage.local.set({ 'selectedYear': this.value }, function (data) {
                console.log('year select change saved.')
            });
        });
        li.appendChild(yearSelect);

        let monthSelect = createMonthSelect(data.selectedMonth, function (e) {
            chrome.storage.local.set({ 'selectedMonth': this.value }, function (data) {
                console.log('month select change saved.')
            });
        });
        monthSelect.setAttribute('style', 'margin-left: 8px;')
        li.appendChild(monthSelect);

        ul.appendChild(
            document.createElement('li').appendChild(
                createButton('FillButton', 'Fill', function (e) {

                    console.log(data.timeKeyData);

                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {

                        (function theLoop(i) {
                            setTimeout(function () {

                                chrome.tabs.sendMessage(
                                    tabs[0].id,
                                    {
                                        id: "fill",
                                        data: {
                                            day: "1",
                                            projNr: "p3224",
                                            actNr: "21",
                                            arbkd: "1",
                                            amount: Date.now().toString()
                                        }
                                    });

                                if (--i) {          // If i > 0, keep going
                                    theLoop(i);       // Call the loop again, and pass it the current value of i
                                }
                            }, 1000);
                        })(10);



                        // for (let day = 0; day < /*daysInMonth(yearSelect.value, monthSelect.value);*/5; day++) {
                        //     for (let i = 0; i < /*data.timeKeyData[yearSelect.value][monthSelect.value].projectTime.size();*/5; i++) {

                        //         setTimeout(function () {
                        //             chrome.tabs.sendMessage(
                        //                 tabs[0].id,
                        //                 {
                        //                     id: "fill",
                        //                     data: {
                        //                         day: "1",
                        //                         projNr: "p3224",
                        //                         actNr: "21",
                        //                         arbkd: "1",
                        //                         amount: Date.now().toString()
                        //                     }
                        //                 });

                        //             console.log(day, i);
                        //         }, 1000);
                        //     }
                        // }
                    });

                    console.log('FillButton clicked');

                })
            )
        );
    });

}, false);
