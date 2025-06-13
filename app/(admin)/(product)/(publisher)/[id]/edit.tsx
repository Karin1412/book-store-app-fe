import PublisherDetailForm from "@/components/features/admin/product/publisher-management/publisher-form";
import { ThemedView } from "@/components/ThemedView";
import { GetPublishers, UpdatePublisher } from "@/services/publisher";
import { Publisher } from "@/types/publisher";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function CategoryEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const [publisher, setPublisher] = React.useState<Publisher | null>(null);
  const [publishers, setPublishers] = React.useState<Publisher[]>([]);

  const fetchData = async (id: string) => {
    const res = publishers.find((publisher) => publisher.id === id);
    if (res) setPublisher(res);
  };

  useEffect(() => {
    if (id) fetchData(id);
  }, [id, publishers]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchPublishers = async () => {
        await GetPublishers().then((res) => {
          setPublishers(res.data);
        });
      };
      fetchPublishers();
    }, [])
  );

  const handleSubmit = async (publisher: Publisher) => {
    console.log("Submitted:", publisher);
    await UpdatePublisher(publisher.id, publisher.name)
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Error updating publisher:", error.log);
      });
  };

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <PublisherDetailForm
            publisher={publisher}
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
