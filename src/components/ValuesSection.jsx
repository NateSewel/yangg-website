import React from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { FaHandshake, FaShieldAlt, FaLightbulb, FaGlobeAfrica, FaUsers, FaPeopleCarry } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

const ValuesSection = () => {
  const { t } = useTranslation()
  
  const values = [
    {
      icon: <FaHandshake className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      title: t('values.value1Title'),
      description: t('values.value1Desc'),
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      icon: <FaShieldAlt className="w-10 h-10 text-green-600 dark:text-green-400" />,
      title: t('values.value2Title'),
      description: t('values.value2Desc'),
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      icon: <FaLightbulb className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />,
      title: t('values.value3Title'),
      description: t('values.value3Desc'),
      bgColor: 'bg-yellow-50 dark:bg-yellow-900/20'
    },
    {
      icon: <FaGlobeAfrica className="w-10 h-10 text-purple-600 dark:text-purple-400" />,
      title: t('values.value4Title'),
      description: t('values.value4Desc'),
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    },
    {
      icon: <FaUsers className="w-10 h-10 text-pink-600 dark:text-pink-400" />,
      title: t('values.value5Title'),
      description: t('values.value5Desc'),
      bgColor: 'bg-pink-50 dark:bg-pink-900/20'
    },
    {
      icon: <FaPeopleCarry className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />,
      title: t('values.value6Title'),
      description: t('values.value6Desc'),
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20'
    }
  ]

  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24"
      id="values"
    >
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          {t('values.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {t('values.subtitle')}
        </motion.p>
      </motion.div>
      
      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {values.map((value, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.2 * (index + 1))}
            className="p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800"
          >
            <motion.div 
              variants={fadeIn('down', 0.3 * (index + 1))}
              className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center ${value.bgColor}`}
            >
              {value.icon}
            </motion.div>
            <motion.h3 
              variants={textVariant(0.3)}
              className="text-xl font-semibold mb-3 text-gray-900 dark:text-white"
            >
              {value.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.4 * (index + 1))}
              className="text-gray-600 dark:text-gray-300"
            >
              {value.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

export default ValuesSection
