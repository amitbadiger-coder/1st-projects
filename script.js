
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  import { getDatabase ,ref,set,get,child } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAPIO7eHTT6DyZ_qqYr8Xu7t5gR82ArluU",
    authDomain: "loginpagebyamit.firebaseapp.com",
    projectId: "loginpagebyamit",
    storageBucket: "loginpagebyamit.appspot.com",
    messagingSenderId: "66163139075",
    appId: "1:66163139075:web:4025420376542c9c2ca436"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);
  document.getElementById("submit").addEventListener('click', function(e){
    e.preventDefault();
    set(ref(db , 'user/' + document.getElementById("username").value),{
        username: document.getElementById("username").value,
        email:document.getElementById("email").value,
        phoneNumber:document.getElementById("phoneNumber").value,
    });

    alert("login successfull!");
  })