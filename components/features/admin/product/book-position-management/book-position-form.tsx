import Combobox, { PickerItem } from "@/components/common/combobox";
import Input from "@/components/common/input";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme.web";
import { useThemeColor } from "@/hooks/useThemeColor";
import { showSuccessMessage } from "@/libs/react-native-toast-message/toast";
import { mockBookTitles } from "@/mocks/book-title";
import { BookPosition, BookTitle } from "@/types/book";
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
import { convertBookTitleToPickerItem } from "../book-management/book-detail-form.utils";
import { bookPositionFormConfig } from "./book-position-form.config";

interface Props {
  bookPosition?: BookPosition | null;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (bookPosition: BookPosition) => Promise<any>;
}

type FormData = {
  bookTitleId: string;
  zone: string;
  shelf: string;
  row: string;
  note: string;
};

export default function BookPositionDetailForm({
  bookPosition,
  style,
  onSubmit,
}: Props) {
  const form = useForm<FormData>({
    resolver: zodResolver(bookPositionFormConfig.schema),
    defaultValues: bookPositionFormConfig.defaultValues,
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;
  const [bookTitles, setBookTitles] = useState<BookTitle[]>([]);

  const getBookTitle = (id: string) => {
    return bookTitles.find((bookTitle) => bookTitle.id === id) || null;
  };

  const fetchBookTitles = () => {
    setBookTitles(mockBookTitles);
  };

  const resetFormData = (bookPosition?: BookPosition) => {
    if (!bookPosition) return;
    setValue("bookTitleId", bookPosition.bookTitle.id);
    setValue("zone", bookPosition.zone);
    setValue("shelf", bookPosition.shelf);
    setValue("row", bookPosition.row);
    setValue("note", bookPosition.note);
  };

  const handleBookTitleChange = (itemValue: PickerItem) => {
    const bookTitleId = itemValue.value;
    setValue("bookTitleId", getBookTitle(bookTitleId)?.id || "");
  };

  const handleSubmitForm = (data: FormData) => {
    const selectedBookTitle = getBookTitle(data.bookTitleId);

    if (!selectedBookTitle) return;

    // Create book object
    const newBookPosition: BookPosition = {
      id: bookPosition ? bookPosition.id : Date.now().toString(),
      bookTitle: selectedBookTitle,
      zone: data.zone,
      shelf: data.shelf,
      row: data.row,
      note: data.note,
    };
    if (onSubmit) {
      const res = onSubmit(newBookPosition);
      res.finally(() => showSuccessMessage("Successfully!"));
    }
  };

  useEffect(() => {
    fetchBookTitles();
  }, []);

  useEffect(() => {
    if (bookPosition) resetFormData(bookPosition);
  }, [bookPosition]);

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
            name="bookTitleId"
            render={({ field: { value } }) => (
              <Combobox
                label="Book title"
                options={bookTitles.map(convertBookTitleToPickerItem)}
                selectedValue={value}
                onChange={handleBookTitleChange}
                dropdownIconColor={iconColor}
                placeholder="Select a book title"
                mode="dropdown"
                required
                errorMessage={errors.bookTitleId?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="zone"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Zone"
                placeholder="Add zone"
                style={styles.input}
                errorMessage={errors.zone?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="shelf"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Shelf"
                placeholder="Add shelf"
                style={styles.input}
                errorMessage={errors.shelf?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="row"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Row"
                placeholder="Add row"
                style={styles.input}
                errorMessage={errors.row?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="note"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                label="Note"
                placeholder="Add note"
                style={styles.input}
                errorMessage={errors.note?.message}
              />
            )}
          />

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit(handleSubmitForm)}
          >
            <Text style={styles.submitButtonText}>
              {bookPosition ? "Update" : "Add"}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
