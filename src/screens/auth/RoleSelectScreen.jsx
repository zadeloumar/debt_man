import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function RoleSelectScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <TouchableOpacity onPress={() => navigation.navigate('ApiSave')} ><Text style={styles.kicker}>Debt Manager</Text></TouchableOpacity>
        <Text style={styles.title}>Выберите режим входа</Text>
      </View>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SellerLogin')}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="storefront-outline" size={22} color={colors.cream} />
        </View>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Продавец</Text>
          <Text style={styles.buttonHint}>Управление долгами и клиентами</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.cream} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.clientButton]}
        onPress={() => navigation.navigate('ClientPhone')}
      >
        <View style={[styles.iconWrap, styles.clientIconWrap]}>
          <Ionicons name="wallet-outline" size={22} color={colors.darkBlue} />
        </View>
        <View style={styles.buttonContent}>
          <Text style={[styles.buttonText, styles.clientButtonText]}>Покупатель</Text>
          <Text style={[styles.buttonHint, styles.clientButtonHint]}>Проверка долгов по номеру телефона</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.darkBlue} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.adminButton]}
        onPress={() => navigation.navigate('AdminLogin')}
      >
        <View style={[styles.iconWrap, styles.adminIconWrap]}>
          <Ionicons name="shield-checkmark-outline" size={22} color={colors.cream} />
        </View>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Администратор</Text>
          <Text style={styles.buttonHint}>Пользователи, статистика, полный контроль</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.cream} />
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    padding: spacing.lg,
  },
  hero: {
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  kicker: {
    color: colors.lightBlue,
    textTransform: 'uppercase',
    padding: spacing.sm,
    letterSpacing: 1,
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.cream,
    marginBottom: spacing.sm,
  },
  subtitle: {
    color: colors.gray,
    lineHeight: 22,
    fontSize: 15,
  },
  label: {
    color: colors.cream,
    marginBottom: spacing.xs,
    fontSize: 14,
    fontWeight: '600',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.navyBlue,
    padding: spacing.lg,
    borderRadius: 22,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(110, 172, 218, 0.35)',
  },
  clientButton: {
    backgroundColor: colors.lightBlue,
    borderColor: colors.cream,
  },
  adminButton: {
    backgroundColor: '#08213E',
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(226, 226, 182, 0.12)',
    marginRight: spacing.md,
  },
  clientIconWrap: {
    backgroundColor: 'rgba(2, 21, 38, 0.1)',
  },
  adminIconWrap: {
    backgroundColor: 'rgba(110, 172, 218, 0.18)',
  },
  buttonContent: {
    flex: 1,
  },
  buttonText: {
    fontSize: 18,
    color: colors.cream,
    fontWeight: '700',
  },
  buttonHint: {
    marginTop: spacing.xs,
    color: colors.gray,
    fontSize: 13,
    lineHeight: 18,
  },
  clientButtonText: {
    color: colors.darkBlue,
  },
  clientButtonHint: {
    color: '#143355',
  },
});
