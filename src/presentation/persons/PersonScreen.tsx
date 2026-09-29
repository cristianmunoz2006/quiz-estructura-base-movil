import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import FormField from '../components/FormField';
import { personService } from '../../application/personService';
import { Person } from '../../domain/person';

export default function PersonScreen() {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [persons, setPersons] = useState<Person[]>([]);

  useEffect(() => {
    setPersons(personService.list());
  }, []);

  const handleSave = () => {
    try {
      personService.register({ name, document, phone });
      setName('');
      setDocument('');
      setPhone('');
      setPersons(personService.list());
      Alert.alert('Listo', 'Persona registrada');
    } catch (error) {
      Alert.alert('Error', (error as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de personas</Text>
      <FormField label="Nombre" value={name} onChangeText={setName} autoCapitalize="words" />
      <FormField label="Documento" value={document} onChangeText={setDocument} keyboardType="numeric" />
      <FormField label="Teléfono" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <Button title="Guardar" onPress={handleSave} />

      <FlatList
        style={styles.list}
        data={persons}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text>No hay personas registradas</Text>}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.document} - {item.phone}
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
