import { Outlet } from "react-router-dom";
import Nav from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  return (
    <div className="text-font-primary">
      <Nav />
      <main className="main">
        <Outlet />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          theme="colored"
        />
      </main>
      <Footer />
    </div>
  );
}
