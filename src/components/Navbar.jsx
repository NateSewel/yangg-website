import React, { useState, useEffect } from 'react'
import { HiMenu, HiX, HiMoon, HiSun } from 'react-icons/hi'
import { motion } from "framer-motion";
import { fadeIn} from "../utils/motion";
import { useTheme } from '../context/ThemeContext'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from './LanguageSwitcher'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('#home')
  const { isDark, toggleTheme } = useTheme()
  const { t } = useTranslation()

  const navLinks = [
    { href: "#home", label: t('nav.home') },
    { href: "#about", label: t('nav.about') },
    { href: "#programs", label: t('nav.programs') },
    { href: "#events", label: t('nav.events') },
    { href: "#gallery", label: t('nav.gallery') },
    { href: "#testimonials", label: t('nav.testimonials') },
  ]

  // Scroll spy functionality
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.querySelector(link.href))
      const scrollPosition = window.scrollY + 100 // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveLink(navLinks[i].href)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Call once on mount

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav 
      variants={fadeIn('down', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="fixed top-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm z-50 border-b border-gray-100 dark:border-gray-800 shadow-sm transition-colors"
    >
      <div className="w-full flex justify-between items-center container mx-auto px-4 sm:px-6 lg:px-8 md:h-20 h-16">
        {/* Logo */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          className="flex items-center gap-2 cursor-pointer"
        >
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-1"
          >
            <div className="w-4 h-4 bg-blue-600 rounded-full opacity-75 hover:opacity-100 transition-opacity"></div>
            <div className="w-4 h-4 bg-green-500 rounded-full -ml-2 hover:opacity-75 transition-opacity"></div>
          </motion.div>
          <span className="text-xl font-bold text-gray-900 dark:text-white">YANGG</span>
        </motion.div>

        {/* Navigation Links - Desktop */}
        <motion.div 
          variants={fadeIn('down', 0.3)}
          className="hidden md:flex items-center gap-10"
        >
          {navLinks.map((link, index) => (
            <motion.a 
              key={index}
              variants={fadeIn('down', 0.1 * (index + 1))}
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector(link.href)
                if (element) {
                  const offset = 80 // Navbar height
                  const elementPosition = element.offsetTop - offset
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  })
                }
              }}
              className={`text-sm font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-blue-600 after:transition-all
                ${activeLink === link.href ? 'text-blue-600 after:w-full  ' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>

        {/* Right Side: CTA Button, Language Switcher, Theme Toggle & Mobile Menu */}
        <div className="flex items-center gap-3">
          {/* CTA Button - Desktop Only */}
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const element = document.querySelector('#contact')
              if (element) {
                const offset = 80
                const elementPosition = element.offsetTop - offset
                window.scrollTo({
                  top: elementPosition,
                  behavior: 'smooth'
                })
              }
            }}
            variants={fadeIn('left', 0.3)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100 cursor-pointer"
          >
            {t('nav.getInTouch')}
          </motion.a>

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* Theme Toggle Button */}
          <motion.button
            variants={fadeIn('left', 0.2)}
            initial="hidden"
            whileInView="show"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <HiSun className="h-5 w-5" />
            ) : (
              <HiMoon className="h-5 w-5" />
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <motion.button 
            variants={fadeIn('left', 0.3)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-300 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="h-6 w-6" />
            ) : (
              <HiMenu className="h-6 w-6" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div 
          variants={fadeIn('down', 0.2)}
          initial="hidden"
          animate="show"
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-4"
        >
          <motion.div 
            variants={fadeIn('down', 0.3)}
            className="container mx-auto px-4 space-y-4"
          >
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                variants={fadeIn('right', 0.1 * (index + 1))}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  const element = document.querySelector(link.href)
                  if (element) {
                    const offset = 80
                    const elementPosition = element.offsetTop - offset
                    window.scrollTo({
                      top: elementPosition,
                      behavior: 'smooth'
                    })
                  }
                  setIsMenuOpen(false)
                }}
                className={`block text-sm font-medium py-2
                  ${activeLink === link.href ? 'text-blue-600' : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
              >
                {link.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#contact')
                if (element) {
                  const offset = 80
                  const elementPosition = element.offsetTop - offset
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  })
                }
                setIsMenuOpen(false)
              }}
              variants={fadeIn('up', 0.4)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 text-sm font-medium transition-all hover:shadow-lg hover:shadow-blue-100 cursor-pointer text-center"
            >
              {t('nav.getInTouch')}
            </motion.a>
          </motion.div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar