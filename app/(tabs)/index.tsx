import {StyleSheet, Text, View} from 'react-native';

import {Typography} from "@/constants/Typography";
import {useThemedTypography} from "@/components/Themed";

export default function TabOneScreen() {
  const typographyStyles = useThemedTypography();

  return (
    <View style={styles.container}>
      <Text style={typographyStyles.heading1}>Heading 1</Text>
      <Text style={typographyStyles.heading2}>Heading 2</Text>
      <Text style={typographyStyles.heading3}>Heading 3</Text>
      <Text style={typographyStyles.title}>Title</Text>
      <Text style={typographyStyles.subtitle}>Subtitle</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
