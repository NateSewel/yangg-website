import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { FaSearch } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { HiRocketLaunch } from "react-icons/hi2";
import { useTranslation } from 'react-i18next'

const FeaturesSection = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: <FaSearch className="w-10 h-10 text-indigo-600" />, 
      title: t('features.feature1Title'),
      description: t('features.feature1Desc'),
      bgColor: '#F1EFFD'
    },
    {
      icon: <IoSettings className="w-10 h-10 text-red-500" />,
      title: t('features.feature2Title'), 
      description: t('features.feature2Desc'),
      bgColor: '#FFE7E7'
    },
    {
      icon: <HiRocketLaunch className="w-10 h-10 text-amber-500" />,
      title: t('features.feature3Title'),
      description: t('features.feature3Desc'),
      bgColor: '#FFF3E4'
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 py-16"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          {t('features.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300"
        >
          {t('features.subtitle')}
        </motion.p>
      </motion.div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            className="flex flex-col items-center p-6"
          >
            <motion.div 
              variants={fadeIn('down', 0.4 * (index + 1))}
              className="w-24 h-24 rounded-full mb-6 flex items-center justify-center" 
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
              className="text-2xl font-medium mb-3 text-gray-900 dark:text-white"
            >
              {feature.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.6 * (index + 1))}
              className="text-gray-500 dark:text-gray-400 text-center"
            >
              {feature.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.7)}
        className="text-center mt-12"
      >
        <motion.button 
          variants={fadeIn('up', 0.8)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 text-white cursor-pointer px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors relative"
        >
          {t('features.button')}
          <div className="absolute -z-10 w-full h-full rounded-full bg-blue-600/30 blur-xl top-0 left-0"></div>
        </motion.button>
      </motion.div>
    </motion.section>
  )
}

export default FeaturesSection
