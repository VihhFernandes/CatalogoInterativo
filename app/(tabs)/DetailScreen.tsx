import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';

type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const { bookId } = route.params;

  const [book, setBook] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error('Erro ao buscar detalhes do livro:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007BFF" />;
  }

  if (!book) {
    return <Text>Livro não encontrado.</Text>;
  }

  const info = book.volumeInfo;

  return (
    <ScrollView style={styles.container}>
      {info.imageLinks?.thumbnail && (
        <Image source={{ uri: info.imageLinks.thumbnail }} style={styles.image} />
      )}
      <Text style={styles.title}>{info.title}</Text>
      <Text style={styles.authors}>Por: {info.authors?.join(', ') || 'Autor desconhecido'}</Text>
      <Text style={styles.description}>{info.description || 'Sem descrição disponível.'}</Text>

      <TouchableOpacity style={styles.favoriteButton} onPress={() => setFavorito(!favorito)}>
        <Ionicons name={favorito ? 'heart' : 'heart-outline'} size={28} color={favorito ? 'red' : 'gray'} />
        <Text style={{ marginLeft: 8 }}>{favorito ? 'Remover dos Favoritos' : 'Adicionar aos Favoritos'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16 
  },
  image: { 
    width: 120, 
    height: 180, 
    alignSelf: 'center',
    marginBottom: 16 
},
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 8 
},
  authors: { 
    fontStyle: 'italic', 
    marginBottom: 12 
},
  description: { 
    fontSize: 16, 
    color: '#333' 
},
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    padding: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    alignSelf: 'center',
  },
});
