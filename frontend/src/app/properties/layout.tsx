import { PropertyProvider } from "@/context/PropertyContext";


export default function RootLayout({ children }) {
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