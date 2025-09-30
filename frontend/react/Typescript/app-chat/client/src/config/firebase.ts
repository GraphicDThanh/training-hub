import * as firebase from 'firebase';
import ReduxSagaFirebase from 'redux-saga-firebase'

const config = {
  apiKey: process.env.REACT_APP_DEV_API_KEY,
  authDomain:process.env.REACT_APP_DEV_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DEV_DATABASE_URL,
  projectId: process.env.REACT_APP_DEV_PROJECT_ID,
  storageBucket: process.env.REACT_APP_DEV_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_DEV_MESSAGING_SENDER_ID,
};

const myFirebaseApp = firebase.initializeApp(config);

export const reduxSagaFirebase = new ReduxSagaFirebase(myFirebaseApp);
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
