import {ActivityIndicator, FlatList, View} from "react-native";
import {useGetVideos} from "@/services/getVideos";
import React, {useRef, useState} from "react";
import {useVideoPlayer, VideoView} from 'expo-video';
import {VideoResponse} from "@/services/types";

function VideoPlayer({ item, width }: { item: VideoResponse, width: number }) {
  const ref = useRef(null);
  const player = useVideoPlayer(item.urls.mp4);

  return width > 0 ?
    (
      <View style={{ flex: 1, borderRadius: 12, overflow: 'hidden', marginRight: 10 }}>
        <VideoView
          style={{ height: '100%', width, overflow: 'hidden' }}
          ref={ref}
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
    <View style={{width: '100%', height: '100%'}} onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}>
      {
        isFetching && !isFetchingNextPage ?
        <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View> :
        <FlatList
          data={results}
          horizontal
          keyExtractor={(i, index) => `video-${index}-${i.id}`}
          style={{ width: '100%', height: '100%' }}
          renderItem={({ item, index }: { item: VideoResponse, index: number }) => <VideoPlayer item={item} width={containerWidth / 2} />}
          onEndReached={async () => {
            if (!isFetching && hasNextPage) {
              await fetchNextPage();
            }
          }}
          ListFooterComponent={isFetchingNextPage ? (
              <View style={{ paddingHorizontal: 20, height: '100%', alignItems: 'center', justifyContent: 'center' }}>
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
