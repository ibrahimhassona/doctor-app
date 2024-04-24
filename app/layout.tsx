import type { Metadata } from "next";
import "./globals.css";
import Provider from "./redux/Provider";
import Header from "./_component/Header";
import SideMenu from "./_component/SideMenu";
import DireAndTheme from "./_component/DireAndTheme";
import { Noto_Kufi_Arabic, Inter } from "next/font/google";
import PagesStyle from "./_component/PagesStyle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const kufi = Noto_Kufi_Arabic({ subsets: ["arabic"], variable: "--font-kufi" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
// ---------- META DATA AND TAP ICON ------------
export const metadata: Metadata = {
  title: "بيانات العياده",
  icons: {
    icon: ["/favicon.ico?v=4"],
    apple: ["/apple-touch-icon.png?v=4"],
    shortcut: ["/apple-touch-icon.png?v=4"],
  }
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body
        className={`${kufi.variable} ${inter.variable} font-[300] overflow-hidden `}
      >
        <Provider>
          <DireAndTheme>
            <Header />
            <div className="dist-view ">
              <SideMenu />
              <PagesStyle>
                {children}
                <ToastContainer />
              </PagesStyle>
            </div>
          </DireAndTheme>
        </Provider>
      </body>
    </html>
  );
}
