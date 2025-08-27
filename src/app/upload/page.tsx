"use client";

import React from "react";
import { useUpload } from "@/store/upload-context";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Uploader } from "@/components/ui/uploader";
import srt2vtt from "../screen/components/SubtitleSelector/srt2vtt";

const Page = () => {
  const {
    videoFile,
    subtitleFile,
    videoError,
    subtitleError,
    setVideoFile,
    setSubtitleFile,
  } = useUpload();
  const router = useRouter();

  const handleUpload = (file: File) => {
    if (file.name.endsWith(".srt")) {
      // Convert .srt to .vtt
      const reader = new FileReader();
      reader.onload = () => {
        const convertedVtt = srt2vtt(reader.result as string);
        const blob = new Blob([convertedVtt], { type: "text/vtt" });
        const vttFile = new File([blob], file.name.replace(".srt", ".vtt"), {
          type: "text/vtt",
        });
        setSubtitleFile(vttFile);
      };
      reader.readAsText(file);
    } else {
      setSubtitleFile(file); // Assume it's already VTT
    }
  };

  const onContinueClick = () => {
    router.push("/screen");
    
  };

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 p-4 animate-in fade-in duration-500">
      <div className="w-full max-w-2xl space-y-8">
        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Upload Video
          </h2>
          <Uploader
            accept={{
              "video/*": [".mp4", ".webm", ".ogg"],
            }}
            maxSize={1024 * 1024 * 2000} // 2000MB
            onUpload={setVideoFile}
            onRemove={() => setVideoFile(null)}
            value={videoFile}
            error={videoError}
            label="Upload your video"
            description="Drop your video file here or click to browse"
          />
        </div>

        <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Upload Subtitle
          </h2>
          <Uploader
            accept={{
              "text/plain": [".srt", ".vtt"],
            }}
            maxSize={1024 * 1024 * 10} // 10MB
            onUpload={handleUpload}
            onRemove={() => setSubtitleFile(null)}
            value={subtitleFile}
            error={subtitleError}
            label="Upload your subtitle"
            description="Drop your subtitle file here or click to browse"
          />
          {/* <SubtitleSelector /> */}
        </div>

        <div className="flex justify-end">
          <Button
          
            onClick={onContinueClick}
            size="lg"
            className="w-full sm:w-auto"
          >
            Continue to Player
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
