import firebase from 'firebase/compat/app';
// Bundle SDK's to main js bundle
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyBOMEF8KUXccMTfkaqTWHPL11IpzHOAY9U',
	authDomain: 'nextblog-55a1c.firebaseapp.com',
	projectId: 'nextblog-55a1c',
	storageBucket: 'nextblog-55a1c.appspot.com',
	messagingSenderId: '244329084757',
	appId: '1:244329084757:web:c1c33159ae5bd64788e1dc',
};

// Initialize Firebase
if (firebase.app.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth: any = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();
