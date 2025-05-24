import Input from "@/components/common/input";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { User } from "@/types/user";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AvatarOption from "./avatar-option";
import { profileFormConfig } from "./profile-form.config";

interface Props {
  user: User;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (user: User) => Promise<any>;
}

type FormData = {
  imageUrl: string;
  name: string;
  email: string;
  phone: string;
};

export default function ProfileForm({ user, style, onSubmit }: Props) {
  const router = useRouter();
  const defaultImage =
    user?.role === "admin"
      ? require("@/assets/images/default-admin-image.png")
      : require("@/assets/images/default-user-image.jpg");
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(profileFormConfig.schema),
    defaultValues: profileFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const resetFormData = (user?: User) => {
    if (!user) return;
    setValue("name", user.name || "");
    setValue("email", user.email || "");
    setValue("phone", user.phone || "");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setValue("imageUrl", result.assets[0].uri);
      bottomSheetModalRef.current?.dismiss();
    }
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const handleSubmitForm = (data: FormData) => {
    const updatedUser: User = {
      ...user,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };
    if (onSubmit) {
      const res = onSubmit(updatedUser);
      res.finally(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    resetFormData(user);
  }, [user]);

  const theme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const backgroundSecondaryColor = useThemeColor({}, "backgroundSecondary");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageSection: {
      flexDirection: "column",
      alignItems: "center",
      marginBottom: 30,
    },
    bottomModal: {
      backgroundColor: backgroundSecondaryColor,
    },
    bottomModalContent: {
      paddingVertical: 16,
      paddingHorizontal: 8,
    },
    profileImageContainer: {
      position: "relative",
    },
    cameraIcon: {
      position: "absolute",
      bottom: 2,
      right: 2,
      backgroundColor: iconBoundingColor,
      borderRadius: 16,
      padding: 8,
      zIndex: 1,
    },
    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 3,
      borderColor: "#60A5FA",
      top: 0,
      zIndex: 1,
      backgroundColor: "white",
    },
    importButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    importText: {
      fontSize: 16,
      marginRight: 10,
    },
    plusIconContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: iconBoundingColor,
      justifyContent: "center",
      alignItems: "center",
    },
    formSection: {
      flex: 1,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingVertical: 8,
      fontSize: 16,
      color: textColor,
      paddingHorizontal: 16,
    },
    submitButton: {
      backgroundColor: tintColor,
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: theme === "light" ? "white" : "black",
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <ThemedView style={[styles.container, style]}>
          <View style={styles.imageSection}>
            <Controller
              control={control}
              name="imageUrl"
              render={({ field: { value } }) => (
                <TouchableOpacity
                  style={styles.profileImageContainer}
                  onPress={handlePresentModalPress}
                >
                  <Image
                    source={value ? { uri: value } : defaultImage}
                    style={styles.profileImage}
                  />
                  <MaterialCommunityIcons
                    name="camera-plus"
                    size={16}
                    color={iconColor}
                    style={styles.cameraIcon}
                  />
                </TouchableOpacity>
              )}
            />
            <BottomSheetModal
              ref={bottomSheetModalRef}
              onChange={handleSheetChanges}
              backgroundStyle={styles.bottomModal}
              backdropComponent={(props) => (
                <BottomSheetBackdrop
                  {...props}
                  disappearsOnIndex={-1}
                  appearsOnIndex={0}
                  pressBehavior="close"
                />
              )}
            >
              <BottomSheetView style={styles.bottomModalContent}>
                <AvatarOption
                  icon={
                    <MaterialCommunityIcons
                      name="image-plus"
                      size={20}
                      color={iconColor}
                    />
                  }
                  label="Upload from device"
                  onPress={pickImage}
                />
              </BottomSheetView>
            </BottomSheetModal>
          </View>

          <View style={styles.formSection}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="Name"
                  placeholder="Enter your name"
                  style={styles.input}
                  required
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="Email"
                  placeholder="Enter your email"
                  style={styles.input}
                  required
                  errorMessage={errors.email?.message}
                />
              )}
            />

            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <Input
                  value={value}
                  onChangeText={onChange}
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  style={styles.input}
                  keyboardType="phone-pad"
                  required
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit(handleSubmitForm)}
            >
              <Text style={styles.submitButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </ThemedView>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
