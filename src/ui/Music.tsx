import { useEffect, useRef } from "react";

const baseUrl = import.meta.env.BASE_URL;
const fullUrl = baseUrl + "/assets/music.mp3";

type Props = {
  isPlaying: boolean;
  volume: number;
};

export function Music({ isPlaying, volume }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((e) => {
        console.log(e);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return <audio ref={audioRef} src={fullUrl} loop preload="auto" />;
}
