import React, { createContext, useContext, useState, ReactNode } from 'react';

type Book = any;

type FavoritesContextType = {
  favorites: Book[];
  addToFavorites: (book: Book) => void;
  removeFromFavorites: (bookId: string) => void;
  isFavorite: (bookId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Book[]>([]);

  const addToFavorites = (book: Book) => {
    if (!favorites.some(fav => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookId: string) => {
    setFavorites(favorites.filter(book => book.id !== bookId));
  };

  const isFavorite = (bookId: string) => {
    return favorites.some(book => book.id === bookId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
