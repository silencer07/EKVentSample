/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {StyleSheet, Text as DefaultText, View as DefaultView} from 'react-native';

import Colors from '@/constants/Colors';
import {useColorScheme} from './useColorScheme';
import {Typography} from "@/constants/Typography";
import {Platform} from "expo-modules-core";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
  preferredScheme ?: keyof typeof Colors
) {
  const theme: keyof typeof Colors = Platform.select({
    web: 'light',
    default: preferredScheme ?? useColorScheme() ?? 'light'
  })
  return Colors[theme][colorName];
}

export function useThemedTypography(preferredScheme ?: keyof typeof Colors): StyleSheet.NamedStyles<typeof Typography> {
  const darkColor = useThemeColor('black', preferredScheme);
  const lightColor = useThemeColor('white', preferredScheme);
  const color = preferredScheme === 'dark' ? lightColor : darkColor;

  return {
    heading1: {
      ...Typography.heading1,
      color,
    },
    heading2: {
      ...Typography.heading2,
      color,
    },
    heading3: {
      ...Typography.heading3,
      color,
    },
    title: {
      ...Typography.title,
      color,
    },
    subtitle: {
      ...Typography.subtitle,
      color,
    }
  }
}
