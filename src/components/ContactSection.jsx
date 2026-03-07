import React, { useState } from 'react'
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { HiMail, HiPhone, HiLocationMarker, HiUser, HiPencil } from 'react-icons/hi'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
  }

  const contactInfo = [
    {
      icon: <HiMail className="w-6 h-6" />,
      title: "Email",
      details: "info@yangg.org",
      link: "mailto:info@yangg.org"
    },
    {
      icon: <HiPhone className="w-6 h-6" />,
      title: "Phone",
      details: "+234 XXX XXX XXXX",
      link: "tel:+234XXXXXXXXX"
    },
    {
      icon: <HiLocationMarker className="w-6 h-6" />,
      title: "Office",
      details: "Lagos, Nigeria",
      link: "#"
    }
  ]

  return (
    <section id="contact" className="section-container bg-gray-50 dark:bg-gray-800">
      <motion.div 
        variants={fadeIn('up', 0.2)}
        initial="hidden"
        whileInView="show"
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Get in Touch
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Have questions about our programs? Want to partner with us? We'd love to hear from you!
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <motion.div 
          variants={fadeIn('right', 0.3)}
          initial="hidden"
          whileInView="show"
          className="lg:col-span-1 space-y-6"
        >
          {contactInfo.map((info, index) => (
            <motion.a
              key={index}
              href={info.link}
              variants={fadeIn('up', 0.2 * (index + 1))}
              whileHover={{ scale: 1.03, y: -5 }}
              className="block bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all cursor-pointer border border-transparent dark:border-gray-700"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {info.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {info.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {info.details}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Additional Info */}
          <motion.div
            variants={fadeIn('up', 0.8)}
            className="bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Office Hours
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Monday - Friday: 9:00 AM - 5:00 PM (WAT)
            </p>
          </motion.div>
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          variants={fadeIn('left', 0.3)}
          initial="hidden"
          whileInView="show"
          className="lg:col-span-2"
        >
          <motion.form 
            variants={fadeIn('up', 0.4)}
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md border border-transparent dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Name Input */}
              <motion.div variants={fadeIn('right', 0.5)}>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </motion.div>

              {/* Email Input */}
              <motion.div variants={fadeIn('left', 0.5)}>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiMail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Phone Input */}
              <motion.div variants={fadeIn('right', 0.6)}>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>
              </motion.div>

              {/* Subject Input */}
              <motion.div variants={fadeIn('left', 0.6)}>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <HiPencil className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all"
                    placeholder="How can we help?"
                  />
                </div>
              </motion.div>
            </div>

            {/* Message Textarea */}
            <motion.div variants={fadeIn('up', 0.7)} className="mb-6">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 rounded-xl focus:outline-none focus:border-blue-600 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 transition-all resize-none"
                placeholder="Tell us more about your inquiry..."
              ></textarea>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={fadeIn('up', 0.8)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition-all hover:shadow-lg hover:shadow-blue-100 dark:hover:shadow-blue-900/50 font-medium text-lg"
            >
              Send Message
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
