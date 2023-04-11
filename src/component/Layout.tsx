import { FC, ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

interface Props {
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  const { children } = props;
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};
