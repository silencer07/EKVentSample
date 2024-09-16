import React, {useCallback, useState} from 'react';
import {Tabs} from 'expo-router';
import HomeLogo from '@/assets/images/tabs/home.svg'
import HomeInactiveLogo from '@/assets/images/tabs/home-inactive.svg'
import HomeInactiveLightLogo from '@/assets/images/tabs/home-inactive-light.svg'
import MediaLogo from '@/assets/images/tabs/media.svg'
import MediaInactiveLogo from '@/assets/images/tabs/media-inactive.svg'
import GamesLogo from '@/assets/images/tabs/games.svg'
import GamesInactiveLogo from '@/assets/images/tabs/games-inactive.svg'
import GamesInactiveLightLogo from '@/assets/images/tabs/games-inactive-light.svg'
import ReportsLogo from '@/assets/images/tabs/reports.svg'
import ReportsInactiveLogo from '@/assets/images/tabs/reports-inactive.svg'
import ReportsInactiveLightLogo from '@/assets/images/tabs/reports-inactive-light.svg'
import {Image} from 'expo-image';
import {StyleSheet, View} from "react-native";
import {EventArg} from "@react-navigation/core";
import {useCustomScreenOptions, useThemeColor} from "@/components/Themed";
import {Spacings} from "@/constants/Spacings";
import {useSharedActiveTab} from "@/hooks";

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const tabs = ["index", "two", "three", "four", "five"]
const darkTabs = [tabs[1]];

export default function TabLayout() {
  const [activeTab, setActiveTab] = useSharedActiveTab();
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


  const isTabNotDark = darkTabs.indexOf(activeTab) === -1;
  const preferredTheme = isTabNotDark ? 'light' : 'dark';

  const customScreenOptions = useCustomScreenOptions(preferredTheme);


  const tabBarItemStyle = useCallback((tabName: string) => {
    const additional = { borderTopColor: activeTab === tabName ? customScreenOptions.tabBarActiveTintColor : 'transparent' };
    return {...styles.tabBarItemStyle, ...additional};
    }, [activeTab, customScreenOptions.tabBarActiveTintColor]
  );

  return (
    <Tabs
      screenListeners={{
        tabPress: tabPressListener
      }}
      sceneContainerStyle={customScreenOptions.sceneContainerStyle}
      screenOptions={{
        tabBarActiveTintColor: customScreenOptions.tabBarActiveTintColor,
        tabBarStyle: customScreenOptions.tabBarStyle
      }}>
      <Tabs.Screen
        name={tabs[0]}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <HomeLogo/>
            } else if (isTabNotDark){
              return <HomeInactiveLightLogo/>
            }
            return <HomeInactiveLogo/>
          },
          tabBarItemStyle: tabBarItemStyle(tabs[0]),
          headerTitleContainerStyle: tabOneStyles.headerTitleContainer,
          headerLeftLabelVisible: false,
          headerLeftContainerStyle: tabOneStyles.headerLeft,
          headerLeft: () => <Image
            style={tabOneStyles.headerLeftImage}
            source={require("@/assets/images/logo.png")}
            contentFit="contain"
          />,
          headerRightContainerStyle: tabOneStyles.headerRight,
          headerRight: () => <View style={tabOneStyles.headerRightContentWrapper}>
            <Image
              style={tabOneStyles.headerRightIcon}
              source={require("@/assets/images/icons/search.png")}
              contentFit="contain"
            />
            <Image
              style={tabOneStyles.headerRightIcon}
              source={require("@/assets/images/icons/message.png")}
              contentFit="contain"
            />
            <Image
              style={tabOneStyles.headerRightIcon}
              source={require("@/assets/images/icons/notification.png")}
              contentFit="contain"
            />
          </View>,
        }}
      />
      <Tabs.Screen
        name={tabs[1]}
        options={{
          title: 'Media',
          tabBarIcon: ({ focused }) => focused ?  <MediaLogo /> : <MediaInactiveLogo />,
          tabBarItemStyle: tabBarItemStyle(tabs[1]),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name={tabs[2]}
        options={{
          title: 'Games',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <GamesLogo/>
            } else if (isTabNotDark){
              return <GamesInactiveLightLogo/>
            }
            return <GamesInactiveLogo/>
          },
          tabBarItemStyle: tabBarItemStyle(tabs[2]),
        }}
      />
      <Tabs.Screen
        name={tabs[3]}
        options={{
          title: 'Reports',
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <ReportsLogo/>
            } else if (isTabNotDark){
              return <ReportsInactiveLightLogo/>
            }
            return <ReportsInactiveLogo/>
          },
          tabBarItemStyle: tabBarItemStyle(tabs[3])
        }}
      />
      <Tabs.Screen
        name={tabs[4]}
        options={{
          title: 'Account',
          tabBarIcon: ({ color }) => (
            <View style={[styles.imageContainer, { borderColor: customScreenOptions.tabBarActiveTintColor }]}>
              <Image
                style={styles.image}
                source={require("@/assets/images/tabs/account.png")}
                placeholder={{ blurhash }}
                contentFit="contain"
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
    borderWidth: 1.5,
    borderRadius: imageRadius,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: imageRadius * 2,
    height: imageRadius * 2,
  },
  tabBarItemStyle: {
    marginHorizontal: 10,
    borderTopWidth: 3,
    borderLeftWidth: 2.5,
    borderRightWidth: 2.5,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

const tabOneStyles = StyleSheet.create({
  headerTitleContainer: { display: 'none' },
  headerLeft: {
    height: '100%',
    width: "50%",
    paddingVertical: Spacings.padding,
    paddingLeft: Spacings.padding,
  },
  headerLeftImage: {
    width: "100%",
    height: 32,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: "100%",
    paddingVertical: Spacings.padding,
    paddingRight: Spacings.padding,
  },
  headerRightContentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: "100%",
    maxWidth: 95,
  },
  headerRightIcon: { width: 20, height: 20 },
})
