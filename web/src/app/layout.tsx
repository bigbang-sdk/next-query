import type { Metadata } from "next";
import "./globals.css";
import { geistSans, geistMono } from "@/main/utils/fonts";
import { ThemeProvider } from "@/main/wrappers/theme-provider";
import { ThemeToggle } from "@/main/components/theme/theme-toggle";
import { Header } from "@/main/components/header/header";
import { Footer } from "@/main/components/footer/footer";

export const metadata: Metadata = {
  title: "Next Query / Bigbang",
  description: "Next Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
