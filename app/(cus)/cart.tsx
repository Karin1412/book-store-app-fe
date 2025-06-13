import { View, Text, FlatList, StyleSheet, Image } from "react-native";
import { borrowedBooks } from "@/mocks/borrowBooks";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

export default function BorrowedBooksScreen() {
  const textColor = useThemeColor({}, "text");
  const cardBg = useThemeColor({}, "cardBackground");

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <Image source={{ uri: item.book.imageUrl }} style={styles.image} />
            <View style={styles.info}>
              <Text style={[styles.title, { color: textColor }]}>
                {item.book.title.name}
              </Text>
              <Text style={{ color: textColor }}>
                Ngày mượn: {item.borrowDate}
              </Text>
              <Text style={{ color: textColor }}>
                Ngày trả: {item.returnDate || "Chưa trả"}
              </Text>
              <Text
                style={{
                  color: item.isReturned ? "#2e7d32" : "#d32f2f",
                  fontWeight: "600",
                }}
              >
                {item.isReturned ? "Đã trả" : "Chưa trả"}
              </Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={{ color: textColor, padding: 16 }}>
            Chưa có sách nào được mượn.
          </Text>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 2,
    padding: 8,
  },
  image: {
    width: 80,
    height: 100,
    resizeMode: "cover",
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});
