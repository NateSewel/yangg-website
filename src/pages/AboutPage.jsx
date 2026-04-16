import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { FaGlobeAfrica, FaHandshake, FaLightbulb, FaUsers, FaBullseye, FaHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FeaturesSection from '../components/FeaturesSection'
import ScheduleSection from '../components/ScheduleSection'
import MonitorSection from '../components/MonitorSection'

const AboutPage = () => {
  const { t } = useTranslation()
  const philosophies = [
    {
      icon: <FaBullseye className="w-8 h-8" />,
      title: t('aboutPage.philosophy1Title'),
      description: t('aboutPage.philosophy1Desc'),
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: t('aboutPage.philosophy2Title'),
      description: t('aboutPage.philosophy2Desc'),
      color: "from-green-500 to-green-600"
    },
    {
      icon: <FaGlobeAfrica className="w-8 h-8" />,
      title: t('aboutPage.philosophy3Title'),
      description: t('aboutPage.philosophy3Desc'),
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <FaLightbulb className="w-8 h-8" />,
      title: t('aboutPage.philosophy4Title'),
      description: t('aboutPage.philosophy4Desc'),
      color: "from-amber-500 to-amber-600"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      title: t('aboutPage.philosophy5Title'),
      description: t('aboutPage.philosophy5Desc'),
      color: "from-indigo-500 to-indigo-600"
    }
  ]

  const values = [
    {
      icon: <FaHandshake className="w-6 h-6 md:w-8 md:h-8" />,
      title: t('aboutPage.value1Title'),
      description: t('aboutPage.value1Desc')
    },
    {
      icon: <FaHeart className="w-6 h-6 md:w-8 md:h-8" />,
      title: t('aboutPage.value2Title'),
      description: t('aboutPage.value2Desc')
    },
    {
      icon: <FaLightbulb className="w-6 h-6 md:w-8 md:h-8" />,
      title: t('aboutPage.value3Title'),
      description: t('aboutPage.value3Desc')
    },
    {
      icon: <FaGlobeAfrica className="w-6 h-6 md:w-8 md:h-8" />,
      title: t('aboutPage.value4Title'),
      description: t('aboutPage.value4Desc')
    },
    {
      icon: <FaUsers className="w-6 h-6 md:w-8 md:h-8" />,
      title: t('aboutPage.value5Title'),
      description: t('aboutPage.value5Desc')
    }
  ]

  const memberCountries = [
    "Nigeria", "Senegal", "Kenya", "Togo", "Morocco", "Sierra Leone", 
    "Uganda", "Burundi", "Namibia", "Lesotho", "Benin Republic", 
    "DR Congo", "Cameroon", "Gambia", "Zambia", "Botswana"
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors font-['Montserrat']">
      <Navbar />
      
      <div className="pt-24 sm:pt-28 md:pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          className="max-w-5xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.h1
            variants={textVariant(0.3)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6 font-['Montserrat']"
          >
            {t('aboutPage.title')} <span className="text-[#f0c630]">YANGG</span>
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.4)}
            className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed font-['Montserrat']"
          >
            {t('aboutPage.subtitle')}
          </motion.p>
        </motion.div>

        {/* Main Description */}
        <motion.div
          variants={fadeIn('up', 0.5)}
          initial="hidden"
          whileInView="show"
          className="max-w-5xl mx-auto mb-16 md:mb-20"
        >
          <div className="bg-gradient-to-br from-[#32a8ed]/10 to-[#f0c630]/10 dark:from-[#32a8ed]/20 dark:to-[#f0c630]/20 rounded-2xl p-6 md:p-10 border-2 border-[#f0c630] dark:border-[#f0c630]">
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-4 font-['Montserrat']">
              {t('aboutPage.description1')}
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed font-['Montserrat']">
              {t('aboutPage.description2')}
            </p>
          </div>
        </motion.div>

        {/* Member Countries */}
        <motion.div
          variants={fadeIn('up', 0.6)}
          initial="hidden"
          whileInView="show"
          className="max-w-5xl mx-auto mb-16 md:mb-20"
        >
          <motion.h2
            variants={textVariant(0.3)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-8 text-center font-['Montserrat']"
          >
            {t('aboutPage.memberCountriesTitle')} <span className="text-[#32a8ed]">{t('aboutPage.memberCountriesHighlight')}</span>
          </motion.h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {memberCountries.map((country, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.05 * index)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-md hover:shadow-xl transition-all text-center border-2 border-[#f0c630] dark:border-[#f0c630]"
              >
                <p className="text-gray-900 dark:text-white font-medium text-sm md:text-base font-['Montserrat']">
                  {country}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Philosophy */}
        <motion.div
          variants={fadeIn('up', 0.7)}
          initial="hidden"
          whileInView="show"
          className="max-w-6xl mx-auto mb-16 md:mb-20"
        >
          <motion.h2
            variants={textVariant(0.3)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-10 text-center font-['Montserrat']"
          >
            {t('aboutPage.philosophyTitle')} <span className="text-[#f0c630]">{t('aboutPage.philosophyHighlight')}</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {philosophies.map((philosophy, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.1 * index)}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-[#f0c630] dark:border-[#f0c630]"
              >
                <div className={`w-14 h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${philosophy.color} flex items-center justify-center text-white mb-4 md:mb-6`}>
                  {philosophy.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']">
                  {philosophy.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-['Montserrat']">
                  {philosophy.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          variants={fadeIn('up', 0.8)}
          initial="hidden"
          whileInView="show"
          className="max-w-6xl mx-auto mb-12 md:mb-16"
        >
          <motion.h2
            variants={textVariant(0.3)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6 md:mb-10 text-center font-['Montserrat']"
          >
            {t('aboutPage.valuesTitle')} <span className="text-[#32a8ed]">{t('aboutPage.valuesHighlight')}</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.1 * index)}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all border-2 border-[#f0c630] dark:border-[#f0c630]"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 flex items-center justify-center text-[#32a8ed] dark:text-[#32a8ed] mb-4 md:mb-6">
                  {value.icon}
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 md:mb-4 font-['Montserrat']">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-['Montserrat']">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <FeaturesSection />
        <ScheduleSection />
        <MonitorSection />
      </div>

      <Footer />
    </div>
  )
}

export default AboutPage
