import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC8Yi6jarHdVaGs9bkwZhfPvQ_do0eZvuE",
    authDomain: "directed-radius-140921.firebaseapp.com",
    projectId: "directed-radius-140921",
    storageBucket: "directed-radius-140921.appspot.com",
    messagingSenderId: "866569999379",
    appId: "1:866569999379:web:5fb234f0b59c777c6e1be6"
  };

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
export const auth = getAuth(firebaseApp);

auth.onIdTokenChanged(async (user) => {
    console.log('onIdTokenChanged: ', user);
    if (user) {
        localStorage.setItem('9asset_token', await user.getIdToken());
    } else {
        localStorage.removeItem('9asset_token');
    }
});
export default firebaseApp;