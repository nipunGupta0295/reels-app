import React,{useState,useContext,useEffect} from 'react'
import {auth} from '../firebase'
export const AuthContext = React.createContext();
function AuthProvider({children}) {
    const[currentUser,setCurrentUser] =useState();
    const[loading,setLoading] =useState(true);
    
    function signup(email,password)
    {
        return auth.createUserWithEmailAndPassword(email,password);
    }
    function login(email,password)
    {
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout()
    {
        return auth.signOut();
    }
    useEffect(()=>{
        console.log("auth");
        console.log(auth);
        const unsubscribe  = auth.onAuthStateChanged(user=>{  // listener to listen changes in auth object;
            setCurrentUser(user);
            console.log(user);
            setLoading(false);
        })
        return ()=>{
            unsubscribe();
        }
    },[])
    const value = {
        currentUser,
        login,
        signup,
        logout
    }
    return (
        <AuthContext.Provider value={value}>
            {!loading&&children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
