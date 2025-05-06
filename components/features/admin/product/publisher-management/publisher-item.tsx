import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Category } from "@/types/category";
import { Publisher } from "@/types/publisher";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
  publisher: Publisher;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function PublisherItem({ publisher, onEdit, onDelete }: Props) {
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const handleEdit = () => {
    if (onEdit) onEdit(publisher.id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(publisher.id);
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    info: {
      flex: 1,
      marginLeft: 15,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: tintColor,
    },
    actions: {
      flexDirection: "row",
      alignItems: "center",
    },
    actionButton: {
      padding: 8,
      marginLeft: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <ThemedText style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {publisher.name}
        </ThemedText>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleEdit} style={styles.actionButton}>
          <Ionicons name="pencil" size={20} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
