import {ActivityIndicator, FlatList, StatusBar, StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import {useGetVideos} from "@/services/getVideos";
import {VideoResponse} from "@/services/types";
import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {FullScreenActivityIndicator} from "@/components/fullScreenActivityIndicator";
import {useVideoPlayer, VideoView} from "expo-video";
import {useBottomTabBarHeight} from "@react-navigation/bottom-tabs";

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

    useImperativeHandle(ref, () => ({
      togglePlayer: (isVisible: boolean) => {
        if (isVisible) {
          player.play();
        } else {
          player.pause();
          player.currentTime = 0;
        }
      }
    }));

    return height > 0 ?
      (
        <View style={{ width: "100%", height }}>
          <VideoView
            style={{ width: "100%", height }}
            contentFit={'cover'}
            player={player}
            allowsPictureInPicture={false}
            allowsFullscreen={false}
            allowsVideoFrameAnalysis={false}
          />
        </View>
      ) :
      null
  }
)
export default function TabTwoScreen() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetVideos();

  const results = data?.pages.flat() || [];
  const { height } = useWindowDimensions();
  const tabBarHeight = useBottomTabBarHeight();
  const playerHeight = height - tabBarHeight;
  const listItemRefs = useRef<Record<number, VideoPlayerRef>>({});

  return (
    <>
      <StatusBar hidden />
      <View style={styles.container}>
        {
          isFetching && !isFetchingNextPage ?
            <FullScreenActivityIndicator /> :
            <FlatList
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
              onViewableItemsChanged={({ viewableItems, changed }) => {
                changed.forEach(({ item, isViewable }) => {
                  const ref = listItemRefs.current[item.id];
                  if (ref) {
                    ref.togglePlayer(isViewable);
                  }
                });
              }}
            />
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
  },
  fullWidthAndHeight: {
    width: '100%',
    height: '100%'
  },
});
