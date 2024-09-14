export interface VideoResponse {
  id: number;
  likes_count: number;
  comments_count: number;

  urls: {
    mp4: string;
    mov: string;
    hls: {
      playlist: string;
      files: string[];
    }
  }
}
