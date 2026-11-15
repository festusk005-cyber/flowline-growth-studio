import { useEffect, useRef } from "react";

export function OpeningAnimation() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const motion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const updatePlayback = () => {
      if (motion.matches) {
        video.pause();
      } else {
        void video.play().catch(() => {});
      }
    };

    updatePlayback();
    motion.addEventListener("change", updatePlayback);

    return () => {
      motion.removeEventListener("change", updatePlayback);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src="/79fde2545627958d92e3b0463132bd02_720w.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Digital automation animation"
      className="mx-auto aspect-video w-full max-w-5xl rounded-3xl bg-primary object-cover shadow-soft scale-x-[-1]"
    />
  );
}
