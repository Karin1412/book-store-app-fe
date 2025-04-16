import Combobox, { PickerItem } from "@/components/common/combobox";
import Input from "@/components/common/input";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { mockAuthors } from "@/mocks/author";
import { mockPublishers } from "@/mocks/publisher";
import { Author } from "@/types/author";
import { Book } from "@/types/book";
import { Publisher } from "@/types/publisher";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { bookDetailFormConfig } from "./book-detail-form.config";
import {
  convertAuthorToPickerItem,
  convertPublisherToPickerItem,
} from "./book-detail-form.utils";

interface Props {
  book?: Book | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (book: Book) => Promise<any>;
}

type FormData = {
  imageUrl: string;
  title: string;
  authorId: string;
  publisherId: string;
  price: string;
};

export default function BookDetailForm({ book, style, onSubmit }: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(bookDetailFormConfig.schema),
    defaultValues: bookDetailFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  const [authors, setAuthors] = useState<Author[]>([]);
  const [publishers, setPublishers] = useState<Publisher[]>([]);

  const getAuthor = (id: string) => {
    return authors.find((author) => author.id === id) || null;
  };

  const getPublisher = (id: string) => {
    return publishers.find((publisher) => publisher.id === id) || null;
  };

  const fetchAuthors = () => {
    setAuthors(mockAuthors);
  };

  const fetchPublishers = () => {
    setPublishers(mockPublishers);
  };

  const resetFormData = (book?: Book) => {
    if (!book) return;
    setValue("title", book.title);
    setValue("authorId", book.author.id);
    setValue("publisherId", book.publisher.id);
    setValue("price", book.listedPrice.toString());
    setValue("imageUrl", book.imageUrl);
  };

  const handleAuthorChange = (itemValue: PickerItem) => {
    const authorId = itemValue.value;
    setValue("authorId", getAuthor(authorId)?.id || "");
  };

  const handlePublisherChange = (itemValue: PickerItem) => {
    const publisherId = itemValue.value;
    setValue("publisherId", getPublisher(publisherId)?.id || "");
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    if (!result.canceled) setValue("imageUrl", result.assets[0].uri);
  };

  const handleSubmitForm = (data: FormData) => {
    const selectedAuthor = getAuthor(data.authorId);
    const selectedPublisher = getPublisher(data.publisherId);
    // Validate selected author and publisher
    if (!selectedAuthor || !selectedPublisher) return;

    // Create book object
    const newBook: Book = {
      id: Date.now().toString(),
      title: data.title,
      imageUrl: data.imageUrl,
      author: selectedAuthor,
      publisher: selectedPublisher,
      isActive: true,
      quantity: 0,
      importPrice: 0,
      listedPrice: parseFloat(data.price),
      salePrice: parseFloat(data.price) * 0.9,
    };
    if (onSubmit) {
      const res = onSubmit(newBook);
      res.finally(() => showSuccessMessage("Book added successfully!"));
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchPublishers();
  }, []);

  useEffect(() => {
    if (book) resetFormData(book);
  }, [book]);

  const theme = useColorScheme();
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");
  const iconBoundingColor = useThemeColor({}, "iconBounding");
  const borderColor = useThemeColor({}, "border");
  const tintColor = useThemeColor({}, "tint");
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    imageSection: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 30,
    },
    coverImage: {
      width: 80,
      height: 110,
      borderRadius: 4,
      marginRight: 20,
    },
    placeholderImage: {
      width: 80,
      height: 110,
      borderRadius: 4,
      backgroundColor: iconBoundingColor,
      justifyContent: "center",
      alignItems: "center",
      marginRight: 20,
    },
    importButton: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    importText: {
      fontSize: 16,
      marginRight: 10,
    },
    plusIconContainer: {
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: iconBoundingColor,
      justifyContent: "center",
      alignItems: "center",
    },
    formSection: {
      flex: 1,
    },
    input: {
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingVertical: 8,
      fontSize: 16,
      color: textColor,
      paddingHorizontal: 16,
    },
    submitButton: {
      backgroundColor: tintColor,
      borderRadius: 8,
      paddingVertical: 14,
      alignItems: "center",
      marginTop: 20,
    },
    submitButtonText: {
      color: theme === "light" ? "white" : "black",
      fontSize: 16,
      fontWeight: "500",
    },
  });

  return (
    <ThemedView style={[styles.container, style]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imageSection}>
          <Controller
            control={control}
            name="imageUrl"
            render={({ field: { value } }) => (
              <>
                {value ? (
                  <Image source={{ uri: value }} style={styles.coverImage} />
                ) : (
                  <View style={styles.placeholderImage}>
                    <FontAwesome name="book" size={24} color={iconColor} />
                  </View>
                )}
              </>
            )}
          />

          <TouchableOpacity style={styles.importButton} onPress={pickImage}>
            <ThemedText style={styles.importText}>Import image</ThemedText>
            <View style={styles.plusIconContainer}>
              <Feather name="plus" size={16} color={iconColor} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.formSection}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Title"
                style={styles.input}
                value={value}
                onChangeText={onChange}
                placeholder="Add title"
                required
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="authorId"
            render={({ field: { value } }) => (
              <Combobox
                label="Author"
                options={authors.map(convertAuthorToPickerItem)}
                selectedValue={value}
                onChange={handleAuthorChange}
                placeholder="Select an author"
                required
                errorMessage={errors.authorId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="publisherId"
            render={({ field: { value } }) => (
              <Combobox
                label="Publisher"
                options={publishers.map(convertPublisherToPickerItem)}
                selectedValue={value}
                onChange={handlePublisherChange}
                dropdownIconColor={iconColor}
                placeholder="Select a publisher"
                mode="dropdown"
                required
                errorMessage={errors.publisherId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="price"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Price"
                placeholder="Add price"
                keyboardType="numeric"
                style={styles.input}
                required
                errorMessage={errors.price?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text style={styles.submitButtonText}>
              {book ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
