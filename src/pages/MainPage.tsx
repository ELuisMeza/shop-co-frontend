
import { Outlet } from "react-router-dom";

export const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background text-text">
      {/* === NavBar === */}
      <nav className="w-full bg-background border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">MyApp</h1>
          <ul className="flex gap-6 text-sm">
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Products
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* === Main Content === */}
      <main className="flex-1 container mx-auto px-4 py-10"><Outlet /></main>

      {/* === Footer === */}
      <footer className="w-full border-t border-border bg-background text-muted text-sm">
        <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© 2025 MyApp Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Terms
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
