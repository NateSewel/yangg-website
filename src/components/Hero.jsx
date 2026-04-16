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
    <section id="home" className="flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-36 lg:pt-44 pb-12 sm:pb-16 md:pb-20 container mx-auto">
      {/* Left Column */}
      <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 md:space-y-8">
        <motion.div variants={fadeIn('right', 0.2)} initial="hidden" whileInView="show">
          {/* Star badge */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 w-fit px-3 sm:px-4 py-1.5 sm:py-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group">
            <FaStar className="text-[#f0c630] dark:text-[#f0c630] group-hover:scale-110 transition-transform text-sm sm:text-base" />
            <span className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100">{t('hero.badge')}</span>
          </div>
        </motion.div>

        <motion.h1 
          variants={textVariant(0.3)}
          initial="hidden"
          whileInView="show"
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 dark:text-white"
        >
          {t('hero.title')}{' '}
          <span className="text-[#f0c630] dark:text-[#f0c630] relative inline-block">
            {t('hero.titleHighlight')}
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#f0c630]/60 dark:bg-[#f0c630]/40"></span>
          </span>{' '}
          {t('hero.titleEnd')}
          <FaGlobeAfrica className="inline-block ml-2 text-[#f0c630] dark:text-[#f0c630] animate-pulse text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
        </motion.h1>

        <motion.p 
          variants={fadeIn('up', 0.4)}
          initial="hidden"
          whileInView="show"
          className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-xl leading-relaxed"
        >
          {t('hero.description')}
        </motion.p>

        <motion.div 
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="flex flex-col sm:flex-row gap-3 sm:gap-4"
        >
          {/* Join YANGG Button */}
          <button className="w-full sm:w-auto bg-[#32a8ed] dark:bg-[#32a8ed] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-[#2a8bc4] dark:hover:bg-[#2a8bc4] cursor-pointer transition-all hover:shadow-lg hover:shadow-[#32a8ed]/30 dark:hover:shadow-[#32a8ed]/30 active:scale-95 font-semibold text-base sm:text-lg">
            Join YANGG
          </button>
          
          {/* Donate Button */}
          <button className="w-full sm:w-auto bg-[#f0c630] dark:bg-[#f0c630] text-gray-900 dark:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-[#e0b620] dark:hover:bg-[#e0b620] cursor-pointer transition-all hover:shadow-lg hover:shadow-[#f0c630]/30 dark:hover:shadow-[#f0c630]/30 active:scale-95 font-semibold text-base sm:text-lg">
            Donate
          </button>
        </motion.div>
      </div>

      {/* Right Column - Images */}
      <motion.div 
        variants={fadeIn('left', 0.5)}
        initial="hidden"
        whileInView="show"
        className="w-full md:w-1/2 mt-8 sm:mt-10 md:mt-0 pl-0 md:pl-8 lg:pl-12"
      >
        <div className="relative max-w-lg mx-auto md:max-w-none">
          <img
            src={heroImage}
            alt="Team meeting"
            className="rounded-lg relative z-10 hover:scale-[1.02] transition-transform duration-300 w-full shadow-xl"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
