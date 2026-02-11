import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// --- Firebase Admin SDK Initialization ---
// Make sure your FIREBASE_SERVICE_ACCOUNT environment variable is set
// to the path of your Firebase Admin SDK service account key file.
function resolveCredential() {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (serviceAccountPath) {
        const contents = readFileSync(serviceAccountPath, 'utf-8');
        return cert(JSON.parse(contents));
    }
    // Fallback for environments like Google Cloud Functions where application default credentials are used
    return applicationDefault();
}

initializeApp({
    credential: resolveCredential(),
    // Assuming you have FIRESTORE_PROJECT set, or configured in the service account
    // For storageBucket, you might need to set process.env.FIREBASE_STORAGE_BUCKET if using Storage
});

const db = getFirestore();
// --- End Firebase Admin SDK Initialization ---

async function removeDynamicFieldsFromAllPokemon() {
    console.log("Starting removal of dynamic fields from all Pokémon documents...");

    // Iterate from 1 to 1025 (or your current max Pokedex number)
    for (let i = 1; i <= 1025; i++) {
        const nationalDexNumber = i;
        const pokemonRef = db.collection('Pokémon').doc(nationalDexNumber.toString());

        try {
            // Check if the document exists before trying to update
            const doc = await pokemonRef.get();
            if (!doc.exists) {
                console.warn(`Document Pokémon/${nationalDexNumber} does not exist. Skipping.`);
                continue;
            }

            // Check if the fields actually exist to avoid unnecessary writes
            const data = doc.data();
            if (data && (data.active !== undefined || data.completedStatus !== undefined || data.counter !== undefined)) {
                await pokemonRef.update({
                    active: FieldValue.delete(),
                    completedStatus: FieldValue.delete(),
                    counter: FieldValue.delete(),
                });
                console.log(`Removed dynamic fields from Pokémon/${nationalDexNumber}`);
            } else {
                console.log(`Pokémon/${nationalDexNumber} already clean or fields not present. Skipping update.`);
            }

        } catch (error) {
            console.error(`Error processing Pokémon/${nationalDexNumber}:`, error);
        }
    }
    console.log("Finished removal of dynamic fields from all Pokémon documents.");
}

removeDynamicFieldsFromAllPokemon().catch(console.error);
