import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <>
      <Navbar />
      <div style={{ height: "var(--soel-nav-height)" }} />
      <Outlet />
      <Footer />
    </>
  );
}
