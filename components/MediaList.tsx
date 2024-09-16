import {ActivityIndicator, FlatList, Pressable, StyleSheet, View} from "react-native";
import {useGetVideos} from "@/services/getVideos";
import React, {useEffect, useState} from "react";
import {VideoResponse} from "@/services/types";
import {FullScreenActivityIndicator} from "@/components/fullScreenActivityIndicator";
import {useRouter} from "expo-router";
import {useSharedActiveTab} from "@/hooks";
import * as VideoThumbnails from 'expo-video-thumbnails';
import Animated, {runOnUI, useSharedValue} from "react-native-reanimated";

// This will be loading screen as generating thumbnail is done on the fly. in real life thumbnails should be done in server
function VideoPreview({ item, width }: { item: VideoResponse, width: number }) {
  const router = useRouter();
  const [ ,setActiveTab] = useSharedActiveTab();

  const thumbnail = useSharedValue<string | undefined>(undefined)

  useEffect(() => {
    runOnUI(async (url: string) => {
      try {
        const { uri  } = await VideoThumbnails.getThumbnailAsync(
          url,
          {
            time: 0,
          }
        );
        thumbnail.value = uri;
      } catch (e) {
        console.log(e);
      }
    })(item.urls.mp4);
  }, [item.urls.mp4]);

  return width > 0 ?
    (
      <Pressable style={[styles.videoViewerContainer, { width, borderColor: thumbnail.value === undefined ? 'lightgray' : 'transparent' }]}
         onPress={() => {
           setActiveTab("two")
           router.push({
             pathname: "/(tabs)/two",
             params: {id: item.id}
           });
         }}
      >
        {thumbnail.value ?
          <Animated.Image
            style={[styles.videoView]}
            source={{ uri: thumbnail.value }}
          /> :
          <ActivityIndicator />
        }
      </Pressable>
    ) :
    null
}
export function MediaList() {
  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage
  } = useGetVideos();

  const results = data?.pages.flat() || [];

  const [containerWidth, setContainerWidth] = useState(0);

  return (
    <View style={styles.fullWidthAndHeight} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      {
        isFetching && !isFetchingNextPage ?
          <FullScreenActivityIndicator /> :
          <FlatList
            data={results}
            horizontal
            keyExtractor={(i, index) => `video-${index}-${i.id}`}
            style={styles.fullWidthAndHeight}
            renderItem={({ item, index }: { item: VideoResponse, index: number }) => <VideoPreview item={item} width={containerWidth / 2} />}
            onEndReached={async () => {
              if (!isFetching && hasNextPage) {
                await fetchNextPage();
              }
            }}
            ListFooterComponent={isFetchingNextPage ? (
                <View style={styles.fetchNextPageActivityIndicatorContainer}>
                  <ActivityIndicator />
                </View>
              ): null
            }
            showsHorizontalScrollIndicator={false}
          />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  videoViewerContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1
  },
  videoView: {
    height: '100%',
    width: '100%',
    overflow: 'hidden'
  },
  fullWidthAndHeight: {
    width: '100%',
    height: '100%'
  },
  activityIndicatorContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  fetchNextPageActivityIndicatorContainer: {
    paddingHorizontal: 20,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
