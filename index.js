var app = require("express")();
var http = require("http").Server(app);
var mongojs = require('mongojs');
var twilio = require('twilio');
var bodyParser = require('body-parser');

var client = new twilio.RestClient('AC1855c5ea38c7b8de45e1ce3d85e2caf7','acd884dff899531302bdbd4767b9300e');

app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

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
});

app.get("/smsReply", function(req, res){
	var body = req.query.Body.toLowerCase();
	if (body.indexOf("get footprint for last ") != -1){
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
			client.sendSms({
				to: req.query.From,
				from: '+17324918329',
				body: "Footprint for " + timeSpan + ": " + "\nFirst Name: " + fC + ", " + "\nLast Name: " + lC + ", " + "\nEmail Adress: " + eC + ", "
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
		});

	}
});

http.listen(8080, function(){
  console.log("Listening on *:8080");
});
