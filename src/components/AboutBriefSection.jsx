import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { FaUsers, FaGlobeAfrica, FaStar, FaHeart } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const AboutBriefSection = () => {
  const { t } = useTranslation()

  const stats = [
    { icon: <FaUsers className="w-6 h-6" />, value: "10,000+", labelKey: "aboutBrief.stat1" },
    { icon: <FaGlobeAfrica className="w-6 h-6" />, value: "17", labelKey: "aboutBrief.stat2" },
    { icon: <FaStar className="w-6 h-6" />, value: "100+", labelKey: "aboutBrief.stat3" },
    { icon: <FaHeart className="w-6 h-6" />, value: "50+", labelKey: "aboutBrief.stat4" }
  ]

  return (
    <section className="section-container bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn('up', 0.2)}
          initial="hidden"
          whileInView="show"
          className="text-center mb-12"
        >
          <motion.span
            variants={fadeIn('up', 0.1)}
            className="inline-block px-4 py-1.5 bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 text-[#32a8ed] dark:text-[#32a8ed] rounded-full text-sm font-medium mb-4"
          >
            {t('aboutBrief.tag')}
          </motion.span>
          <motion.h2
            variants={textVariant(0.2)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('aboutBrief.title')}
          </motion.h2>
          <motion.p
            variants={fadeIn('up', 0.3)}
            className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-base sm:text-lg"
          >
            {t('aboutBrief.description')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            variants={fadeIn('right', 0.3)}
            initial="hidden"
            whileInView="show"
            className="space-y-6"
          >
            <motion.p
              variants={fadeIn('up', 0.4)}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {t('aboutBrief.content1')}
            </motion.p>
            <motion.p
              variants={fadeIn('up', 0.5)}
              className="text-gray-600 dark:text-gray-300 leading-relaxed"
            >
              {t('aboutBrief.content2')}
            </motion.p>
          </motion.div>

          <motion.div
            variants={fadeIn('left', 0.3)}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.2 * (index + 1))}
                whileHover={{ scale: 1.05 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-[#32a8ed]/10 dark:bg-[#32a8ed]/20 rounded-full flex items-center justify-center mx-auto mb-3 text-[#32a8ed] dark:text-[#32a8ed]">
                  {stat.icon}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {t(stat.labelKey)}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutBriefSection