import { useState } from "react";

type VideoUploadState = {
  videoFile: File | null;
  subtitleFile: File | null;
  videoError: string;
  subtitleError: string;
};

type VideoUploadActions = {
  setVideoFile: (file: File | null) => void;
  setSubtitleFile: (file: File | null) => void;
  validateFiles: () => boolean;
  resetErrors: () => void;
};

export function useVideoUpload(): VideoUploadState & VideoUploadActions {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [subtitleFile, setSubtitleFile] = useState<File | null>(null);
  const [videoError, setVideoError] = useState("");
  const [subtitleError, setSubtitleError] = useState("");

  const validateFiles = () => {
    let isValid = true;

    if (!videoFile) {
      setVideoError("Please upload a video file");
      isValid = false;
    }

    if (!subtitleFile) {
      setSubtitleError("Please upload a subtitle file");
      isValid = false;
    }

    return isValid;
  };

  const resetErrors = () => {
    setVideoError("");
    setSubtitleError("");
  };

  return {
    videoFile,
    subtitleFile,
    videoError,
    subtitleError,
    setVideoFile: (file: File | null) => {
      setVideoFile(file);
      setVideoError("");
    },
    setSubtitleFile: (file: File | null) => {
      setSubtitleFile(file);
      setSubtitleError("");
    },
    validateFiles,
    resetErrors,
  };
}
