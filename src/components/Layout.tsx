import Head from "next/head";

import { Navbar } from "@components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  defaultTitle?: string;
  isContainer?: boolean;
  pageName?: string;
}

export const Layout = ({
  children,
  defaultTitle = "🦸 Hero Image Uploader",
  isContainer = true,
  pageName,
}: LayoutProps) => {
  return (
    <>
      <Head>
        <title>
          {pageName ? `${defaultTitle} | ${pageName}` : defaultTitle}
        </title>
        <meta
          name="description"
          content="Image storage app to save your images in a firebase repository with a friendly user experience"
        />
      </Head>
      <Navbar />
      <div
        className={
          isContainer
            ? "flex justify-center items-center w-full h-[calc(100%_-_64px)]"
            : ""
        }
      >
        {children}
      </div>
    </>
  );
};
