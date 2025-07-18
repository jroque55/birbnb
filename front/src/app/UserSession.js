"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authContext } from "./AuthContext";
const URI = process.env.PUBLIC_API_URL || "http://localhost3000"

function UserSession({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(URI+"/auth/session", {
        withCredentials: true,
      });
      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await axios.post(
        URI+"/auth/login",
        { email, password },
        { withCredentials: true }
      );
      setUser(res.data.user);
      await checkAuth(); 
      router.back();
      return res.data.user;
    } catch (error) {
      setLoading(false);
      throw new Error(error.response?.data?.message || "Error al iniciar sesión");
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post(URI+"/auth/logout", null, {
        withCredentials: true,
      });
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      setLoading(false);
    }
  };

  const isAuthenticated = user != null;

  return (
    <authContext.Provider 
      value={{
        login,
        logout,
        user,
        isAuthenticated,
        loading, 
        checkAuth 
      }}
    >
      {children}
    </authContext.Provider>
  );
}

export default UserSession;