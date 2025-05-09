import { useEffect, useRef, useState } from "react";
import heroVideo from "../assets/video/heroLoopVideo.mp4";
import heroImage from "../assets/video/heroLoopImage.webp";

export default function HeroVideo({ children }) {
  const videoRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const playCountRef = useRef(0);
  const maxLoops = 1;

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

  const handleCanPlay = () => {
    setVideoReady(true);
  };

  const restartVideo = () => {
    const video = videoRef.current;
    playCountRef.current = 0;
    video.currentTime = 0;
    video.play();
  };

  return (
    <div className="relative max-w-[1920px] h-[550px] overflow-hidden bg-black">
      {!videoReady && (
        <img
          src={heroImage}
          alt="Venue hero placeholder"
          className="w-full h-full object-cover"
        />
      )}

      <video
        ref={videoRef}
        src={heroVideo}
        poster={heroImage}
        className={`w-full h-full object-cover object-[50%_68%] transition-opacity duration-500 ${
          videoReady ? "opacity-100" : "opacity-0"
        }`}
        autoPlay
        muted
        playsInline
        onCanPlay={handleCanPlay}
      />

      <div className="absolute inset-0 flex items-center justify-center z-10 p-8">
        {children}
      </div>

      <button
        onClick={restartVideo}
        className="absolute bottom-9 right-16 bg-cta/30 text-white px-3 py-1 rounded shadow hover:bg-cta-hover z-20"
      >
        Restart
      </button>
    </div>
  );
}
