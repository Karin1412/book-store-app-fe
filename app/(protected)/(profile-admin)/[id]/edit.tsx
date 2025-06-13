import ProfileForm from "@/components/features/admin/profile/profile-form";
import { ThemedView } from "@/components/ThemedView";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";

type Params = {
  id: string;
};

export default function ProfileEditScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<Params>();
  const { user } = useAuth();

  const handleSubmit = async (user: User) => {
    console.log("Submitted:", user);
    // Implement the submit functionality here
    router.back();
  };

  if (!user) return null; // Handle loading state or error state

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <ProfileForm
          user={user}
          style={{ padding: 20 }}
          onSubmit={handleSubmit}
        />
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
  },
});
