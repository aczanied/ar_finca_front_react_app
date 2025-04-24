// 📁 screens/// 📁 screens/PigListByTypeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import api from '../../../api/api';
import SegmentedSelector from '@/components/SegmentedSelector';

interface Pig {
  _id: string;
  code: string;
  name: string;
  sex: string;
  currentWeight?: number;
}

interface Lot {
  id: string;
  name: string;
}

export default function PigListByTypeScreen() {
  const { type, status } = useLocalSearchParams();
  const [pigs, setPigs] = useState<Pig[]>([]);
  const [loading, setLoading] = useState(true);
  const [lots, setLots] = useState<Lot[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string>('');
  const [lastQueryKey, setLastQueryKey] = useState<string>('');

  useEffect(() => {
    api.get('/lots')
      .then(res => {
        const allOption = { id: '', name: 'Todos' };
        const updatedLots = [allOption, ...res.data];
        setLots(updatedLots);
        setSelectedGroup(allOption.id);
      })
      .catch(() => setLots([]));
  }, []);

  useEffect(() => {
    if (!type || !status) return;

    const key = `${type}-${status}-${selectedGroup}`;
    if (pigs.length > 0 && lastQueryKey === key) return;

    setLoading(true);
    const url = selectedGroup
      ? `/pigs?type=${type}&status=${status}&lotId=${selectedGroup}`
      : `/pigs?type=${type}&status=${status}`;

    api.get(url)
      .then((res: { data: React.SetStateAction<Pig[]>; }) => {
        setPigs(res.data);
        setLastQueryKey(key);
      })
      .catch(() => setPigs([]))
      .finally(() => setLoading(false));
  }, [type, status, selectedGroup]);

  return (
    <View style={{ flex: 1 }}>
      <SegmentedSelector
        options={lots.map(lot => ({ label: lot.name, value: lot.id }))}
        selected={selectedGroup}
        onChange={(value: string) => setSelectedGroup(value)}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Cerdos: {type}</Text>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 20 }} />
        ) : (
          <FlatList
            data={pigs}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.row}>
                <Text style={styles.index}>{index + 1}.</Text>
                <View style={styles.pigInfo}>
                  <Text style={styles.name}>{item.name || 'Sin nombre'} ({item.code})</Text>
                  <Text style={styles.detail}>Sexo: {item.sex}</Text>
                  {item.currentWeight && <Text style={styles.detail}>Peso: {item.currentWeight} kg</Text>}
                </View>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  index: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
  },
  pigInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  detail: {
    fontSize: 14,
    color: '#555',
  },
});
