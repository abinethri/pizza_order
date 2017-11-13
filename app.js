

/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');

var http = require('http');
var path = require('path');

var app = express();
var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;

//all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

//development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

app.post('/savedata', function(req, res){
	var collection;
	var black_olives_cnt = 0;
	var garlic_cnt = 0;
	var green_peppers_cnt = 0;
	var jalapeno_peppers_cnt = 0;
	var onions_cnt = 0;

	MongoClient.connect('mongodb://127.0.0.1:27017/pizza', function (err, db) {

		if (err) {
			res.send(err);
			throw err;
		} else {
			console.log("Successfully connected to the database");		    
		}


		collection = db.collection('pizzaorder');
		collection.insert({orderid:req.body.orderid,
			cheese: req.body.cheese, 
			sauce:req.body.sauce, 
			meat:req.body.meat, 
			nonmeat:req.body.non_meat}, function(err, docs) {
				if(err)
					console.log("Error executing insert operation");
			});

		// Fetch the # of records for each non-meat option
		collection.find({}, {nonmeat:1}).toArray(function(err, nonmeat_results) {

			for(var i = 0; i < nonmeat_results.length; ++i) {
				// Iterate over each row (IOW, each index is a row)
				var options = nonmeat_results[i]["nonmeat"];
				for(var j = 0; j < options.length; ++j) {
					if(options[j] == "Green Peppers") {
						++green_peppers_cnt;
					} else if(options[j] == "Jalapeno Peppers") {
						++jalapeno_peppers_cnt;
					} else if(options[j] == "Garlic") {
						++garlic_cnt;
					} else if(options[j] == "Black Olives") {
						++black_olives_cnt;
					} else if(options[j] == "Onions") {
						++onions_cnt;
					}
				}
			}
			var resp_dict = {"Black Olives": black_olives_cnt,
					"Garlic" : garlic_cnt,
					"Green Peppers" : green_peppers_cnt,
					"Jalapeno Peppers" : jalapeno_peppers_cnt,
					"Onions" : onions_cnt};
			db.close();
			var json_resp = JSON.stringify(resp_dict);
			res.contentType('json');
			res.send(json_resp);
		}
		);
	});
});

