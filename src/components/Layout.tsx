import { Navbar } from "@components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className="container">{children}</div>
    </>
  );
};
