import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/main/utils/fonts";
import { ThemeProvider } from "@/main/wrappers/theme-provider";
import { ThemeToggle } from "@/main/components/ui/theme-toggle";
import { Header } from "@/main/components/global/header/header";
import { Footer } from "@/main/components/global/footer/footer";
import ReactScan from "@/main/lib/react-scan";

export const metadata: Metadata = {
  title: "Next Query",
  description: "One library, multiple patterns: Next Query is a data-fetching library for Next.js that simplifies the process of retrieving data in both Server and Client Components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      {process.env.VERCEL_ENV !== "production" && <ReactScan />}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <Header />
          <div className="min-h-[calc(100vh-3.5rem)] flex flex-col flex-1">{children}</div>
          <Footer />
          {process.env.VERCEL_ENV !== "production" && (
            <div className="fixed bottom-0 right-0 z-50 m-4">
              <ThemeToggle />
            </div>
          )}
        </ThemeProvider>
      </body>
    </html>
  );
}
