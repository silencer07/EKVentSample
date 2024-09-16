import {ActivityIndicator, FlatList, Pressable, StyleSheet, View} from "react-native";
import {useGetVideos} from "@/services/getVideos";
import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import {useVideoPlayer, VideoView} from 'expo-video';
import {VideoResponse} from "@/services/types";
import {FullScreenActivityIndicator} from "@/components/fullScreenActivityIndicator";
import {useRouter} from "expo-router";
import {useSharedActiveTab} from "@/hooks";
import * as VideoThumbnails from 'expo-video-thumbnails';
import {blurhash} from "@/constants/misc";
import {Image} from "expo-image";

function VideoPreview({ item, width }: { item: VideoResponse, width: number }) {
  const router = useRouter();
  const player = useVideoPlayer(item.urls.mp4);
  const [ ,setActiveTab] = useSharedActiveTab();

  const [thumbnail, setThumbnail] = useState<string | undefined>();
  useEffect(() => {
    (async () => {
      try {
        const { uri } = await VideoThumbnails.getThumbnailAsync(
          item.urls.mp4,
          {
            time: 0,
          }
        );
        setThumbnail(uri);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [item.urls.mp4]);



  return width > 0 ?
    (
      <View style={styles.videoViewerContainer}>
        <Pressable style={[StyleSheet.absoluteFillObject,  { zIndex : 1 }]}
           onPress={() => {
             setActiveTab("two")
             router.push({
               pathname: "/(tabs)/two",
               params: {id: item.id}
             });
           }}
        />
        <VideoView
          style={[styles.videoView, { width }]}
          contentFit={'cover'}
          player={player}
          allowsFullscreen={false}
          nativeControls={false}
        />
        { thumbnail &&
          <Image
            style={[styles.videoView, { width }]}
            source={{ uri: thumbnail }}
            contentFit="contain"
          />
        }
      </View>
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
    marginRight: 10
  },
  videoView: {
    height: '100%',
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
