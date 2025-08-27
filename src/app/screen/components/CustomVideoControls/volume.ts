'use client';
export type Amplifier = {
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    gain: GainNode;
    amplify: (multiplier: number) => void;
};

export function getAmplifier(
    setVideo: React.Dispatch<React.SetStateAction<HTMLVideoElement | null>>
): Amplifier {
    const AvailableContext = window.AudioContext
    const context = new AvailableContext();
    const video = document.createElement('video');
    const result = {
        context,
        source: context.createMediaElementSource(video),
        gain: context.createGain(),
        amplify: (multiplier: number) => {
            result.gain.gain.value = multiplier;
        },
    };
    result.source.connect(result.gain);
    result.gain.connect(context.destination);
    setVideo(video);
    return result;
}
