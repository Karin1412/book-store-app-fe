import { useAuth } from "@/hooks/useAuth";
import { GetProfile, Login } from "@/services/auth";
import { Role, User } from "@/types/user";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

export default function SignInScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");

  const handleLogin = async () => {
    await Login(email, password).then(async (res) => {
      const token = res.data.accessToken.token;
      return await GetProfile(token).then((profile) => {
        console.log("profile:", profile);
        const user: User = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: email.includes("admin") ? Role.ADMIN : Role.USER,
          phone: profile.phone,
          address: profile.address,
          imgUrl: profile.imgUrl,
          isActive: profile.isActive,
          salt: "",
        };
        login(user, token);
      });
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/login.png")}
          style={styles.image}
        />

        <TextInput
          style={styles.input}
          placeholder="Phone number or email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInText}>Sign In</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.text}>Do not have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/signup")}>
            <Text style={styles.signupText}>Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setForgotPasswordVisible(true)}>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <Modal
          transparent
          visible={forgotPasswordVisible}
          animationType="fade"
          onRequestClose={() => setForgotPasswordVisible(false)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setForgotPasswordVisible(false)}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Account Recovery</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your Email here"
                  placeholderTextColor="#999"
                  value={recoveryEmail}
                  onChangeText={setRecoveryEmail}
                />
                <TouchableOpacity style={styles.recoveryButton}>
                  <Text style={styles.recoveryText}>Get recovery email</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </Pressable>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  signInButton: {
    backgroundColor: "#708cff",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  signInText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    color: "#666",
  },
  signupText: {
    fontSize: 14,
    color: "#708cff",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#708cff",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  recoveryButton: {
    backgroundColor: "#708cff",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 15,
  },
  recoveryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
