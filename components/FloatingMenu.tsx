import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Action {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

const FloatingMenu: React.FC<{ actions: Action[] }> = ({ actions }) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      {open &&
        actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.actionButton, { bottom: 80 + index * 60 }]}
            onPress={() => {
              action.onPress();
              setOpen(false);
            }}
          >
            <Ionicons name={action.icon} size={20} color="#fff" />
            <Text style={styles.label}>{action.label}</Text>
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
    bottom: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  fab: {
    backgroundColor: '#4A1EC6',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    zIndex: 10,
  },
  actionButton: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 5,
  },
  label: {
    color: '#fff',
    marginLeft: 8,
  },
});

export default FloatingMenu;