"use client";

// import SubtitleSelector from "./components/SubtitleSelector/SubtitleSelector";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import React, { useEffect, useState } from "react";
import {redirect, useRouter } from "next/navigation";
import { PlayCircle, LogOut, Moon } from "lucide-react";
import { useUpload } from "@/store/upload-context";
import { useVideoContext } from "@/app/screen/components/VideoContextProvider/VideoContextProvider";


const Screen = () => {
  const [cutTheLights, setCutTheLights] = useState(false);
  const { selectedVideo, setSelectedVideo } = useVideoContext();
  const { videoUrl, videoName, subtitleSrc } = selectedVideo;
  const router = useRouter();
 
  const { videoFile, subtitleFile, validateFiles,} = useUpload();

  useEffect(() => {
    if (validateFiles() && videoFile && subtitleFile && !selectedVideo.videoUrl) {
      try {
        const videoUrl = URL.createObjectURL(videoFile);
        const subtitleSrc = URL.createObjectURL(subtitleFile);

        setSelectedVideo(  {
          videoUrl: videoUrl,
          videoName: videoFile.name,
          subtitleSrc: subtitleSrc,
        });

      if (!videoUrl.length) {
             redirect("/");
      }
      // else {
      //   router.push("/screen")
      // }

        console.log("Selected files:", { videoUrl, subtitleSrc });
      } catch (error) {
        console.error("Error in selected files:", error);
      }
    } 
  }, [videoFile, subtitleFile, validateFiles, selectedVideo.videoUrl, router, setSelectedVideo, subtitleSrc, videoUrl]);

  const visibility = cutTheLights ? "hidden" : "visible";
  const cursor = cutTheLights ? "none" : "auto";
  const enableCutTheLights = () => setCutTheLights(true);
  const disableCutTheLights = () => setCutTheLights(false);
  const exitVideo = () => router.push("/");

  return (
    <div className='App' onMouseMove={disableCutTheLights} style={{ cursor }}>
      <header className='App-header ' style={{ visibility }}>
        <div className='App-logo flex content-center items-center mx-5 my-2 px-2 py-1 rounded-lg'>
          <div className='App-icon'>
            <PlayCircle size={30} />
          </div>
          <span className='App-name m-1 font-bold px-2 text-xl '> Dew Video Player</span>
        </div>
        {/* <Github className='cursor-pointer' size={24} /> */}
      </header>
      <div className='App-body py-2 px-5'>
        <VideoPlayer videoName={videoName} videoSrc={videoUrl} subtitleSrc={subtitleSrc} />
        <div className='App-Video-Actions p-3' style={{ visibility }}>
          <div className="action-button flex items-center justify-center">
          <button onClick={enableCutTheLights} className='default-button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5'>
            <div className='flex items-center gap-2'>
              <Moon size={20} />
              <span>Cut the lights</span>
            </div>
          </button>
          <button onClick={exitVideo} className='default-button bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded m-5'>
            <div className='flex items-center gap-2'>
              <span>Exit | Eject</span>
              <LogOut size={20} />
            </div>
          </button>
          </div>
          <p className="text-base text-center text-gray-500">
            SRT and WebVTT Subtitle files supported &nbsp;|&nbsp; Press <b> Arrow Keys </b> for Volume and Skips
          </p>
        </div>
      </div>
    </div>
  );
};

export default Screen;
