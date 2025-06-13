import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { mockBooks } from "@/mocks/book";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const book = mockBooks.find((b) => b.id === id);

  const bgColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");

  if (!book) return <Text style={{ padding: 20, color: textColor }}>Không tìm thấy sách.</Text>;

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={[styles.content]}>
        <Image
          source={{ uri: book.imageUrl }}
          style={styles.bookImage}
        />
        <Text style={[styles.title, { color: tintColor }]}>{book.title.name}</Text>
        <Text style={[styles.label, { color: textColor }]}>
          Tác giả: <Text style={styles.value}>{book.title.author.name}</Text>
        </Text>
        <Text style={[styles.label, { color: textColor }]}>
          Nhà xuất bản: <Text style={styles.value}>{book.publisher.name}</Text>
        </Text>
        <Text style={[styles.label, { color: textColor }]}>
          Giá: <Text style={styles.value}>${book.unitPrice}</Text>
        </Text>
        <Text style={[styles.label, { color: textColor }]}>Mô tả:</Text>
        <Text style={[styles.value, { color: textColor }]}>{book.title.description}</Text>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: {
    padding: 20,
  },
  bookImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
    borderRadius: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "400",
  },
});
