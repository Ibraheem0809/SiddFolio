"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles } from "lucide-react";

import { NAV_LINKS } from "@/data";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";
  }, [mobileOpen]);

  return (
    <motion.header
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.7,
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5">
        <div
          className={`relative flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-500 ${
            scrolled
              ? "border-white/10 bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.12)]"
              : "border-transparent bg-transparent"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600">
              <Sparkles className="w-5 h-5 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">Sidd</h1>

              <p className="text-xs text-neutral-400">Web Developer</p>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative px-4 py-2 text-sm text-neutral-300 transition hover:text-white group"
                >
                  {link.label}

                  <span className="absolute left-4 bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-[55%]" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop Button */}
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium hover:scale-105 transition"
          >
            Let&apos;s Talk
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -20,
              }}
              transition={{
                duration: 0.3,
              }}
              className="lg:hidden mt-4 rounded-3xl border border-white/10 bg-black/70 backdrop-blur-2xl overflow-hidden"
            >
              <div className="flex flex-col p-4">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{
                      opacity: 0,
                      x: -20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: i * 0.05,
                    }}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-4 rounded-xl text-neutral-300 hover:text-white hover:bg-white/5 transition"
                  >
                    {link.label}
                  </motion.a>
                ))}

                {/* Mobile CTA */}
                <a
                  href="#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-sm font-medium text-white"
                >
                  Let&apos;s Talk
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
