/* eslint-disable @next/next/no-img-element */
"use client";

import SubtitleSelector from "./components/SubtitleSelector/SubtitleSelector";
import VideoPlayer from "./components/VideoPlayer/VideoPlayer";
import React, { useState } from "react";
import { useVideoContext } from "./components/VideoContextProvider/VideoContextProvider";
import { redirect, useRouter } from "next/navigation";
import { PlayCircle, LogOut, Moon } from "lucide-react";

const Screen = () => {
  const [cutTheLights, setCutTheLights] = useState(false);
  const { videoUrl, videoName, subtitleSrc } = useVideoContext();
  const router = useRouter();
  // if (!videoUrl.length) {
  //   redirect("/");
  // }

  const visibility = cutTheLights ? "hidden" : "visible";
  const cursor = cutTheLights ? "none" : "auto";
  const enableCutTheLights = () => setCutTheLights(true);
  const disableCutTheLights = () => setCutTheLights(false);
  const exitVideo = () => router.push("/");

  return (
    <div className='App' onMouseMove={disableCutTheLights} style={{ cursor }}>
      <header className='App-header' style={{ visibility }}>
        <div className='App-logo flex content-center items-center'>
          <div className='App-icon'>
            <PlayCircle size={15} />
          </div>
          <span className='App-name'>Simple Video Player</span>
        </div>
        {/* <Github className='cursor-pointer' size={24} /> */}
      </header>
      <div className='App-body'>
        <VideoPlayer videoName={videoName} videoSrc={videoUrl} subtitleSrc={subtitleSrc} />
        <div className='App-Video-Actions' style={{ visibility }}>
          <SubtitleSelector />
          <button onClick={enableCutTheLights} className='default-button'>
            <div className='flex items-center gap-2'>
              <Moon size={16} />
              <span>Cut the lights</span>
            </div>
          </button>
          <button onClick={exitVideo} className='default-button'>
            <div className='flex items-center gap-2'>
              <span>Exit | Eject</span>
              <LogOut size={16} />
            </div>
          </button>
          <p>
            SRT and WebVTT Subtitle files supported &nbsp;|&nbsp; Press <b>Arrow Keys</b> for Volume and Skips
          </p>
        </div>
      </div>
    </div>
  );
};

export default Screen;
