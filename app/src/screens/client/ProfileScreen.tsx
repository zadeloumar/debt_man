// src/screens/client/ProfileScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Header } from '../../components/common/Header';
import { MenuItem } from '../../components/common/MenuItem';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<any, 'ShopsList'>;

const ShopsListScreen: React.FC<Props> = ({ navigation }) => {
  const profileActions = [
    {
      title: 'Личные данные',
      icon: <Ionicons name="person" size={24} color={colors.lightBlue} />,
    },
    {
      title: 'Настройки уведомлений',
      icon: <Ionicons name="notifications" size={24} color={colors.warning} />,
    },
    {
      title: 'Безопасность',
      icon: <Ionicons name="lock-closed" size={24} color={colors.success} />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header
        title="Мой профиль"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <View style={{ padding: 16 }}>
        {profileActions.map((action, index) => (
          <MenuItem
            key={index}
            title={action.title}
            icon={action.icon}
            onPress={() => {}}
          />
        ))}
      </View>
    </View>
  );
};