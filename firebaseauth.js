// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { getFirestore, setDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC69qWMr0nCba-MLntRGXuLIDlqKv9qeGw",
    authDomain: "login-form-6d15a.firebaseapp.com",
    projectId: "login-form-6d15a",
    storageBucket: "login-form-6d15a.firebasestorage.app",
    messagingSenderId: "832841860945",
    appId: "1:832841860945:web:326ac6bd95f9721dd6b570"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
function showMessage(message, divId) {
  var messageDiv=document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
        messageDiv.style.opacity = 0;

    }, 5000);
}
const signUp = document.getElementById('submitSignUp')
signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('rEmail').value;
    const password = document.getElementById('rPassword').value;
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;

    const auth = getAuth();
    const db = getFirestore();
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userDate = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };
            showMessage('Account Created Successfully', 'signUpMessage');
            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'index.html';
                })
                .catch((error) => {
                    console.error("error writing document", error);

                });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == 'auth/email-already-in-use') {
                showMessage('Email Address Already Exists !!!', 'signUpMessage');
            }
            else {
                showMessage('unable to create user', 'signUpMessage');

            }
        })
});

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click',(event)=>{
    event.preventDefault();

    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();
    
    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMwssage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='homepage.html';
    
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/invalid-credential'){
            showMessage('incorrect Email or Password','signInMessage')
        } 
        else{
            showMessage('Account does not Exist','signInMessage');
        }
    })
})