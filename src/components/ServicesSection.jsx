import React from 'react'
import { BsStack } from 'react-icons/bs'
import { HiLightBulb } from 'react-icons/hi'
import { FiSettings } from 'react-icons/fi'
import { BiTime } from 'react-icons/bi'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from 'react-i18next'

const ServicesSection = () => {
  const { t } = useTranslation()
  
  const services = [
    {
      icon: <BsStack className="w-8 h-8 text-indigo-600" />,
      title: t('programs.program1Title'),
      description: t('programs.program1Desc'),
      link: "#programs"
    },
    {
      icon: <HiLightBulb className="w-8 h-8 text-amber-400" />,
      title: t('programs.program2Title'), 
      description: t('programs.program2Desc'),
      link: "#programs"
    },
    {
      icon: <FiSettings className="w-8 h-8 text-red-400" />,
      title: t('programs.program3Title'),
      description: t('programs.program3Desc'),
      link: "#programs"
    },
    {
      icon: <BiTime className="w-8 h-8 text-cyan-400" />,
      title: t('programs.program4Title'),
      description: t('programs.program4Desc'),
      link: "#programs"
    }
  ]

  return (
    <section id="programs" className="py-20 container mx-auto px-4 sm:px-6 lg:px-8">
     <motion.div 
      variants={fadeIn('up', 0.3)}
      className='flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24'
     >
       {/* Header */}
       <motion.div 
        variants={fadeIn('right', 0.4)}
        className="md:w-1/3"
       >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-6 md:w-4/5 text-gray-900 dark:text-white"
        >
          {t('programs.title')}
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.5)}
          className="text-gray-600 dark:text-gray-300 text-lg mb-4 md:w-4/5"
        >
          {t('programs.subtitle')}
        </motion.p>
        <motion.div 
          variants={fadeIn('up', 0.6)}
          className="space-y-3"
        >
          <motion.div 
            variants={fadeIn('right', 0.7)}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#32a8ed] dark:bg-[#32a8ed]"></div>
            </div>
            <span className="text-gray-600 dark:text-gray-300">{t('programs.point1')}</span>
          </motion.div>
          <motion.div 
            variants={fadeIn('right', 0.8)}
            className="flex items-center gap-2"
          >
            <div className="w-5 h-5 rounded-full bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 flex items-center justify-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#32a8ed] dark:bg-[#32a8ed]"></div>
            </div>
            <span className="text-gray-600 dark:text-gray-300">{t('programs.point2')}</span>
          </motion.div>
        </motion.div>
        <motion.button 
          variants={fadeIn('up', 0.9)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-8 bg-[#32a8ed] dark:bg-[#32a8ed] text-white px-8 py-3 cursor-pointer rounded-full hover:bg-[#2a8bc4] dark:hover:bg-[#2a8bc4] transition-colors"
        >
          {t('programs.button')}
        </motion.button>
      </motion.div>

      {/* Services Grid */}
      <motion.div 
        variants={fadeIn('left', 0.4)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {services.map((service, index) => (
          <motion.div 
            key={index}
            variants={fadeIn('up', 0.3 * (index + 1))}
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-900 max-w-72 cursor-pointer rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 border-2 border-[#f0c630] dark:border-[#f0c630]"
          >
            <motion.div 
              variants={fadeIn('down', 0.4 * (index + 1))}
              className="mb-4"
            >
              {service.icon}
            </motion.div>
            <motion.h3 
              variants={textVariant(0.3)}
              className="text-xl font-semibold mb-2 text-gray-900 dark:text-white"
            >
              {service.title}
            </motion.h3>
            <motion.p 
              variants={fadeIn('up', 0.5 * (index + 1))}
              className="text-gray-600 dark:text-gray-300 mb-4"
            >
              {service.description}
            </motion.p>
            <motion.a 
              variants={fadeIn('up', 0.6 * (index + 1))}
              href={service.link}
              className="text-[#32a8ed] dark:text-[#32a8ed] font-medium hover:text-[#2a8bc4] dark:hover:text-[#2a8bc4] transition-colors"
            >
              {t('programs.learnMore')}
            </motion.a>
          </motion.div>
        ))}
      </motion.div>
     </motion.div>
    </section>
  )
}

export default ServicesSection 
