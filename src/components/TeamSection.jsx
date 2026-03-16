import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeIn, textVariant } from '../utils/motion'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { useTranslation } from 'react-i18next'
import kelechiImage from '../assets/team/kelechi-ndieze.jpg'
import chemiteiImage from '../assets/team/chemitei-janet.jpg'
import maryImage from '../assets/team/mary-k-badjie.jpg'
import reverienImage from '../assets/team/reverien-bukuru.jpg'
import victorImage from '../assets/team/victor-okoli.jpg'
import collinsImage from '../assets/team/collins-ugochukwu-ibeawuchi.jpg'
import ishoImage from '../assets/team/isho-msughaondo-check.jpg'
import tamsirImage from '../assets/team/tamsir-sallah.jpg'
import calebImage from '../assets/team/caleb-adekunle.jpg'
import odidImage from '../assets/team/odid-derrick.jpg'
import valImage from '../assets/team/val-okafor.jpg'
import mercyImage from '../assets/team/mercy-yorke.jpg'

const TeamSection = () => {
  const { t } = useTranslation()
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0)
  const itemsPerPage = 4

  const leadershipTeam = [
    {
      id: 1,
      name: "Kelechi Ndieze",
      position: "Global President",
      image: kelechiImage
    },
    {
      id: 2,
      name: "Chemitel Janet",
      position: "Executive Vice President",
      image: chemiteiImage
    },
    {
      id: 3,
      name: "Mary K. Badjie",
      position: "Executive Secretary",
      image: maryImage
    },
    {
      id: 4,
      name: "Reverien Bukuru",
      position: "Chief Financial Officer",
      image: reverienImage
    },
    {
      id: 5,
      name: "Victor Okoli",
      position: "General Legal Counsel",
      image: victorImage
    },
    {
      id: 6,
      name: "Collins Ugochukwu Ibeawuchi",
      position: "YANGG Founder/ Director of int'l affairs",
      image: collinsImage
    },
    {
      id: 7,
      name: "Isho Msughaondo Check",
      position: "Int'l Director of Projects/Programs",
      image: ishoImage
    },
    {
      id: 8,
      name: "Tamsir Sallah",
      position: "Int'l Director of SDGs/Supervior Working Group",
      image: tamsirImage
    },
    {
      id: 9,
      name: "Caleb Adekunle",
      position: "Int'l Director of Brand, Media and communication",
      image: calebImage
    },
    {
      id: 10,
      name: "Odid Derrick",
      position: "Int'l Director of Strategy and Implementations",
      image: odidImage
    },
    {
      id: 11,
      name: "Val Okafor",
      position: "Int'l Director of Training and skills development",
      image: valImage
    },
    {
      id: 12,
      name: "Mercy Yorke",
      position: "National Coordinator - YANGG GHANA",
      image: mercyImage
    }
  ]

  const totalPages = Math.ceil(leadershipTeam.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = leadershipTeam.slice(startIndex, endIndex)

  const handlePrevPage = () => {
    setDirection(-1)
    setCurrentPage(prev => Math.max(prev - 1, 1))
    const teamSection = document.querySelector('#team')
    if (teamSection) {
      const offset = 80
      const elementPosition = teamSection.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handleNextPage = () => {
    setDirection(1)
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
    const teamSection = document.querySelector('#team')
    if (teamSection) {
      const offset = 80
      const elementPosition = teamSection.offsetTop - offset
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      })
    }
  }

  const handlePageClick = (pageNum) => {
    setDirection(pageNum > currentPage ? 1 : -1)
    setCurrentPage(pageNum)
  }

  return (
    <section id="team" className="section-container bg-white dark:bg-gray-900 font-['Montserrat']">
      <motion.div
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-8 md:mb-12"
      >
        <motion.h2
          variants={textVariant(0.2)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-gray-900 dark:text-white"
        >
          {t('team.title')}
        </motion.h2>
        <motion.p
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {t('team.subtitle')}
        </motion.p>
      </motion.div>

      {/* Leadership Grid with Pagination */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8"
        >
          {currentItems.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border-2 border-[#f0c630] dark:border-[#f0c630]"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gray-200 dark:bg-gray-700">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-110"
                />
              </div>

              {/* Info Container */}
              <div className="p-4 text-center border-t-4 border-[#32a8ed] dark:border-[#32a8ed]">
                <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1 font-['Montserrat']">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 font-medium font-['Montserrat']">
                  {member.position}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mt-8"
        >
          {/* Previous Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`p-2 rounded-lg transition-all ${
              currentPage === 1
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Page Numbers */}
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1
              return (
                <motion.button
                  key={pageNum}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handlePageClick(pageNum)}
                  className={`w-10 h-10 rounded-lg font-medium transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-[#32a8ed] dark:bg-[#32a8ed] text-white shadow-lg'
                      : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 shadow-md'
                  }`}
                >
                  {pageNum}
                </motion.button>
              )
            })}
          </div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-lg transition-all ${
              currentPage === totalPages
                ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer shadow-md'
            }`}
          >
            <HiChevronRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}

      {/* Page Info */}
      {totalPages > 1 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400"
        >
          Showing {startIndex + 1}-{Math.min(endIndex, leadershipTeam.length)} of {leadershipTeam.length} team members
        </motion.p>
      )}
    </section>
  )
}

export default TeamSection
