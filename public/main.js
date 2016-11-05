var element = document.querySelector("#greeting");
element.innerText = "Hello, world!";


function initializeFirebase(config)
{
  
  firebase.initializeApp(config);
}