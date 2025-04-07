import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../services/firebase";

interface AuthContextProps {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500); // 1.5 seconds minimum loading time

      return () => clearTimeout(timer);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}