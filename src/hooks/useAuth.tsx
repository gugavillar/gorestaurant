import { useContext, useEffect, createContext, ReactNode, useState } from "react";
import { auth, database, firebase } from "../services/firebase";
import { toast } from 'react-toastify';


interface UserGoogle {
    id: string;
    name: string;
}

interface User {
    userId: string | undefined;
    name: string;
    phone: string;
}


interface AuthContextType {
    user: UserGoogle | undefined;
    signInWithGoogle: () => Promise<void>;
    logoutSystem: () => Promise<void>;
    openModalUser: () => void;
    isModalUser: boolean;
    addUser: (user: User) => Promise<void>;
}

interface AuthContextProps {
    children: ReactNode
}


const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthContextProps) {
    const [user, setUser] = useState<UserGoogle>();
    const [isModalUser, setIsModalUser] = useState(false);
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { uid, displayName } = user;
                if (!displayName) {
                    throw new Error('Missing information account');
                }
                setUser({
                    id: uid,
                    name: displayName
                })
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);

        if (result.user) {
            const { uid, displayName } = result.user;
            if (!displayName) {
                throw new Error('Missing information account');
            }
            setUser({
                id: uid,
                name: displayName
            });
            toast.success('Efetuando login');
        }
    }

    async function logoutSystem() {
        if (user) {
            await auth.signOut();
            toast.success('Efetuando logout');
            setUser(undefined);
        }
    }

    function openModalUser() {
        setIsModalUser(!isModalUser);
    }

    const addUser = async (userData: User) => {
        try {
            await database.ref('users').push(userData);
        } catch (err) {
            toast.error(err.message);
        }
    }

    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, logoutSystem, openModalUser, isModalUser, addUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}