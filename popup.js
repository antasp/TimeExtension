document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ImportButton').addEventListener('click', function () {


        console.log('ImportButton clicked');

        chrome.runtime.sendMessage({ id: "changeColor" });


    }, false);

    document.getElementById('FillButton').addEventListener('click', function () {


        console.log('FillButton clicked');

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { id: "fill" });
        });

    }, false);

    document.getElementById('OptionsButton').addEventListener('click', function () {


        console.log('OptionsButton clicked');


    }, false);
}, false);
