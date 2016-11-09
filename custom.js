var express = require('express');
var open = require('open');
var admin = require("firebase-admin");

var app = express();
var bodyParser = require('body-parser');
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})


app.get('/isFirebaseEnabled', function (req, res) {
   res.send( admin.apps.length > 0 );
})


/**** This function initialices the server ******/
app.post('/setServer', function(req, res){

console.log(req.body);	
	var serviceAccount = req.body.serviceAccount;
	var dbURL = req.body.dbURL;	
	
	var response = {code:200, message:'Server Initialized'}
	
	admin.initializeApp({
	  credential: admin.credential.cert(serviceAccount),
	  databaseURL: dbURL
	});
	
	
	res.json(response);
	
});

/** This function returns a custom token **/
app.post('/getCT', function(req, res){

	var uid = req.body.uid;
	var claims = req.body.claims;
	var response = {code:'', message:''}

	admin.auth().createCustomToken(uid, claims)
	.then(function(cT){
		response.code = 200;
		response.message = cT;
		console.log('New Custom Token: ' + cT)
		res.json(response);
	})
	.catch(function(error){
	
	  response.code = 500;
	  response.message = error.message;
	
	  res.status(500).json(response);
	});
});

/*
	TODO

	1.- Function that receives the JSON file and initialices Firebase -- Done
	2.- Function that Creates the Custom Token and returns it. -- Done
	3.- Function that receives every credential separated and uses JWT library to create the custom token -- Done
	4.- Function that creates a custom token using the JWT library (similar to a 3rd pary app) -- Not Done
	
/*



//****************** Example on how to make get endpoints ********///
app.get('/list_user', function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})


//***************** Example on how to make post endpoints ********///
/*app.post('/process_post', urlencodedParser, function (req, res) {
   // Prepare output in JSON format
   response = {
      first_name:req.body.first_name,
      last_name:req.body.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})
*/


/******************* Main ***************************************/
/*
This is the part that initializes the server at port 8081 and opens the new tab in the browser
*/
var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
	
   open('http://localhost:'+port);
})
