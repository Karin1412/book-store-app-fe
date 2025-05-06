import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import CustomerDetailForm from "@/components/features/admin/product/customer-management/customer-form";
import { ThemedView } from "@/components/ThemedView";
import { mockCategories } from "@/mocks/category";
import { mockCustomers } from "@/mocks/customer";
import { Category } from "@/types/category";
import { Customer } from "@/types/customer";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [customer, setCustomer] = React.useState<Customer | null>(null);

  const fetchData = async (id: string) => {
    const res = mockCustomers.find((customer) => customer.id === id);
    if (res) setCustomer(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

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
            customer={customer}
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
