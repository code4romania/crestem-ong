import FullScreenLoader from "@/components/FullScreenLoader";
import { queryClient } from "@/lib/query";
import getUserType from "@/lib/userType";
import { getMe, type MeModel } from "@/services/api/get-me.api";
import { loginUser } from "@/services/api/login-user.api";
import type { FinalRoleType } from "@/services/api/types";
import Cookies from "js-cookie";
import React, { createContext, useContext, useEffect, useState } from "react";

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
        try {
            const loginResponse = await loginUser({ identifier: username, password });
            if (!loginResponse) {
                Cookies.remove("jwt");
            }

            Cookies.set("jwt", loginResponse.jwt);

            const meData = await getMe();
            if (!meData) {
                Cookies.remove("jwt");
            }

            setUser(meData);
            setUserRole(getUserType(meData));
            setIsAuthenticated(true);
            await queryClient.invalidateQueries({queryKey: ["me"]});
        } catch (err) {
            Cookies.remove("jwt");
            setIsAuthenticated(false);

            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setUserRole("public");
        setIsAuthenticated(false);
        Cookies.remove("jwt");
        queryClient.clear();
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
