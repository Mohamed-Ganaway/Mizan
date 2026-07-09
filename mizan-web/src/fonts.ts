import {
  Archivo,
  Fraunces,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Arabic,
  Noto_Kufi_Arabic,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "900"],
  variable: "--font-fraunces",
  display: "swap",
});

export const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const notoKufi = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["700", "800"],
  variable: "--font-noto-kufi",
  display: "swap",
});

export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "600"],
  variable: "--font-plex-arabic",
  display: "swap",
});

export const fontVariables = [
  fraunces.variable,
  archivo.variable,
  plexMono.variable,
  notoKufi.variable,
  plexArabic.variable,
].join(" ");
