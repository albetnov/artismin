import create from "zustand";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_INTEGRATION,
  authDomain: import.meta.env.VITE_FIREBASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_APP_NAME,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

interface AuthStoreProps {
  isAuthed: boolean | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  hasError: boolean;
  nullifyErr: () => void;
  checkForAuth: () => void;
}

export const useAuthStore = create<AuthStoreProps>((set) => ({
  isAuthed: null,
  hasError: false,
  checkForAuth() {
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ isAuthed: true });
      } else {
        set({ isAuthed: false });
      }
    });
  },
  login: async (email, password) => {
    const auth = getAuth(app);
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user);
      set({ isAuthed: true, hasError: false });
    } catch (err: any) {
      console.log(err.code);
      console.log(err.message);
      set({ isAuthed: false, hasError: true });
    }
  },
  logout: async () => {
    const auth = getAuth(app);
    auth.signOut();
    set({ isAuthed: false });
  },
  nullifyErr: () => set({ hasError: false }),
}));
