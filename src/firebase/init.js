/* eslint-disable no-unused-vars */
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDFVRnT34epHKiuknnJQ3bubWHgsnslbI8",
    authDomain: "foody-12657.firebaseapp.com",
    databaseURL: "https://foody-12657.firebaseio.com",
    projectId: "foody-12657",
    storageBucket: "foody-12657.appspot.com",
    messagingSenderId: "914677528768"
  };
const firebaseApp = firebase.initializeApp(config);

//Remove Wraning
firebaseApp.firestore().settings({timestampsInSnapshots: true})

//Export firestore
export default firebaseApp.firestore();