import { Inter } from "next/font/google";
import "./globals.css";
// import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "PasswordBox",
  description: "PasswordBox – Your secure, smart vault for managing passwords effortlessly across all your devices.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        {children}
        <Toaster />
      </body>
    </html>
  );
}
