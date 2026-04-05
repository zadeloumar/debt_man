// screens/auth/RoleSelectScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function RoleSelectScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Кто вы?</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SellerLogin')}
      >
        <Text style={styles.buttonText}>Продавец</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.clientButton]}
        onPress={() => navigation.navigate('ClientPhone')}
      >
        <Text style={styles.buttonText}>Покупатель</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.cream,
    marginBottom: spacing.xl,
  },
  button: {
    backgroundColor: colors.navyBlue,
    width: '100%',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightBlue,
  },
  clientButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.cream,
  },
  buttonText: {
    fontSize: 18,
    color: colors.cream,
    fontWeight: '600',
  },
});