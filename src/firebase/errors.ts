const FirebaseError: {[errorMessage: string]: string} = {
    "Firebase: Error (auth/invalid-email).": "Invald email",
    "Firebase: Error (auth/missing-password).": "Missing password",
    "Firebase: Password should be at least 6 characters (auth/weak-password).": "Short password",
    "Firebase: Error (auth/invalid-credential).": "Invalid credentials",
    "Firebase: Error (auth/email-already-in-use).": "Email already taken"
};

export default FirebaseError;