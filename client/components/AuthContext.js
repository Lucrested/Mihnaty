import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase"; // Replace with your Supabase setup

// // Create a context
// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(null);
//   const [userData, setUserData] = useState(null);

//   return (
//     <AuthContext.Provider
//       value={{ session, setSession, userData, setUserData }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

// AuthProvider.js

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [session, setSession] = useState(null);
//   const [user, setUser] = useState(null);

//   const login = (userData) => {
//     setSession(userData.session);
//     setUser(userData.data);
//   };

//   const logout = () => {
//     setSession(null);
//     setUser(null);
//   };

//   const value = {
//     session,
//     user,
//     login,
//     logout,
//   };

//   return (
//     <AuthContext.Provider value={{ value }}>{children}</AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   const { login, logout, user } = context;
//   return { login, logout, user };
// }

// create a context for authentication
const AuthContext = createContext({
  session: null,
  user: null,
  signOut: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const setData = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) throw error;
      setSession(data.session);
      setUser(data.session?.user);
      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user);
        setLoading(false);
      }
    );

    setData();

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const value = {
    session,
    user,
    signOut: () => supabase.auth.signOut(),
  };

  // use a provider to pass down the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// export the useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};
