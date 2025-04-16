import { useThemeColor } from "@/hooks/useThemeColor";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type TextInputProps = React.ComponentProps<typeof TextInput>;
type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  label?: string;
  errorMessage?: string;
  required?: boolean;
} & TextInputProps;

export default function Input({
  containerStyle,
  labelStyle,
  inputStyle,
  label,
  errorMessage,
  required,
  ...props
}: Props) {
  const textColor = useThemeColor({}, "text");
  const textSecondaryColor = useThemeColor({}, "textSecondary");
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
    input: {
      borderBottomWidth: 1,
      borderBottomColor: borderColor,
      paddingVertical: 8,
      fontSize: 16,
      color: textColor,
    },
    errorMessage: {
      color: "red",
      fontSize: 12,
      marginTop: 5,
    },
  });
  return (
    <View style={[styles.inputContainer, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label} {required && <Text style={styles.labelRequiredIcon}>*</Text>}
        </Text>
      )}
      <TextInput
        style={[styles.input, inputStyle]}
        placeholderTextColor={textSecondaryColor}
        {...props}
      />
      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
    </View>
  );
}
