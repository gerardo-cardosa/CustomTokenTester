var element = document.querySelector("#greeting");
element.innerText = "Custom Token Generator";

var isUIEnabld = false;
var isServerEnabled = false;

$(document).ready(function(){
	setStates();

});

function setStates()
{

	if(firebase.apps.length > 0)
	{
		$('#UIState').addClass('bg-success');
		$('#UIState').removeClass('bg-danger');
		$('#UIState').html('Yes :)');
	}
	else{
		$('#UIState').addClass('bg-danger');
		$('#UIState').removeClass('bg-success');
		$('#UIState').html('No!!!');
	}
	
	$.get("isFirebaseEnabled")
   	 .done(function(data){
	  console.log(data);
	  if(data == true){
		$('#ServerState').addClass('bg-success');
		$('#ServerState').removeClass('bg-danger');
		$('#ServerState').html('Yes :)');
		}
	  else{
		$('#ServerState').addClass('bg-danger');
		$('#ServerState').removeClass('bg-success');
		$('#ServerState').html('No!!!');
	}
   	});

}

function initializeUI()
{
  
  //validate that it is not empty
  
  var text = $('#webCreds').val();
  
  eval(text);
  
  $('#dbURL').val(config.databaseURL)

  console.log(config)
  
  firebase.initializeApp(config);
	isUIEnabld = true;
  setStates();
  


  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    	$('#fire_uid').html(user.uid);
	$('#refresh_token').html(user.refreshToken)
    }
    else{
	$('#fire_uid').html('');
    }
  });
  
}

function initializeServer()
{

  var serviceAccount = JSON.parse($('#serverCreds').val())
  var dbURL = $('#dbURL').val();

  var data = { serviceAccount : serviceAccount, dbURL: dbURL};

  //validation

  $.post("setServer", data)
   .done(function(data){
	  console.log(data);
	  isServerEnabled = true;
          setStates();
   });
}


function getCustomtoken()
{
	var uid = $('#uid').val();

	var claims = JSON.parse('{'+$('#extraClaims').val()+'}');

        var data= {uid: uid, claims: claims};
  
   	//validation

	$.post("getCT",data)
	 .done(function(data){
		console.log(data)
		setCT(data.message);
		firebaseAuthWithCT(data.message);	
	})
}

function setCT(ct)
{
	var jwt = ct.split('.');
	$('#headers').html(jwt[0]);
	$('#claims').html(jwt[1]);
	$('#claims_decoded').html(window.atob(jwt[1]));
	$('#key').html(jwt[2]);
}

function firebaseAuthWithCT(jwt)
{
	firebase.auth().signInWithCustomToken(jwt)
		.then(function(result){
			console.log(result)
		})
		.catch(function(error){
			console.log(error)
		});

}

function signOut()
{
  firebase.auth().signOut().then(function() {
  // Sign-out successful.
	$('#refresh_token').html('');
	$('#headers').html('');
	$('#claims').html('');
	$('#claims_decoded').html('');
	$('#key').html('');
}, function(error) {
  // An error happened.
});
}


/*
    var config = {
    apiKey: "AIzaSyDIIbaSJ8L8mwyxGUozLrSGf1JVLdEjCP0",
    authDomain: "jerrycustomtoken.firebaseapp.com",
    databaseURL: "https://jerrycustomtoken.firebaseio.com",
    storageBucket: "jerrycustomtoken.appspot.com",
    messagingSenderId: "691184102807"
  };




{
  "type": "service_account",
  "project_id": "jerrycustomtoken",
  "private_key_id": "694c2cc9896d48df086b28920a9a5bd28da4ea4c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDf6tF7zdoKLMSv\nM0Pq6DrzJfBDJaGrwfPXUiZl8s23D5v3tu08Hn7mA6jU3Tvjj6LElB5/XYnq+60I\nVdnnil6VwbuliSahjOFEjV0ygcUacqMxkpqB2v4h0FzOIgb9wUDJt6KBKgr5n36+\nGytB+sr1r4hICIwwX5qDdLlUN1+n7sFgCHxC1u4OxbZ0s5P47XGE8V0a11LhI/5x\nD5whwhLpvzZjRYfXDv2a4w3UtDgNKgWwx0+t5O8tUzaiw8Wg2uzupsLyLQ588nUx\nMbCFn5gQZggrUvRzPmffRoREChAtbpmrtBBxxYetXQhSbcMQMD6YN0FXoJB8HcXS\nCjjKzw0pAgMBAAECggEBAKQT9nMI8agZC/rxzufYSjIX78nUTnaEhgCXAuoblGB7\nAKfxFD/EfOphbhqlDph+jSANBZgA2+ojh7Se7DC9dPe54Z24NWWVzRAlolA7RUpP\nDIRrz+otpaDzhL3Ls2HIdYgaluqc+zPVitMVJ4qOkqCbgnp+QPPFany/UHqEpQRx\nEUzl8owtG6Cv/HYg1rbycJk0IDk0KOpf68cHHBFVvn6wIw/j8i4lzROqEvVQcaDm\n+MU18giw7v11NFdc9qy0wxP2wjYi4Z1cw6vWNQBTvHvXnpMuD0NnG8RCU15PA2F+\no4VanWCVGsQNnOYQxviioeJmF4389ydTgkOpBN4o310CgYEA+/Wd4/7DDJBT0kCD\nMyg+9vh/twTDiaczaymU4Pv2NjKWZVXMke9e2zx2CF23cO/oikbyj0FjutlPzQDw\nzCrdDHX8WtSdeyGDjIO6SYJdjKzIXPKCfRLFu34GZMLGFAhOyUaOUsYaj7XJgMot\nq0EQ7QQuGTXiyy9RWhcYgYsieesCgYEA44IUEYu7AdOBPkcFYYZ57ii7skPrgYu7\nEyYdW0rjjvKgUWmNDqZm7kjfaqK1VGTh3D2efQShGwFAf8SQLJyKpH2qsu764VRE\nQzJEdltw7gC2oXJEHX37CATz8APV7AhetNyWkBzZL0MuQshrLnZyattNlpXKIcxR\nYMI0BcaF3DsCgYAU/MGZIzh2DHOe+Na05S5RfiONSC1Ngwrqaz1GfFZm71HNwRbY\nNRsuodunGL9V/fXdxskfm6/F+aIHDoQATbW5+v35RuqTPhhqFPLoep52QFI0Q9MQ\nvgaQdo/rxrmfI44EgAcM6AmAXQEa5DxnnnTdeVKpsO5iRF+/ZFsbN0643wKBgCWa\nSlbcEXyryKDSfEEySNTkRqGgODyhK7pugkukhRgLYhQSrg3N0xVvVf36Bp58Thho\n1tky+q3L9y0m/+1fskqduqj4dt7nXqD8nfQyCOhNleH5UOjO+b7JksgI2kK4325l\nRz1qhzsYj3zaQ1zalu6ycJCDEXWkn46uioqp1VYhAoGBAMyJ2IMPZLp2viqZ1Lo0\nWth2PI1+/qNo1JpYAo6zhGWMqi+cyUkOT7ZIDNyBgx48jN5ueF+egBpfyd4NVjuK\nMYSK/JmPS7Hung/Sb79m1AWT/d56rJbwb3iEMPQDUCT5uOEgs6t9+yFuCHpP9ilg\nYmrzxi8BZNUgcoVlred+5Yk/\n-----END PRIVATE KEY-----\n",
  "client_email": "jerrycustomtoken@jerrycustomtoken.iam.gserviceaccount.com",
  "client_id": "107663800422752428092",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/jerrycustomtoken%40jerrycustomtoken.iam.gserviceaccount.com"
}

*/