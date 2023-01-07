import { Poppins } from "@next/font/google";

import "../styles/globals.css";
import type { AppProps } from "next/app";

const poppins = Poppins({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--poppins",
});

export default function App({ Component, pageProps }: AppProps) {
  // insert poppins font into the web
  return (
    <main className={poppins.variable}>
      <Component {...pageProps} />
    </main>
  );
}
