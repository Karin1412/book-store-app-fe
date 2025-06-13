import AuthorDetailForm from "@/components/features/admin/product/author-management/author-form";
import CategoryDetailForm from "@/components/features/admin/product/category-management/category-form";
import { ThemedView } from "@/components/ThemedView";
import { mockAuthors } from "@/mocks/author";
import { mockCategories } from "@/mocks/category";
import { Author } from "@/types/author";
import { Category } from "@/types/category";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function AuthorEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [author, setAuthor] = React.useState<Author | null>(null);

  const fetchData = async (id: string) => {
    const res = mockAuthors.find((author) => author.id === id);
    if (res) setAuthor(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleSubmit = async (author: Author) => {
    console.log("Submitted:", author);
    // Implement the submit functionality here
    router.back();
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
