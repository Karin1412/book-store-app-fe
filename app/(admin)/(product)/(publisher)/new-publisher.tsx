import PublisherDetailForm from "@/components/features/admin/product/publisher-management/publisher-form";
import { ThemedView } from "@/components/ThemedView";
import { CreatePublisher } from "@/services/publisher";
import { Publisher } from "@/types/publisher";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

export default function NewPublisherScreen() {
  const router = useRouter();
  const handleSubmit = async (publisher: Publisher) => {
    console.log("Submitted:", publisher);
    await CreatePublisher(publisher.name)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error creating publisher:", error.log);
      });
  };
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <PublisherDetailForm
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
