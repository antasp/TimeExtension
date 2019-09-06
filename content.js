chrome.runtime.onMessage.addListener(function (message, callback) {
    switch (message.id) {
        case "fill":

                let row = {
                    day: "1",
                    projNr : "p3224",
                    actNr: "21",
                    arbkd: "1",
                    amount: "1000"
                }

                document.getElementById('W3DAYN').value = row.day;
                document.getElementById('W3PROJ').value = row.projNr;
                document.getElementById('W3ELNO').value = row.actNr;
                document.getElementById('W3WRCD').value = row.arbkd;
                document.getElementById('W3CUAM').value = row.amount
        
                document.getElementById('W3CUAM').focus();
        
                document.getElementById('Next').click();

            console.log(message);

            break;
        default:
            console.log("Message id not handeled (" + message.id + ")");
    }
});