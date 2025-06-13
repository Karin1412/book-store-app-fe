import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { mockBooks } from "@/mocks/book";
import { Ionicons } from "@expo/vector-icons";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const book = mockBooks.find((b) => b.id === id);

  if (!book) return <Text style={{ padding: 20 }}>Không tìm thấy sách.</Text>;

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.content}>
      <Image
        source={{ uri: book.imageUrl }}
        style={styles.bookImage}
        />
        <Text style={styles.title}>{book.title.name}</Text>
        <Text style={styles.label}>Tác giả: <Text style={styles.value}>{book.title.author.name}</Text></Text>
        <Text style={styles.label}>Nhà xuất bản: <Text style={styles.value}>{book.publisher.name}</Text></Text>
        <Text style={styles.label}>Giá: <Text style={styles.value}>${book.unitPrice}</Text></Text>
        <Text style={styles.label}>Mô tả:</Text>
        <Text style={styles.value}>{book.title.description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#4A90E2",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  bookImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginBottom: 16,
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
