import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

 var firebaseConfig = {
  apiKey: "AIzaSyBZXbsFcP_tOvGattasggeXANJHpj8YI7g",
  authDomain: "react-redux-project-4c5f4.firebaseapp.com",
  databaseURL: "https://react-redux-project-4c5f4.firebaseio.com",
  projectId: "react-redux-project-4c5f4",
  storageBucket: "react-redux-project-4c5f4.appspot.com",
  messagingSenderId: "476445989311",
  appId: "1:476445989311:web:d4f1deccdb8b2deb"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 