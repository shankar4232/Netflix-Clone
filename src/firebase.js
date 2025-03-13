import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyB7Q4IdGaeKw9dqGZflQfPXFN-F6zkKzJA",
  authDomain: "netfilx-clone-e1da8.firebaseapp.com",
  projectId: "netfilx-clone-e1da8",
  storageBucket: "netfilx-clone-e1da8.firebasestorage.app",
  messagingSenderId: "1055615704811",
  appId: "1:1055615704811:web:11a7da9d0990b4f7afa8ae",
};


const app = initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const signup=async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,

        });
    }
    catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login=async (email,password)=>{
    try{
        await signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code.split("/")[1].split("-").join(" "));
    }
}
const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout}