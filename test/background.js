chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.message == "import") {
        rows = request.data; // use the data

        m_rows = rows;
        m_completed = false;
        m_index = 0;

        console.log(m_rows);

        console.log("import request");
        // for (var i = 0; i < rows.length; i++) {

        sendResponse({ response: "imported" });

        //     sleep(100);
        // }

        sendNext();


    }

    if (request.message == "filled") {
        sleep(1000);

        if(request.data == m_index)
        {
            m_index++;
        }

        if (m_index < m_rows.length) {
            sendNext();
        }

        sendResponse({ response: "next sent" });
        console.log("filled request")
    }
});


var m_completed = true;
var m_rows;
var m_index = 0;

function sendNext() {
    console.log("sending next index: " + m_index);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: "fillForm", data: m_rows[m_index], index: m_index }, function (response) {
            console.log(response.response);
        });
    });
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
}