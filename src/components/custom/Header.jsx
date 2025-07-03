import React from "react";
import { Button } from "../ui/button";
import { Link, useLocation } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

function Header() {
  const { user, isSignedIn } = useUser();
  const location = useLocation();
  const isAuthResolved = typeof isSignedIn === 'boolean';
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src="/LogoSVG.svg" alt="Clevvita Logo" className="h-14 w-14" />
        </Link>
        {/* Right Side: Nav Links + Auth/CTA + UserButton */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            <Link to="/features" className="text-gray-700 hover:text-violet-700  py-1 px-2 border-b-2 border-transparent hover:border-violet-500 focus:outline-none focus:text-violet-700 focus:border-violet-500 transition-all duration-150">Features</Link>
            <Link to="/about" className="text-gray-700 hover:text-violet-700 transition-colors py-1 px-2 border-b-2 border-transparent hover:border-violet-500 focus:outline-none focus:text-violet-700 focus:border-violet-500duration-150">About</Link>
          </nav>
          {isAuthResolved && !isSignedIn && (
            <Link to="/auth/sign-in">
              <Button className="bg-gradient-to-r from-violet-600 to-indigo-500 text-white shadow-md hover:scale-105 transition-transform duration-200">Try Clevvita Free</Button>
            </Link>
          )}
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  );
}

export default Header;
