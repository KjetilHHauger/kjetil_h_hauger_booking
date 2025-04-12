import { useEffect, useRef } from "react";
import heroVideo from "../assets/video/heroLoopVideo.mp4";

export default function HeroVideo() {
  const videoRef = useRef(null);
  const playCountRef = useRef(0);
  const maxLoops = 3;

  useEffect(() => {
    const video = videoRef.current;

    const handleEnded = () => {
      if (playCountRef.current < maxLoops - 1) {
        playCountRef.current++;
        video.play();
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => {
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  const restartVideo = () => {
    const video = videoRef.current;
    playCountRef.current = 0;
    video.currentTime = 0;
    video.play();
  };

  return (
    <div className="relative w-full mx-auto h-[550px] overflow-hidden ">
      <video
        ref={videoRef}
        src={heroVideo}
        className="w-full h-full object-cover object-[50%_68%]"
        autoPlay
        muted
        playsInline
      />
      <button
        onClick={restartVideo}
        className="absolute bottom-9 right-16 bg-brand-secondary/30 text-white px-3 py-1 rounded shadow hover:bg-brand-secondary-hover"
      >
        Restart
      </button>
    </div>
  );
}
