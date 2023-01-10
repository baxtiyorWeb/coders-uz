import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithRedirect,
  signInWithPopup,
  signOut,
  signInAnonymously,
  onAuthStateChanged,
  linkWithCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import {
  getDatabase,
  set,
  ref,
  update
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
window.addEventListener("DOMContentLoaded", () => {
  // selectors

  let register_box = document.querySelector(".register .register-box");
  let register_btn = document.querySelector(".register-btn");
  let fixed_window = document.querySelector(".fixed-window");

  // selector input
  let username = document.querySelector("#full_name_input").value;
  let email = document.querySelector("#email_input").value;
  let password = document.querySelector("#password_input").value;
  //  selector buttons  //
  let sign_up_btn = document.querySelector("#sign_up_btn");
  let register_google = document.querySelector(".register-google");
  let register_facebook = document.querySelector(".register-facebook");
  let register_github = document.querySelector(".register-github");
  // selectors
  register_btn.addEventListener("click", function () {
    if (register_box.classList.contains("register-box")) {
      register_box.classList.toggle("show");
      console.log("hide");
      fixed_window.classList.add("fixed-window-show");
      fixed_window.addEventListener("click", function () {
        register_box.classList.remove("show");
        fixed_window.classList.remove("fixed-window-show");
      });
    }
  });

  // project tools link

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

  // initializy app

  const app = initializeApp(firebaseConfig);
  const provider = new GoogleAuthProvider();

  const auth = getAuth(app);
  const database = getDatabase(app);
  const token = getAuth(app);

  // sign in google

  function signInGoogle() {
    signInWithRedirect(auth, provider);

    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  // sign out google

  function signOut() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("sign out");
      })
      .catch((error) => {
        alert(error);
      });
  }

  //  sign in with facebook

  function signInWithFacebook() {}

  //  sign in With GitHub

  function signInWithGitHub() {}

  // signInWithEmailAndPassword func

  function signInWithEmailAndPasswordFunc() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        // let username = document.querySelector('#signusername')
        alert("Login gmail");
        const dr = new Date();
        update(ref(database, "users/" + user.uid), {
          last_login: dr,
          email: email,
          password: password
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(error);
      });
  }
  // sign up

  function sign_up() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        email: email.value;
        password: password.value;
        alert("success");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        // ..
        // 91 233 63 07
      });
  }

  // get User info
  let img_user = document.querySelector("img");
  img_user.style.display = "none";
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
        const uid = user.uid;
        span_email.innerHTML = user.email;
        let login_btn = document.querySelector("#register-btn");
        register_btn.style.display = "none";
        // ...
        if (user !== null) {
          user.providerData.forEach((profile) => {
            // let a_href = document.createElement("a");
            // img_class.append(a_href);
            // a_href.append(img_user);
            // a_href.setAttribute("href", "./user-page.html");
            img_user.setAttribute("src", `${user.photoURL}`);
            if (user.photoURL || user.email) {
              img_user.style.display = "block";
              register_btn.style.display = "none";
              span_email.style.color = "white";
              username_span.style.color = "white";
              span_email.style.display = "none";
              username_span.innerHTML = user.displayName;
              let icons = document.querySelector(".icons");
              icons.classList.add("icons_flex");
              let lightMode = document.createElement("button");
              lightMode.innerHTML = "lightmode";
              lightMode.classList.add("ligh-modeBtn");
              let courseList = document.querySelectorAll(".courses_list");
              courseList.forEach((item) => {
                item.style.display = "block";
              });
              let information = document.querySelector(".information");
              img_user.addEventListener("click", function () {
                information.style.display = "block";
                information.append(lightMode);
                lightMode.addEventListener("click", function () {
                  lightMode.innerHTML = "lightmode";
                  localStorage.setItem("light-mode", "light-mode");
                });
              });
            }
          });
        }
        document.body.classList.add(`${localStorage.getItem("light-mode")}`);
      } else {
        // User is signed out
        // ...
      }
    });
  }
  GetUserInfo();

  register_google.addEventListener("click", signInGoogle);
  register_facebook.addEventListener("click", signInWithFacebook);
  register_facebook.addEventListener("click", signInWithGitHub);
  sign_up_btn.addEventListener("click", sign_up);
});
