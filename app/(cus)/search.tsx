import { useState } from "react";
import {
  FlatList,
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import { mockBooks } from "@/mocks/book";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 48) / 2;

export default function SearchScreen() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "textSecondary");
  const cardBackground = useThemeColor({}, "cardBackground");
  const borderColor = useThemeColor({}, "border");
  const textSecondary = useThemeColor({}, "textSecondary");

  const categories = Array.from(
    new Set(mockBooks.map((book) => book.title.category.name))
  );

  const filteredBooks = mockBooks.filter((book) => {
    const matchText =
      book.title.name.toLowerCase().includes(searchText.toLowerCase()) ||
      book.title.author.name.toLowerCase().includes(searchText.toLowerCase());

    const matchCategory =
      category === "all" || book.title.category.name === category;

    const price = book.unitPrice;
    const min = parseFloat(minPrice) || 0;
    const max = parseFloat(maxPrice) || Infinity;
    const matchPrice = price >= min && price <= max;

    return matchText && matchCategory && matchPrice;
  });

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        placeholder="Search books or authors..."
        placeholderTextColor={textSecondary}
        value={searchText}
        onChangeText={setSearchText}
      />

      <View style={styles.row}>
        <TextInput
          style={[styles.priceInput, { borderColor, color: textColor }]}
          placeholder="From"
          placeholderTextColor={textSecondary}
          keyboardType="numeric"
          value={minPrice}
          onChangeText={setMinPrice}
        />
        <TextInput
          style={[styles.priceInput, { borderColor, color: textColor }]}
          placeholder="to"
          placeholderTextColor={textSecondary}
          keyboardType="numeric"
          value={maxPrice}
          onChangeText={setMaxPrice}
        />
      </View>

      <Picker
        selectedValue={category}
        onValueChange={(itemValue) => setCategory(itemValue)}
        style={[styles.picker, { color: textColor }]}
        dropdownIconColor={textColor}
      >
        <Picker.Item label="Tất cả thể loại" value="all" />
        {categories.map((cat, idx) => (
          <Picker.Item key={idx} label={cat} value={cat} />
        ))}
      </Picker>

      <FlatList
        data={filteredBooks}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ gap: 16, marginBottom: 16 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              { backgroundColor: cardBackground, borderColor },
            ]}
            onPress={() => router.push(`/(cus)/(book)/${item.id}`)}
          >
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <Text
              style={[styles.title, { color: textColor }]}
              numberOfLines={2}
            >
              {item.title.name}
            </Text>
            <Text style={[styles.author, { color: mutedTextColor }]}>
              {item.title.author.name}
            </Text>
            <Text style={[styles.publisher, { color: mutedTextColor }]}>
              {item.publisher.name}
            </Text>
            <Text style={[styles.price, { color: textColor }]}>
              ${item.unitPrice}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ padding: 20, color: textColor }}>
            Không tìm thấy kết quả phù hợp.
          </Text>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 12,
  },
  priceInput: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  picker: {
    marginHorizontal: 16,
    marginBottom: 8,
  },
  card: {
    width: ITEM_WIDTH,
    borderRadius: 10,
    padding: 8,
  },
  image: {
    width: "100%",
    height: 140,
    resizeMode: "cover",
    borderRadius: 6,
    marginBottom: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 2,
  },
  author: {
    fontSize: 12,
  },
  publisher: {
    fontSize: 12,
    marginBottom: 2,
  },
  price: {
    fontSize: 13,
    fontWeight: "600",
    marginTop: 2,
  },
});
