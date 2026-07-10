"use client";

import { useId } from "react";
import Image, { type StaticImageData } from "next/image";

type Gender = "male" | "female";

// Shared with the real-photo path so a fallback avatar sits, scales, and
// desaturates-on-hover identically to a real portrait — no visual "tell"
// that a given card is a placeholder.
const fillTreatment =
  "h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-110 group-hover:grayscale-0";

export function TeamAvatar({
  photo,
  name,
  gender,
}: {
  photo?: StaticImageData;
  name: string;
  gender: Gender;
}) {
  if (photo) {
    return (
      <Image
        src={photo}
        alt={name}
        fill
        className={fillTreatment}
        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
      />
    );
  }

  return (
    <div className={`absolute inset-0 ${fillTreatment}`} role="img" aria-label={name}>
      <AvatarGlyph gender={gender} />
    </div>
  );
}

/**
 * The brand's default avatar — a faceted bust silhouette in Mizan's own
 * bronze/gold-on-graphite palette, with the dot-grid ground and viewfinder
 * corner brackets used elsewhere on the site. Built as a component (not a
 * static image) so it always tracks the live palette and renders crisp at
 * any card size; useId keeps gradient defs collision-free across the grid.
 */
function AvatarGlyph({ gender }: { gender: Gender }) {
  const uid = useId();
  const bgId = `${uid}-bg`;
  const figId = `${uid}-fig`;
  const hairId = `${uid}-hair`;
  const dotsId = `${uid}-dots`;

  return (
    <svg viewBox="0 0 320 400" className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <defs>
        <radialGradient id={bgId} cx="50%" cy="32%" r="80%">
          <stop offset="0%" stopColor="var(--graphite-500)" />
          <stop offset="100%" stopColor="var(--graphite-800)" />
        </radialGradient>
        <linearGradient id={figId} x1="160" y1="65" x2="160" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--gold-200)" />
          <stop offset="55%" stopColor="var(--bronze-500)" />
          <stop offset="100%" stopColor="var(--bronze-700)" />
        </linearGradient>
        <linearGradient id={hairId} x1="160" y1="60" x2="160" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--bronze-700)" />
          <stop offset="100%" stopColor="var(--bronze-900)" />
        </linearGradient>
        <pattern id={dotsId} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="#ffffff" fillOpacity="0.06" />
        </pattern>
      </defs>

      <rect width="320" height="400" fill={`url(#${bgId})`} />
      <rect width="320" height="400" fill={`url(#${dotsId})`} />

      {/* Aperture ring — a quiet technical/futuristic accent behind the head */}
      <circle cx="160" cy="150" r="98" fill="none" stroke="var(--bronze-500)" strokeOpacity="0.3" strokeWidth="1" />
      <circle
        cx="160"
        cy="150"
        r="98"
        fill="none"
        stroke="var(--gold-200)"
        strokeOpacity="0.16"
        strokeWidth="6"
        strokeDasharray="2 11"
      />

      {/* Viewfinder corner brackets */}
      <g stroke="var(--gold-200)" strokeOpacity="0.38" strokeWidth="1.5" fill="none">
        <path d="M28 30 h20 M28 30 v20" />
        <path d="M292 370 h-20 M292 370 v-20" />
      </g>

      {gender === "female" && (
        <path
          d="M160 60 L233 103 L253 288 L221 346 L199 301 L199 230 L121 230 L99 301 L67 346 L35 288 L87 103 Z"
          fill={`url(#${hairId})`}
        />
      )}

      {/* Shoulders */}
      <path
        d={
          gender === "male"
            ? "M46 400 L46 328 L92 246 L142 230 L178 230 L228 246 L274 328 L274 400 Z"
            : "M76 400 L76 334 L104 264 L140 240 L180 240 L216 264 L244 334 L244 400 Z"
        }
        fill={`url(#${figId})`}
      />

      {/* Neck */}
      <path d="M148 200 L172 200 L180 236 L140 236 Z" fill={`url(#${figId})`} />

      {/* Head */}
      <path d="M160 86 L200 107 L204 156 L178 202 L160 214 L142 202 L116 156 L120 107 Z" fill={`url(#${figId})`} />

      {gender === "male" ? (
        <path
          d="M118 108 L111 90 L136 75 L160 68 L184 75 L209 90 L202 108 L186 95 L160 89 L134 95 Z"
          fill={`url(#${hairId})`}
        />
      ) : (
        <path d="M160 68 L188 77 L160 90 L132 77 Z" fill={`url(#${hairId})`} fillOpacity="0.92" />
      )}

      {/* Facet lines — the low-poly "cut" detail tying the mark to the
          brand's chamfer/meander language */}
      <g stroke="var(--graphite-800)" strokeOpacity="0.28" strokeWidth="1.5" fill="none" strokeLinejoin="round">
        <path d="M160 86 L160 214 M116 156 L160 130 L204 156 M142 202 L160 130 L178 202" />
      </g>
    </svg>
  );
}
