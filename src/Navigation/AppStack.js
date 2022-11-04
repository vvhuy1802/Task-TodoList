import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{
          headerShown: false,
        }}
        component={HomeScreen}
      />
    </Stack.Navigator>
  );
}
