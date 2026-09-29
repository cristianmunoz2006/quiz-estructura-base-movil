import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import FormField from '../components/FormField';
import { userService } from '../../application/userService';
import { User } from '../../domain/user';

export default function UserScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(userService.list());
  }, []);

  const handleSave = () => {
    try {
      userService.register({ name, email, password });
      setName('');
      setEmail('');
      setPassword('');
      setUsers(userService.list());
      Alert.alert('Listo', 'Usuario registrado');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de usuarios</Text>
      <FormField label="Nombre" value={name} onChangeText={setName} autoCapitalize="words" />
      <FormField label="Correo" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <FormField label="Contraseña" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Guardar" onPress={handleSave} />

      <FlatList
        style={styles.list}
        data={users}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No hay usuarios registrados</Text>}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.email}
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
