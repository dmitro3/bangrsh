import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { PositionsProvider } from "@/contexts/PositionsContext";

export const metadata: Metadata = {
  title: "Bangr - Prediction Markets for Twitter Engagement",
  description: "Pump.fun for Tweets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <PositionsProvider>
            {children}
          </PositionsProvider>
        </Providers>
      </body>
    </html>
  );
}
