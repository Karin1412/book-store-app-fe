import PaginationBar from "@/components/common/pagination";
import SearchInput from "@/components/common/search-input";
import BookItem from "@/components/features/admin/product/book-management/book-item";
import { ThemedView } from "@/components/ThemedView";
import { mockBooks } from "@/mocks/book";
import { mockImportNotes } from "@/mocks/import-note";
import { ImportNote } from "@/types/import-note";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminOrderManagementScreen() {
  const router = useRouter();
  const [importNotes, setImportNotes] = useState<ImportNote[]>(mockImportNotes);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const totalPages = 3;
  const handleEdit = (id: string) => {
    router.push(`/(admin)/(product)/(book-management)/${id}/edit`);
  };

  const goToBookDetails = (id: string) => {
    router.push(`/(admin)/(product)/(book-management)/${id}/details`);
  };

  const handleDelete = (id: string) => {
    setImportNotes(importNotes.filter((importNote) => importNote.id !== id));
  };

  return (
    <SafeAreaView style={styles.themeContainer}>
      <ThemedView style={styles.container}>
        <SearchInput
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />

        <View style={styles.content}>
          <FlatList
            data={importNotes}
            renderItem={({ item }) => (
              <BookItem
                book={item}
                onGoToDetails={goToBookDetails}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.booksList}
          />
        </View>

        <PaginationBar
          totalPages={totalPages}
          activePage={activePage}
          setActivePage={setActivePage}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  themeContainer: {
    flex: 1,
  },
  container: {
    position: "relative",
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  searchIcon: {},
  content: {
    flex: 1,
  },
  booksList: {
    paddingHorizontal: 16,
  },
  addButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: "#7CFC00",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 4px #7CFC0080",
  },
});
