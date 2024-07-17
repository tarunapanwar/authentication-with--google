'use client';
import { IAuthContextType } from "@/Interfaces/auth";
import { ReactNode, createContext, useContext, useState } from "react";

const AuthContext = createContext<IAuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: {children: ReactNode}) => {
    const [user, setUser] = useState<string | null>(null);

    const signIn = (user: string) => setUser(user);
    const signOut = () => setUser(null);

    return(
        <AuthContext.Provider value={{user, contextSignIn: signIn, contextSignOut: signOut}}>{children}</AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context)
        throw new Error("useAuth must be used within a AuthProvider");
    return context;
}