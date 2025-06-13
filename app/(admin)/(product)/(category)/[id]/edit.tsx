import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import { ThemedView } from "@/components/ThemedView";
import { showErrorMessage } from "@/libs/react-native-toast-message/toast";
import { mockCategories } from "@/mocks/category";
import { GetCategories, UpdateCategory } from "@/services/category";
import { Category } from "@/types/category";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [category, setCategorie] = React.useState<Category | null>(null);
  const [categories, setCategories] = React.useState<Category[]>([]);

  const fetchData = async (id: string) => {
    const res = categories.find((category) => category.id === id);
    if (res) setCategorie(res);
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchCategories = async () => {
        await GetCategories().then((res) => {
          setCategories(res.data);
        });
      };
      fetchCategories();
    }, [])
  );

  useEffect(() => {
    if (id) fetchData(id);
  }, [id, categories]);

  const handleSubmit = async (category: Category) => {
    await UpdateCategory(id, category.name)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        showErrorMessage(`Error updating category ${error.message}`);
      });
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
