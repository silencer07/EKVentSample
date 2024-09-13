import React, {useCallback, useState} from 'react';
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
import {Pressable, StyleSheet, View} from "react-native";
import {EventArg, ParamListBase, RouteProp} from "@react-navigation/core";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const tabs = ["index", "two", "three", "four", "five"]

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const [activeTab, setActiveTab] = useState('index');
  const tabPressListener = useCallback((e:  EventArg<"tabPress", true, undefined>) => {
    const parts = e.target?.split("-");
    const rootRoute = parts?.length ? parts[0] : "non-existent-route";
    for (let x = 0; x < tabs.length; x++) {
      const r = tabs[x];
      if (rootRoute === r) {
        setActiveTab(r);
      }
    }
  }, [])

  const tabBarItemStyle = useCallback((tabName: string) => {
    const additional = { borderColor: activeTab === tabName ? '#1F62C0' : 'transparent' };
    return {...styles.tabBarItemStyle, ...additional};
    }, [activeTab]
  );

  return (
    <Tabs
      screenListeners={{
        tabPress: tabPressListener
      }}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name={tabs[0]}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => focused ? <HomeLogo /> : <HomeInactiveLogo />,
          tabBarItemStyle: tabBarItemStyle(tabs[0])
        }}
      />
      <Tabs.Screen
        name={tabs[1]}
        options={{
          title: 'Media',
          tabBarIcon: ({ focused }) => focused ?  <MediaLogo /> : <MediaInactiveLogo />,
          tabBarItemStyle: tabBarItemStyle(tabs[1])
        }}
      />
      <Tabs.Screen
        name={tabs[2]}
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <GamesLogo />,
          tabBarItemStyle: tabBarItemStyle(tabs[2])
        }}
      />
      <Tabs.Screen
        name={tabs[3]}
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => <ReportsLogo />,
          tabBarItemStyle: tabBarItemStyle(tabs[3])
        }}
      />
      <Tabs.Screen
        name={tabs[4]}
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
          tabBarItemStyle: tabBarItemStyle(tabs[4])
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
  },
  tabBarItemStyle: { marginHorizontal: 10, borderTopWidth: 3 },
});
