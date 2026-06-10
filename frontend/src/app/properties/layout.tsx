import { ReactNode } from "react";
import { PropertyProvider } from "@/context/PropertyContext";

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <PropertyProvider>
          {children}
        </PropertyProvider>
      </body>
    </html>
  );
}