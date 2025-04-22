// 📁 components/FloatingMenu.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface Action {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const FloatingMenu: React.FC<{ actions: Action[] }> = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      {open &&
        actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { bottom: 80 + index * 70 }]}
            onPress={() => {
              action.onPress();
              setOpen(false);
            }}
          >
            <View style={styles.innerContent}>
              <Ionicons name={action.icon} size={22} color="#fff" style={{ marginRight: 10 }} />
              <Text style={styles.label}>{action.label}</Text>
            </View>
          </TouchableOpacity>
        ))}

      <TouchableOpacity style={styles.fab} onPress={() => setOpen(!open)}>
        <Ionicons name={open ? 'close' : 'add'} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    zIndex: 999,
  },
  fab: {
    backgroundColor: '#4A1EC6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  actionButton: {
    position: 'absolute',
    left: -60,
    right: -60,
    backgroundColor: '#333',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
  },
  innerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default FloatingMenu;
