"use client";

import React, { createContext, useContext, useState } from "react";

type UploadContextType = {
  videoFile: File | null;
  subtitleFile: File | null;
  setVideoFile: (file: File | null) => void;
  setSubtitleFile: (file: File | null) => void;
};

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);

  return (
    <UploadContext.Provider
      value={{
        videoFile,
        subtitleFile,
        setVideoFile,
        setSubtitleFile,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error("useUpload must be used within a UploadProvider");
  }
  return context;
}
