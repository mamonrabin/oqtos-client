/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getRecentUser } from "@/services/auth.api";

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  loading: boolean;
  refetch: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const refetch = async () => {
    try {
      setLoading(true);
      const res = await getRecentUser();
      setUser(res.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useCurrentUser = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within AuthProvider");
  }

  return context;
};