import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth } from "../../firebase";
import { getDoc } from "firebase/firestore";

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider(props) {
    const { children } = props
    const [user, setUser] = useState(null)
    const [golbalData, setGlobalData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email)
    }


    function logout() {
        return signOut(auth)
        setGlobalData(null)
        return signOut(auth)
    }


    const value = { user, globalData, setGlobalData, isLoading, signup, login, logout } 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(AuthContext, async (user) => {  
            // if theres no user, empty the user state and retun form this listener
            if (!user) {return}


            // if there is a user, then check if the user has data in the dtabase, and if they do, fetch said data and update the global state
            try {
                setIsLoading(true)

                // first create reference for the document (labelled json object), we get the doc, make a snapshot to see if there anything there
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)

                let firebaseData = {}
                if (docSnap.exists()){
                    console.log('found user data')
                    firebaseData = docSnap.data()
                }
                setGlobalData(firebaseData)


            } catch (err) {
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        })
        return unsubscribe
    }, [])


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}


// # https://youtu.be/iKpkVKubvKk?si=tdkOB5qk7M09EPwY&t=24697