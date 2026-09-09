import { Link, NavLink } from "react-router-dom";
import {
  Search,
  Heart,
  Menu,
  X,
  Sparkles,
  MapPin,
  CalendarSearch,
} from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const navLinks = [
    {
      name: "Explore",
      path: "/explore",
    },
    {
      name: "Stays",
      path: "/stays",
    },
    {
      name: "About",
      path: "/about",
    },
   
  ];

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* =========================
            LOGO
        ========================== */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
            <MapPin
              size={20}
              strokeWidth={2.5}
            />
          </div>

          <div>
            <span className="block text-xl font-bold tracking-tight text-gray-950">
              Apex<span className="text-gray-500">Homes</span>
            </span>

            <span className="hidden text-[9px] font-medium uppercase tracking-[0.2em] text-gray-400 sm:block">
              Stay somewhere exceptional
            </span>
          </div>
        </Link>

        {/* =========================
            FIND MY BOOKING
        ========================== */}
        <Link
          to="/booking-lookup"
          className="hidden w-[360px] items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 shadow-sm transition hover:border-gray-300 hover:shadow-md lg:flex"
        >
          <CalendarSearch
            size={18}
            className="shrink-0 text-gray-500"
          />

          <span className="text-sm text-gray-500">
            Find my booking
          </span>
        </Link>

        {/* =========================
            DESKTOP NAVIGATION
        ========================== */}
        <nav className="hidden items-center gap-7 lg:flex">

          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-black"
                    : "text-gray-600 hover:text-black"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

          {/* AI ASSISTANT */}
          <Link
            to="/ai"
            className="flex items-center gap-2 rounded-full bg-gray-950 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            <Sparkles size={15} />
            AI Assistant
          </Link>

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            aria-label="Wishlist"
            className="relative rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-black"
          >
            <Heart size={20} />
          </Link>

        </nav>

        {/* =========================
            MOBILE MENU BUTTON
        ========================== */}
        <button
          type="button"
          onClick={() =>
            setMobileMenuOpen((prev) => !prev)
          }
          className="rounded-full p-2 text-gray-700 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? (
            <X size={23} />
          ) : (
            <Menu size={23} />
          )}
        </button>
      </div>

      {/* =========================
          MOBILE NAVIGATION
      ========================== */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-4 py-5 lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2">

            {/* Find My Booking */}
            <Link
              to="/booking-lookup"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <CalendarSearch size={18} />
              Find my booking
            </Link>

            {/* Explore */}
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              
              Home
            </Link>

            {/* Main Links */}
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={closeMobileMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? "bg-gray-100 text-gray-950"
                      : "text-gray-700 hover:bg-gray-50"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* AI */}
            <Link
              to="/ai"
              onClick={closeMobileMenu}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-gray-950 px-4 py-3 text-sm font-medium text-white"
            >
              <Sparkles size={16} />
              Ask Apex AI
            </Link>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <Heart size={18} />
              Wishlist
            </Link>

          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;