import BookPositionDetailForm from "@/components/features/admin/product/book-position-management/book-position-form";
import { ThemedView } from "@/components/ThemedView";
import { mockBookPositions } from "@/mocks/bookPosition";
import { BookPosition } from "@/types/book";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function BookPositionEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [bookPosition, setBookPosition] = React.useState<BookPosition | null>(
    null
  );

  const fetchData = async (id: string) => {
    const res = mockBookPositions.find((pos) => pos.id === id);
    if (res) setBookPosition(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id]);

  const handleSubmit = async (bookPosition: BookPosition) => {
    console.log("submitted:", bookPosition);
    // Implement the submit functionality here
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <BookPositionDetailForm
            bookPosition={bookPosition}
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
