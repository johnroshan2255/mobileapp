import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/configs/FirebaseConfig";

import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, (user) => {
            if(user){
                setIsAuthenticated(true);
                setUser(user);
                updateUserData(user.uid, user);
            }else{
                setIsAuthenticated(false);
                setUser(null);
            }
        });
        return unsub;
    },[]);

    const login = async (email, password) => {
        try {

            const response = await signInWithEmailAndPassword(auth, email, password);

            return { success: true, data: response?.user };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }

    const logout = async () => {
        try {
            await signOut(auth);
            return { success: true };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }

    const register = async (email, password, profileUrl, fullname) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);

            await setDoc(doc(db, "users", response?.user?.uid),{
                email,
                profileUrl,
                fullname,
                userId: response?.user?.uid,
            });

            return { success: true, data: response?.user };
        } catch (error) {
            return { success: false, msg: error.message };
        }
    }

    const updateUserData = async (userId, currentUser) => {
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);

        if(userDocSnapshot.exists()){
            let data = userDocSnapshot.data();
            setUser({...currentUser, fullname: data.fullname, profileUrl: data.profileUrl});
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside AuthContext Provider.');
    }
    return value;
}