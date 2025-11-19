import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProductCard({ product, onBuy }) {
  const imageSource = typeof product.image === 'string' ? { uri: product.image } : product.image;

  return (
    <View style={styles.card}>
      <Image
        source={imageSource}
        style={styles.image}
        resizeMode="cover"
      />

      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>

      <Text style={styles.description} numberOfLines={2}>{product.description}</Text>

      <TouchableOpacity style={styles.buyButton} onPress={() => onBuy(product)}>
        <Text style={styles.buyText}>Acheter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    // shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    // elevation for Android
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111',
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#e91e63',
  },
  description: {
    fontSize: 14,
    color: '#444',
    marginBottom: 12,
  },
  buyButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buyText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});