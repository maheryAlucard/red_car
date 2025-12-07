/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// Sports Automotive Theme - Red Car Mada
const primaryRed = '#D40000';
const backgroundBlack = '#0A0A0A';
const metallicGrey = '#C0C0C0';
const textWhite = '#FFFFFF';

export const Colors = {
  light: {
    text: textWhite,
    background: backgroundBlack,
    tint: primaryRed,
    icon: metallicGrey,
    tabIconDefault: metallicGrey,
    tabIconSelected: primaryRed,
  },
  dark: {
    text: textWhite,
    background: backgroundBlack,
    tint: primaryRed,
    icon: metallicGrey,
    tabIconDefault: metallicGrey,
    tabIconSelected: primaryRed,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
