import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 bg-transparent">
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-36 h-auto" />
      </Link>

      {/* Links */}
      <div
        className={`
          ${menuOpen ? "max-md:fixed max-md:inset-0" : "max-md:hidden"}
          max-md:flex max-md:flex-col max-md:items-center max-md:justify-center
          max-md:font-medium max-md:text-lg
          z-40 md:flex md:flex-row gap-8
          md:px-8 py-3 md:rounded-full
          backdrop-blur bg-black/70 md:bg-white/10 md:border border-gray-300/20
          transition-all duration-300
        `}
      >
        {/* Close button (mobile only) */}
        {menuOpen && (
          <XIcon
            className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        )}

        <Link to="/" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false); }}>Home</Link>
        <Link to="/movies" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false); }}>Movies</Link>
        <Link to="/" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false); }}>Theaters</Link>
        <Link to="/" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false); }}>Release</Link>
        <Link to="/favorite" onClick={() => { window.scrollTo(0, 0); setMenuOpen(false); }}>Favorite</Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        
        {!isSignedIn ? (
          <button
            onClick={() => openSignIn()}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
                <UserButton.Action label="My Bookings" labelIcon={<TicketPlus width={15}/>} onClick={()=>{
                  navigate('/my-bookings')
                }}/> 
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <MenuIcon
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
        onClick={() => setMenuOpen(true)}
      />
    </div>
  );
};

export default Navbar;
