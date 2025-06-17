import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/HomeScreen';
import DetailScreen from './(tabs)/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: { bookId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Catálogo de Livros' }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Detalhes do Livro' }} />
    </Stack.Navigator>
  );
}
