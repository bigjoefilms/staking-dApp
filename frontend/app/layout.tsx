import localFont from "next/font/local";
import "./globals.css";
import ConnectWalletProvider from "@/provider/ConnectWalletProvider";
import StateProvider from "@/provider/StateProvider";

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
  title: "Concordium Staking dApp",
  description: "Stake your $CCD and get daily reward incentive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ConnectWalletProvider>
          <StateProvider>{children}</StateProvider>
        </ConnectWalletProvider>
      </body>
    </html>
  );
}
