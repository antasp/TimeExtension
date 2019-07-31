chrome.runtime.onMessage.addListener(function (message, callback) {
    switch (message.id) {
        case "fill":
            chrome.storage.local.get(['timeData'], function (data) {
                console.log(data);
            });
            break;
        default:
            console.log("Message id not handeled (" + message.id + ")");
    }
});
