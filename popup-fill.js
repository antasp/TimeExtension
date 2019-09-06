document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('FillButton').addEventListener('click', function () {

        console.log('FillButton clicked');

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { id: "fill", year: document.getElementById('year').value, month: document.getElementById('month').value });
        });

    }, false);

}, false);
