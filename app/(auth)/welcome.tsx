import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/images/welcome.png')} style={styles.image} />

      <Text style={styles.title}>Hello, welcome!!!</Text>

      <Text style={styles.description}>
        Welcome to my app, try it for your benefit
      </Text>

      <TouchableOpacity style={styles.signUpButton} onPress={() => router.push('/signup')}>
        <Text style={styles.signUpText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/signin')}>
        <Text style={styles.loginText}>Log In</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: '#708cff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  signUpText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginButton: {
    borderWidth: 1,
    borderColor: '#708cff',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
  },
  loginText: {
    color: '#708cff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
