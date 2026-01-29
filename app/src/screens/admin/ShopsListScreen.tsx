// src/screens/admin/ShopsListScreen.tsx
import React from 'react';
import { View, FlatList, SafeAreaView, Button,  } from 'react-native';
import { Header } from '../../components/common/Header';
import { MenuItem } from '../../components/common/MenuItem';
import { colors } from '../../theme/colors';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';


type Props = NativeStackScreenProps<any, 'ShopsList'>;

const ShopsListScreen: React.FC<Props> = ({ navigation }) => {
  const shops = [
    { id: '1', name: 'Магазин "У дома"', debt: 120000 },
    { id: '2', name: 'Продукты "Сельские"', debt: 85000 },
    // ...
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.darkBlue }}>
      <Header
        title="Список магазинов"
        showBackButton
        onBackPress={() => navigation.goBack()}
        rightButton={
          <Button title="Добавить" onPress={() => {console.log('Добавить магазин');}} />
        }
      />

      <FlatList
        data={shops}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuItem
            title={item.name}
            description={`Долг: ${item.debt} ₽`}
            icon={<Ionicons name="storefront" size={24} color={colors.lightBlue} />}
            onPress={() => navigation.navigate('ShopDetail', { shopId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};
export default ShopsListScreen;
