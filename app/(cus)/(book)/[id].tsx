import { useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { mockBooks } from "@/mocks/book";
import { mockBookPositions } from "@/mocks/bookPosition";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const book = mockBooks.find((b) => b.id === id);

  const bgColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");

  const [showPosition, setShowPosition] = useState(false);

  const position = mockBookPositions.find(
    (p) => p.bookTitle.id === book?.title.id
  );

  if (!book) {
    return (
      <ThemedView style={styles.container}>
        <Text style={{ padding: 20, color: textColor }}>Không tìm thấy sách.</Text>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.content}>
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

        <TouchableOpacity
          style={[styles.button, { borderColor: tintColor }]}
          onPress={() => setShowPosition(!showPosition)}
        >
          <Text style={{ color: tintColor }}>
            {showPosition ? "Ẩn vị trí sách" : "Xem vị trí sách"}
          </Text>
        </TouchableOpacity>

        {showPosition && position && (
          <View style={[styles.positionBox, { borderColor }]}>
            <Text style={[styles.positionLabel, { color: textColor }]}>
              Khu: <Text style={styles.value}>{position.zone}</Text>
            </Text>
            <Text style={[styles.positionLabel, { color: textColor }]}>
              Kệ: <Text style={styles.value}>{position.shelf}</Text>
            </Text>
            <Text style={[styles.positionLabel, { color: textColor }]}>
              Hàng: <Text style={styles.value}>{position.row}</Text>
            </Text>
            <Text style={[styles.positionLabel, { color: textColor }]}>
              Ghi chú: <Text style={styles.value}>{position.note}</Text>
            </Text>
          </View>
        )}
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
  button: {
    marginTop: 20,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  positionBox: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
  positionLabel: {
    fontSize: 16,
    marginBottom: 6,
  },
});
