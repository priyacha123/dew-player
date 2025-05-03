"use client";

import { useEffect, useState } from "react";

interface CaptionRendererProps {
  track: TextTrack | null;
  fontSize: number;
  color: string;
  backgroundColor: string;
}

export function CaptionRenderer({ track, fontSize, color, backgroundColor }: CaptionRendererProps) {
  const [activeCue, setActiveCue] = useState<VTTCue | null>(null);

  useEffect(() => {
    if (!track) return;

    const handleCueChange = () => {
      const cues = track.activeCues;
      if (cues && cues.length > 0) {
        setActiveCue(cues[0] as VTTCue);
      } else {
        setActiveCue(null);
      }
    };

    track.addEventListener("cuechange", handleCueChange);
    return () => track.removeEventListener("cuechange", handleCueChange);
  }, [track]);
  console.log(activeCue?.text);
  if (!activeCue) return null;

  return (
    <div
      className='absolute bottom-16 left-0 right-0 z-50 text-center'
      style={{
        fontSize: `${fontSize}px`,
        color,
        textShadow: "2px 2px 2px rgba(0, 0, 0, 0.8)",
      }}
    >
      <span
        className='inline-block rounded-md px-2 py-1'
        style={{
          backgroundColor: `${backgroundColor}cc`,
        }}
      >
        {activeCue.text}
      </span>
    </div>
  );
}
