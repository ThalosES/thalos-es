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

const popup = document.getElementById("popup");
const closeBtn = document.getElementById("popup-close-btn");

closeBtn.addEventListener("click", function () {
  // Close the popup with a smooth transition
  popup.classList.remove("active");
});
const emailForm = document.getElementById("emailForm");

// Get the existing CTA button
const ctaButton = document.getElementById("horus-pop-up");

ctaButton.addEventListener("click", function (e) {
  // Prevent the default link behavior
  e.preventDefault();

  // Show the popup with a smooth transition
  popup.classList.add("active");
});

// Attach a click event listener to the CTA button
ctaButton.addEventListener("click", function (e) {
  // Prevent the default link behavior
  e.preventDefault();

  // Show the popup
  popup.style.display = "block";
});

emailForm.addEventListener("submit", function (e) {
  // Prevent the form from submitting in the traditional way
  e.preventDefault();

  // Get the entered email value
  const userEmail = document.getElementById("email").value;

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(userEmail)) {
    // If the email is valid, store it in Firebase
    addEmailToFirestore(userEmail)
      .then(function (success) {
        const urlToOpen = "https://t.me/horus_vbot";

        // Open the URL in a new tab
        if (success) {window.open(urlToOpen, "_blank");
        popup.classList.remove("active");
      }
        // Redirect the user to the specified link
        // window.location.href = "https://t.me/horus_vbot";
      })
      .catch(function (error) {
        console.error("Error adding email to Firebase:", error);
      });
  } else {
    // If the email is not valid, you can display an error message or take other actions
    alert("Please enter a valid email address.");
  }
});

export async function addEmailToFirestore(email) {
  const mailsRef = collection(db, "mails");
  try {
    // Add the email and timestamp to the 'userEmails' collection
    const docRef = await addDoc(mailsRef, {
      email,
      timestamp: serverTimestamp(),
    });

    console.log("Email stored in Firestore with ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Error adding email to Firestore:", error);
    return false;
  }
}
