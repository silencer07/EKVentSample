import {StyleSheet, Text, View} from 'react-native';

import {Typography} from "@/constants/Typography";
import {useThemeColor, useThemedTypography} from "@/components/Themed";

export default function TabOneScreen() {
  const typographyStyles = useThemedTypography();

  return (
    <View style={styles.container}>
      <Text style={[typographyStyles.heading2, styles.greeting]}>Heading 1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 18,
  },
  greeting: {
    flex: 1,
    textAlign: 'center'
  }
});
