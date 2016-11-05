var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";


function initializeUI()
{
  
  //validate that it is not empty
  
  var text = $('#webCreds').val();
  
  var config = eval(text)
  
  firebase.initializeApp(config);
}