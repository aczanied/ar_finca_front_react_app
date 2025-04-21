import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import UserHeader from '../../components/UserHeader';
import AccountCard from '../../components/AccountCard';
import SegmentedSelector from '../../components/SegmentedSelector';

export default function HomeScreen() {
  type GroupKey = 'corrales' | 'loans' | 'credit';

interface AccountItem {
  title: string;
  amount: string;
  icon: string;
  color: string;
}
const [selectedGroup, setSelectedGroup] = useState<GroupKey>('corrales');

  const groups: Record<GroupKey, AccountItem[]> = {
    corrales: [
      { title: 'Engorde', amount: '13', icon: 'fitness-outline', color: '#3C75FF' },
      { title: 'Gestacion', amount: '1', icon: 'female-outline', color: '#3C75FF' },
      { title: 'Maternidad', amount: '1', icon: 'happy-outline', color: '#3C75FF' },
    ],
    loans: [
      { title: 'Loan Account', amount: '$10,421.00', icon: 'cash-outline', color: '#FF5C5C' },
    ],
    credit: [
      { title: 'Credit Card', amount: '$15,324.00', icon: 'card-outline', color: '#F3B340' },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <UserHeader
        userName="Saif Uddin"
        avatarUri="https://i.pravatar.cc/150?img=3"
        onNotificationPress={() => console.log('Notification pressed')}
      />

      <SegmentedSelector
        options={[
          { label: 'Corrales', value: 'corrales' },
          { label: 'Loans', value: 'loans' },
          { label: 'Credit', value: 'credit' },
        ]}
        selected={selectedGroup}
        onChange={setSelectedGroup}
      />

      <View style={styles.cardGrid}>
        {groups[selectedGroup].map((acc, i) => (
          <View style={styles.cardWrapper} key={i}>
          <AccountCard
            title={acc.title}
            amount={acc.amount}
            icon={acc.icon}
            backgroundColor={acc.color}
          />
        </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  cardRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  
  cardWrapper: {
    width: '50%',
    marginBottom: 5,
  },
});