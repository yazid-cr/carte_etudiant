import React from 'react';
import { SafeAreaView, View, FlatList, Text, Alert, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

const products = [
  {
    id: 'p1',
    title: 'Sneakers Running',
    price: '120€',
    description: 'Chaussures légères pour le running urbain.',
    image: 'https://cdn-images.farfetch-contents.com/12/96/03/49/12960349_13486594_1000.jpg'
  },
  {
    id: 'p2',
    title: 'Casque Bluetooth',
    price: '59€',
    description: 'Casque confortable avec réduction de bruit.',
    image: 'https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0005760805_1.jpeg'
  },
  {
    id: 'p3',
    title: 'Apple Watch serie 10',
    price: '250€',
    description: 'Suivi d\'activité et notifications intelligentes.',
    image: 'https://uno.ma/pub/media/catalog/product/cache/af8d7fd2c4634f9c922fba76a4a30c04/l/d/ld0006167622.jpg'
  },
  {
    id: 'p4',
    title: 'banane nike',
    price: '49€',
    description: 'Grand volume, résistant à l\'eau.',
    image: 'https://boutique.angers-sco.fr/cdn/shop/files/banane-petite.jpg?v=1724846865'
  }
];

export default function ProductsScreen() {
  const handleBuy = (product) => {
    Alert.alert('Achat', `Vous avez choisi: ${product.title}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Produits</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onBuy={handleBuy} />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: 16,
    marginLeft: 16,
    marginBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  }
});