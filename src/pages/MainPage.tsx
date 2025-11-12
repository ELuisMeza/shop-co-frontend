import { Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";

export const MainPage = () => {

  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      {/* === NavBar === */}
      <NavBar />

      {/* === Main Content === */}
      <main className="flex-1 container mx-auto px-4 py-10"><Outlet /></main>

      {/* === Footer === */}
      <Footer />
    </div>
  );
};
