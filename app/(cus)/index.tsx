import { useEffect, useRef, useState } from "react";
import { mockBooks } from "@/mocks/book";
import { useRouter } from "expo-router";
import {
  FlatList,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemedView } from "@/components/ThemedView";

const { width } = Dimensions.get("window");

const banners = [
  require("../../assets/images/banner1.avif"),
  require("../../assets/images/banner2.jpg"),
  require("../../assets/images/banner3.jpg"),
];

function getRandomBooks(count: number) {
  const shuffled = [...mockBooks].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function CustomerHome() {
  const router = useRouter();
  const [bannerIndex, setBannerIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const [trendingBooks] = useState(() => getRandomBooks(6));
  const [newBooks] = useState(() => getRandomBooks(6));

  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "textSecondary");
  const tabIconDefaultColor = useThemeColor({}, "tabIconDefault");
  const tabIconSelectedColor = useThemeColor({}, "tabIconSelected");
  const cardBackground = useThemeColor({}, "cardBackground");

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndex + 1) % banners.length;
      setBannerIndex(nextIndex);
      scrollRef.current?.scrollTo({ x: nextIndex * width, animated: true });
    }, 2000);

    return () => clearInterval(interval);
  }, [bannerIndex]);

  const renderBanner = () => (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.bannerContainer}
        scrollEnabled={false}
      >
        {banners.map((source, index) => (
          <Image key={index} source={source} style={styles.bannerImage} />
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  index === bannerIndex
                    ? tabIconSelectedColor
                    : tabIconDefaultColor,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderBookSection = (title: string, books: typeof mockBooks) => (
    <View style={styles.sectionContainer}>
      <Text style={[styles.sectionTitle, { color: textColor }]}>{title}</Text>
      <FlatList
        horizontal
        data={books}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.bookCard, { backgroundColor: cardBackground }]}
            onPress={() => router.push(`/(cus)/(book)/${item.id}`)}
          >
            <Image
              source={{ uri: item.imageUrl }}
              style={styles.bookCardImage}
            />
            <Text
              style={[styles.bookCardTitle, { color: textColor }]}
              numberOfLines={2}
            >
              {item.title.name}
            </Text>
            <Text style={[styles.bookCardAuthor, { color: mutedTextColor }]}>
              {item.publisher.name}
            </Text>
            <Text style={[styles.bookCardPrice, { color: textColor }]}>
              ${item.unitPrice}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  return (
    <ThemedView>
      <FlatList
        ListHeaderComponent={
          <>
            {renderBanner()}
            {renderBookSection("Trending Books", trendingBooks)}
            {renderBookSection("New Books", newBooks)}
          </>
        }
        data={[]}
        renderItem={null}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    height: 180,
    marginBottom: 10,
  },
  bannerImage: {
    width: width,
    height: 180,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  sectionContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 10,
    marginBottom: 6,
  },
  bookCard: {
    width: 140,
    marginRight: 10,
    alignItems: "flex-start",
    padding: 4,
    borderRadius: 6,
    height: 260,
  },
  bookCardImage: {
    width: "100%",
    height: 160,
    borderRadius: 6,
    marginBottom: 6,
  },
  bookCardTitle: {
    fontWeight: "bold",
    fontSize: 14,
    height: 36,
  },
  bookCardAuthor: {
    fontSize: 12,
    height: 18,
  },
  bookCardPrice: {
    fontSize: 13,
    marginTop: 4,
    height: 18,
  },
});
