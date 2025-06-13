import Input from "@/components/common/input";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { Customer } from "@/types/customer";
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
import { customerFormConfig } from "./customer-form.config";

interface Props {
  customer?: Customer | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (data: Customer) => Promise<any>;
}

type FormData = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function CustomerDetailForm({
  customer,
  style,
  onSubmit,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(customerFormConfig.schema),
    defaultValues: customerFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const resetFormData = (data?: Customer) => {
    if (!data) return;
    setValue("id", data.id);
    setValue("name", data.name);
    setValue("email", data.email);
    setValue("phone", data.phone);
  };

  const handleSubmitForm = (data: FormData) => {
    const newCustomer: Customer = {
      id: customer ? customer.id : Date.now().toString(),
      name: data.name,
      email: data.email,
      phone: data.phone,
      point: 0,
    };
    if (onSubmit) {
      const res = onSubmit(newCustomer);
      res.then(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    if (customer) resetFormData(customer);
  }, [customer]);

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
            name="id"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="ID"
                placeholder="Auto generated ID"
                style={styles.input}
                editable={false}
              />
            )}
          />
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
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Email"
                placeholder="example@gmail.com"
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
                label="Phone"
                placeholder="Enter phone number"
                style={styles.input}
                required
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text style={styles.submitButtonText}>
              {customer ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
