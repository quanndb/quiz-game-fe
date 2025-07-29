import LoadingHandler from "@/components/common/LoadingHandler";
import LoadingIndicator from "@/components/common/LoadingIndicator";
import SignToast from "@/components/ui/SignToast";
import "@/style/globals.css";
import type { Metadata } from "next";
import { Phudu } from "next/font/google";

const phudu = Phudu({
  variable: "--font-phudu",
  subsets: ["latin", "vietnamese"],
});

export const metadata: Metadata = {
  title: "Quiz Game",
  description: "A fun and interactive quiz game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${phudu.variable} antialiased`}>
        {children}

        <LoadingIndicator />
        <LoadingHandler />
        <SignToast />
      </body>
    </html>
  );
}
