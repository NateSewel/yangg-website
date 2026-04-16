import React from 'react'
import { motion } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { useTranslation } from 'react-i18next'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ServicesSection from '../components/ServicesSection'
import ContactSection from '../components/ContactSection'

const ProgramsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors font-['Montserrat']">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.h1
            variants={textVariant(0.2)}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {t('programs.title')}
          </motion.h1>
          <motion.p
            variants={fadeIn('up', 0.4)}
            className="text-gray-600 dark:text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mx-auto max-w-3xl"
          >
            {t('programs.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      <ServicesSection />
      <ContactSection />

      <Footer />
    </div>
  )
}

export default ProgramsPage
