// 📁 screens/CreatePigScreen.tsx
import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import api from '../../../api/api';

export default function CreatePigScreen() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);

  const [form, setForm] = useState({
    code: '',
    name: '',
    lotId: 'L001',
    type: 'ENGORDE',
    sex: 'MACHO',
    breed: '',
    origin: 'COMPRA',
    entryDate: '',
    mother: 'DESCONOCIDO',
    father: 'DESCONOCIDO',
    status: 'ACTIVO'
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/pigs', form);
      Alert.alert('Éxito', 'Cerdo registrado correctamente');
      setForm({
        code: '',
        name: '',
        lotId: 'L001',
        type: 'ENGORDE',
        sex: 'MACHO',
        breed: '',
        origin: 'COMPRA',
        entryDate: '',
        mother: 'DESCONOCIDO',
        father: 'DESCONOCIDO',
        status: 'ACTIVO'
      });
      scrollRef.current?.scrollTo({ y: 0, animated: true });
    } catch (err) {
      Alert.alert('Error', 'No se pudo registrar el cerdo');
    }
  };

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={styles.container}>
      <Text style={styles.label}>Código</Text>
      <TextInput style={styles.input} value={form.code} onChangeText={(text) => handleChange('code', text)} />

      <Text style={styles.label}>Nombre</Text>
      <TextInput style={styles.input} value={form.name} onChangeText={(text) => handleChange('name', text)} />

      <Text style={styles.label}>Lote</Text>
      <TextInput style={styles.input} value={form.lotId} onChangeText={(text) => handleChange('lotId', text)} />

      <Text style={styles.label}>Tipo</Text>
      <Picker selectedValue={form.type} onValueChange={(value) => handleChange('type', value)}>
        <Picker.Item label="Engorde" value="ENGORDE" />
        <Picker.Item label="Reproductor" value="REPRODUCTOR" />
      </Picker>

      <Text style={styles.label}>Sexo</Text>
      <Picker selectedValue={form.sex} onValueChange={(value) => handleChange('sex', value)}>
        <Picker.Item label="Macho" value="MACHO" />
        <Picker.Item label="Hembra" value="HEMBRA" />
      </Picker>

      <Text style={styles.label}>Raza</Text>
      <TextInput style={styles.input} value={form.breed} onChangeText={(text) => handleChange('breed', text)} />

      <Text style={styles.label}>Origen</Text>
      <Picker selectedValue={form.origin} onValueChange={(value) => handleChange('origin', value)}>
        <Picker.Item label="Compra" value="COMPRA" />
        <Picker.Item label="Nacimiento" value="NACIMIENTO" />
      </Picker>

      <Text style={styles.label}>Fecha ingreso</Text>
      <TextInput style={styles.input} value={form.entryDate} onChangeText={(text) => handleChange('entryDate', text)} placeholder="YYYY-MM-DD" />

      <Text style={styles.label}>Madre</Text>
      <TextInput style={styles.input} value={form.mother} onChangeText={(text) => handleChange('mother', text)} />

      <Text style={styles.label}>Padre</Text>
      <TextInput style={styles.input} value={form.father} onChangeText={(text) => handleChange('father', text)} />

      <Button title="Registrar Cerdo" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
});