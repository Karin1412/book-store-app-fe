import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAsyncStorageData = async (
  key: string,
  defaultValue: any = {}
) => {
  const storageData = await AsyncStorage.getItem(key);
  return storageData ? JSON.parse(storageData) : defaultValue;
};
