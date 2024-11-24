import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import { getFirestore, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
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

const auth=getAuth();
const db=getFirestore();


onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='index.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })