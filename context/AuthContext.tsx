"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthUser } from "@models/models";
import { useCookies } from "next-client-cookies";
import { request } from "@api/fetch";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: AuthUser | null;
  getToken: () => string | undefined;
  isAuthenticated: () => boolean;
  logOut: () => void;
  isLoading: boolean;
  fetchUser: () => void;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookies = useCookies();
  const { data: session } = useSession();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      setIsLoading(true);

      // token stored in cookies
      if (cookies.get("token")) {
        const token = cookies.get("token");
        const response = await request("GET", {}, "/current-user/", token);

        if (response.detail === "Invalid token.") {
          logOut();
        } else {
          setUser({ ...response, token });
        }
      }

      // user logged in through social media
      else if (session && session.user && (session.user as any).authToken) {
        const response = await request(
          "GET",
          {},
          "/current-user/",
          (session.user as any).authToken
        );
        if (response.detail === "Invalid token.") {
          logOut();
        } else {
          setUser({ ...response, token: (session.user as any).authToken });
        }
      }

      // if no token found then set to null
      else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user && (cookies.get("token") || session?.user)) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [cookies, user, session]);

  const getToken = () => user?.token ?? "";

  const isAuthenticated = () => !!user;

  const refetch = async () => {
    setIsLoading(true);
    try {
      const response = await request("GET", {}, "/current-user/", user?.token);
      setUser({ ...response, token: user?.token });
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = () => {
    if (cookies.get("token")) {
      cookies.remove("token");
    }
    signOut();
    setUser(null);
    router.replace("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        getToken,
        isAuthenticated,
        logOut,
        isLoading,
        fetchUser,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
