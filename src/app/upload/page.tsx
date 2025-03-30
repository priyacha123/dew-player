"use client";

import React from "react";
import { useUpload } from "@/store/upload-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Uploader } from "@/components/ui/uploader";

const Page = () => {
  const { videoFile, subtitleFile, setVideoFile, setSubtitleFile } = useUpload();
  const router = useRouter();
  const [videoError, setVideoError] = React.useState("");
  const [subtitleError, setSubtitleError] = React.useState("");

  const handleContinue = () => {
    if (!videoFile) {
      setVideoError("Please upload a video file");
      return;
    }
    if (!subtitleFile) {
      setSubtitleError("Please upload a subtitle file");
      return;
    }
    router.push("/screen");
  };

  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8 p-4'>
      <div className='w-full max-w-2xl space-y-8'>
        <div>
          <h2 className='mb-4 text-2xl font-bold'>Upload Video</h2>
          <Uploader
            accept={{
              "video/*": [".mp4", ".webm", ".ogg"],
            }}
            maxSize={1024 * 1024 * 2000} // 2000MB
            onUpload={setVideoFile}
            onRemove={() => setVideoFile(null)}
            value={videoFile}
            error={videoError}
            label='Upload your video'
            description='Drop your video file here or click to browse'
          />
        </div>
        <div>
          <h2 className='mb-4 text-2xl font-bold'>Upload Subtitle</h2>
          <Uploader
            accept={{
              "text/plain": [".srt", ".vtt"],
            }}
            maxSize={1024 * 1024 * 10} // 10MB
            onUpload={setSubtitleFile}
            onRemove={() => setSubtitleFile(null)}
            value={subtitleFile}
            error={subtitleError}
            label='Upload your subtitle'
            description='Drop your subtitle file here or click to browse'
          />
        </div>
        <div className='flex justify-end'>
          <Button onClick={handleContinue} size='lg'>
            Continue to Player
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
