import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFavorites } from './FavoritesContext';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

export default function FavoritesScreen() {
  const { favorites } = useFavorites();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  if (favorites.length === 0) {
    return <Text style={styles.empty}>Nenhum livro favoritado ainda.</Text>;
  }

  return (
    <FlatList
      data={favorites}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('Detail', { bookId: item.id })}
        >
          {item.volumeInfo.imageLinks?.thumbnail && (
            <Image source={{ uri: item.volumeInfo.imageLinks.thumbnail }} style={styles.thumbnail} />
          )}
          <Text style={styles.title}>{item.volumeInfo.title}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  empty: {
    padding: 20,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  thumbnail: {
    width: 50,
    height: 75,
    marginRight: 12,
  },
  title: {
    fontSize: 16,
  },
});
