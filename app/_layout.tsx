import React, { createContext, useState, useContext } from 'react';
import { Slot } from 'expo-router';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function Layout() {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ signIn: () => setUser(false), signOut: () => setUser(null) }}>
      <Slot />
    </AuthContext.Provider>
  );
}