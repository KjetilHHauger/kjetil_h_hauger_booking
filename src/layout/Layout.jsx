import { Outlet } from "react-router-dom";
import Nav from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="text-font-primary">
      <Nav />
      <main className="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
