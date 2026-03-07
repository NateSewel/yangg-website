import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../utils/motion";
import { FaGlobeAfrica, FaUsers } from "react-icons/fa";
import { useTranslation } from 'react-i18next'

const PurposeSection = () => {
  const { t } = useTranslation()
  
  const features = [
    {
      icon: <FaGlobeAfrica className="w-10 h-10 text-green-600 dark:text-green-400" />,
      title: t('about.feature1Title'),
      description: t('about.feature1Desc')
    },
    {
      icon: <FaUsers className="w-10 h-10 text-blue-600 dark:text-blue-400" />,
      title: t('about.feature2Title'),
      description: t('about.feature2Desc')
    }
  ];

  return (
    <section id="about" className="w-full bg-gray-50 dark:bg-gray-800 py-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={fadeIn('right', 0.2)}
          initial="hidden"
          whileInView="show"
          className="grid md:grid-cols-3 grid-cols-1 gap-8"
        >
          <motion.div variants={fadeIn('right', 0.3)}>
            <motion.div 
              variants={fadeIn('up', 0.4)}
              className="text-sm text-green-600 dark:text-green-400 font-medium mb-2"
            >
              {t('about.tag')}
            </motion.div>
            <motion.h2 
              variants={textVariant(0.5)}
              className="text-3xl md:w-4/5 md:text-4xl font-bold text-gray-900 dark:text-white"
            >
              {t('about.title')}
            </motion.h2>
          </motion.div>

          <motion.div 
            variants={fadeIn('left', 0.3)}
            className="col-span-2 grid grid-cols-1 md:grid-cols-2 justify-between gap-8"
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn('up', 0.3 * (index + 1))}
                className="flex items-start space-x-4"
              >
                <motion.div 
                  variants={fadeIn('right', 0.4 * (index + 1))}
                  className="w-14 h-14 flex-shrink-0 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-700"
                >
                  {feature.icon}
                </motion.div>
                <motion.div variants={fadeIn('left', 0.4 * (index + 1))} className="flex-1 pt-1">
                  <motion.h3 
                    variants={textVariant(0.3)}
                    className="text-xl font-semibold text-gray-900 dark:text-white mb-2"
                  >
                    {feature.title}
                  </motion.h3>
                  <motion.p 
                    variants={fadeIn('up', 0.4)}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    {feature.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PurposeSection;
