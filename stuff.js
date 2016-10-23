var creds = {
	first: "Rishi",
	last: "Masand",
	email: "darthanakin44@gmail.com",
	address: "22 Adams Street",
	number: "7329128003"
};

window.onbeforeunload = function (e) {
	
	var source = document.getElementsByTagName('html')[0].innerHTML;

	var firstCount = (source.match(/Rishi/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf("Rishi") != -1){
				firstCount++;
			}
		}
	}

	var lastCount = (source.match(/Masand/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf("Masand") != -1){
				lastCount++;
			}
		}
	}

	var emailCount = (source.match(/darthanakin44@gmail.com/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf("darthanakin44@gmail.com") != -1){
				emailCount++;
			}
		}
	}

	var addressCount = (source.match(/22 Adams Street/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf("22 Adams Street") != -1){
				addressCount++;
			}
		}
	}

	var numberCount = (source.match(/7329128003/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf("7329128003") != -1){
				numberCount++;
			}
		}
	}

	var d = new Date();

	chrome.runtime.sendMessage({
	    method: 'GET',
	    action: 'xhttp',
	    url: 'http://9e42b091.ngrok.io/?url=' + firstCount + "%20" + lastCount + "%20" + emailCount + "%20" + addressCount + "%20" + numberCount + "%20" + window.location.hostname + "%20" + d.getTime(),
	    data: ""
	}, function(responseText) {
	    
	});

};