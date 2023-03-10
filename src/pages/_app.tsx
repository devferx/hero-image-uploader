import { SessionProvider } from "next-auth/react";
import { Poppins } from "@next/font/google";
import type { AppProps } from "next/app";

import "sweetalert2/dist/sweetalert2.min.css";
import "../styles/globals.css";

const poppins = Poppins({
  weight: ["400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--poppins",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  // insert poppins font into the web
  return (
    <SessionProvider session={session}>
      <main className={`main ${poppins.variable}`}>
        <Component {...pageProps} />
      </main>
      <style jsx global>
        {`
          :root {
            --poppins-font: ${poppins.style.fontFamily};
          }
        `}
      </style>
    </SessionProvider>
  );
}
