import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import {useGetVideos} from "@/services/getVideos";
import React, {useRef, useState} from "react";
import {useVideoPlayer, VideoView} from 'expo-video';
import {VideoResponse} from "@/services/types";

function VideoPlayer({ item, width }: { item: VideoResponse, width: number }) {
  const player = useVideoPlayer(item.urls.mp4);

  return width > 0 ?
    (
      <View style={styles.videoViewerContainer}>
        <VideoView
          style={[styles.videoView, { width }]}
          contentFit={'cover'}
          player={player}
          allowsFullscreen={false}
          nativeControls={false}
        />
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
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator />
        </View> :
        <FlatList
          data={results}
          horizontal
          keyExtractor={(i, index) => `video-${index}-${i.id}`}
          style={styles.fullWidthAndHeight}
          renderItem={({ item, index }: { item: VideoResponse, index: number }) => <VideoPlayer item={item} width={containerWidth / 2} />}
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
