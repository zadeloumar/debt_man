import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoRotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const rotateAnimation = Animated.loop(
      Animated.timing(logoRotation, {
        toValue: 1,
        duration: 4000, // Сделал вращение чуть спокойнее
        useNativeDriver: true,
      })
    );

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 15,
        friction: 8,
        useNativeDriver: true,
      }),
      rotateAnimation,
    ]).start();
  }, []);

  const rotateInterpolate = logoRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      // Используем твои темные цвета для глубокого фона
      colors={['#021526', '#03346E']}
      style={styles.container}
    >
      {/* Анимированный логотип */}
      <Animated.View
        style={[
          styles.logoContainer,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { rotate: rotateInterpolate },
            ],
          },
        ]}
      >
        <View style={styles.logoCircle}>
          <Text style={styles.logoText}>🏦</Text> 
        </View>
      </Animated.View>

      {/* Название приложения */}
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Text style={styles.appName}>Долг Контроль</Text>
        <Text style={styles.appSubtitle}>
          Учет задолженностей для сельских магазинов
        </Text>
      </Animated.View>

      {/* Индикатор загрузки */}
      <View style={styles.loadingContainer}>
        <View style={styles.loadingDots}>
          {[0, 1, 2].map((i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  opacity: fadeAnim,
                  backgroundColor: '#E2E2B6', // Используем твой бежевый акцент
                },
              ]}
            />
          ))}
        </View>
        <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
          Загрузка данных...
        </Animated.Text>
      </View>

      {/* Футер */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>
          © 2026 Сельские магазины • Версия 1.0.0
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: 'rgba(110, 172, 218, 0.1)', // Прозрачный голубой #6EACDA
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6EACDA', // Твой голубой для рамки
  },
  logoText: {
    fontSize: 60,
  },
  appName: {
    fontSize: 34,
    fontWeight: '900',
    color: '#E2E2B6', // Твой бежевый (светлый акцент)
    letterSpacing: 1,
    marginBottom: 10,
  },
  appSubtitle: {
    fontSize: 16,
    color: '#6EACDA', // Твой голубой
    textAlign: 'center',
    maxWidth: '85%',
    lineHeight: 22,
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 110,
    alignItems: 'center',
  },
  loadingDots: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 6,
  },
  loadingText: {
    color: 'rgba(226, 226, 182, 0.6)', // Приглушенный бежевый
    fontSize: 13,
    letterSpacing: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
  },
  footerText: {
    color: 'rgba(110, 172, 218, 0.4)', // Приглушенный голубой
    fontSize: 11,
    fontWeight: '400',
  },
});
