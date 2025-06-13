import CustomerDetailForm from "@/components/features/admin/product/customer-management/customer-form";
import { ThemedView } from "@/components/ThemedView";
import { GetCustomerById, UpdateCustomer } from "@/services/customer";
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
    await GetCustomerById(id)
      .then(setCustomer)
      .catch((error) => {
        console.error("Error fetching customer:", error);
      });
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleSubmit = async (customer: Customer) => {
    console.log("Submitted:", customer);
    await UpdateCustomer(id, customer)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error creating customer:", error);
      });
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
