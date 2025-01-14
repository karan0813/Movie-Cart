import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./HomeScreen/Provider";
import LoginScreenNavbar from "@/components/LoginScreenNavbar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {/* <div className="flex justify-center items-center flex-col h-screen"> */}

          {children}
          {/* </div> */}
        </Providers>
      </body>
    </html>
  );
}
