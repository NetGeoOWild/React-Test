import { useEffect, useRef } from "react";

const baseUrl = import.meta.env.BASE_URL;
const fullUrl = baseUrl + "/assets/music.mp3";

type Props = {
  isPlaying: boolean;
};

export function Music({ isPlaying }: Props) {
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

  return <audio ref={audioRef} src={fullUrl} loop preload="auto" />;
}
