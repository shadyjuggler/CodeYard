export type UserAuthError = string;

export interface User {
    id: string;
    email: string;
    name: string | null;
    photoURL: string | null;
}
