import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUpScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Text style={styles.headerText}>Be Our Customers</Text>
          <Image source={require('../../assets/images/signup.png')} style={styles.image} />
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email or Phone number"
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

        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.signUpButton} onPress={() => router.replace('/signin')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signInContainer}>
          <Text style={styles.text}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/signin')}>
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  image: {
    width: 180,
    height: 180,
    resizeMode: 'contain',
  },
  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 20,
  },
  signUpButton: {
    backgroundColor: '#708cff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signInContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  text: {
    fontSize: 14,
    color: '#666',
  },
  signInText: {
    fontSize: 14,
    color: '#708cff',
    fontWeight: 'bold',
  },
});

