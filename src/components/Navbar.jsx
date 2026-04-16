import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { HiMenu, HiX, HiMoon, HiSun } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../utils/motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const { isDark, toggleTheme } = useTheme();
  const { isAdmin, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/about", label: t("nav.about") },
    { href: "/events", label: t("nav.events") },
    { href: "/gallery", label: t("nav.gallery") },
  ];

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const currentPath = location.pathname.startsWith("/events")
      ? "/events"
      : location.pathname.startsWith("/programs")
        ? "/about"
        : location.pathname;

    setActiveLink(currentPath);
  }, [location.pathname]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setIsMenuOpen(false);
    if (location.pathname !== link.href) {
      navigate(link.href);
    }
  };

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      const offset = 80;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({ top: elementPosition, behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    setIsMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToContact, 120);
    } else {
      scrollToContact();
    }
  };

  return (
    <>
      <motion.nav
        variants={fadeIn("down", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-900 backdrop-blur-md z-40 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors"
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16 md:h-20 gap-2 sm:gap-3">
            {/* Logo */}
            <motion.div
              variants={fadeIn("right", 0.3)}
              className="order-1 flex items-center gap-1 sm:gap-1.5 md:gap-2 cursor-pointer flex-shrink-0 z-50 whitespace-nowrap"
              onClick={() => {
                navigate("/");
                setIsMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <img
                src={logo}
                alt="YANGG Logo"
                className="!h-5 sm:!h-6 md:!h-7 w-auto max-h-7"
              />
              <span className="text-xs sm:text-sm md:text-base lg:text-base font-bold text-[#f0c630] tracking-wide whitespace-nowrap">
                YANGG
              </span>
            </motion.div>

            {/* Navigation Links - Desktop */}
            <motion.div
              variants={fadeIn("down", 0.3)}
              className="order-2 hidden lg:flex items-center gap-2 xl:gap-4 2xl:gap-6 flex-1 justify-center"
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={index}
                  variants={fadeIn("down", 0.1 * (index + 1))}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`text-xs xl:text-sm 2xl:text-base font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#32a8ed] after:transition-all cursor-pointer whitespace-nowrap
                  ${activeLink === link.href ? "text-[#32a8ed] after:w-full" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"}`}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            {/* Right Side: CTA Button, Language Switcher, Theme Toggle & Mobile Menu */}
            <div className="order-3 flex items-center gap-1 sm:gap-2 flex-shrink-0 z-50">
              {/* CTA Button - Desktop Only */}
              <motion.button
                type="button"
                onClick={handleContactClick}
                variants={fadeIn("left", 0.3)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden lg:inline-flex px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg bg-[#32a8ed] text-white hover:bg-[#2a8bc4] text-xs xl:text-sm 2xl:text-base font-medium transition-all hover:shadow-lg hover:shadow-[#32a8ed]/30 cursor-pointer whitespace-nowrap"
              >
                {t("nav.getInTouch")}
              </motion.button>

              {!isAdminRoute && (
                <motion.button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false)
                    navigate(isAdmin ? '/admin' : '/admin/login')
                  }}
                  variants={fadeIn("left", 0.35)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:inline-flex px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 text-xs xl:text-sm 2xl:text-base font-medium transition-all cursor-pointer whitespace-nowrap ml-2"
                >
                  {isAdmin ? 'Dashboard' : 'Admin'}
                </motion.button>
              )}

              {isAdmin && !isAdminRoute && (
                <motion.button
                  type="button"
                  onClick={() => {
                    logout()
                    navigate('/')
                  }}
                  variants={fadeIn("left", 0.35)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hidden lg:inline-flex px-3 xl:px-5 py-2 xl:py-2.5 rounded-lg bg-red-500 text-white hover:bg-red-600 text-xs xl:text-sm 2xl:text-base font-medium transition-all cursor-pointer whitespace-nowrap ml-2"
                >
                  Logout
                </motion.button>
              )}

              {/* Language Switcher - Desktop Only */}
              <div className="hidden lg:block">
                <LanguageSwitcher />
              </div>

              {/* Theme Toggle Button */}
              <motion.button
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView="show"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer flex-shrink-0"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <HiSun className="h-4 w-4 sm:h-5 sm:w-5" />
                ) : (
                  <HiMoon className="h-4 w-4 sm:h-5 sm:w-5" />
                )}
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                variants={fadeIn("left", 0.3)}
                className="lg:hidden p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer flex-shrink-0 relative z-50 border border-gray-200 dark:border-gray-700"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiX className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <HiMenu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-x-0 top-14 bottom-0 w-full sm:w-80 bg-white dark:bg-gray-900 shadow-2xl z-60 lg:hidden overflow-y-auto"
            >
              <div className="p-3 sm:p-4 md:p-6 space-y-2">
                {/* Mobile Language Switcher */}
                <div className="lg:hidden pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Language
                  </p>
                  <LanguageSwitcher />
                </div>

                {/* Navigation Section */}
                <div className="pb-3 mb-3 border-b border-gray-200 dark:border-gray-700">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                    Navigation
                  </p>
                  <div className="space-y-1">
                    {navLinks.map((link, index) => (
                      <motion.a
                        key={index}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link)}
                        className={`block text-sm md:text-base font-medium py-2.5 px-3 rounded-lg cursor-pointer transition-all
                          ${
                            activeLink === link.href
                              ? "bg-[#32a8ed] text-white shadow-md"
                              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                          }`}
                      >
                        {link.label}
                      </motion.a>
                    ))}

                    {!isAdminRoute && (
                      <motion.a
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: navLinks.length * 0.05 }}
                        href="/admin"
                        onClick={(e) => {
                          e.preventDefault()
                          setIsMenuOpen(false)
                          navigate(isAdmin ? '/admin' : '/admin/login')
                        }}
                        className="block text-sm md:text-base font-medium py-2.5 px-3 rounded-lg cursor-pointer transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        Admin
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Mobile CTA Button */}
                <motion.button
                  type="button"
                  onClick={handleContactClick}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="block w-full bg-gradient-to-r from-[#32a8ed] to-[#2a8bc4] text-white px-5 py-3 md:py-4 rounded-xl hover:shadow-xl text-center font-semibold transition-all cursor-pointer text-sm md:text-base"
                >
                  {t("nav.getInTouch")}
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
