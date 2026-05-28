import type { Metadata } from "next";
import "./globals.css";
import ThemeWrapper from "@/components/ThemeWrapper";

export const metadata: Metadata = {
  title: "Will Essilfie",
  description:
    "Lead Product Manager at TPT and recent MBA graduate from Columbia Business School. I care about using technology and AI to create experiences that bring people together in the real world.",
  icons: {
    icon: [
      { url: "/img/favicon/favicon.ico", sizes: "any" },
      { url: "/img/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/img/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/img/favicon/favicon-32x32.png",
  },
  openGraph: {
    title: "Will Essilfie",
    description:
      "Lead Product Manager at TPT and recent MBA graduate from Columbia Business School.",
    url: "https://essilfie.com",
    siteName: "Will Essilfie",
    locale: "en_US",
    type: "website",
    images: ["/img/general/header-mta.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Will Essilfie",
    description:
      "Lead Product Manager at TPT and recent MBA graduate from Columbia Business School.",
    creator: "@dearfirstyear",
    images: ["/img/general/header-mta.png"],
  },
  other: {
    "theme-color": "#FF6900",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
