import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, View } from 'react-native';
import { initDatabase } from './infrastructure/database/database';
import UserScreen from './presentation/users/UserScreen';
import ProductScreen from './presentation/products/ProductScreen';
import PersonScreen from './presentation/persons/PersonScreen';

// Se crean las tablas antes de mostrar cualquier pantalla
initDatabase();

type Tab = 'users' | 'products' | 'persons';

export default function Main() {
  const [tab, setTab] = useState<Tab>('users');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.menu}>
        <Button title="Usuarios" onPress={() => setTab('users')} />
        <Button title="Productos" onPress={() => setTab('products')} />
        <Button title="Personas" onPress={() => setTab('persons')} />
      </View>

      {tab === 'users' && <UserScreen />}
      {tab === 'products' && <ProductScreen />}
      {tab === 'persons' && <PersonScreen />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 30 },
  menu: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 8 },
});
