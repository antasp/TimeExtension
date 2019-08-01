document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener('click', function () {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {message: "chooseFile"}, function(response) {
                //console.log(response.response);
            });
        });
    });
});

// // handler for import button
// // sends a message to the content script to create the file input element and click it
// $('#import-button').click(function() {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//         chrome.tabs.sendMessage(tabs[0].id, {message: "chooseFile"}, function(response) {
//             console.log(response.response);
//         });
//     });
// });