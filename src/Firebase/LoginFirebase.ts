import db from './FirebaseAdmin';

export const auth = db.auth();

export const signWithEmailAndPassword = async(email: string, password: string):Promise<db.User | null> => {
    let result = await auth.signInWithEmailAndPassword(email, password);
    return result.user;
}

export const signOut = async() => {
    await auth.signOut();
}