/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Maximize, Minimize, Play, Pause, Volume2, VolumeX, Square } from "lucide-react";
import { secondsToTime } from "../CustomVideoControls/time";
import "./VideoControls.css";

type VideoControlsProps = {
  video: HTMLVideoElement;
  videoContainer: HTMLDivElement;
  videoName: string;
};

let timeoutHandle: number = 0;

const VideoControls = (props: VideoControlsProps) => {
  const { video, videoContainer, videoName } = props;
  const [isPaused, setIsPaused] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [totalDuration, setTotalDuration] = useState(secondsToTime(0));
  const [realTime, setRealTime] = useState(secondsToTime(0));

  const progress = useRef<HTMLDivElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);
  const seek = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const videoStorageKey = `vid--name--${videoName}`;

  const playVideo = () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  const stopVideo = () => (video.currentTime = video.duration);

  useEffect(() => {
    video.addEventListener("loadedmetadata", () => {
      const timeLeftOff = localStorage.getItem(videoStorageKey);
      if (timeLeftOff !== null) {
        video.currentTime = Number(timeLeftOff);
      }
      setTotalDuration(secondsToTime(video.duration));
    });
    video.addEventListener("timeupdate", () => {
      if (!progress.current) return;
      setRealTime(secondsToTime(video.currentTime));
      const progressWidth = (video.currentTime / video.duration) * 100;
      progress.current.style.width = `${progressWidth}%`;
      localStorage.setItem(videoStorageKey, String(video.currentTime));
    });
    video.addEventListener("ended", () => {
      setIsPaused(true);
      localStorage.removeItem(videoStorageKey);
    });
    video.addEventListener("pause", () => {
      setIsPaused(true);
    });
    video.addEventListener("play", () => {
      setIsPaused(false);
    });
    video.addEventListener("click", () => {
      playVideo();
    });
    videoContainer.addEventListener("mousemove", () => {
      showControls();
      if (timeoutHandle) {
        clearTimeout(timeoutHandle);
      }
      timeoutHandle = window.setTimeout(hideControls, 10000);
    });
  }, [video, videoContainer]);

  useEffect(() => {
    const adjustControlPosition = () => {
      if (!controls?.current) return;
      if (document.fullscreenElement === null) {
        controls.current.style.top = "";
        setIsFullscreen(false);
      } else {
        controls.current.style.top = "90%";
        setIsFullscreen(true);
      }
    };

    document.addEventListener("fullscreenchange", adjustControlPosition);
    return () => {
      document.removeEventListener("keydown", adjustControlPosition);
    };
  }, []);

  const showControls = () => {
    controls.current?.classList.remove("hide");
  };

  const hideControls = () => {
    controls.current?.classList.add("hide");
  };

  const muteVideo = () => {
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const volumeChange = () => {
    if (!volumeSlider?.current) return;
    video.volume = Number(volumeSlider.current.value);
    setIsMuted(video.volume === 0);
  };

  const toggleFullscreen = () => {
    if (!controls.current) return;
    if (document.fullscreenElement === null) {
      videoContainer.requestFullscreen();
      controls.current.style.top = "90%";
    } else {
      document.exitFullscreen();
      controls.current.style.top = "";
    }
    setIsFullscreen(!isFullscreen);
  };

  const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!seek.current) return;
    const seekPercentage = (e.nativeEvent.offsetX / seek.current.offsetWidth) * 100;
    video.currentTime = (video.duration * seekPercentage) / 100;
  };

  return (
    <div>
      <div className='controls hide' ref={controls}>
        <div className='progress-bar' onClick={scrub} ref={seek}>
          <div className='progress-fill' ref={progress}></div>
        </div>
        <div className='controls-grid'>
          <div className='time'>
            {realTime} / {totalDuration}
          </div>
          <button onClick={playVideo} className='control-button'>
            {isPaused ? <Play size={20} color='#ffffff' /> : <Pause size={20} color='#ffffff' />}
          </button>
          <button onClick={stopVideo} className='control-button'>
            <Square size={20} color='#ffffff' />
          </button>
          <button onClick={muteVideo} className='control-button'>
            {isMuted ? <VolumeX size={20} color='#ffffff' /> : <Volume2 size={20} color='#ffffff' />}
          </button>
          <input
            type='range'
            ref={volumeSlider}
            className='volume'
            min={0}
            max={1}
            step='0.1'
            defaultValue={1}
            onChange={volumeChange}
          />
          <button onClick={toggleFullscreen} className='control-button'>
            {isFullscreen ? <Minimize size={20} color='#ffffff' /> : <Maximize size={20} color='#ffffff' />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
