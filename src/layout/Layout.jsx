import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useVenues } from "../hooks/useVenues";
import VenuesContext from "../context/VenuesContext";
import Nav from "./Nav";
import Footer from "./Footer";

export default function Layout() {
  const venuesData = useVenues();

  return (
    <div className="text-font-body flex flex-col min-h-screen max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
      <VenuesContext.Provider value={venuesData}>
        <Nav />
        <main className="flex-grow">
          <Outlet />
          <ToastContainer
            position="top-center"
            autoClose={3000}
            theme="colored"
          />
        </main>
        <Footer />
      </VenuesContext.Provider>
    </div>
  );
}
