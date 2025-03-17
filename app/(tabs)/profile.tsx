import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../_layout';
export default function ProfileScreen() {
  const { signOut } = useAuth();
  return (
    <View><Text>Profile</Text></View>
  );
}
