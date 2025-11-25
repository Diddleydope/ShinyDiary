import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAFO-pDyfe65OKhoUMiyqCHT9tArwGkLyQ',
	authDomain: 'shinydiary-91a6f.firebaseapp.com',
	projectId: 'shinydiary-91a6f',
	storageBucket: 'shinydiary-91a6f.appspot.com',
	messagingSenderId: '776903912155',
	appId: '1:776903912155:web:69e404f8ed672da9c0fafe',
	measurementId: 'G-M3TE3FHMF6'
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
