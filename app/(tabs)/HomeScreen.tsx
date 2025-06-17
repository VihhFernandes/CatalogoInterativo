import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Book = {
  id: string;
  volumeInfo: {
    title: string;
    imageLinks?: {
      thumbnail?: string;
    };
  };
};

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBooks = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=10`
      );
      const data = await response.json();
      setBooks(data.items || []);
    } catch (error) {
      console.error('Erro ao buscar livros', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔍 Pesquise seus livros favoritos</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Digite título ou autor"
          style={styles.input}
          value={query}
          onChangeText={setQuery}
        />
        <TouchableOpacity style={styles.button} onPress={fetchBooks}>
          <Text style={styles.buttonText}>Buscar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.favButton}
        onPress={() => navigation.navigate('Favorites')}
      >
        <Text style={styles.favButtonText}>❤️ Ver Favoritos</Text>
      </TouchableOpacity>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingTop: 10 }}
          data={books}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('Detail', { bookId: item.id })}
              activeOpacity={0.7}
            >
              {item.volumeInfo.imageLinks?.thumbnail ? (
                <Image
                  source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
              ) : (
                <View style={[styles.thumbnail, styles.noImage]}>
                  <Text style={{ color: '#888' }}>Sem imagem</Text>
                </View>
              )}
              <Text style={styles.bookTitle} numberOfLines={2}>
                {item.volumeInfo.title}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            !loading && (
              <Text style={styles.emptyText}>
                Nenhum livro encontrado. Faça uma busca para começar!
              </Text>
            )
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f7',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 16,
    height: 40,
  },
  input: {
    flex: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  favButton: {
    alignSelf: 'center',
    backgroundColor: '#ffcccb',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 12,
  },
  favButtonText: {
    fontWeight: 'bold',
    color: '#b30000',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 14,
    borderRadius: 15,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  thumbnail: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#ddd',
  },
  noImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookTitle: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#222',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 40,
    fontSize: 16,
  },
});
