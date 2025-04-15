import Toast from "react-native-toast-message";

export const showSuccessMessage = (message: string) => {
  console.log("showSuccessMessage", message);
  Toast.show({
    type: "success",
    text1: message,
  });
};

export const showErrorMessage = (message: string) => {
  Toast.show({
    type: "error",
    text1: message,
    position: "top",
  });
};

export const showInfoMessage = (message: string) => {
  Toast.show({
    type: "info",
    text1: message,
    position: "top",
  });
};
