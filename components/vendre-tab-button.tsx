import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomTabBarButtonProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import React from 'react';
import { Platform, Text, View } from 'react-native';

const PRIMARY_RED = '#D40000';

export function VendreTabButton(props: BottomTabBarButtonProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const borderColor = isDark ? '#230f0f' : '#f1f5f9';
  const labelColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        if (process.env.EXPO_OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
      style={[props.style, { flex: 1 }]}
    >
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingBottom: 8,
        }}
      >
        {/* Elevated circular button */}
        <View
          style={{
            position: 'absolute',
            top: -24,
            alignSelf: 'center',
            width: 56,
            height: 56,
            borderRadius: 28,
            backgroundColor: PRIMARY_RED,
            borderWidth: 4,
            borderColor,
            justifyContent: 'center',
            alignItems: 'center',
            ...Platform.select({
              ios: {
                shadowColor: PRIMARY_RED,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
              },
              android: {
                elevation: 8,
              },
            }),
          }}
        >
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </View>
        <Text
          style={{
            fontSize: 10,
            fontWeight: '500',
            color: labelColor,
          }}
        >
          Vendre
        </Text>
      </View>
    </PlatformPressable>
  );
}
