var creds = {
	first: "",
	last: "",
	email: "",
	address: "",
	number: ""
};

window.onbeforeunload = function (e) {
	
	var source = document.getElementsByTagName('html')[0].innerHTML;

	var firstCount = (source.match(/creds.first/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf(creds.first) != -1){
				firstCount++;
			}
		}
	}

	var lastCount = (source.match(/creds.last/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf(credis.last) != -1){
				lastCount++;
			}
		}
	}

	var emailCount = (source.match(/creds.email/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf(creds.email) != -1){
				emailCount++;
			}
		}
	}

	var addressCount = (source.match(/creds.address/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf(creds.address) != -1){
				addressCount++;
			}
		}
	}

	var numberCount = (source.match(/creds.number/g) || []).length;

	var textInputs = document.querySelectorAll('input');
	for (var i = 0; i < textInputs.length; i++){
		if (textInputs[i].length > 0){
			if (textInputs[i].indexOf(creds.number) != -1){
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