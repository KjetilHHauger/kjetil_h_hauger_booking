import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Layout() {
  return (
    <div className="text-font-body flex flex-col min-h-screen">
      <Nav />
      <main className="flex-grow mb-10">
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
