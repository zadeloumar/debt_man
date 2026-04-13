import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const Header = ({ title, showBackButton = false, onBackPress, rightButton, leftButton }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBackButton ? (
          <TouchableOpacity onPress={onBackPress} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Ionicons name="arrow-back" size={22} color={colors.cream} />
          </TouchableOpacity>
        ) : leftButton ? (
          leftButton
        ) : null}
      </View>
      <Text style={styles.title} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.right}>{rightButton || null}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.navyBlue,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkBlue,
  },
  left: { width: 40, alignItems: 'flex-start', justifyContent: 'center' },
  title: { flex: 1, color: colors.cream, fontSize: 18, fontWeight: '600', textAlign: 'center' },
  right: { width: 40, alignItems: 'flex-end', justifyContent: 'center' },
});