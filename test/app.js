import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, updateDoc, doc, increment } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWDjvvb5ZIXDejiABYfuSZ-7g8-_9TPIw",
  authDomain: "amalgamator-c12fc.firebaseapp.com",
  projectId: "amalgamator-c12fc",
  storageBucket: "amalgamator-c12fc.firebasestorage.app",
  messagingSenderId: "276790521363",
  appId: "1:276790521363:web:774c82f5771f9e928a99e6",
  measurementId: "G-ESHLV554VT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sample subset of Roget's 1000 words
const terms = [
    "absence", "abundance", "acceptance", "action", "activity",
    "addition", "affection", "agreement", "air", "animal",
    "appearance", "approval", "art", "attempt", "attention"
];

// DOM elements
const appEl = document.getElementById('app');
const authSection = document.getElementById('authSection');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const termsSection = document.getElementById('termsSection');
const term1El = document.getElementById('term1');
const term2El = document.getElementById('term2');
const existingBtn = document.getElementById('existingBtn');
const notRelevantBtn = document.getElementById('notRelevantBtn');
const potentialBtn = document.getElementById('potentialBtn');
const potentialForm = document.getElementById('potentialForm');
const amalgamationNameInput = document.getElementById('amalgamationName');
const submitNameBtn = document.getElementById('submitNameBtn');
const existingAmalgamation = document.getElementById('existingAmalgamation');
const existingNameEl = document.getElementById('existingName');
const agreeBtn = document.getElementById('agreeBtn');
const disagreeBtn = document.getElementById('disagreeBtn');
const nextPairBtn = document.getElementById('nextPairBtn');

let currentTerms = [];
let currentUser = null;

// Generate a random pair of terms
function generatePair() {
    const term1 = terms[Math.floor(Math.random() * terms.length)];
    let term2 = terms[Math.floor(Math.random() * terms.length)];
    while (term2 === term1) {
        term2 = terms[Math.floor(Math.random() * terms.length)];
    }
    return [term1, term2];
}

// Fetch existing amalgamations from Firestore
async function getAmalgamations() {
    const querySnapshot = await getDocs(collection(db, "amalgamations"));
    const amalgamations = {};
    querySnapshot.forEach((doc) => {
        amalgamations[doc.id] = doc.data();
    });
    return amalgamations;
}

// Display a new pair or an existing amalgamation
async function displayNewPair() {
    if (!currentUser) return;

    // Reset UI
    potentialForm.classList.add('hidden');
    existingAmalgamation.classList.add('hidden');
    amalgamationNameInput.value = '';

    // 20% chance to show an existing amalgamation if available
    const amalgamations = await getAmalgamations();
    const existingKeys = Object.keys(amalgamations);
    if (existingKeys.length > 0 && Math.random() < 0.2) {
        const key = existingKeys[Math.floor(Math.random() * existingKeys.length)];
        const [t1, t2] = amalgamations[key].terms;
        currentTerms = [t1, t2];
        term1El.textContent = t1;
        term2El.textContent = t2;
        existingNameEl.textContent = amalgamations[key].name;
        existingAmalgamation.classList.remove('hidden');
    } else {
        currentTerms = generatePair();
        term1El.textContent = currentTerms[0];
        term2El.textContent = currentTerms[1];
    }
}

// Handle Google login
loginBtn.addEventListener('click', async () => {
    const provider = new GoogleAuthProvider();
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Error during login:", error);
    }
});

// Handle logout
logoutBtn.addEventListener('click', async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error during logout:", error);
    }
});

// Auth state listener
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (user) {
        // User is signed in
        authSection.classList.add('hidden');
        termsSection.classList.remove('hidden');
        userInfo.textContent = `Welcome, ${user.displayName}`;
        userInfo.classList.remove('hidden');
        logoutBtn.classList.remove('hidden');
        displayNewPair();
    } else {
        // No user is signed in
        authSection.classList.remove('hidden');
        termsSection.classList.add('hidden');
        userInfo.classList.add('hidden');
        logoutBtn.classList.add('hidden');
    }
});

// Button event listeners
existingBtn.addEventListener('click', async () => {
    if (!currentUser) return;
    console.log(`Existing Connection: ${currentTerms.join(' + ')}`);
    await addDoc(collection(db, "userActions"), {
        userId: currentUser.uid,
        terms: currentTerms,
        action: "existing",
        timestamp: new Date()
    });
    displayNewPair();
});

notRelevantBtn.addEventListener('click', async () => {
    if (!currentUser) return;
    console.log(`Not Relevant: ${currentTerms.join(' + ')}`);
    await addDoc(collection(db, "userActions"), {
        userId: currentUser.uid,
        terms: currentTerms,
        action: "notRelevant",
        timestamp: new Date()
    });
    displayNewPair();
});

potentialBtn.addEventListener('click', () => {
    if (!currentUser) return;
    potentialForm.classList.remove('hidden');
});

submitNameBtn.addEventListener('click', async () => {
    if (!currentUser) return;
    const name = amalgamationNameInput.value.trim();
    if (name) {
        await addDoc(collection(db, "amalgamations"), {
            terms: currentTerms,
            name,
            userId: currentUser.uid,
            agrees: 0,
            disagrees: 0,
            timestamp: new Date()
        });
        console.log(`Named Amalgamation: ${currentTerms.join(' + ')} -> ${name}`);
        await addDoc(collection(db, "userActions"), {
            userId: currentUser.uid,
            terms: currentTerms,
            action: "named",
            name,
            timestamp: new Date()
        });
        displayNewPair();
    }
});

agreeBtn.addEventListener('click', async () => {
    if (!currentUser) return;
    const key = currentTerms.join('|');
    const querySnapshot = await getDocs(collection(db, "amalgamations"));
    let docId = null;
    querySnapshot.forEach((doc) => {
        if (doc.data().terms.join('|') === key) {
            docId = doc.id;
        }
    });
    if (docId) {
        const docRef = doc(db, "amalgamations", docId);
        await updateDoc(docRef, { agrees: increment(1) });
        console.log(`Agreed with: ${existingNameEl.textContent}`);
        await addDoc(collection(db, "userActions"), {
            userId: currentUser.uid,
            terms: currentTerms,
            action: "agree",
            timestamp: new Date()
        });
        displayNewPair();
    }
});

disagreeBtn.addEventListener('click', async () => {
    if (!currentUser) return;
    const key = currentTerms.join('|');
    const querySnapshot = await getDocs(collection(db, "amalgamations"));
    let docId = null;
    querySnapshot.forEach((doc) => {
        if (doc.data().terms.join('|') === key) {
            docId = doc.id;
        }
    });
    if (docId) {
        const docRef = doc(db, "amalgamations", docId);
        await updateDoc(docRef, { disagrees: increment(1) });
        console.log(`Disagreed with: ${existingNameEl.textContent}`);
        await addDoc(collection(db, "userActions"), {
            userId: currentUser.uid,
            terms: currentTerms,
            action: "disagree",
            timestamp: new Date()
        });
        displayNewPair();
    }
});

nextPairBtn.addEventListener('click', displayNewPair);
