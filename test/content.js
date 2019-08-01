chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "chooseFile") {
        /* Creates an `input[type="file]` */
        var fileChooser = document.createElement('input');
        fileChooser.type = 'file';

        fileChooser.addEventListener('change', function () {
            console.log("file change");
            var file = fileChooser.files[0];

            var reader = new FileReader();
            reader.onload = function () {
                var data = reader.result;
                rows = JSON.parse(data);

                // for(var i = 0; i < rows.length; i++)
                // {
                //     document.getElementById('W3DAYN').value = rows[i].day;
                //     document.getElementById('W3PROJ').value = rows[i].projNr;
                //     document.getElementById('W3ELNO').value = rows[i].actNr;
                //     document.getElementById('W3WRCD').value = rows[i].arbkd;
                //     document.getElementById('W3CUAM').value = rows[i].amount;

                //     document.getElementById('Next').click();

                //     sleep(100);
                // }






                // // now send the message to the background
                chrome.runtime.sendMessage({ message: "import", data: rows }, function (response) {
                    console.log(response.response);
                });
            };
            reader.readAsText(file);
            form.reset();   // <-- Resets the input so we do get a `change` event,
            //     even if the user chooses the same file
        });

        /* Wrap it in a form for resetting */
        var form = document.createElement('form');
        form.appendChild(fileChooser);

        fileChooser.click();
        sendResponse({ response: "fileChooser clicked" });
    }

    if (request.message == "fillForm") {

        sendResponse({ response: "fillform recieved" })
        row = request.data;

        document.getElementById('W3DAYN').value = row.day;
        document.getElementById('W3PROJ').value = row.projNr;
        document.getElementById('W3ELNO').value = row.actNr;
        document.getElementById('W3WRCD').value = row.arbkd;
        document.getElementById('W3CUAM').value = row.amount;

        document.getElementById('W3CUAM').focus();

        document.getElementById('Next').click();
        // document.getElementById('W3CUAM').dispatchEvent(new KeyboardEvent('keypress', {
        //     code: 'Enter',
        //     key: 'Enter',
        //     charKode: 13,
        //     keyCode: 13,
        // }))

        chrome.runtime.sendMessage({ message: "filled", data: request.index }, function (response) {
            console.log(response.response);
        });
    }

});

