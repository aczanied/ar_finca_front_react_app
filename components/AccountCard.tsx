import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface AccountCardProps {
    title: string;
    amount: string;
    icon: keyof typeof Ionicons.glyphMap;
    backgroundColor: string;
    style?: object;
  }

const AccountCard: React.FC<AccountCardProps> = ({ title, amount, icon, backgroundColor, style }) => {
  return (
    <View style={[styles.card, { backgroundColor }, style]}>
      <Ionicons name={icon} size={24} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{amount}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    borderRadius: 20,
    padding: 16,
    justifyContent: 'space-between',
    margin: 8
  },
  title: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  amount: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AccountCard;