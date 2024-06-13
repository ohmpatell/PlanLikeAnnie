import { createContext, useEffect, useState } from "react";
import { auth } from '@/firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";

import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const checkUser = async () => {
        const userData = await AsyncStorage.getItem('userData');
        if(userData) {
            setCurrentUser(JSON.parse(userData));
        }
    }
    checkUser();

    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const login = async (userData) => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    setCurrentUser(userData);
  }

    const logout = async () => {
        await AsyncStorage.removeItem('userData');
        setCurrentUser({});
    }


  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
