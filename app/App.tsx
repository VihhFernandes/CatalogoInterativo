import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/HomeScreen';
import DetailScreen from './(tabs)/DetailScreen';
import FavoritesScreen from './(tabs)/FavoritesScreen';
import { FavoritesProvider } from './(tabs)/FavoritesContext'; // ajuste o caminho

export type RootStackParamList = {
  Home: undefined;
  Detail: { bookId: string };
  Favorites: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="Favorites" component={FavoritesScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavoritesProvider>
  );
}