chrome.runtime.onMessage.addListener(function (message, callback) {
    switch (message.id) {
        case "fill":

            document.getElementById('W3DAYN').value = message.data.day;
            document.getElementById('W3PROJ').value = message.data.projNr;
            document.getElementById('W3ELNO').value = message.data.actNr;
            document.getElementById('W3WRCD').value = message.data.arbkd;
            document.getElementById('W3CUAM').value = message.data.amount

            document.getElementById('W3CUAM').focus();

            document.getElementById('Next').click();

            console.log(message);

            break;
        default:
            console.log("Message id not handeled (" + message.id + ")");
    }
});
