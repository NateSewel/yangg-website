import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from 'react-i18next'

const Footer = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  
  const handleNavClick = (e, href) => {
    e.preventDefault()
    
    // If it's a hash link
    if (href.startsWith('#')) {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - offset
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })
          }
        }, 100)
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(href)
        if (element) {
          const offset = 80
          const elementPosition = element.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - offset
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
      }
    }
  }
  
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Programs', href: '#programs' },
      { name: 'Events', href: '#events' },
      { name: 'Gallery', href: '#gallery' },
      { name: 'Contact Us', href: '#contact' },
    ],
    programs: [
      { name: 'Leadership Academy', href: '#programs' },
      { name: 'She Leads', href: '#programs' },
      { name: 'Afripreneur', href: '#programs' },
    ],
    resources: [
      { name: 'Blog', href: '#' },
      { name: 'News', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
    connect: [
      { name: 'Nigeria', href: '#' },
      { name: 'Ghana', href: '#' },
      { name: 'Kenya', href: '#' },
      { name: 'Gambia', href: '#' },
    ],
  }

  return (
    <motion.footer 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="bg-gray-50 dark:bg-gray-800"
    >
      <div className="section-container">
        <motion.div 
          variants={fadeIn('up', 0.3)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Brand Column */}
          <motion.div 
            variants={fadeIn('right', 0.4)}
            className="lg:col-span-4"
          >
            <motion.div 
              variants={fadeIn('down', 0.5)}
              className="flex items-center gap-2 mb-6"
            >
              <div className="w-4 h-4 bg-blue-600 rounded-full opacity-75"></div>
              <div className="w-4 h-4 bg-green-500 rounded-full -ml-2"></div>
              <span className="text-xl font-bold ml-1 text-gray-900 dark:text-white">YANGG</span>
            </motion.div>
            <motion.p 
              variants={fadeIn('up', 0.6)}
              className="text-gray-600 dark:text-gray-400 mb-6"
            >
              {t('footer.description')}
            </motion.p>
            <motion.div 
              variants={fadeIn('up', 0.7)}
              className="flex gap-4"
            >
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://www.linkedin.com/company/yangg/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-700 dark:hover:bg-blue-600 hover:text-white transition-colors cursor-pointer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://x.com/yangg_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-black dark:hover:bg-gray-900 hover:text-white transition-colors cursor-pointer"
                aria-label="X (Twitter)"
              >
                <FaTwitter className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://www.facebook.com/share/1AxdZ9q8xH/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 dark:hover:bg-blue-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <FaFacebookF className="w-5 h-5" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.1 }}
                href="https://www.instagram.com/yanggofficial_sdg?igsh=MWE0b2l0MGVvN3dxbg%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 hover:text-white transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Links Columns */}
          <motion.div 
            variants={fadeIn('left', 0.4)}
            className="lg:col-span-8"
          >
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
                <motion.div 
                  key={category}
                  variants={fadeIn('up', 0.3 * (categoryIndex + 1))}
                >
                  <motion.h3 
                    variants={textVariant(0.2)}
                    className="text-base md:text-lg font-medium mb-3 md:mb-4 text-gray-900 dark:text-white"
                  >
                    {t(`footer.${category}`)}
                  </motion.h3>
                  <motion.ul 
                    variants={fadeIn('up', 0.4)}
                    className="space-y-2 md:space-y-3"
                  >
                    {links.map((link, index) => (
                      <motion.li 
                        key={index}
                        variants={fadeIn('up', 0.1 * (index + 1))}
                      >
                        <motion.a 
                          whileHover={{ x: 5 }}
                          href={link.href} 
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer text-sm md:text-base"
                        >
                          {link.name}
                        </motion.a>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          variants={fadeIn('up', 0.8)}
          className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8"
        >
          <motion.div 
            variants={fadeIn('up', 0.9)}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <motion.p 
              variants={fadeIn('right', 1.0)}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} {t('footer.copyright')}
            </motion.p>
            <motion.p 
              variants={fadeIn('left', 1.0)}
              className="text-gray-600 dark:text-gray-400 text-sm"
            >
              {t('footer.tagline')}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  )
}

export default Footer
