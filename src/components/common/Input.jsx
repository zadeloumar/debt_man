import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export const Input = ({ style, ...props }) => {
  return <TextInput style={[styles.input, style]} placeholderTextColor={colors.gray} {...props} />;
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.navyBlue,
    color: colors.cream,
    padding: spacing.md,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
});
