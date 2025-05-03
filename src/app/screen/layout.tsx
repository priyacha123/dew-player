"use client";

import VideoContextProvider from "./components/VideoContextProvider/VideoContextProvider";

export default function ScreenLayout({ children }: { children: React.ReactNode }) {
  return <VideoContextProvider>{children}</VideoContextProvider>;
}
