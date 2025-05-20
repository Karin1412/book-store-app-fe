import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Customer } from "@/types/customer";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  customer: Customer;
  onGoToDetails?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function CustomerItem({
  customer,
  onGoToDetails,
  onDelete,
}: Props) {
  const iconColor = useThemeColor({}, "icon");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const textSecondaryColor = useThemeColor({}, "textSecondary");

  const handleGotoDetails = () => {
    if (onGoToDetails) onGoToDetails(customer.id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(customer.id);
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
    phone: {
      fontSize: 14,
      fontWeight: "400",
      color: textSecondaryColor,
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
          {customer.name}
        </ThemedText>
        <Text style={styles.phone} numberOfLines={2} ellipsizeMode="tail">
          {customer.phone}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleDelete} style={styles.actionButton}>
          <Ionicons name="trash" size={20} color={iconColor} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleGotoDetails}
          style={styles.actionButton}
        >
          <Ionicons name="eye" size={20} color={iconColor} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
