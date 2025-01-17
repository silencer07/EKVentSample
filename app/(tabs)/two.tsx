import {FlatList, StatusBar, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useGetVideos} from "@/services/getVideos";
import {VideoResponse} from "@/services/types";
import React, {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import {FullScreenActivityIndicator} from "@/components/fullScreenActivityIndicator";
import {useVideoPlayer, VideoView} from "expo-video";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";
import {useFocusEffect, useLocalSearchParams} from 'expo-router';
import {Image} from "expo-image";
import {useThemeColor, useThemedTypography} from "@/components/Themed";
import {ViewToken} from "@react-native/virtualized-lists";
import {formatNumber} from "@/utils";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Spacings} from "@/constants/Spacings";

interface VideoPlayerRef {
  togglePlayer: (isVisible: boolean) => void
}

interface VideoPlayerProps {
  item: VideoResponse;
  height: number;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  function ({ item, height }, ref) {
    const player = useVideoPlayer(item.urls.mp4, player => {
      player.loop = true;
      player.play();
    });

    const [visible, setVisible] = useState(false)
    useImperativeHandle(ref, () => ({
      togglePlayer: (isVisible: boolean) => {
        if (isVisible ) {
          player.play();
        } else if (player.playing) {
          player.pause();
          player.currentTime = 0;
        }
        setVisible(isVisible);
      }
    }));

    useFocusEffect(
      useCallback(() => {
        if (visible && !player.playing) {
          player.play();
        }

        return () => {
          if (visible && player.playing) {
            player.pause();
          }
        };
      }, [visible, player])
    );
    const textColor = useThemeColor("white", "dark");

    return height > 0 ?
      (
        <View style={[styles.fullWidth, { height }]}>
          <VideoView
            style={[styles.fullWidth, { height }]}
            contentFit={'cover'}
            player={player}
            allowsPictureInPicture={false}
            allowsFullscreen={false}
            allowsVideoFrameAnalysis={false}
          />
          <View style={styles.rightIconsContainer}>
            <View style={styles.likeContainer}>
              <Image
                style={styles.icon}
                source={require("@/assets/images/icons/heart-colored.png")}
                contentFit="fill"
              />
              <Text style={[styles.iconLabel, { color: textColor }]}>
                {formatNumber(item.likes_count)}
              </Text>
            </View>
            <View style={styles.commentContainer}>
              <Image
                style={styles.icon}
                source={require("@/assets/images/icons/messaged-filled.png")}
                contentFit="fill"
              />
              <Text style={[styles.iconLabel, { color: textColor }]}>
                {formatNumber(item.comments_count)}
              </Text>
            </View>
            <View style={styles.menuContainer}>
              <Image
                style={styles.menuIcon}
                source={require("@/assets/images/icons/menu.png")}
                contentFit="fill"
              />
            </View>
          </View>
        </View>
      ) :
      null
  }
)

interface ViewableItemChangedArg {
  viewableItems: Array<ViewToken<VideoResponse>>;
  changed: Array<ViewToken<VideoResponse>>;
}

export default function TabTwoScreen() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetVideos();

  const results: VideoResponse[] = data?.pages.flat() || [];

  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const playerHeight = height - tabBarHeight;

  const listRef = useRef<FlatList | null>(null)
  const listItemRefs = useRef<Record<number, VideoPlayerRef>>({});
  const { id } = useLocalSearchParams();

  useEffect(() => {
    if (id && results?.length > 0 && listRef.current) {
      const idNum = parseInt(id as string, 10);
      const index = results.findIndex((r) => r.id === idNum)
      if (index > -1) {
        listRef.current?.scrollToIndex({ index, animated: false })
      }
    }
  }, [listRef.current, results, id]);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }: ViewableItemChangedArg) => {
    changed.forEach(({ item, isViewable }) => {
      const ref = listItemRefs.current[item.id];
      if (ref) {
        ref.togglePlayer(isViewable);
      }
    });
  }, [])

  const typography = useThemedTypography("dark");
  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        {
          isFetching && !isFetchingNextPage ?
            <FullScreenActivityIndicator /> :
            <>
              <View style={[styles.heading, { top }]}>
                <Text style={typography.heading1}>Media</Text>
                <Image
                  style={styles.headingIcon}
                  source={require("@/assets/images/icons/camera-outline.png")}
                  contentFit="fill"
                />
              </View>
              <FlatList
                ref={listRef}
                data={results}
                keyExtractor={(i, index) => `video-${index}-${i.id}`}
                style={styles.fullWidthAndHeight}
                renderItem={({ item, index }: { item: VideoResponse, index: number }) =>
                  <VideoPlayer
                    height={playerHeight}
                    item={item}
                    ref={(element) => {
                      if (element) listItemRefs.current[item.id] = element;
                    }}
                  />
                }
                onEndReached={async () => {
                  if (!isFetching && hasNextPage) {
                    await fetchNextPage();
                  }
                }}
                showsVerticalScrollIndicator={false}
                pagingEnabled
                snapToInterval={playerHeight}
                decelerationRate="fast"
                getItemLayout={(data, index) => ({
                  length: playerHeight,
                  offset: playerHeight * index,
                  index,
                })}
                snapToAlignment="start"
                alwaysBounceVertical={false}
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 75
                }}
                onViewableItemsChanged={onViewableItemsChanged}
              />
            </>
        }
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 0,
  },
  fullWidthAndHeight: {
    width: '100%',
    height: '100%'
  },
  fullWidth: {
    width: "100%"
  },
  rightIconsContainer: {
    position: 'absolute',
    right: 30,
    bottom: 26,
    zIndex: 1,
    alignItems: 'center',
    minWidth: 40,
  },
  likeContainer: {
    gap: 10,
    marginBottom: 19,
    width: "100%",
    alignItems: 'center'
  },
  icon: { width: 26, height: 22 },
  iconLabel: {
    fontSize: 14,
    fontFamily: "SFProSemiBold",
    width: "100%",
    textAlign: 'center'
  },
  commentContainer: {
    gap: 10,
    marginBottom: 30,
    width: "100%",
    alignItems: 'center'
  },
  menuContainer: { marginRight: 7 },
  menuIcon: { width: 15, height: 5, marginLeft: 5 },
  heading: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1,
    padding: Spacings.padding
  },
  headingIcon: { width: 27, height: 16 },
});

