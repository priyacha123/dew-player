"use client";

import React, { PropsWithChildren, createContext, useContext, useState } from "react";

// Define the shape of the video data
export type Video = {
  videoUrl: string;
  videoName: string;
  subtitleSrc: string;
};

// Define the full context shape
type VideoContextType = {
  selectedVideo: Video;
  setSelectedVideo: React.Dispatch<React.SetStateAction<Video>>;
};

// Create the context with correct typing
export const videoContext = createContext<VideoContextType | null>(null);

const VideoContextProvider = ({ children }: PropsWithChildren) => {
  const [selectedVideo, setSelectedVideo] = useState<Video>({
    videoUrl: "",
    videoName: "",
    subtitleSrc: "",
  });

  const value = { selectedVideo, setSelectedVideo };

  return (
    <videoContext.Provider value={value}>
      {children}
    </videoContext.Provider>
  );
};

export default VideoContextProvider;

export const useVideoContext = () => {
  const context = useContext(videoContext);
  if (!context) {
    throw new Error("useVideoContext must be used within a VideoContextProvider");
  }
  return context;
};