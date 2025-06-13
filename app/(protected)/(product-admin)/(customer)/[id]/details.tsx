import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { mockBookTitles } from "@/mocks/book-title";
import { mockCustomers } from "@/mocks/customer";
import { BookTitle } from "@/types/book";
import { Customer } from "@/types/customer";
import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Params = {
  id: string;
};

export default function CustomerDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const iconColor = useThemeColor({}, "icon");

  const fetchData = async (id: string) => {
    const res = mockCustomers.find((customer) => customer.id === id);
    if (res) setCustomer(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleEdit = () => {
    router.push(
      `/(protected)/(product-admin)/(book-management)/book-title/${id}/edit`
    );
  };

  const handleDelete = () => {
    if (!customer) return;
    // Implement delete functionality here
    console.log("Delete with id:", customer.id);
  };

  if (!customer) return null; // Handle loading state or error state

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      padding: 24,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
    },
    spacer: {
      flex: 1,
    },
    headerButtons: {
      flexDirection: "row",
    },
    iconButton: {
      padding: 8,
      marginLeft: 16,
    },
    detailRow: {
      flexDirection: "row",
      marginBottom: 24,
      alignItems: "flex-start",
      gap: 32,
    },
    label: {
      width: 100,
      fontSize: 16,
      fontWeight: "bold",
    },
    value: {
      flex: 1,
      fontSize: 16,
      color: textSecondaryColor,
    },
  });
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.header}>
            <View style={styles.spacer} />
            <View style={styles.headerButtons}>
              <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
                <Feather name="edit-2" size={20} color={iconColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleDelete}
                style={styles.iconButton}
              >
                <Feather name="trash-2" size={20} color={iconColor} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>ID</ThemedText>
            <Text style={styles.value}>{customer.id}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Name</ThemedText>
            <Text style={styles.value}>{customer.name}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Phone</ThemedText>
            <Text style={styles.value}>{customer.phone}</Text>
          </View>

          <View style={styles.detailRow}>
            <ThemedText style={styles.label}>Email</ThemedText>
            <Text style={styles.value}>{customer.email}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}
