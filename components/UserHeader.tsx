import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface UserHeaderProps {
  userName: string;
  avatarUri?: string;
  onNotificationPress?: () => void;
}

const UserHeader: React.FC<UserHeaderProps> = ({ userName, avatarUri, onNotificationPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: avatarUri || 'https://i.pravatar.cc/150?img=1' }}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text style={styles.welcome}>Welcome Back 👋</Text>
          <Text style={styles.name}>{userName}</Text>
        </View>
      </View>

      <TouchableOpacity onPress={onNotificationPress}>
        <View style={styles.notification}>
          <Ionicons name="notifications-outline" size={22} color="#000" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  textContainer: {
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 14,
    color: '#888',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  notification: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 12,
  },
});

export default UserHeader;