// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
  firestoreDatabaseId: import.meta.env.VITE_FIREBASE_DATABASE_ID || "(default)"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
```

---

## Crea el archivo `.env` en la raíz del proyecto
```
VITE_FIREBASE_API_KEY=AIzaSyDqgmQFyNJpmyJgOOgj-UKk26ZvAp_VkpM
VITE_FIREBASE_AUTH_DOMAIN=gen-lang-client-0996372440.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=gen-lang-client-0996372440
VITE_FIREBASE_STORAGE_BUCKET=gen-lang-client-0996372440.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=196550733780
VITE_FIREBASE_APP_ID=1:196550733780:web:f19867c29727dbb91db041
VITE_FIREBASE_DATABASE_ID=ai-studio-2712c019-07e0-4daa-a423-a4c793d6cbd2
GEMINI_API_KEY=tu_clave_gemini_real_aquí
```

---

## Agrega al `.gitignore`

Ábrelo y verifica que tenga:
```
.env
.env.local
firebase-applet-config.json