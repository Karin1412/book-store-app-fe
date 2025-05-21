import PaginationBar from "@/components/common/pagination";
import SearchInput from "@/components/common/search-input";
import BookPositionItem from "@/components/features/admin/product/book-position-management/book-position-item";
import { ThemedView } from "@/components/ThemedView";
import { mockBookPositions } from "@/mocks/bookPosition";
import { BookPosition } from "@/types/book";
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

export default function AdminBookPositionManagementScreen() {
  const router = useRouter();
  const [bookPositions, setBookPositions] =
    useState<BookPosition[]>(mockBookPositions);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const totalPages = 3;
  const handleEdit = (id: string) => {
    router.push(`/(admin)/(product)/(book-position)/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setBookPositions(bookPositions.filter((pos) => pos.id !== id));
  };

  const handleAddBookTitle = () => {
    router.push("/(admin)/(product)/(book-position)/new-book-position");
  };

  const handleGotoDetails = (id: string) => {
    router.push(`/(admin)/(product)/(book-position)/${id}/details`);
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
            data={bookPositions}
            renderItem={({ item }) => (
              <BookPositionItem
                bookPosition={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onGotoDetails={handleGotoDetails}
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddBookTitle}>
          <Ionicons
            name="add"
            size={20}
            color="white"
            style={styles.searchIcon}
          />
        </TouchableOpacity>
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
