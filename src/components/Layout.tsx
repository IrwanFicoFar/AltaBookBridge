import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div className="h-screen dark:bg-slate-900">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
