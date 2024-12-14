import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./Layout.css";

function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <Navbar />
      <div className="container">
        <Sidebar />
        {children}
      </div>
    </main>
  );
}

export default Layout;
