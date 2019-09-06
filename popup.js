document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('ImportButton').addEventListener('click', function () {


        console.log('ImportButton clicked');
        chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });

        chrome.runtime.sendMessage({ id: "changeColor" });


    }, false);

    // document.getElementById('OptionsButton').addEventListener('click', function () {


    //     console.log('OptionsButton clicked');
    //     chrome.tabs.create({ url: chrome.runtime.getURL("options.html") });


    // }, false);
}, false);
