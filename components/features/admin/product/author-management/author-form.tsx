import Input from "@/components/common/input";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { authorFormConfig } from "./author-form.config";
import { Author } from "@/types/author";

interface Props {
  author?: Author | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (data: Author) => Promise<any>;
}

type FormData = {
  name: string;
};

export default function AuthorDetailForm({ author, style, onSubmit }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(authorFormConfig.schema),
    defaultValues: authorFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const resetFormData = (data?: Author) => {
    if (!data) return;
    setValue("name", data.name);
  };

  const handleSubmitForm = (data: FormData) => {
    const newAuthor: Author = {
      id: author ? author.id : Date.now().toString(),
      name: data.name,
      isActive: true,
    };
    if (onSubmit) {
      const res = onSubmit(newAuthor);
      res.finally(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    if (author) resetFormData(author);
  }, [author]);

  const theme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    <ThemedView style={[styles.container, style]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.formSection}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Name"
                placeholder="Enter author name"
                style={styles.input}
                required
                errorMessage={errors.name?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text style={styles.submitButtonText}>
              {author ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
