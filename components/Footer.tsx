"use client";

import { NetworkIcon } from "@/public/svg/svg";
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
  FacebookIcon,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <NetworkIcon />
              <span className="text-lg font-bold">CivicDataSpace</span>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex justify-end items-start gap-6">
            <div>
              <p className="text-sm font-semibold mb-3 text-amber-400 ml-30">
                Follow Us
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-teal-600 hover:bg-teal-700 p-2 rounded-full transition"
                >
                  <GithubIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-teal-600 hover:bg-teal-700 p-2 rounded-full transition"
                >
                  <LinkedinIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-teal-600 hover:bg-teal-700 p-2 rounded-full transition"
                >
                  <TwitterIcon className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-teal-600 hover:bg-teal-700 p-2 rounded-full transition"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-6 justify-center text-sm text-blue-200 mb-6">
            <a href="#" className="hover:text-white transition">
              ABOUT US
            </a>
            <a href="#" className="hover:text-white transition">
              SITEMAP
            </a>
            <a href="#" className="hover:text-white transition">
              CONTACT US
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center text-white text-xs flex items-center justify-center gap-2">
            <span className="hover:text-white transition">made by</span>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
