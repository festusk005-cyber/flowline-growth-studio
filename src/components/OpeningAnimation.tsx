import { useEffect, useRef } from "react";
import animation from "@/assets/opening-animation.mp4.asset.json";
import poster from "@/assets/opening-animation-poster.jpg.asset.json";

export function OpeningAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePlayback = () => {
      if (motion.matches) video.pause();
      else void video.play().catch(() => {});
    };
    updatePlayback();
    motion.addEventListener("change", updatePlayback);
    return () => motion.removeEventListener("change", updatePlayback);
  }, []);

  return (
    <video
      ref={videoRef}
      src={animation.url}
      poster={poster.url}
      muted
      loop
      playsInline
      controls
      preload="metadata"
      aria-label="Human and robotic hands connecting — digital automation animation"
      className="mx-auto h-[480px] w-full max-w-5xl bg-primary object-contain md:h-[560px]"
    />
  );
}