"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Subtitles, Maximize, Minimize } from "lucide-react";
import { useUpload } from "@/store/upload-context";
import { convertSRTtoVTT } from "@/lib/srt-to-vtt";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [subtitleSettings, setSubtitleSettings] = useState({
    fontSize: 16,
    color: "#ffffff",
    backgroundColor: "#000000",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const trackRef = useRef<HTMLTrackElement>(null);

  const loadSubtitles = async (url: string) => {
    try {
      const response = await fetch(url);
      const content = await response.text();

      // Detect if it's SRT format by checking for numbered lines and comma in timestamps
      const isSRT = content.split("\n").some((line) => line.includes(",") && line.includes("-->"));

      if (isSRT) {
        const vttContent = convertSRTtoVTT(content);
        const blob = new Blob([vttContent], { type: "text/vtt" });
        return URL.createObjectURL(blob);
      }

      return url;
    } catch (error) {
      console.error("Error loading subtitles:", error);
      return url;
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  }, [videoRef.current?.duration]);

  const { videoFile, subtitleFile } = useUpload();
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | undefined>();
  const [subtitleObjectUrl, setSubtitleObjectUrl] = useState<string | undefined>();
  console.log({ subtitleFile, subtitleObjectUrl });
  useEffect(() => {
    if (videoFile) {
      const url = URL.createObjectURL(videoFile);
      setVideoObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [videoFile]);

  useEffect(() => {
    const initSubtitles = async () => {
      if (subtitleFile) {
        try {
          const url = URL.createObjectURL(subtitleFile);
          const subtitleUrl = await loadSubtitles(url);
          if (trackRef.current) {
            trackRef.current.src = subtitleUrl;
            // Force reload of track element
            const video = videoRef.current;
            if (video) {
              const track = video.textTracks[0];
              if (track) {
                track.mode = "showing";
              }
            }
          }
          setSubtitleObjectUrl(subtitleUrl);
          URL.revokeObjectURL(url);
        } catch (error) {
          console.error("Error initializing subtitles:", error);
        }
      }
    };
    initSubtitles();
    return () => {
      if (subtitleObjectUrl) {
        URL.revokeObjectURL(subtitleObjectUrl);
      }
    };
  }, [subtitleFile]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleSeek = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  };

  const handleVolumeChange = (value: number[]) => {
    if (videoRef.current) {
      videoRef.current.volume = value[0];
      setVolume(value[0]);
      setIsMuted(value[0] === 0);
    }
  };

  const handleSkip = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = currentTime + seconds;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-background p-4'>
      <div ref={containerRef} className='w-full max-w-4xl rounded-lg bg-card shadow-xl [&:fullscreen]:p-0'>
        <div className='relative'>
          <video
            ref={videoRef}
            className='w-full rounded-t-lg [&:fullscreen]:rounded-none'
            onTimeUpdate={handleTimeUpdate}
            src={videoObjectUrl}
            controls={false}
            crossOrigin='anonymous'
            onLoadedMetadata={() => {
              const track = videoRef.current?.textTracks[0];
              if (track) {
                track.mode = "showing";
              }
            }}
            style={
              {
                "--subtitle-font-size": `${subtitleSettings.fontSize}px`,
                "--subtitle-color": subtitleSettings.color,
                "--subtitle-bg-color": subtitleSettings.backgroundColor,
              } as React.CSSProperties
            }
          >
            <track ref={trackRef} kind='subtitles' srcLang='en' label='English' default />
          </video>

          <div
            className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity hover:opacity-100 [&:not(:hover)]:opacity-0'
            style={
              {
                "--subtitle-font-size": `${subtitleSettings.fontSize}px`,
                "--subtitle-color": subtitleSettings.color,
                "--subtitle-bg-color": subtitleSettings.backgroundColor,
              } as React.CSSProperties
            }
          >
            <div className='mb-4 flex items-center justify-between gap-4'>
              <Slider
                value={[currentTime]}
                min={0}
                max={duration || 100}
                step={1}
                onValueChange={handleSeek}
                className='w-full'
              />
              <span className='text-sm text-white'>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleSkip(-10)}
                  className='text-white hover:bg-white/20'
                >
                  <SkipBack className='h-6 w-6' />
                </Button>

                <Button variant='ghost' size='icon' onClick={handlePlayPause} className='text-white hover:bg-white/20'>
                  {isPlaying ? <Pause className='h-6 w-6' /> : <Play className='h-6 w-6' />}
                </Button>

                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => handleSkip(10)}
                  className='text-white hover:bg-white/20'
                >
                  <SkipForward className='h-6 w-6' />
                </Button>

                <div className='flex items-center gap-2'>
                  <Button variant='ghost' size='icon' onClick={toggleMute} className='text-white hover:bg-white/20'>
                    {isMuted ? <VolumeX className='h-6 w-6' /> : <Volume2 className='h-6 w-6' />}
                  </Button>
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.1}
                    onValueChange={handleVolumeChange}
                    className='w-24'
                  />
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant='ghost' size='icon' className='text-white hover:bg-white/20'>
                      <Subtitles className='h-6 w-6' />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Subtitle Settings</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='fontSize'>Font Size</Label>
                        <Input
                          id='fontSize'
                          type='number'
                          value={subtitleSettings.fontSize}
                          className='col-span-3'
                          onChange={(e) =>
                            setSubtitleSettings({
                              ...subtitleSettings,
                              fontSize: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='color'>Color</Label>
                        <Input
                          id='color'
                          type='color'
                          value={subtitleSettings.color}
                          className='col-span-3'
                          onChange={(e) =>
                            setSubtitleSettings({
                              ...subtitleSettings,
                              color: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='bgColor'>Background</Label>
                        <Input
                          id='bgColor'
                          type='color'
                          value={subtitleSettings.backgroundColor}
                          className='col-span-3'
                          onChange={(e) =>
                            setSubtitleSettings({
                              ...subtitleSettings,
                              backgroundColor: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant='ghost' size='icon' onClick={toggleFullscreen} className='text-white hover:bg-white/20'>
                  {isFullscreen ? <Minimize className='h-6 w-6' /> : <Maximize className='h-6 w-6' />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
