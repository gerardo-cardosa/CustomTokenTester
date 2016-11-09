# CustomTokenTester
This is an app built with Node js to test Firebase custom tokes

Instalation:

Download the project, go to the folder and run the command "node custom.js"

Dependencies:
npm install -g firebase-admin --save
npm install express --save
npm install body-parser --save
npm install cookie-parser --save
npm install multer --save
npm install --save open


How to use:

-Add the configuration for Firebase and click the button to initialize the UI: 
var config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    storageBucket: "",
    messagingSenderId: ""
  };

-Add the service account for Firebase and click the button to initialize the Server: 
{
  "type": "service_account",
  "project_id": "",
  "private_key_id": "",
  "private_key": "-----BEGIN PRIVATE KEY-----\n-----END PRIVATE KEY-----\n",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": ""
}

-To create a new custom token, add a user id

-(Optional) To add extra claims you can add them separated by comma and using double quotation like:
 "Something":something,
 "Other":"Other"
