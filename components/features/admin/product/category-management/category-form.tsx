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
import { categoryFormConfig } from "./category-form.config";

interface Props {
  category?: Category | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (data: Category) => Promise<any>;
}

type FormData = {
  name: string;
};

export default function CategoryDetailForm({
  category,
  style,
  onSubmit,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(categoryFormConfig.schema),
    defaultValues: categoryFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const resetFormData = (data?: Category) => {
    if (!data) return;
    setValue("name", data.name);
  };

  const handleSubmitForm = (data: FormData) => {
    const newCategory: Category = {
      id: category ? category.id : Date.now().toString(),
      name: data.name,
    };
    if (onSubmit) {
      const res = onSubmit(newCategory);
      res.finally(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    if (category) resetFormData(category);
  }, [category]);

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
                placeholder="Enter category name"
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
              {category ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
