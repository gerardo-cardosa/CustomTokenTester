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

