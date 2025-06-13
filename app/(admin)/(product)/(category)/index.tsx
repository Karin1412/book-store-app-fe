import PaginationBar from "@/components/common/pagination";
import SearchInput from "@/components/common/search-input";
import CategoryItem from "@/components/features/admin/product/category-management/category-item";
import { ThemedView } from "@/components/ThemedView";
import { GetCategories } from "@/services/category";
import { Category } from "@/types/category";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

export default function AdminCategoryManagementScreen() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activePage, setActivePage] = useState(1);
  const totalPages = 3;
  const handleEdit = (id: string) => {
    router.push(`/(admin)/(product)/(category)/${id}/edit`);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((category) => category.id !== id));
  };

  const handleAddNew = () => {
    router.push("/(admin)/(product)/(category)/new-category");
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
    console.log("Categories:", categories);
  }, [categories]);

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
            data={categories}
            renderItem={({ item }) => (
              <CategoryItem
                category={item}
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
        <TouchableOpacity style={styles.addButton} onPress={handleAddNew}>
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
