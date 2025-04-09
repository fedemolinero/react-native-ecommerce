import React, { useEffect, useState, useCallback } from 'react';
import { FlatList, TouchableOpacity, Alert, StyleSheet, Image, View } from 'react-native';
import axios from 'axios';
import { Product } from '@/types';
import { ThemedText } from '@/components/ThemedText';
import LogoTitle from '@/components/LogoTitle';
import AddToCartIcon from '@/components/icons/addToCartIcon';
import MenuIcon from '@/components/icons/MenuIcon';

const ProductListingScreen = ({ navigation }: { navigation: any }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: 'Welcome',
      headerStyle: { backgroundColor: '#fafafa', borderBottomWidth: 0 },
      headerTitle: () => <MenuIcon />,
      headerRight: () => <LogoTitle />,
    });
    fetchProducts();
  }, [navigation, fetchProducts]);

  const navigateToProductDetails = useCallback(
    (product: Product) => {
      navigation.navigate('ProductDetails', { product });
    },
    [navigation]
  );

  const handleAddToCart = useCallback((product: Product) => {
    Alert.alert('Add to Cart', `Added ${product.brand} to cart`);
    // Implement actual add to cart logic here
  }, []);

  const renderProductItem = useCallback(
    ({ item }: { item: Product }) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => navigateToProductDetails(item)}
        accessibilityLabel={`View details for ${item.brand}`}
      >
        <View style={styles.itemTitle}>
          <ThemedText style={styles.titlePaddedcontent} type="itemTitle">
            {item.brand}
          </ThemedText>
          <Image
            resizeMode='contain'
            style={styles.image} source={{ uri: item.image }} />
        </View>

        <View style={styles.productItem}>
          <ThemedText style={styles.paddedcontent} type="itemTitle">
            ${item.price / 100}
          </ThemedText>
          <TouchableOpacity
            onPress={() => handleAddToCart(item)}
            accessibilityLabel={`Add ${item.brand} to cart`}
          >
            <AddToCartIcon />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    [navigateToProductDetails, handleAddToCart]
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ThemedText>Loading products...</ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.flatlistContent}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
    paddingLeft: 20,
    paddingTop: 20,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 32,
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    margin: 10,
    elevation: 5, // Add for Android to simulate shadow
  },
  itemTitle: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 22,
    paddingTop: 10,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  titlePaddedcontent: {
    paddingBottom: 10,
    textAlign: 'center',
  },
  paddedcontent: {
    paddingLeft: 10,
    textAlign: 'center',
  },
  image: {
    width: 122,
    height: 122,
  },
  flatlistContent: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
});

export default ProductListingScreen;
