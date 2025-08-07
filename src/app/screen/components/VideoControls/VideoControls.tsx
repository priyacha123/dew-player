/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Maximize,
  Minimize,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Captions,
  CaptionsOffIcon,
  PictureInPicture,
<<<<<<< HEAD
  SkipForwardIcon,
  SkipBackIcon,
  TimerIcon,
=======
>>>>>>> 502e213 (feat: add picture-in-picture feature)
  // Square,
} from "lucide-react";
import { secondsToTime } from "../CustomVideoControls/time";
import "./VideoControls.css";
import SpeedSettings from "./SpeedSettings";

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

  // Subtitle on/off logic
  const [isSubtitle, setIsSubtitle] = useState(true);
  // Setting div menu show/hide logic
  const [showMenu, setShowMenu] = useState(false);
  const [speed, setSpeed] = useState(1);

  const progress = useRef<HTMLDivElement>(null);
  const volumeSlider = useRef<HTMLInputElement>(null);
  const seek = useRef<HTMLDivElement>(null);
  const controls = useRef<HTMLDivElement>(null);
  const videoStorageKey = `vid--name--${videoName}`;

  //  logic for caption/subtitle button
  const toggleSubtitle = () => {
    setIsSubtitle(!isSubtitle);
  };

  //  logic for "setting" button
  const toggleSetting = () => {
    setShowMenu((prev) => !prev);
    console.log(showMenu);
  };

  // speed options in setting
  const handleSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (video) {
      video.playbackRate = newSpeed;
    }
  };

  // console.log("videoObject.playbackRate",video.playbackRate);

  useEffect(() => {
    if (video?.textTracks?.length > 0) {
      const track = video.textTracks[0];
      track.mode = isSubtitle ? "showing" : "disabled";
    }
  }, [isSubtitle]);

  const playVideo = () => {
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  // const stopVideo = () => (video.currentTime = video.duration);

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
      timeoutHandle = window.setTimeout(hideControls, 5000);
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

<<<<<<< HEAD
  // picture-in-picture feature
  function requestPictureInPicture() {
    if (document.pictureInPictureEnabled) {
      video.requestPictureInPicture();
=======
function requestPictureInPicture() {
  if (document.pictureInPictureEnabled) {
    video.requestPictureInPicture();
  } else {
    console.log("Your browser cannot use picture-in-picture right now");
  }
}



  const toggleFullscreen = () => {
    if (!controls.current) return;
    if (document.fullscreenElement === null) {
      videoContainer.requestFullscreen();
      controls.current.style.top = "90%";
>>>>>>> 502e213 (feat: add picture-in-picture feature)
    } else {
      console.log("Your browser cannot use picture-in-picture right now");
    }
  }

  // skip 5 sec forward or backward
  const skipForward = () => {
    video.currentTime = Math.min(video.duration, video.currentTime + 5);
  };

  const skipBackward = () => {
    video.currentTime = Math.max(0, video.currentTime - 5);
  };

  // full screen on clicking "F" button logic
  const toggleFullscreen = () => {
      // if (!controls.current) return;
      if (document.fullscreenElement === null ) {
        videoContainer.requestFullscreen();
        // controls.current.style.top = "90%";
      } else {
        document.exitFullscreen();
        // controls.current.style.top = "";
      }
    setIsFullscreen(!isFullscreen);
  };


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
       if (!controls.current) return;
       if (e.key.toLowerCase() === "f") {
         if (document.fullscreenElement === null ) {
           videoContainer.requestFullscreen();
           controls.current.style.top = "90%";
          } else {
            document.exitFullscreen();
            controls.current.style.top = "";
          }
        }
    };
    setIsFullscreen(!isFullscreen); 
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);    
    }, []);

  const scrub = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!seek.current) return;
    const seekPercentage =
      (e.nativeEvent.offsetX / seek.current.offsetWidth) * 100;
    video.currentTime = (video.duration * seekPercentage) / 100;
  };

  return (
    <div>
      <div className="controls hide" ref={controls}>
        <div className="progress-bar" onClick={scrub} ref={seek}>
          <div className="progress-fill" ref={progress}></div>
        </div>
        <div className="controls-grid">
          <div className="video-time">
            <div className="left-track">
              <button className="backward" onClick={skipBackward}>
                <SkipBackIcon size={20} color="#ffffff" />
              </button>

              <div className="play-pause">
                <div className="play ">
                  <button onClick={playVideo} className="control-button">
                    {isPaused ? (
                      <Play size={20} color="#ffffff" />
                    ) : (
                      <Pause size={20} color="#ffffff" />
                    )}
                  </button>
                </div>
                {/* <div className="pause">
              <button onClick={stopVideo} className="control-button">
                <Square size={20} color="#ffffff" />
              </button>
            </div> */}
              </div>
              <button className="forward" onClick={skipForward}>
                <SkipForwardIcon size={20} color="#ffffff" />
              </button>
            </div>
            <div className="time">
              {realTime} / {totalDuration}
            </div>
            <div className="volume">
              <div className="volume-slider">
                <input
                  type="range"
                  ref={volumeSlider}
                  className="volume"
                  min={0}
                  max={1}
                  step="0.1"
                  defaultValue={1}
                  onChange={volumeChange}
                />
              </div>
              <div className="mute-video">
                <button onClick={muteVideo} className="control-button">
                  {isMuted ? (
                    <VolumeX size={20} color="#ffffff" />
                  ) : (
                    <Volume2 size={20} color="#ffffff" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="right-track">
            <button className="subtitleBtn" onClick={toggleSubtitle}>
              {isSubtitle ? (
                <Captions size={20} color="#ffffff" />
              ) : (
                <CaptionsOffIcon size={20} color="#ffffff" />
              )}
            </button>
            <button className="pip" onClick={requestPictureInPicture}>
              <PictureInPicture size={20} color="#ffffff" />
<<<<<<< HEAD
=======
            </button>
            <button className="setting">
              <Settings size={20} color="#ffffff" />
>>>>>>> 502e213 (feat: add picture-in-picture feature)
            </button>
            <button onClick={toggleSetting} className="setting">
              <TimerIcon size={20} color="#ffffff" />
            </button>
            <SpeedSettings
              handleSpeed={handleSpeed}
              speed={speed}
              showMenu={showMenu}
            />
            <button onClick={toggleFullscreen} className="control-button">
              {isFullscreen ? (
                <Minimize size={20} color="#ffffff" />
              ) : (
                <Maximize size={20} color="#ffffff" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoControls;
