import { Navbar } from "@components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isContainer?: boolean;
}

export const Layout = ({ children, isContainer = true }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className={isContainer ? "container" : ""}>{children}</div>
    </>
  );
};
