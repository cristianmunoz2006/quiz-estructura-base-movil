import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import FormField from '../components/FormField';
import { productService } from '../../application/productService';
import { Product } from '../../domain/product';

export default function ProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    setProducts(productService.list());
  }, []);

  const handleSave = () => {
    try {
      productService.register({ name, price: Number(price), stock: Number(stock) });
      setName('');
      setPrice('');
      setStock('');
      setProducts(productService.list());
      Alert.alert('Listo', 'Producto registrado');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de productos</Text>
      <FormField label="Nombre" value={name} onChangeText={setName} autoCapitalize="sentences" />
      <FormField label="Precio" value={price} onChangeText={setPrice} keyboardType="numeric" />
      <FormField label="Stock" value={stock} onChangeText={setStock} keyboardType="numeric" />
      <Button title="Guardar" onPress={handleSave} />

      <FlatList
        style={styles.list}
        data={products}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No hay productos registrados</Text>}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - ${item.price} - Stock: {item.stock}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  list: { marginTop: 16 },
  item: { paddingVertical: 6, borderBottomWidth: 1, borderColor: '#ddd' },
});
