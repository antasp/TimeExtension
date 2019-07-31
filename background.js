chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.local.set({ 'timeKeyData': [] }, function () {
        console.log("The extension is installed");
    });


});

chrome.runtime.onMessage.addListener(function (message, callback) {
    if (message.id == "setAlarm") {
        chrome.alarms.create({ delayInMinutes: 5 })
    } else if (message.id == "runLogic") {
        chrome.tabs.executeScript({ file: 'logic.js' });
    } else if (message.id == "changeColor") {
        chrome.tabs.executeScript(
            { code: 'document.body.style.backgroundColor="orange"' });
    };
});
