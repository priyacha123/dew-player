"use client";

import React, { createContext, useContext } from "react";
import { useVideoUpload } from "@/hooks/useVideoUpload";

type UploadContextType = {
  videoFile: File | null;
  subtitleFile: File | null;
  videoError: string;
  subtitleError: string;
  setVideoFile: (file: File | null) => void;
  setSubtitleFile: (file: File | null) => void;
  validateFiles: () => boolean;
  resetErrors: () => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const uploadState = useVideoUpload();

  return <UploadContext.Provider value={uploadState}>{children}</UploadContext.Provider>;
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUpload must be used within a UploadProvider");
  }
  return context;
}
