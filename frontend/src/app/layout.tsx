import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MotionProvider from "./providers/MotionProvider";
import Login from "@/components/common/Login";
import CustomCursor from "@/components/common/CustomCursor";
import ScrollProgress from "@/components/common/ScrollProgress";
import AIAssistant from "@/components/layout/AIAssistant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata: Metadata = {
  metadataBase: new URL("https://mishtispaces.com"),

  title: {
    default: "Mishti Spaces | Premium Properties & Office Spaces",
    template: "%s | Mishti Spaces",
  },

  description:
    "Discover premium office spaces, commercial properties, apartments, villas, and investment opportunities across Noida, Greater Noida, Gurgaon, and Delhi NCR with Mishti Spaces.",

  keywords: [
    "Mishti Spaces",
    "Noida Office Space",
    "Commercial Property Noida",
    "Office Space for Rent",
    "Real Estate India",
    "Luxury Apartments",
    "Property Listing",
    "Coworking Space",
    "Delhi NCR Properties",
    "Property Investment",
  ],

  authors: [{ name: "Mishti Spaces" }],
  creator: "Mishti Spaces",
  publisher: "Mishti Spaces",

  openGraph: {
    title: "Mishti Spaces | Premium Properties & Office Spaces",
    description:
      "Find premium office spaces, apartments, and commercial properties in Noida, Greater Noida, Gurgaon, and Delhi NCR.",
    url: "https://mishtispaces.com",
    siteName: "Mishti Spaces",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Mishti Spaces",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Mishti Spaces",
    description:
      "Find premium office spaces and commercial properties in India.",
    images: ["/logo.png"],
  },

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  alternates: {
    canonical: "https://mishtispaces.com",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-sor-default">
        <MotionProvider>
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main className="flex-1 smooth-ui mt-16  ">{children}</main>
          <Login />
          <AIAssistant />
          <Footer />
        </MotionProvider>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </body>
    </html>
  );
}
