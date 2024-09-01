// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { App } from 'vue';
import { VueFire, VueFireAuth } from 'vuefire';
import { getDatabase } from 'firebase/database';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};
// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);

export const setupFirebase = (app: App<Element>) => {
	app.use(VueFire, {
		// imported above but could also just be created here
		firebaseApp,
		modules: [
			// we will see other modules later on
			VueFireAuth(),
		],
	});
};

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(firebaseApp);