import { Navbar } from "@components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
  isGalery?: boolean;
}

export const Layout = ({ children, isGalery = false }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <div className={isGalery ? "galery-container" : "container"}>
        {children}
      </div>
    </>
  );
};
