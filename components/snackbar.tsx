import React, {useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import {Platform} from "expo-modules-core";
import {Image} from "expo-image";
import {Shadow} from "react-native-shadow-2";
import {useThemedTypography} from "@/components/Themed";

export interface SnackbarProps {
  title: string;
  subtitle: string;
}
export function Snackbar({ title, subtitle }: SnackbarProps) {
  const [width, setWidth] = useState(styles.iconContainer.width);
  const typographyStyles = useThemedTypography();

  return (
    <Shadow stretch distance={10} startColor={'rgba(102, 102, 102, 0.16)'} offset={[0, 10]}>
      <View style={styles.container} onLayout={(e) => setWidth(e.nativeEvent.layout.width) }>
        <View style={styles.iconContainer}>
          <Image
            style={styles.icon}
            source={require("@/assets/images/icons/heart.png")}
            contentFit="contain"
          />
        </View>
        <View style={{ ...styles.contentContainer, width: width - styles.iconContainer.width  }}>
          <View style={styles.textContainer}>
            <Text style={typographyStyles.title}>{title}</Text>
            <Text style={typographyStyles.subtitle}>{subtitle}</Text>
          </View>
          <Image
            style={styles.chevron}
            source={require("@/assets/images/icons/chevron.png")}
            contentFit="contain"
          />
        </View>
      </View>
    </Shadow>
  )
}

// box-shadow: 0px 15px 30px 0px rgba(0, 0, 0, 0.25);
//
// box-shadow: 0px 15px 30px 0px color(display-p3 0 0 0 / 0.25);


const styles = StyleSheet.create({
  container: {
    borderRadius: Platform.select({ android: 5, default: 15 }),
    borderWidth: 0.2,
    borderColor: "#D3D3D3",
    flexDirection: 'row',
    overflow: "hidden",
    minHeight: 64,
    width: "100%",
  },
  iconContainer: {
    width: 57,
    backgroundColor: "#34A653",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: { width: 34, height: 26 },
  chevron: { width: 6, height: 12 },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: "#fdf9eb",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
