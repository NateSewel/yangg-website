import { useState, useEffect, useRef } from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { useTranslation } from 'react-i18next'
import { FaUsers, FaGlobeAfrica, FaChalkboardTeacher, FaHandshake, FaDownload } from 'react-icons/fa'
import { HiTrendingUp } from 'react-icons/hi'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import 'swiper/css';
import 'swiper/css/navigation';

const MonitorSection = () => {
  const { t } = useTranslation()
  const infographicsRef = useRef(null)
  const [isDownloading, setIsDownloading] = useState(false)
  
  // Real-time impact data
  const [impactData, setImpactData] = useState({
    memberCountries: 17,
    projectsExecuted: 10,
    trainingsCompleted: 15,
    conferencesOrganized: 5,
    youthEmpowered: 500,
    partnershipsFormed: 25
  })

  // Historical data for charts
  const [chartData, setChartData] = useState([
    { month: 'Jan', youth: 420, projects: 7, trainings: 10 },
    { month: 'Feb', youth: 445, projects: 8, trainings: 12 },
    { month: 'Mar', youth: 470, projects: 9, trainings: 13 },
    { month: 'Apr', youth: 490, projects: 9, trainings: 14 },
    { month: 'May', youth: 500, projects: 10, trainings: 15 }
  ])

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setImpactData(prev => {
        const newYouth = prev.youthEmpowered + Math.floor(Math.random() * 3)
        return { ...prev, youthEmpowered: newYouth }
      })
      
      // Update chart data
      setChartData(prev => {
        const lastEntry = prev[prev.length - 1]
        const newEntry = {
          ...lastEntry,
          youth: impactData.youthEmpowered
        }
        return [...prev.slice(1), newEntry]
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [impactData.youthEmpowered])

  // Pie chart data
  const pieData = [
    { name: 'Projects', value: impactData.projectsExecuted, color: '#10b981' },
    { name: 'Trainings', value: impactData.trainingsCompleted, color: '#8b5cf6' },
    { name: 'Conferences', value: impactData.conferencesOrganized, color: '#f59e0b' },
    { name: 'Partnerships', value: impactData.partnershipsFormed, color: '#ec4899' }
  ]

  const stats = [
    {
      icon: <FaGlobeAfrica className="w-8 h-8" />,
      value: impactData.memberCountries,
      label: "Member Countries",
      color: "bg-blue-500",
      trend: "+2 this year"
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      value: impactData.projectsExecuted,
      label: "Projects Executed",
      color: "bg-green-500",
      trend: "+3 this quarter"
    },
    {
      icon: <FaChalkboardTeacher className="w-8 h-8" />,
      value: impactData.trainingsCompleted,
      label: "Trainings Completed",
      color: "bg-purple-500",
      trend: "+5 this year"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: impactData.conferencesOrganized,
      label: "Conferences Organized",
      color: "bg-amber-500",
      trend: "+2 this year"
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: `${impactData.youthEmpowered}+`,
      label: "Youth Empowered",
      color: "bg-indigo-500",
      trend: "Growing daily",
      isLive: true
    },
    {
      icon: <FaHandshake className="w-8 h-8" />,
      value: impactData.partnershipsFormed,
      label: "Partnerships Formed",
      color: "bg-pink-500",
      trend: "+8 this year"
    }
  ]

  const downloadAsPDF = async () => {
    if (!infographicsRef.current) return
    
    setIsDownloading(true)
    
    try {
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      })
      
      const pageWidth = 297
      const pageHeight = 210
      
      // Background gradient effect
      pdf.setFillColor(240, 249, 255) // Light blue background
      pdf.rect(0, 0, pageWidth, pageHeight, 'F')
      
      // Header section with colored banner
      pdf.setFillColor(50, 168, 237) // Blue banner
      pdf.rect(0, 0, pageWidth, 45, 'F')
      
      // Logo/Brand area (left side of banner)
      pdf.setFillColor(240, 198, 48) // Gold circle
      pdf.circle(25, 22, 12, 'F')
      pdf.setFontSize(16)
      pdf.setTextColor(255, 255, 255)
      pdf.setFont('helvetica', 'bold')
      pdf.text('YANGG', 25, 24, { align: 'center' })
      
      // Title
      pdf.setFontSize(28)
      pdf.setTextColor(255, 255, 255)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Impact Dashboard 2026', pageWidth / 2, 20, { align: 'center' })
      
      // Subtitle
      pdf.setFontSize(11)
      pdf.setFont('helvetica', 'normal')
      pdf.text(`Real-time data as of ${new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })}`, pageWidth / 2, 30, { align: 'center' })
      
      // Decorative line
      pdf.setDrawColor(240, 198, 48)
      pdf.setLineWidth(0.5)
      pdf.line(pageWidth / 2 - 40, 35, pageWidth / 2 + 40, 35)
      
      // Stats cards
      const stats = [
        { 
          label: 'Member Countries', 
          value: impactData.memberCountries, 
          trend: '+2 this year',
          color: [59, 130, 246], // Blue
          icon: '🌍'
        },
        { 
          label: 'Projects Executed', 
          value: impactData.projectsExecuted, 
          trend: '+3 this quarter',
          color: [16, 185, 129], // Green
          icon: '🤝'
        },
        { 
          label: 'Trainings Completed', 
          value: impactData.trainingsCompleted, 
          trend: '+5 this year',
          color: [139, 92, 246], // Purple
          icon: '📚'
        },
        { 
          label: 'Conferences Organized', 
          value: impactData.conferencesOrganized, 
          trend: '+2 this year',
          color: [245, 158, 11], // Amber
          icon: '🎤'
        },
        { 
          label: 'Youth Empowered', 
          value: `${impactData.youthEmpowered}+`, 
          trend: 'Growing daily',
          color: [99, 102, 241], // Indigo
          icon: '👥',
          isLive: true
        },
        { 
          label: 'Partnerships Formed', 
          value: impactData.partnershipsFormed, 
          trend: '+8 this year',
          color: [236, 72, 153], // Pink
          icon: '🔗'
        }
      ]
      
      // Draw stat cards in 3x2 grid
      let yPos = 55
      const cardWidth = 85
      const cardHeight = 45
      const gap = 10
      
      stats.forEach((stat, index) => {
        const col = index % 3
        const row = Math.floor(index / 3)
        const xPos = 15 + col * (cardWidth + gap)
        const yOffset = yPos + row * (cardHeight + gap)
        
        // Card background with shadow effect
        pdf.setFillColor(250, 250, 250)
        pdf.roundedRect(xPos + 1, yOffset + 1, cardWidth, cardHeight, 3, 3, 'F') // Shadow
        pdf.setFillColor(255, 255, 255)
        pdf.roundedRect(xPos, yOffset, cardWidth, cardHeight, 3, 3, 'F')
        
        // Colored left border
        pdf.setFillColor(...stat.color)
        pdf.rect(xPos, yOffset, 4, cardHeight, 'F')
        
        // Icon circle (without text inside)
        pdf.setFillColor(...stat.color)
        pdf.circle(xPos + 15, yOffset + 12, 6, 'F')
        
        // Live badge
        if (stat.isLive) {
          pdf.setFillColor(239, 68, 68)
          pdf.roundedRect(xPos + cardWidth - 25, yOffset + 5, 20, 6, 2, 2, 'F')
          pdf.setFontSize(7)
          pdf.setTextColor(255, 255, 255)
          pdf.setFont('helvetica', 'bold')
          pdf.text('LIVE', xPos + cardWidth - 15, yOffset + 9, { align: 'center' })
        }
        
        // Value
        pdf.setFontSize(32)
        pdf.setTextColor(...stat.color)
        pdf.setFont('helvetica', 'bold')
        pdf.text(String(stat.value), xPos + 15, yOffset + 28)
        
        // Label
        pdf.setFontSize(10)
        pdf.setTextColor(60, 60, 60)
        pdf.setFont('helvetica', 'bold')
        pdf.text(stat.label, xPos + 15, yOffset + 35)
      })
      
      // Footer section
      const footerY = 170
      
      // Decorative line
      pdf.setDrawColor(200, 200, 200)
      pdf.setLineWidth(0.3)
      pdf.line(20, footerY, pageWidth - 20, footerY)
      
      // Footer content
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.setFont('helvetica', 'normal')
      
      const footerText = 'YANGG operates across 17 African countries including Nigeria, Senegal, Kenya, Togo, Morocco, Sierra Leone, Uganda, Burundi, Namibia, Lesotho, Benin Rep, DR Congo, Cameroon, Gambia, Zambia, and Botswana.'
      const splitText = pdf.splitTextToSize(footerText, 250)
      pdf.text(splitText, pageWidth / 2, footerY + 8, { align: 'center' })
      
      // Organization info
      pdf.setFontSize(10)
      pdf.setTextColor(50, 168, 237)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Young Africans Network for Global Goals', pageWidth / 2, footerY + 22, { align: 'center' })
      
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.setFont('helvetica', 'normal')
      pdf.text('www.yangg.org | contact@yangg.org', pageWidth / 2, footerY + 28, { align: 'center' })
      
      // Page number and date
      pdf.setFontSize(7)
      pdf.setTextColor(150, 150, 150)
      pdf.text('Page 1 of 1', 20, pageHeight - 5)
      pdf.text(`Generated: ${new Date().toLocaleString()}`, pageWidth - 20, pageHeight - 5, { align: 'right' })
      
      // Save PDF
      const fileName = `YANGG-Impact-Report-${new Date().toISOString().split('T')[0]}.pdf`
      pdf.save(fileName)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }
  
  return (
    <motion.section 
      variants={fadeIn('up', 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-24"
    >
      <div className="flex flex-col gap-8 sm:gap-10 md:gap-12">
        {/* Header */}
        <div className="text-center px-4">
          <motion.span 
            variants={fadeIn('up', 0.3)}
            className="text-blue-600 dark:text-blue-400 font-semibold text-xs sm:text-sm uppercase tracking-wide"
          >
            {t('monitor.tag')}
          </motion.span>
          <motion.h2 
            variants={textVariant(0.4)}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 sm:mt-4 mb-3 sm:mb-4"
          >
            {t('monitor.title')}
          </motion.h2>
          <motion.p 
            variants={fadeIn('up', 0.5)}
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base"
          >
            {t('monitor.description')}
          </motion.p>
          
          {/* Download Button */}
          <motion.button
            variants={fadeIn('up', 0.6)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={downloadAsPDF}
            disabled={isDownloading}
            className="inline-flex items-center gap-2 bg-[#32a8ed] text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-[#2a8bc4] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm sm:text-base"
          >
            <FaDownload className="w-3 h-3 sm:w-4 sm:h-4" />
            {isDownloading ? 'Generating...' : 'Download Report'}
          </motion.button>
        </div>

        {/* Infographics Grid */}
        <motion.div 
          ref={infographicsRef}
          variants={fadeIn('up', 0.7)}
          className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl"
        >
          {/* Header for PDF */}
          <div className="mb-6 sm:mb-8 text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              YANGG Impact Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Real-time data as of {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeIn('up', 0.1 * (index + 1))}
                className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-[#f0c630] hover:shadow-lg transition-all"
              >
                {stat.isLive && (
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1">
                    <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-red-500"></span>
                    </span>
                    <span className="text-[10px] sm:text-xs text-red-500 font-semibold">LIVE</span>
                  </div>
                )}

                <div className={`${stat.color} w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white mb-3 sm:mb-4`}>
                  {stat.icon}
                </div>

                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">
                  {stat.value}
                </div>

                <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 mb-1 sm:mb-2">
                  {stat.label}
                </div>

                <div className="flex items-center gap-1 text-[10px] sm:text-xs text-green-600 dark:text-green-400">
                  <HiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{stat.trend}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            {/* Youth Empowerment Trend */}
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-indigo-200 dark:border-indigo-900">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Youth Empowerment Growth
              </h4>
              <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorYouth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="youth" 
                    stroke="#6366f1" 
                    fillOpacity={1} 
                    fill="url(#colorYouth)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Activities Distribution */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-purple-200 dark:border-purple-900">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Activities Distribution
              </h4>
              <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    style={{ fontSize: '10px' }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Projects & Trainings Comparison */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-green-200 dark:border-green-900 lg:col-span-2">
              <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                Monthly Progress Overview
              </h4>
              <ResponsiveContainer width="100%" height={200} className="sm:h-[250px]">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#6b7280" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="projects" fill="#10b981" name="Projects" />
                  <Bar dataKey="trainings" fill="#8b5cf6" name="Trainings" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Footer for PDF */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              YANGG operates across 17 African countries including Nigeria, Senegal, Kenya, Togo, Morocco, Sierra Leone, Uganda, Burundi, Namibia, Lesotho, Benin Rep, DR Congo, Cameroon, Gambia, Zambia, and Botswana.
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-500 mt-2">
              Young Africans Network for Global Goals | www.yangg.org
            </p>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          variants={fadeIn('up', 0.8)}
          className="text-center"
        >
          <motion.a 
            href="#programs" 
            className="text-blue-500 dark:text-blue-400 font-semibold inline-flex items-center gap-2 hover:gap-4 transition-all text-sm sm:text-base"
          >
            {t('monitor.link')}
            <svg 
              className="w-4 h-4 sm:w-5 sm:h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 8l4 4m0 0l-4 4m4-4H3" 
              />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default MonitorSection 
