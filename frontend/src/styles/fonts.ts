import { Outfit, Sora } from "next/font/google";

export const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const fontDisplay = Sora({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});
