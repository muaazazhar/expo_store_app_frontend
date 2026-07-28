import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { AuthSessionValidator } from '@/components/auth-session-validator';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useThemePreference } from '@/context/ThemePreferenceContext';
import { useAppSelector } from '@/store/hooks';

const isWeb = Platform.OS === 'web';

export default function TabLayout() {
  const { resolvedTheme } = useThemePreference();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <View style={[styles.root, isWeb && styles.rootWeb]}>
      {user?.role !== 'admin' ? <AuthSessionValidator /> : null}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[resolvedTheme].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          // Web: keep each tab scene filling the viewport so screens swap
          // instead of stacking vertically in the document flow.
          ...(isWeb ? { sceneStyle: styles.webScene } : null),
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Browse',
            href: user?.role === 'admin' ? null : '/(tabs)/explore',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="square.grid.2x2.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            href: user?.role === 'admin' ? null : '/(tabs)/cart',
            tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart.fill" color={color} />,
          }}
        />
        <Tabs.Screen
          name="orders"
          options={{
            title: 'Orders',
            href: null,
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="list.bullet.clipboard.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            href: user?.role === 'admin' ? null : '/(tabs)/wallet',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="wallet.pass.fill" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: 'Account',
            href: user?.role === 'admin' ? null : '/(tabs)/account',
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.crop.circle.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  rootWeb: {
    height: '100%',
    maxHeight: '100%',
    overflow: 'hidden',
  },
  webScene: {
    flex: 1,
    height: '100%',
    overflow: 'hidden',
  },
});
