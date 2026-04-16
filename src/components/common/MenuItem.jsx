import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const MenuItem = ({ title, description, icon, badge, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.icon}>{icon || null}</View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description} numberOfLines={1}>
            {description}
          </Text>
        ) : null}
      </View>
      {badge !== undefined ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#08213E',
    padding: spacing.md,
    borderRadius: 18,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.22)',
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
    backgroundColor: 'rgba(110, 172, 218, 0.12)',
  },
  content: {
    flex: 1,
  },
  title: {
    color: colors.cream,
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    color: colors.gray,
    marginTop: 2,
    fontSize: 13,
  },
  badge: {
    backgroundColor: colors.darkBlue,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 999,
    marginLeft: spacing.sm,
  },
  badgeText: {
    color: colors.cream,
    fontSize: 12,
    fontWeight: '600',
  },
});
