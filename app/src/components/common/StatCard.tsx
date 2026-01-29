// src/components/common/StatCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  icon?: React.ReactNode;
  trend?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  color = colors.cream,
  icon,
  trend,
}) => {
  return (
    <View style={styles.container}>
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text style={[styles.value, { color }]}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {trend && <Text style={styles.trend}>{trend}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.navyBlue,
    borderRadius: 12,
    marginHorizontal: spacing.xs,
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  label: {
    fontSize: 12,
    color: colors.lightBlue,
    opacity: 0.9,
    textAlign: 'center',
  },
  trend: {
    fontSize: 10,
    color: colors.success,
    marginTop: 2,
  },
});