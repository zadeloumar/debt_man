// src/screens/seller/StatsScreen.tsx
import React from 'react';
import { View, ScrollView } from 'react-native';
import { Header } from '../../components/common/Header';
import { StatCard } from '../../components/common/StatCard';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<any, 'ShopsList'>;

const ShopsListScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header
        title="Моя статистика"
        subtitle="За текущий месяц"
        showBackButton
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView>
        <View style={{ flexDirection: 'row', padding: 16 }}>
          <StatCard
            value="45"
            label="Клиентов"
            icon={<Ionicons name="people" size={20} color={colors.cream} />}
          />
          <StatCard
            value="1.2М"
            label="Общий долг"
            icon={<Ionicons name="cash" size={20} color={colors.error} />}
          />
          <StatCard
            value="98%"
            label="Выплаты"
            icon={<Ionicons name="trending-up" size={20} color={colors.success} />}
          />
        </View>
      </ScrollView>
    </View>
  );
};