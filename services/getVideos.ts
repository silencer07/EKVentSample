import {useInfiniteQuery} from "react-query";

// pageParam is a simulation of infinite scroll
async function fetchVideos({ pageParam }: { pageParam: number }) {
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_API_URL}/videos?pages=${pageParam}`
  );
  const json = await response.json();
  return (typeof json === 'string' || json instanceof String) ? [] : json;
}

export const useGetVideos = () =>
  useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam }) => fetchVideos({ pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length ? allPages.length + 1 : undefined;
    },
  });
