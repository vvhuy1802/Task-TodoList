import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SignInContextProvider } from './src/context/authContext';
import RootNavigation from './src/Navigation/RootNavigation';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications
console.disableYellowBox = true;

export default function App() {
  return (
    <SignInContextProvider>
    <View style={{ flex: 1 }}>
      <RootNavigation />
    </View>
  </SignInContextProvider>
  );
}

