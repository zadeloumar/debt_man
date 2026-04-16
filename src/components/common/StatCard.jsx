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
    backgroundColor: '#08213E',
    padding: spacing.md,
    borderRadius: 18,
    marginHorizontal: spacing.xs,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.25)',
    minHeight: 94,
    justifyContent: 'space-between',
  },
  value: {
    color: colors.cream,
    fontSize: 20,
    fontWeight: '700',
  },
  label: {
    color: colors.gray,
    marginTop: 4,
    fontSize: 12,
    lineHeight: 16,
  },
});
