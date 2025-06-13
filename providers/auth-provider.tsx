import { LOCAL_STORAGE_KEY } from "@/constants/local-storage-key";
import { AuthContext, AuthContextType } from "@/contexts/auth-context";
import { Role, User } from "@/types/user";
import { getAsyncStorageData } from "@/utils/localstorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const saveUser = async (user: User) => {
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY.USER, JSON.stringify(user));
  };

  const saveToken = async (token: string) => {
    await AsyncStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, JSON.stringify(token));
  };

  const login = async (user: User, token: string) => {
    console.log("Login called with user:", user, "and token:", token);
    setUser(user);
    setToken(token);
    await saveUser(user);
    await saveToken(token);
  };

  const logout = async () => {
    setUser(null);
    setToken(null);
    await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.USER);
    await AsyncStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
  };

  const value: AuthContextType = { user, token, login, logout };

  useEffect(() => {
    const fetchStorageAuthData = async () => {
      await getAsyncStorageData(LOCAL_STORAGE_KEY.USER, null).then(setUser);
      await getAsyncStorageData(LOCAL_STORAGE_KEY.TOKEN, null).then(setToken);
    };
    fetchStorageAuthData();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    if (!user) {
      router.replace("/(auth)/welcome");
    } else if (user && user.role === Role.ADMIN) {
      router.replace("/(cus)");
    } else if (user && user.role === Role.USER) {
      router.replace("/(cus)");
    }
  }, [user]);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
