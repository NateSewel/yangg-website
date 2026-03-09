import React from 'react'
import Hero from '../components/Hero'
import CompanyLogo from '../components/CompanyLogo'
import PurposeSection from '../components/PurposeSection'
import FeaturesSection from '../components/FeaturesSection'
import ScheduleSection from '../components/ScheduleSection'
import MonitorSection from '../components/MonitorSection'
import ServicesSection from '../components/ServicesSection'
import ValuesSection from '../components/ValuesSection'
import EventsSection from '../components/EventsSection'
import GallerySection from '../components/GallerySection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import NewsletterSection from '../components/NewsletterSection'
import ContactSection from '../components/ContactSection'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-white dark:bg-gray-900 transition-colors">
      <div className="absolute -top-28 -left-28 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/20 to-green-500/20 dark:from-blue-500/10 dark:to-green-500/10 rounded-full blur-[80px] -z-10"></div>
      <div className="overflow-hidden">
        <Navbar />
        <Hero />
        <CompanyLogo />
        <PurposeSection />
        <FeaturesSection />
        <ScheduleSection />
        <MonitorSection />
        <ServicesSection />
        <ValuesSection />
        <EventsSection />
        <GallerySection />
        <TestimonialsSection />
        <FAQSection />
        <NewsletterSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  )
}

export default HomePage
