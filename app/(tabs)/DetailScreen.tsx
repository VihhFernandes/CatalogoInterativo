import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


type DetailRouteProp = RouteProp<RootStackParamList, 'Detail'>;

export default function DetailScreen() {
  const route = useRoute<DetailRouteProp>();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    return <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 50 }} />;
  }

  if (!book) {
    return <Text style={{ padding: 20 }}>Livro não encontrado.</Text>;
  }

  const info = book.volumeInfo;

  return (
    <ScrollView style={styles.container}>
      {/* Botão de voltar */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#333" />
        <Text style={styles.backText}>Voltar</Text>
      </TouchableOpacity>

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
    flex: 1,
    padding: 0, 
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10, 
    backgroundColor: '#ffffff',
  },
  backText: {
    marginLeft: 8,
    fontSize: 17,
    fontWeight: '600',
    color: '#5e60ce', 
  },
  image: {
    width: 150,
    height: 225,
    alignSelf: 'center',
    marginBottom: 20,
    borderRadius: 12, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  authors: {
    fontStyle: 'normal',
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#495057', 
    lineHeight: 24, 
    paddingHorizontal: 20,
    paddingBottom: 30, 
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 30,
    paddingVertical: 14,
    paddingHorizontal: 24,
    backgroundColor: '#e9ecef', 
    borderRadius: 30,
    alignSelf: 'center',

  },
});