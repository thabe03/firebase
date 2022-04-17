import React, { createContext, useState } from "react"
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";

export const Context = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyCfRopkDjWUzUWg37l5cMJ1ybv0gw4gESU",
    authDomain: "react-auth-rrv6-a520f.firebaseapp.com",
    projectId: "react-auth-rrv6-a520f",
    storageBucket: "react-auth-rrv6-a520f.appspot.com",
    messagingSenderId: "390751623832",
    appId: "1:390751623832:web:6710f175be7af8c720ceed"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const Provider = ({ children }) => {

    const [validation, setValidation] = useState('')
    const [erreur, setErreur] = useState(false)

    const cuwep = (email, password) => createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setErreur(false)
            const user = userCredential.user;
        })
        .catch((error) => {
            if (error.code == 'auth/email-already-exists') {
                setValidation("L'email est déjà utilisé")
                setErreur(true)
            }
            if (error.code == 'auth/invalid-email') {
                setValidation("L'email est invalide")
                setErreur(true)
            }
        });

    const siwep = (email, password) => signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            setErreur(false)
            const user = userCredential.user;
        })
        .catch((error) => {
            if (error.code == 'auth/user-not-found') {
                setValidation("Aucun utilisateur existant")
                setErreur(true)
            }
        });

    const so = () => signOut(auth).then(() => {
    }).catch((error) => {
    });

    const [modalState, setModalState] = useState({
        signUp: false,
        signIn: false
    })
    const toggleModal = (modal) => {
        if (modal === 'signin') {
            setModalState({
                signUp: false,
                signIn: true
            })
        }
        if (modal === 'signup') {
            setModalState({
                signUp: true,
                signIn: false
            })
        }
        if (modal === 'close') {
            setModalState({
                signUp: false,
                signIn: false
            })
        }
    }

    const closeModal = () => {
        toggleModal('close')
        setValidation('')
        setErreur(false)
    }

    const value = {
        toggleModal,
        modalState,
        validation,
        cuwep,
        siwep,
        so,
        erreur,
        setErreur,
        closeModal
    }

    return <Context.Provider value={value}>
        {children}
    </Context.Provider>

}

export default Provider