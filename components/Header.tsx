"use client";

import { NetworkIcon } from "@/public/svg/svg";
import { SearchIcon } from "lucide-react";

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <header className="bg-blue-900 text-white px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* <svg className="w-8 h-8" viewBox="0 0 32 32" fill="currentColor">
            <circle cx="8" cy="8" r="3" />
            <circle cx="16" cy="8" r="3" />
            <circle cx="24" cy="8" r="3" />
            <circle cx="8" cy="16" r="3" />
            <circle cx="16" cy="16" r="3" />
            <circle cx="24" cy="16" r="3" />
            <circle cx="8" cy="24" r="3" />
            <circle cx="16" cy="24" r="3" />
            <circle cx="24" cy="24" r="3" />
          </svg> */}
          <NetworkIcon />
          <span className="text-xl font-bold">CivicDataSpace</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xs relative hidden sm:block">
          {/* <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />  */}
          {/* <input
            type="text"
            placeholder="Search datasets..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
          /> */}
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm hidden md:flex">
          <SearchIcon className=" w-4 h-4 hover:text-amber-400 transition" />

          <a href="#" className="hover:text-amber-400 transition">
            ALL DATA
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            SECTORS
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            USE CASES
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            PUBLISHERS
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            ABOUT US
          </a>
        </nav>

        {/* Login Button */}
        <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded font-medium flex-shrink-0 text-sm">
          LOGIN / SIGN UP
        </button>
      </div>
    </header>
  );
}
