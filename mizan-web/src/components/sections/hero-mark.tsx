"use client";

import { forwardRef } from "react";
import { BASE_PATH } from "@/base-path";

/**
 * The brand's logo-assembly animation, looping infinitely as an ambient
 * full-bleed background layer — never a bounded "video player," just the
 * hero's atmosphere. Overlays (gradient, dots, grain) are applied by the parent.
 */
export const HeroVideoBackground = forwardRef<HTMLVideoElement>(function HeroVideoBackground(_props, ref) {
  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
    >
      <source src={`${BASE_PATH}/brand/mizan-logo-animation.mp4`} type="video/mp4" />
    </video>
  );
});
