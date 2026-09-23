import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Choose Your Bottleneck | Advancio",
  description: "A self-guided ITC experience from Advancio. Choose an insurance workflow bottleneck and see the future on the other side.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

