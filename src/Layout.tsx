import { PropsWithChildren } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
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
