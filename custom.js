var express = require('express');
var open = require('open');

var app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile( __dirname + "/" + "index.htm" );
})


/*
	TODO

	1.- Function that receives the JSON file and initialices Firebase
	2.- Function that Creates the Custom Token and returns it.
	3.- Function that receives every credential separated and uses JWT library to create the custom token
	4.- Function that creates a custom token using the JWT library (similar to a 3rd pary app)
	
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
