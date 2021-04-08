import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBZli4BGbjICIvNRj_AwGlxPWGiZFHjC4E",
    authDomain: "ip3-online-teaching-platform.firebaseapp.com",
    projectId: "ip3-online-teaching-platform",
    storageBucket: "ip3-online-teaching-platform.appspot.com",
    messagingSenderId: "633587751477",
    appId: "1:633587751477:web:9d0256e4b4e6ff6965ef7c",
    measurementId: "G-GJVYJJMM4M"
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();