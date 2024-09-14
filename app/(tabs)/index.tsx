import {StyleSheet, Text, View} from 'react-native';

import {Typography} from "@/constants/Typography";
import {useThemeColor, useThemedTypography} from "@/components/Themed";
import {useState} from "react";
import {Platform} from "expo-modules-core";
import {Snackbar} from "@/components/snackbar";

export default function TabOneScreen() {
  const typographyStyles = useThemedTypography();

  const [width, setWidth] = useState(57);

  return (
    <View style={styles.container}>
      <Text style={[typographyStyles.heading2, styles.greeting]}>Hello John,</Text>
      <Text style={typographyStyles.heading3}>Please tap below</Text>
      <Snackbar title="Large font title" subtitle="Sub-title 💎💎💎" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
    gap: 20,
  },
  greeting: {
    textAlign: 'center'
  },
});
