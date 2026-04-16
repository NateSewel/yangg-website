import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import aminaImage from '../assets/testimonials/amina-okafor.jpg';
import fatouImage from '../assets/testimonials/fatou-jalo.jpg';
import wanjiruImage from '../assets/testimonials/wanjiru.jpg';
import chidiImage from '../assets/testimonials/chidi.jpg';
import kwameImage from '../assets/testimonials/kwamme.jpg';
import mariamaImage from '../assets/testimonials/mariama.jpg';

const testimonials = [
  {
    id: 1,
    name: "Amina Okafor", 
    image: aminaImage,
    text: "YANGG has transformed my understanding of what it means to be a young African leader. The Leadership Academy gave me the skills and confidence to start my own social enterprise.",
  },
  {
    id: 2,
    name: "Fatou Jallow",
    image: fatouImage, 
    text: "Through the She Leads program, I found a community of powerful women who inspired me to run for local office. Today, I'm representing my community and making real change.",
  },
  {
    id: 3,
    name: "Kwame Mensah",
    image: kwameImage,
    text: "The Africa The Future Conference opened my eyes to the possibilities of digital innovation. I met mentors and partners who helped me scale my tech startup across three countries.",
  },
  {
    id: 4,
    name: "Wanjiru Kamau",
    image: wanjiruImage,
    text: "YANGG's SDG training program equipped me with practical tools to implement sustainable development projects in my community. We've impacted over 500 families so far.",
  },
  {
    id: 5,
    name: "Chidi Okonkwo",
    image: chidiImage,
    text: "The Afripreneur program didn't just teach me business skills—it changed my mindset. I now see challenges as opportunities to create homegrown African solutions.",
  },
  {
    id: 6,
    name: "Mariama Diallo",
    image: mariamaImage,
    text: "Being part of YANGG's civic engagement initiatives has empowered me to advocate for youth-friendly policies in my country. Our voices are finally being heard.",
  },

];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div 
        variants={fadeIn('up', 0.3)}
        className="text-center mb-12"
      >
        <motion.h2 
          variants={textVariant(0.2)}
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white"
        >
          Stories from Our Community
        </motion.h2>
        <motion.p 
          variants={fadeIn('up', 0.4)}
          className="text-gray-600 dark:text-gray-300"
        >
          Hear from young African leaders whose lives have been transformed through YANGG
        </motion.p>
      </motion.div>

      <motion.div 
        variants={fadeIn('up', 0.5)}
        className="relative"
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={30}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="testimonials-swiper md:mb-12"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id} className='h-full md:py-12 py-4'>
              <motion.div 
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-full flex flex-col border-2 border-[#f0c630] dark:border-[#f0c630]"
              >
                <motion.div 
                  variants={fadeIn('down', 0.4 * (index + 1))}
                  className="w-24 h-24 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full bg-white dark:bg-slate-900 border-2 border-[#f0c630]"
                >
                  <motion.img
                    variants={fadeIn('up', 0.5 * (index + 1))}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full min-w-full min-h-full object-cover object-center rounded-full"
                  />
                </motion.div>
                <motion.div 
                  variants={fadeIn('up', 0.4 * (index + 1))}
                  className="flex justify-center mb-2 gap-1"
                >
                  {[...Array(5)].map((_, starIndex) => (
                    <motion.span 
                      key={starIndex} 
                      variants={fadeIn('up', 0.1 * starIndex)}
                    >
                      <FaStar className="text-blue-600 w-4 h-4" />
                    </motion.span>
                  ))}
                </motion.div>
                <motion.h3 
                  variants={textVariant(0.3)}
                  className="font-semibold text-xl mb-3 text-gray-900 dark:text-white"
                >
                  {testimonial.name}
                </motion.h3>
                <motion.p 
                  variants={fadeIn('up', 0.6 * (index + 1))}
                  className="text-gray-600 dark:text-gray-300"
                >
                  {testimonial.text}
                </motion.p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <motion.div 
          variants={fadeIn('up', 0.7)}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button 
            variants={fadeIn('right', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-prev-custom w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-[#32a8ed] hover:text-white cursor-pointer transition-colors text-gray-700 dark:text-gray-300"
          >
            <BsChevronLeft className="w-6 h-6" />
          </motion.button>
          <motion.button 
            variants={fadeIn('left', 0.8)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="swiper-button-next-custom w-12 h-12 rounded-full border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:bg-[#32a8ed] hover:text-white cursor-pointer transition-colors text-gray-700 dark:text-gray-300"
          >
            <BsChevronRight className="w-6 h-6" />
          </motion.button>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default TestimonialsSection;
