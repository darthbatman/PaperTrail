var app = require("express")();
var http = require("http").Server(app);
var mongojs = require('mongojs');
var twilio = require('twilio');
var bodyParser = require('body-parser');
var google = require('google');
var fs = require('fs');
var Twit = require('twit');
var config = require('./config.js');
var request = require('request');

var client = new twilio.RestClient('AC1855c5ea38c7b8de45e1ce3d85e2caf7','acd884dff899531302bdbd4767b9300e');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

var goodWords = ["help", "community", "charity", "remediation", "power", "health", "love", "good", "society", "benefit", "beneficial"];
var badWords = ["follow", "view", "address", "email", "my"];

var footprintRating = 1000;

var db = mongojs('test', ['footprints']);
	
app.get("/", function(req, res){
  res.send("<h1>Paper Trail</h1>");
  console.log(req.query.url);
	db.footprints.save({firstCount: req.query.url.split(" ")[0], 
						lastCount: req.query.url.split(" ")[1], 
						emailCount: req.query.url.split(" ")[2], 
						addressCount: req.query.url.split(" ")[3], 
						numberCount: req.query.url.split(" ")[4],
						website: req.query.url.split(" ")[5],
						time: req.query.url.split(" ")[6]
	});
	if (parseInt(req.query.url.split(" ")[3]) > 0){
		
		request({ url: "http://api.reimaginebanking.com/accounts/580cad27360f81f10454505c/withdrawals?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "medium": "balance",
		  "transaction_date": "2016-08-07",
		  "amount": 10,
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			footprintRating -= 10;
			client.sendSms({
				to: '+17327427351',
				from: '+17324918329',
				body: "Digital Footprint Karma: " + footprintRating
			}, function (err, data) {
			console.log(err);
			});
		});
  			
	}
	if (parseInt(req.query.url.split(" ")[4]) > 0){
		request({ url: "http://api.reimaginebanking.com/accounts/580cad27360f81f10454505c/withdrawals?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "medium": "balance",
		  "transaction_date": "2016-08-07",
		  "amount": 10,
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			footprintRating -= 10;
			client.sendSms({
				to: '+17327427351',
				from: '+17324918329',
				body: "Digital Footprint Karma: " + footprintRating
			}, function (err, data) {
			console.log(err);
			});
		});
	}
	if (req.query.url.split(" ")[5].indexOf("github") != -1){
		request({ url: "http://api.reimaginebanking.com/accounts/580cad27360f81f10454505c/deposits?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "medium": "balance",
		  "transaction_date": "2016-08-07",
		  "amount": 10,
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			footprintRating += 10;
			client.sendSms({
				to: '+17327427351',
				from: '+17324918329',
				body: "Digital Footprint Karma: " + footprintRating
			}, function (err, data) {
			console.log(err);
			});
		});
	}
	else if (req.query.url.split(" ")[5].indexOf("devpost") != -1) {
		request({ url: "http://api.reimaginebanking.com/accounts/580cad27360f81f10454505c/deposits?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "medium": "balance",
		  "transaction_date": "2016-08-07",
		  "amount": 10,
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			footprintRating += 10;
			client.sendSms({
				to: '+17327427351',
				from: '+17324918329',
				body: "Digital Footprint Karma: " + footprintRating
			}, function (err, data) {
			console.log(err);
			});
		});
	}
	else if (req.query.url.split(" ")[5].indexOf("linkedin") != -1) {
		request({ url: "http://api.reimaginebanking.com/accounts/580cad27360f81f10454505c/deposits?key=f22e0b663e5763bc27e5a5b03f49999b", method: 'POST', json: {
		  "medium": "balance",
		  "transaction_date": "2016-08-07",
		  "amount": 10,
		  "status": "pending",
		  "description": "string"
		}}, function(err, res, body){
			footprintRating += 10;
			client.sendSms({
				to: '+17327427351',
				from: '+17324918329',
				body: "Digital Footprint Karma: " + footprintRating
			}, function (err, data) {
			console.log(err);
			});
		});
	}
});

app.get("/smsReply", function(req, res){
	var body = req.query.Body.toLowerCase();
	if (body.indexOf("get footprint for last ") != -1){

		var selectFootprint = undefined;

		if (body.split("get footprint for last ")[0].length > 2){
			selectFootprint = body.split("get footprint for last ")[0].toLowerCase();
			selectFootprint.substring(0, selectFootprint.length - 1);
		}
		
		var timeSpan = body.split("get footprint for last ")[1];
		var numTime = timeSpan.split(" ")[0];
		var units = timeSpan.split(" ")[1];

		var timeInMS = 0;
		if (units == "seconds"){
			timeInMS = parseInt(numTime) * 1000;
		}
		else if (units == "minutes"){
			timeInMS = parseInt(numTime) * 1000 * 60;
		}
		else if (units == "hours") {
			timeInMS = parseInt(numTime) * 1000 * 60 * 60;
		}

		var d = new Date();
		var currentTime = d.getTime();

		var fC = 0;
		var lC = 0;
		var eC = 0;
		var aC = 0;
		var nC = 0;
		var w = [];

		db.footprints.find(function (err, docs) {
			for (var i = 0; i < docs.length; i++){
				if (currentTime - docs[i].time < timeInMS){
					fC += parseInt(docs[i].firstCount);
					lC += parseInt(docs[i].lastCount);
					eC += parseInt(docs[i].emailCount);
					aC += parseInt(docs[i].addressCount);
					nC += parseInt(docs[i].numberCount);
					w.push(docs[i].website);
				}
			}
			if (selectFootprint){
				if (selectFootprint.indexOf("first name") != -1){
					client.sendSms({
						to: req.query.From,
						from: '+17324918329',
						body: "Footprint for " + timeSpan + ": " + "\nFirst Name: " + fC
					}, function (err, data) {
					console.log(err);
					});
				}
				else if (selectFootprint.indexOf("last name") != -1) {
					client.sendSms({
						to: req.query.From,
						from: '+17324918329',
						body: "Footprint for " + timeSpan + ": " + "\nLast Name: " + lC
					}, function (err, data) {
					console.log(err);
					});
				}
				else if (selectFootprint.indexOf("email address") != -1) {
					client.sendSms({
						to: req.query.From,
						from: '+17324918329',
						body: "Footprint for " + timeSpan + ": " + "\nEmail Address: " + eC
					}, function (err, data) {
					console.log(err);
					});
				}
				else if (selectFootprint.indexOf("home address") != -1) {
					client.sendSms({
						to: req.query.From,
						from: '+17324918329',
						body: "Footprint for " + timeSpan + ": " + "\nHome Address: " + aC
					}, function (err, data) {
					console.log(err);
					});
				}
				else if (selectFootprint.indexOf("phone number") != -1) {
					client.sendSms({
						to: req.query.From,
						from: '+17324918329',
						body: "Footprint for " + timeSpan + ": " + "\nPhone Number: " + nC
					}, function (err, data) {
					console.log(err);
					});
				}
			}
			else {
				client.sendSms({
					to: req.query.From,
					from: '+17324918329',
					body: "Footprint for " + timeSpan + ": " + "\nFirst Name: " + fC + ", " + "\nLast Name: " + lC + ", " + "\nEmail Address: " + eC + ", "
				}, function (err, data) {
					console.log(err);
					client.sendSms({
							to: req.query.From,
							from: '+17324918329',
							body: "Home Address: " + aC + ", " + "\nPhone Number: " + nC + ", " + "\nWebsites: " + w.filter(function(item, pos) { return w.indexOf(item) == pos;})
						}, function (err, data) {
							console.log(err);
						});
					});
				console.log("Footprint for " + timeSpan + ": " + fC + ", " + lC + ", " + eC + ", " + aC + ", " + nC + ", " + w.filter(function(item, pos) { return w.indexOf(item) == pos;}));
			}
		});
		
	}
	else if (body.indexOf("passive") != -1){
		google("Vedant" + " " + "Mehta", function (err, next, links){
			if (err) console.error(err);
			var resultLinks = next.links;
			for (var q = 0; q < resultLinks.length; q++){
				console.log(resultLinks[q].link);
				console.log(resultLinks[q].description.toLowerCase());
				for (var y = 0; y < goodWords.length; y++){
					if (resultLinks[q].description.toLowerCase().indexOf(goodWords[y]) != -1){
						footprintRating += 10;
					}
				}
				for (var y = 0; y < badWords.length; y++){
					if (resultLinks[q].description.toLowerCase().indexOf(badWords[y]) != -1){
						footprintRating -= 10;
					}
				}
			}
			console.log("Rating: " + footprintRating);
		});
	}
});

http.listen(8080, function(){
  console.log("Listening on *:8080");
});
