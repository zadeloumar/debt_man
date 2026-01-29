// src/components/navigation/BottomNav.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface BottomNavItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

interface BottomNavProps {
  items: BottomNavItem[];
  activeItem: string;
  onItemPress: (id: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  activeItem,
  onItemPress,
}) => {
  return (
    <View style={styles.container}>
      {items.map((item) => {
        const isActive = activeItem === item.id;
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => onItemPress(item.id)}
          >
            <Ionicons
              name={item.icon}
              size={24}
              color={isActive ? colors.lightBlue : colors.gray}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {item.label}
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
    backgroundColor: colors.navyBlue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: 11,
    color: colors.gray,
    marginTop: 2,
    fontWeight: '500',
  },
  labelActive: {
    color: colors.lightBlue,
  },
});