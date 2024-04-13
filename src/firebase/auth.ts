import { auth } from ".";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

const authenticate = async (authFunc: Function, inputEmail: string, inputPassword: string) => {
    try {
        const result = await authFunc(auth, inputEmail, inputPassword);
        const { user: { uid, email, displayName, photoURL } } = result;
        const user = {
            id: uid,
            email,
            name: displayName,
            photoURL
        }
        return { user, error: null };
    }
    catch (error: any) {
        return { user: null, error: error.message }
    }
}

export const logOut = () => {
    return signOut(auth)
        .then(() => {
            return { user: null, error: null, }
        })
        .catch((error: any) => {
            return { user: null, error: error.message }
        })
}

export const register = async (inputEmail: string, inputPassword: string) => {
    const result = await authenticate(createUserWithEmailAndPassword, inputEmail, inputPassword);
    return {result, isNewUser: true};
}

export const login = async (inputEmail: string, inputPassword: string) => {
    const result = await authenticate(signInWithEmailAndPassword, inputEmail, inputPassword);
    return {result, isNewUser: false};
}
