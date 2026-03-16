import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { FaGlobeAfrica, FaStar } from "react-icons/fa";
import { useTranslation } from 'react-i18next'
import heroImage from '../assets/hero-image.png'

const Hero = () => {
  const { t } = useTranslation()
  
  return (
    <section id="home" className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-32 md:pt-44 pb-16 container mx-auto">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-6 md:space-y-8">
        <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show">
          {/* Star badge */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 w-fit px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
            <FaStar className="text-[#f0c630] dark:text-[#f0c630] group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{t('hero.badge')}</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
        >
          {t('hero.title')}{' '}
          <span className="text-[#f0c630] dark:text-[#f0c630] relative inline-block">
            {t('hero.titleHighlight')}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f0c630]/60 dark:bg-[#f0c630]/40"></span>
          </span>{' '}
          {t('hero.titleEnd')}
          <FaGlobeAfrica className="inline-block ml-2 text-[#f0c630] dark:text-[#f0c630] animate-pulse" />
        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 dark:text-gray-300 text-base md:text-lg lg:text-xl max-w-xl"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex gap-3 max-w-md flex-wrap"
        >
          {/* Email Form */}
          <div className="flex gap-3 flex-1 min-w-full">
            <input
              type="email"
              placeholder={t('hero.emailPlaceholder')}
              className="flex-1 px-6 py-4 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-[#32a8ed] dark:focus:border-[#32a8ed] focus:ring-2 focus:ring-[#32a8ed]/20 dark:focus:ring-[#32a8ed]/20 transition-all"
            />
            <button className="bg-[#f0c630] dark:bg-[#f0c630] text-gray-900 dark:text-gray-900 px-8 py-4 rounded-xl hover:bg-[#e0b620] dark:hover:bg-[#e0b620] cursor-pointer transition-all hover:shadow-lg hover:shadow-[#f0c630]/30 dark:hover:shadow-[#f0c630]/30 active:scale-95">
              →
            </button>
          </div>
          
          {/* Test Link to Events Page */}
          <Link to="/events" className="w-full">
            <button className="w-full bg-[#32a8ed] dark:bg-[#32a8ed] text-white px-6 py-3 rounded-xl hover:bg-[#2a8bc4] dark:hover:bg-[#2a8bc4] cursor-pointer transition-all hover:shadow-lg font-medium">
              View All Events & Programs →
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Right Column - Images */}
      <motion.div 
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-12 md:mt-0 pl-0 md:pl-12"
      >
        <div className="relative max-w-lg mx-auto md:max-w-none">
          <img
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 w-full"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
