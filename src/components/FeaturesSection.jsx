import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { FaUsers, FaUserGraduate, FaBriefcase, FaGlobeAfrica } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

const FeaturesSection = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: <FaUsers className="w-10 h-10 text-indigo-600" />, 
      title: t('features.feature1Title') || "Community Impact",
      description: t('features.feature1Desc') || "Empowering youth to create sustainable solutions that drive positive change in their communities.",
      bgColor: '#F1EFFD'
    },
    {
      icon: <FaUserGraduate className="w-10 h-10 text-green-600" />,
      title: t('features.feature2Title') || "Individual Development", 
      description: t('features.feature2Desc') || "Building leadership skills and fostering innovation through comprehensive training and mentorship programs.",
      bgColor: '#E7F9F0'
    },
    {
      icon: <FaBriefcase className="w-10 h-10 text-amber-500" />,
      title: t('features.feature3Title') || "Business & Entrepreneurship Opportunities",
      description: t('features.feature3Desc') || "Providing resources and networks to launch and scale sustainable businesses across Africa.",
      bgColor: '#FFF3E4'
    },
    {
      icon: <FaGlobeAfrica className="w-10 h-10 text-blue-600" />,
      title: t('features.feature4Title') || "International Cooperation",
      description: t('features.feature4Desc') || "Facilitating cross-border collaboration across 17 African countries towards the SDGs.",
      bgColor: '#E7F3FF'
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-8 sm:mb-10 md:mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white px-4"
        >
          {t('features.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 text-sm sm:text-base px-4"
        >
          {t('features.subtitle')}
        </motion.p>
      </motion.div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            className="flex flex-col items-center p-4 sm:p-6"
          >
            <motion.div 
              variants={fadeIn('down', 0.4 * (index + 1))}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mb-4 sm:mb-6 flex items-center justify-center" 
              style={{ backgroundColor: feature.bgColor }}
            >
              <motion.div 
                variants={fadeIn('up', 0.5 * (index + 1))}
              >
                {feature.icon}
              </motion.div>
            </motion.div>
            <motion.h3 
              variants={textVariant(0.3)}
              className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-900 dark:text-white text-center px-2"
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.6 * (index + 1))}
              className="text-gray-500 dark:text-gray-400 text-center text-xs sm:text-sm font-['Montserrat'] leading-relaxed px-2"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.7)}
        className="text-center mt-8 sm:mt-10 md:mt-12"
      >
        <Link to="/about">
          <motion.button 
            variants={fadeIn('up', 0.8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#32a8ed] text-white cursor-pointer px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium hover:bg-[#2a8bc4] transition-colors relative text-sm sm:text-base"
          >
            {t('features.button')}
            <div className="absolute -z-10 w-full h-full rounded-full bg-[#32a8ed]/30 blur-xl top-0 left-0"></div>
          </motion.button>
        </Link>
      </motion.div>
    </motion.section>
  )
}

export default FeaturesSection
