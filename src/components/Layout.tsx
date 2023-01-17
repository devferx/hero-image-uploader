import { Navbar } from "@components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isContainer?: boolean;
}

export const Layout = ({ children, isContainer = true }: LayoutProps) => {
  return (
    <>
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
