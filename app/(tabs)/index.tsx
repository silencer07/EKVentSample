import {StyleSheet, Text, View} from 'react-native';
import {useThemedTypography} from "@/components/Themed";
import React, {useState} from "react";
import {Snackbar} from "@/components/snackbar";
import {Shadow} from "react-native-shadow-2";
import {Image} from "expo-image";
import {MediaList} from "@/components/MediaList";

export default function TabOneScreen() {
  const typographyStyles = useThemedTypography();

  const [width, setWidth] = useState(57);

  return (
    <View style={styles.container}>
      <Text style={[typographyStyles.heading2, styles.greeting]}>Hello John,</Text>
      <Text style={typographyStyles.heading3}>Please tap below</Text>
      <Snackbar title="Large font title" subtitle="Sub-title 💎💎💎" />
      <View style={styles.content}>
        <View style={styles.mediaTitle}>
          <Image
            style={styles.mediaIcon}
            source={require("@/assets/images/icons/media.png")}
            contentFit="fill"
          />
          <Text style={[typographyStyles.heading4, { lineHeight: 24 }]}>Media</Text>
        </View>
        <View style={{ width: '100%', minHeight: 250, height: '50%' }}>
          <MediaList />
        </View>
      </View>
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
  content: {
    flex: 1,
    borderTopWidth: 0.3,
    borderTopColor: '#C8CCD2',
    paddingTop: 15,
    flexDirection: 'column',
    gap: 20,
  },
  mediaTitle: {
    flexDirection: 'row',
    width: 75,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mediaIcon: {
    width: 13,
    height: 15
  },
});
