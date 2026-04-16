import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const Button = ({ title, onPress, disabled = false }) => {
  const isString = typeof title === 'string' || typeof title === 'number';
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled]}
      activeOpacity={0.8}
    >
      {isString ? <Text style={styles.text}>{title}</Text> : title}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.lightBlue,
    paddingVertical: spacing.md,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 54,
    borderWidth: 1,
    borderColor: 'rgba(2, 21, 38, 0.08)',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  text: {
    color: colors.darkBlue,
    fontWeight: '700',
    fontSize: 16,
  },
});
