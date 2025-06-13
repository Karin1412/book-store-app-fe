import AuthorDetailForm from "@/components/features/admin/product/author-management/author-form";
import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import { ThemedView } from "@/components/ThemedView";
import { showErrorMessage } from "@/libs/react-native-toast-message/toast";
import { mockAuthors } from "@/mocks/author";
import { mockCategories } from "@/mocks/category";
import { GetAllAuthors, UpdateAuthor } from "@/services/author";
import { Author } from "@/types/author";
import { Category } from "@/types/category";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function AuthorEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [author, setAuthor] = React.useState<Author | null>(null);
  const [authors, setAuthors] = React.useState<Author[]>([]);

  const fetchData = async (id: string) => {
    const res = authors.find((author) => author.id === id);
    if (res) {
      setAuthor(res);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        await GetAllAuthors().then(setAuthors);
      };
      fetchData();
    }, [])
  );

  useEffect(() => {
    if (id) fetchData(id);
  }, [id, authors]);

  const handleSubmit = async (author: Author) => {
    console.log("Submitted:", author);
    await UpdateAuthor(id, author.name)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error updating author:", error);
        // Handle error, e.g., show a toast message
        showErrorMessage(`Error updating author: ${error.message}`);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <AuthorDetailForm
            author={author}
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
