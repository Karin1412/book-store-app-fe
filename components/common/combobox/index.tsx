import { useThemeColor } from "@/hooks/useThemeColor";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type PickerProps = React.ComponentProps<typeof Picker>;
type Props = {
  label?: string;
  options?: PickerItem[];
  errorMessage?: string;
  required?: boolean;
  onChange?: (selected: PickerItem) => void;
  addNewOptionLabel?: string;
  onAddNewOptionClick?: () => void;
} & PickerProps;
export type PickerItem = {
  label: string;
  value: string;
};

export default function Combobox({
  label,
  options = [],
  onChange,
  errorMessage,
  required,
  placeholder,
  addNewOptionLabel,
  onAddNewOptionClick,
  ...props
}: Props) {
  console.log("errorMessage", errorMessage);
  const handleValueChange = (itemValue: any) => {
    if (itemValue === "") {
      if (addNewOptionLabel && onAddNewOptionClick) {
        return onAddNewOptionClick();
      }
    }

    const itemIndex = options.findIndex((item) => item.value === itemValue);
    if (itemIndex === -1) return;
    if (onChange) onChange(options[itemIndex]);
  };

  const textColor = useThemeColor({}, "text");
  const textSecondaryColor = useThemeColor({}, "textSecondary");
  const iconColor = useThemeColor({}, "icon");
  const borderColor = useThemeColor({}, "border");

  const styles = StyleSheet.create({
    inputContainer: {
      marginBottom: 25,
    },
    label: {
      color: textColor,
      fontSize: 14,
      marginBottom: 5,
    },
    labelRequiredIcon: {
      color: "red",
      fontSize: 14,
    },
    pickerContainer: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: borderColor,
      zIndex: 1000,
    },
    androidPickerContainer: {
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
    },
    androidPicker: {
      color: textColor,
    },
    errorMessage: {
      color: "red",
      fontSize: 12,
      marginTop: 5,
    },
    placeholder: {
      color: textSecondaryColor,
    },
  });

  return (
    <View style={styles.inputContainer}>
      {label && (
        <Text style={styles.label}>
          {label} {required && <Text style={styles.labelRequiredIcon}>*</Text>}
        </Text>
      )}
      <View style={styles.androidPickerContainer}>
        <Picker
          onMagicTap={() => {
            console.log("Picker tapped!");
          }}
          style={styles.androidPicker}
          dropdownIconColor={iconColor}
          mode="dropdown"
          onValueChange={handleValueChange}
          {...props}
        >
          {addNewOptionLabel ? (
            <Picker.Item
              key="add-option"
              label={addNewOptionLabel}
              value=""
              style={styles.placeholder}
            />
          ) : (
            <Picker.Item
              key="default-option"
              label={placeholder}
              value=""
              style={styles.placeholder}
            />
          )}
          {options.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
            />
          ))}
        </Picker>
      </View>
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}
