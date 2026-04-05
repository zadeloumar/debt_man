import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const StatCard = ({ value, label, color }) => {
  return (
    <View style={styles.card}>
      <Text style={[styles.value, color ? { color } : null]} numberOfLines={1}>
        {value}
      </Text>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.navyBlue,
    padding: spacing.md,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
  },
  value: {
    color: colors.cream,
    fontSize: 18,
    fontWeight: '700',
  },
  label: {
    color: colors.gray,
    marginTop: 4,
    fontSize: 12,
  },
});
