import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {Tabs} from 'expo-router';

import Colors from '@/constants/Colors';
import {useColorScheme} from '@/components/useColorScheme';
import HomeLogo from '@/assets/images/tabs/home.svg'
import HomeInactiveLogo from '@/assets/images/tabs/home-inactive.svg'
import MediaLogo from '@/assets/images/tabs/media.svg'
import MediaInactiveLogo from '@/assets/images/tabs/media-inactive.svg'
import GamesLogo from '@/assets/images/tabs/games.svg'
import ReportsLogo from '@/assets/images/tabs/reports.svg'
import { Image } from 'expo-image';
import {StyleSheet, View} from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => focused ? <HomeLogo /> : <HomeInactiveLogo />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Media',
          tabBarIcon: ({ focused }) => focused ?  <MediaLogo /> : <MediaInactiveLogo />,
        }}
      />
      <Tabs.Screen
        name="three"
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <GamesLogo />,
        }}
      />
      <Tabs.Screen
        name="four"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <ReportsLogo />,
        }}
      />
      <Tabs.Screen
        name="five"
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("@/assets/images/tabs/account.png")}
                placeholder={{ blurhash }}
                contentFit="contain"
                transition={1000}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const imageRadius = 14

const styles = StyleSheet.create({
  imageContainer: {
    height: imageRadius * 2,
    width: imageRadius * 2,
    borderColor: '#3361BA',
    borderWidth: 1.5,
    borderRadius: imageRadius,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: imageRadius * 2,
    height: imageRadius * 2,
  }
});
