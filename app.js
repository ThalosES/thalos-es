// Import the functions you need from the SDKs you need
import {
  initializeApp,
  getApp,
  getApps,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  serverTimestamp,
  collection,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw_nr7lO54gq5GwY4Ll_BI7h7axDkFrBM",
  authDomain: "thalos-e4785.firebaseapp.com",
  projectId: "thalos-e4785",
  storageBucket: "thalos-e4785.appspot.com",
  messagingSenderId: "751955846437",
  appId: "1:751955846437:web:e3a91746b219feac50e6cc"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 250) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

const buttonElement = document.querySelector("project-img");

buttonElement.addEventListener("click", () => {
  window.location.href = "https://t.me/horus_vbot";
});
