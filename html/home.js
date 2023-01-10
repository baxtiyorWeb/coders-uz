import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCVL36yg-PvtQ_tLSlGA174Ey7i8CbqJPg",
  authDomain: "development-b4986.firebaseapp.com",
  databaseURL: "https://development-b4986-default-rtdb.firebaseio.com",
  projectId: "development-b4986",
  storageBucket: "development-b4986.appspot.com",
  messagingSenderId: "635982697705",
  appId: "1:635982697705:web:50ac8db0fa690531e0cc78",
  measurementId: "G-1GDNV6NV6Q"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
let img_user = document.querySelector("img");
img_user.style.display = 'none'

function GetUserInfo() {
  const user = auth.currentUser;
  onAuthStateChanged(auth, (user) => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;
    }
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      let span_email = document.querySelector(".email_span");
      let username_span = document.querySelector(".username_span");
      let register = document.querySelector(".register-btn");
      const uid = user.uid;
      span_email.innerHTML = user.email;
      // ...
      if (user !== null) {
        user.providerData.forEach((profile) => {
          let a_href = document.createElement("a");
          let time = document.querySelector(".time");

          // img_class.append(a_href);
          // a_href.append(img_user);
          a_href.setAttribute("href", "./user-page.html");
          img_user.setAttribute("src", `${user.photoURL}`);
          if (user.photoURL) {
            img_user.style.display = 'block'
            span_email.style.color = "white";
            username_span.style.color = "white";
            span_email.style.display = "none";
            register.style.display = "none";
            username_span.innerHTML = user.displayName;
            let information = document.querySelector(".information");
            img_user.addEventListener("click", function () {
              information.style.display = "block";
            });
          } else {
            span_email.style.color = "white";
            username_span.style.color = "white";
            span_email.style.display = "none";
            register.style.display = "none";
          }
        });
      }
    } else {
      // User is signed out
      // ...
    }
  });
}
GetUserInfo();
