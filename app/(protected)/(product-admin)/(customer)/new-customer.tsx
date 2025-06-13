import CustomerDetailForm from "@/components/features/admin/product/customer-management/customer-form";
import { ThemedView } from "@/components/ThemedView";
import { Customer } from "@/types/customer";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewCustomerScreen() {
  const router = useRouter();
  const handleSubmit = async (customer: Customer) => {
    console.log("Submitted:", customer);
    // Implement the submit functionality here
    router.back();
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CustomerDetailForm
            style={{ paddingVertical: 20 }}
            onSubmit={handleSubmit}
          />
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
