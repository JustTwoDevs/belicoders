import "./globals.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import { Rubik } from "next/font/google";
import Navbar from "@/components/Navbar";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "Belicoders",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${rubik.className} max-w-[100dvw]`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
