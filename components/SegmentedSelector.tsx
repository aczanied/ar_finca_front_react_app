import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Option {
  label: string;
  value: string;
}

interface SegmentedSelectorProps {
  options: Option[];
  selected: string;
  onChange: (value: string) => void;
}

const SegmentedSelector: React.FC<SegmentedSelectorProps> = ({ options, selected, onChange }) => {
  return (
    <View style={styles.container}>
      {options.map((option) => {
        const isSelected = option.value === selected;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[styles.item, isSelected && styles.selected]}
          >
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  selected: {
    backgroundColor: '#D8C9FF',
  },
  label: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#4A1EC6',
  },
});

export default SegmentedSelector;