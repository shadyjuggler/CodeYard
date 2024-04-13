import { auth } from ".";
import { updateProfile, updatePassword } from "firebase/auth";

export const updateCredentials = async (key: "photoURL" | "displayName", value: string) => {
    if (auth.currentUser) {
        try {
            const result = await updateProfile(auth.currentUser, {
                [key]: value
            });

            const { currentUser: { displayName, photoURL } } = auth;

            return { displayName, photoURL, error: null };
        } catch (error: any) {
            return { displayName: null, photoURL: null, error: error.message };
        }
    }
}

export const updateUserPassword = async (newPassword: string) => {
    try {
        if (auth.currentUser) {
            await updatePassword(auth.currentUser, newPassword);
            return { error: null };
        } else {
            return {error: "User not authenticated"}
        }
    } catch (error: any) {
        return { error: error.message };
    }
}
