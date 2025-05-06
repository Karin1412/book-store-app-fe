import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import { ThemedView } from "@/components/ThemedView";
import { mockCategories } from "@/mocks/category";
import { Category } from "@/types/category";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [category, setCategorie] = React.useState<Category | null>(null);

  const fetchData = async (id: string) => {
    const res = mockCategories.find((category) => category.id === id);
    if (res) setCategorie(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleSubmit = async (category: Category) => {
    console.log("Submitted:", category);
    // Implement the submit functionality here
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <CategoryDetailForm
            category={category}
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
