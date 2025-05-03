"use client";

import React from "react";
import { useUpload } from "@/store/upload-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Uploader } from "@/components/ui/uploader";
import { useVideoContext } from "@/app/screen/components/VideoContextProvider/VideoContextProvider";

const Page = () => {
  const { videoFile, subtitleFile, videoError, subtitleError, setVideoFile, setSubtitleFile, validateFiles } =
    useUpload();
  const { setSelectedVideo } = useVideoContext();
  const router = useRouter();

  const handleContinue = async () => {
    if (validateFiles() && videoFile && subtitleFile) {
      try {
        const videoUrl = URL.createObjectURL(videoFile);
        const subtitleSrc = URL.createObjectURL(subtitleFile);

        // Update video context before navigation
        setSelectedVideo({
          videoUrl,
          videoName: videoFile.name,
          subtitleSrc,
        });

        router.push("/screen");
      } catch (error) {
        console.error("Error processing files:", error);
      }
    }
  };

  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center gap-8 p-4 animate-in fade-in duration-500'>
      <div className='w-full max-w-2xl space-y-8'>
        <div className='rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Upload Video</h2>
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

        <div className='rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md'>
          <h2 className='mb-4 text-2xl font-bold tracking-tight'>Upload Subtitle</h2>
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
          <Button onClick={handleContinue} size='lg' className='w-full sm:w-auto'>
            Continue to Player
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
