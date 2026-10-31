import type { Metadata } from "next";
import "./globals.css";
import { RootProvider } from "@/providers/RootProvider";

export const metadata: Metadata = {
  title: "HRM Portal - Hệ thống Quản trị Nhân sự",
  description: "Enterprise Human Resource Management Web Portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-slate-50 text-slate-800 antialiased font-['Be_Vietnam_Pro',sans-serif]"
        suppressHydrationWarning
      >
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
