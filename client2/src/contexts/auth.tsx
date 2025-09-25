import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getMe, type MeModel } from "@/services/api/get-me.api";
import { queryClient } from "@/lib/query";
import { useLoginUserMutation } from "@/services/user.mutations";
import type { FinalRoleType } from "@/services/api/types";
import getUserType from "@/lib/userType";
import FullScreenLoader from "@/components/FullScreenLoader";
import { loginUser } from "@/services/api/login-user.api";

interface AuthState {
  isAuthenticated: boolean;
  user: MeModel | null;
  userRole: FinalRoleType;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeModel | null>(null);
  const [userRole, setUserRole] = useState<FinalRoleType>("public");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Restore auth state on app load
  useEffect(() => {
    const token = Cookies.get("jwt");
    if (token) {
      // Validate token with your API
      getMe()
        .then((userData) => {
          if (userData) {
            setUser(userData);
            setUserRole(getUserType(userData));
            setIsAuthenticated(true);
            queryClient.invalidateQueries({ queryKey: ["me"] });
          } else {
            Cookies.remove("jwt");
          }
        })
        .catch(() => {
          Cookies.remove("jwt");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  // Show loading state while checking auth
  if (isLoading) {
    return <FullScreenLoader />;
  }

  const login = async (username: string, password: string) => {
    // Replace with your authentication logic
    try {
      loginUser({ identifier: username, password })
        .then((userData) => {
          if (userData) {
            getMe().then((userData) => {
              if (userData) {
                setUser(userData);
                setUserRole(getUserType(userData));
                setIsAuthenticated(true);
                queryClient.invalidateQueries({ queryKey: ["me"] });
              } else {
                Cookies.remove("jwt");
              }
            });
            queryClient.invalidateQueries({ queryKey: ["me"] });
          } else {
            Cookies.remove("jwt");
          }
        })
        .catch(() => {
          Cookies.remove("jwt");
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch {}
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    Cookies.remove("jwt");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, userRole }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
