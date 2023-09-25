import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
const firebaseConfig = {
	apiKey: "AIzaSyBU7sybqtv-Jrf6r4BonN5WKE0dHaxcyaM",
	authDomain: "boutique-db-4f7b1.firebaseapp.com",
	projectId: "boutique-db-4f7b1",
	storageBucket: "boutique-db-4f7b1.appspot.com",
	messagingSenderId: "13244862034",
	appId: "1:13244862034:web:f9afce8ae47f42313dd98b",
	measurementId: "G-4288JWPN0G",
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot.exists());
	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (error) {
			console.log("there was an error:", error.messge);
		}
	}
	return userDocRef;

	//if user data does not exist
	//create /set document with data from userAuth  in collection
	// if user doc exists
	// return userDocRef
};
