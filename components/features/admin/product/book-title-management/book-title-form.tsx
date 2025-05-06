import Combobox, { PickerItem } from "@/components/common/combobox";
import Input from "@/components/common/input";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { mockAuthors } from "@/mocks/author";
import { mockCategories } from "@/mocks/category";
import { Author } from "@/types/author";
import { BookTitle } from "@/types/book";
import { Category } from "@/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SafeAreaView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { bookTitleFormConfig } from "./book-title-form.config";
import {
  convertAuthorToPickerItem,
  convertCategoryToPickerItem,
} from "./book-title-form.utils";

interface Props {
  bookTitle?: BookTitle | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (bookTitle: BookTitle) => Promise<any>;
}

type FormData = {
  title: string;
  authorId: string;
  categoryId: string;
  description: string;
};

export default function BookTitleDetailForm({
  bookTitle,
  style,
  onSubmit,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(bookTitleFormConfig.schema),
    defaultValues: bookTitleFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  const [authors, setAuthors] = useState<Author[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getAuthor = (id: string) => {
    return mockAuthors.find((author) => author.id === id) || null;
  };

  const getCategory = (id: string) => {
    return mockCategories.find((category) => category.id === id) || null;
  };

  const fetchAuthors = () => {
    setAuthors(mockAuthors);
  };

  const fetchCategories = () => {
    setCategories(mockCategories);
  };

  const resetFormData = (bookTitle?: BookTitle) => {
    if (!bookTitle) return;
    setValue("title", bookTitle.name);
    setValue("authorId", bookTitle.author.id);
    setValue("categoryId", bookTitle.category.id);
    setValue("description", bookTitle.description);
  };

  const handleAuthorChange = (itemValue: PickerItem) => {
    const authorId = itemValue.value;
    setValue("authorId", getAuthor(authorId)?.id || "");
  };

  const handleCategoryChange = (itemValue: PickerItem) => {
    const categoryId = itemValue.value;
    setValue("categoryId", getCategory(categoryId)?.id || "");
  };

  const handleSubmitForm = (data: FormData) => {
    const selectedAuthor = getAuthor(data.authorId);
    const selectedCategory = getCategory(data.categoryId);

    console.log("Selected Author:", selectedAuthor);
    console.log("Selected Category:", selectedCategory);

    if (!selectedAuthor || !selectedCategory) return;

    // Create book object
    const newBookTitle: BookTitle = {
      id: bookTitle ? bookTitle.id : Date.now().toString(),
      name: data.title,
      author: selectedAuthor,
      category: selectedCategory,
      isActive: bookTitle ? bookTitle.isActive : true,
      description: data.description,
    };
    if (onSubmit) {
      const res = onSubmit(newBookTitle);
      res.finally(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (bookTitle) resetFormData(bookTitle);
  }, [bookTitle]);

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
        <View style={styles.formSection}>
          <Controller
            control={control}
            name="title"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Title"
                placeholder="Add title"
                style={styles.input}
                required
                errorMessage={errors.title?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="categoryId"
            render={({ field: { value } }) => (
              <Combobox
                label="Category"
                options={categories.map(convertCategoryToPickerItem)}
                selectedValue={value}
                onChange={handleCategoryChange}
                dropdownIconColor={iconColor}
                placeholder="Select a category"
                mode="dropdown"
                required
                errorMessage={errors.categoryId?.message}
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
                dropdownIconColor={iconColor}
                placeholder="Select an author"
                mode="dropdown"
                required
                errorMessage={errors.authorId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Description"
                placeholder="Add description"
                style={styles.input}
                errorMessage={errors.description?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text style={styles.submitButtonText}>
              {bookTitle ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
