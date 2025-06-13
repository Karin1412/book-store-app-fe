import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import { ThemedView } from "@/components/ThemedView";
import { CreateCategory } from "@/services/category";
import { Category } from "@/types/category";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewCategoryScreen() {
  const router = useRouter();
  const handleSubmit = async (category: Category) => {
    console.log("Category submitted:", category);
    await CreateCategory(category.name)
      .then((res) => {
        console.log("Category created:", res);
        router.back();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CategoryDetailForm
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
