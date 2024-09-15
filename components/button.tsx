import {Pressable, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {useThemeColor, useThemedTypography} from "@/components/Themed";
import {ComponentType, ReactElement, ReactNode} from "react";
import {StyleProps} from "react-native-reanimated";

export interface ButtonProps {
  Left?: ComponentType;
  text: string;
  onPress?: () => (void | Promise<void>)
  style?: StyleProp<ViewStyle>;
}

export function Button({Left, text, onPress, style = {}}: ButtonProps) {
  const backgroundColor = useThemeColor('blue');
  const typography = useThemedTypography("dark");

  return (
    <TouchableOpacity style={[styles.container]} onPress={onPress}>
      <View style={[styles.wrapper, { backgroundColor }, style]}>
        {Left != null ? <Left /> : null}
        <Text style={typography.button}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    height: 41,
    alignItems: "center",
    justifyContent: 'center',
    width: "100%"
  },
  wrapper: {
    borderRadius: 12,
    height: "100%",
    alignItems: "center",
    justifyContent: 'center',
    padding: 10,
    flexDirection: 'row'
  }
})
