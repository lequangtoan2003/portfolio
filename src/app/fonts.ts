import { Poppins, Roboto_Mono } from "next/font/google";

export const headingFont = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

export const contentFont = Roboto_Mono({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-content",
  display: "swap",
});
