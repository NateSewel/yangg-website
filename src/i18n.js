import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navbar
      "nav.home": "Home",
      "nav.about": "About Us",
      "nav.programs": "Programs",
      "nav.events": "Events",
      "nav.gallery": "Gallery",
      "nav.testimonials": "Testimonials",
      "nav.getInTouch": "Get in touch",
      
      // Hero Section
      "hero.badge": "Empowering African Youth",
      "hero.title": "Making Africa",
      "hero.titleHighlight": "The Tree of Life",
      "hero.titleEnd": "",
      "hero.description": "YANGG is a pan-African youth-led organization comprising 17 member countries. We unite vibrant African youths who are zealous and passionate about contributing to the development of their society through the actualization of sustainable development goals, business development/entrepreneurship, and leadership development.",
      "hero.emailPlaceholder": "Email address",
      
      // About Section
      "about.tag": "WHO WE ARE",
      "about.title": "Building Africa's Future, One Young Leader at a Time",
      "about.feature1Title": "Our Vision",
      "about.feature1Desc": "To raise global youth leaders who are rooted in sustainability for African transformation.",
      "about.feature2Title": "Our Mission",
      "about.feature2Desc": "To build a network of global leaders who are passionate about African transformation.",
      
      // Features Section
      "features.title": "How We Empower African Youth",
      "features.subtitle": "Our three-step approach to building the next generation of African leaders",
      "features.feature1Title": "Identify Potential",
      "features.feature1Desc": "We discover and nurture young African leaders with passion for positive change",
      "features.feature2Title": "Build Capacity",
      "features.feature2Desc": "Comprehensive training programs that develop leadership and innovation skills",
      "features.feature3Title": "Drive Impact",
      "features.feature3Desc": "Empowered youth create sustainable solutions for their communities",
      "features.button": "Join Our Programs",
      
      // Schedule Section
      "schedule.tag": "OUR IMPACT",
      "schedule.title": "17 Member Countries United for African Transformation",
      "schedule.description": "YANGG operates across 17 African countries including Nigeria, Senegal, Kenya, Togo, Morocco, Sierra Leone, Uganda, Burundi, Namibia, Lesotho, Benin Rep, DR Congo, Cameroon, Gambia, Zambia, and Botswana. Together, we've executed 10 projects, conducted 15 trainings, and organized 5 conferences.",
      "schedule.link": "Learn more about our impact",
      
      // Monitor Section
      "monitor.tag": "DIGITAL TRANSFORMATION",
      "monitor.title": "From Consumers to Creators of Technology",
      "monitor.description": "We champion Africa's digital future by empowering youth to become innovators and creators, not just consumers. Through training, mentorship, and access to resources, we're building a generation that creates homegrown solutions for African challenges.",
      "monitor.link": "Explore our programs",
      
      // Programs Section
      "programs.title": "Our Programs Transforming African Youth",
      "programs.subtitle": "Comprehensive initiatives designed to empower the next generation of African leaders",
      "programs.point1": "Leadership development & capacity building",
      "programs.point2": "Entrepreneurship & innovation support",
      "programs.button": "Explore Programs",
      "programs.program1Title": "Leadership Academy",
      "programs.program1Desc": "Comprehensive training program equipping young Africans with leadership skills and strategic thinking.",
      "programs.program2Title": "Afripreneur",
      "programs.program2Desc": "Supporting young entrepreneurs to build sustainable businesses that solve local problems.",
      "programs.program3Title": "She Leads",
      "programs.program3Desc": "Empowering young African women to take leadership roles in business and civil society.",
      "programs.program4Title": "SDG Training",
      "programs.program4Desc": "Virtual programs focused on achieving Sustainable Development Goals across Africa.",
      "programs.learnMore": "LEARN MORE",
      
      // Events Section
      "events.title": "Our Events & Programs",
      "events.subtitle": "Join us at our upcoming events and programs designed to empower young African leaders",
      "events.learnMore": "Learn More",
      "events.completed": "Completed",
      "events.upcoming": "Upcoming",
      "events.ongoing": "Ongoing",
      
      // Gallery Section
      "gallery.title": "Gallery",
      "gallery.subtitle": "Moments from our events, programs, and the incredible young leaders we work with",
      "gallery.filterAll": "All",
      "gallery.filterConferences": "Conferences",
      "gallery.filterTraining": "Training",
      "gallery.filterWorkshops": "Workshops",
      
      // Testimonials Section
      "testimonials.title": "Stories from Our Community",
      "testimonials.subtitle": "Hear from young African leaders whose lives have been transformed through YANGG",
      
      // Newsletter Section
      "newsletter.title": "Join Our Community",
      "newsletter.subtitle": "Stay updated on our programs, events, and opportunities to empower African youth",
      "newsletter.emailPlaceholder": "Enter your email address",
      "newsletter.button": "Join Now",
      
      // Contact Section
      "contact.title": "Get in Touch",
      "contact.subtitle": "Have questions about our programs? Want to partner with us? We'd love to hear from you!",
      "contact.email": "Email",
      "contact.phone": "Phone",
      "contact.office": "Office",
      "contact.officeHours": "Office Hours",
      "contact.officeHoursTime": "Monday - Friday: 9:00 AM - 5:00 PM (WAT)",
      "contact.formName": "Full Name",
      "contact.formEmail": "Email Address",
      "contact.formPhone": "Phone Number",
      "contact.formSubject": "Subject",
      "contact.formMessage": "Message",
      "contact.formNamePlaceholder": "John Doe",
      "contact.formEmailPlaceholder": "john@example.com",
      "contact.formPhonePlaceholder": "+234 XXX XXX XXXX",
      "contact.formSubjectPlaceholder": "How can we help?",
      "contact.formMessagePlaceholder": "Tell us more about your inquiry...",
      "contact.submitButton": "Send Message",
      
      // Values Section
      "values.title": "Our Values",
      "values.subtitle": "The principles that guide our work across Africa",
      "values.value1Title": "Strategic Partnership",
      "values.value1Desc": "Just as no ocean exists without the merging of rivers and seas, we believe in the power of collaboration. YANGG is committed to partnering with organizations that share our dream of making Africa the Tree of Life.",
      "values.value2Title": "Integrity",
      "values.value2Desc": "Integrity is the foundation of humanity. We uphold the belief that every individual deserves dignity and respect. For Africa to thrive in peace, we must protect and promote human integrity above all else.",
      "values.value3Title": "Innovation",
      "values.value3Desc": "To transform Africa into a shining jewel, we must unlock the creativity of our youth. YANGG inspires young Africans to think boldly, create freely, and lead with innovation.",
      "values.value4Title": "Pan-Africanism",
      "values.value4Desc": "We carry the torch of visionary leaders, advocating for a united Africa, one where race, gender, religion, and color are never barriers to unity.",
      "values.value5Title": "Inclusivity",
      "values.value5Desc": "We want to make our continent hospitable to both the rich and the poor, black and white, young and old, strong and weak, and, most importantly, the impaired.",
      "values.value6Title": "Teamwork",
      "values.value6Desc": "As our people say, 'one hand can never tie a bundle.' YANGG fosters a culture of teamwork among African youth, encouraging them to unite, collaborate, and solve challenges together.",
      
      // FAQ Section
      "faq.title": "Frequently Asked Questions",
      "faq.subtitle": "Everything you need to know about YANGG",
      "faq.q1": "What is YANGG?",
      "faq.a1": "YANGG (Young Africans Network for Global Goals) is a Pan-African youth-led organization dedicated to empowering African youths to drive positive change in their communities.",
      "faq.q2": "What is the vision of YANGG?",
      "faq.a2": "Our vision is to raise global youth leaders who are rooted in sustainability for African transformation.",
      "faq.q3": "How many countries are part of YANGG?",
      "faq.a3": "YANGG currently operates in 17 member countries across Africa.",
      "faq.q4": "Who can join YANGG?",
      "faq.a4": "YANGG is open to vibrant, passionate African youths who are eager to contribute to community development, leadership advancement, and economic growth.",
      "faq.q5": "What does YANGG focus on?",
      "faq.a5": "YANGG focuses on: Actualization of the Sustainable Development Goals (SDGs), Business development and entrepreneurship, Leadership development and capacity building.",
      "faq.q6": "How does YANGG achieve its goals?",
      "faq.a6": "We achieve our goals through impactful projects, leadership training, business development programs, advocacy campaigns, and strategic partnerships that empower youths to make a difference.",
      "faq.q7": "Why is YANGG youth-led?",
      "faq.a7": "We believe that African youths are powerful agents of change who understand their communities' needs and can create innovative solutions for sustainable growth.",
      "faq.q8": "How can I become a member of YANGG?",
      "faq.a8": "You can become a member by registering through our official membership portal on the website and participating in our programs and initiatives.",
      "faq.q9": "Does YANGG work with other organizations?",
      "faq.a9": "Yes. We collaborate with local and international organizations, governments, and private sector partners to amplify our impact across Africa.",
      "faq.q10": "How can I support YANGG's work?",
      "faq.a10": "You can support YANGG by partnering with us, volunteering, sponsoring projects, or donating to our initiatives to further youth development and community transformation.",
      
      // Footer
      "footer.description": "Young African Network for Global Goals - Empowering African youth to shape the future through leadership, innovation, and civic engagement.",
      "footer.company": "Company",
      "footer.programs": "Programs",
      "footer.resources": "Resources",
      "footer.connect": "Connect",
      "footer.copyright": "YANGG - Young African Network for Global Goals",
      "footer.tagline": "Empowering African Youth"
    }
  },
  fr: {
    translation: {
      // Navbar
      "nav.home": "Accueil",
      "nav.about": "À Propos",
      "nav.programs": "Programmes",
      "nav.events": "Événements",
      "nav.gallery": "Galerie",
      "nav.testimonials": "Témoignages",
      "nav.getInTouch": "Contactez-nous",
      
      // Hero Section
      "hero.badge": "Autonomiser la Jeunesse Africaine",
      "hero.title": "Transformer l'Afrique par le",
      "hero.titleHighlight": "Leadership des Jeunes",
      "hero.titleEnd": "et l'Innovation",
      "hero.description": "Nous permettons aux jeunes Africains de devenir des producteurs, pas seulement des consommateurs—créant des solutions locales qui stimulent la transformation numérique et le développement durable à travers le continent.",
      "hero.emailPlaceholder": "Adresse e-mail",
      
      // About Section
      "about.tag": "QUI NOUS SOMMES",
      "about.title": "Construire l'Avenir de l'Afrique, Un Jeune Leader à la Fois",
      "about.feature1Title": "Solutions Centrées sur l'Afrique",
      "about.feature1Desc": "Nous croyons que les solutions qui transformeront l'Afrique doivent venir des Africains, enracinées dans les connaissances et l'innovation locales.",
      "about.feature2Title": "Autonomisation des Jeunes",
      "about.feature2Desc": "Nous investissons dans le potentiel des jeunes, leur fournissant des compétences, des réseaux et des plateformes pour devenir des leaders et des agents de changement.",
      
      // Features Section
      "features.title": "Comment Nous Autonomisons la Jeunesse Africaine",
      "features.subtitle": "Notre approche en trois étapes pour former la prochaine génération de leaders africains",
      "features.feature1Title": "Identifier le Potentiel",
      "features.feature1Desc": "Nous découvrons et cultivons de jeunes leaders africains passionnés par le changement positif",
      "features.feature2Title": "Développer les Capacités",
      "features.feature2Desc": "Programmes de formation complets qui développent le leadership et les compétences en innovation",
      "features.feature3Title": "Générer l'Impact",
      "features.feature3Desc": "Les jeunes autonomisés créent des solutions durables pour leurs communautés",
      "features.button": "Rejoindre Nos Programmes",
      
      // Schedule Section
      "schedule.tag": "NOTRE IMPACT",
      "schedule.title": "Autonomiser les Jeunes dans Quatre Nations Africaines",
      "schedule.description": "Avec plus de 60% de la population africaine de moins de 25 ans, nous transformons cet avantage démographique en force productive. À travers nos programmes au Nigeria, en Gambie, au Kenya et au Ghana, nous construisons un réseau de jeunes leaders qui stimulent le développement durable à travers le continent.",
      "schedule.link": "En savoir plus sur notre impact",
      
      // Monitor Section
      "monitor.tag": "TRANSFORMATION NUMÉRIQUE",
      "monitor.title": "De Consommateurs à Créateurs de Technologie",
      "monitor.description": "Nous défendons l'avenir numérique de l'Afrique en permettant aux jeunes de devenir des innovateurs et des créateurs, pas seulement des consommateurs. Grâce à la formation, au mentorat et à l'accès aux ressources, nous construisons une génération qui crée des solutions locales pour les défis africains.",
      "monitor.link": "Explorer nos programmes",
      
      // Programs Section
      "programs.title": "Nos Programmes Transformant la Jeunesse Africaine",
      "programs.subtitle": "Initiatives complètes conçues pour autonomiser la prochaine génération de leaders africains",
      "programs.point1": "Développement du leadership et renforcement des capacités",
      "programs.point2": "Soutien à l'entrepreneuriat et à l'innovation",
      "programs.button": "Explorer les Programmes",
      "programs.program1Title": "Académie de Leadership",
      "programs.program1Desc": "Programme de formation complet équipant les jeunes Africains de compétences en leadership et en pensée stratégique.",
      "programs.program2Title": "Afripreneur",
      "programs.program2Desc": "Soutenir les jeunes entrepreneurs à créer des entreprises durables qui résolvent les problèmes locaux.",
      "programs.program3Title": "Elle Dirige",
      "programs.program3Desc": "Autonomiser les jeunes femmes africaines à prendre des rôles de leadership dans les affaires et la société civile.",
      "programs.program4Title": "Formation ODD",
      "programs.program4Desc": "Programmes virtuels axés sur la réalisation des Objectifs de Développement Durable en Afrique.",
      "programs.learnMore": "EN SAVOIR PLUS",
      
      // Events Section
      "events.title": "Nos Événements & Programmes",
      "events.subtitle": "Rejoignez-nous lors de nos événements et programmes conçus pour autonomiser les jeunes leaders africains",
      "events.learnMore": "En Savoir Plus",
      "events.completed": "Terminé",
      "events.upcoming": "À Venir",
      "events.ongoing": "En Cours",
      
      // Gallery Section
      "gallery.title": "Galerie",
      "gallery.subtitle": "Moments de nos événements, programmes et des incroyables jeunes leaders avec qui nous travaillons",
      "gallery.filterAll": "Tout",
      "gallery.filterConferences": "Conférences",
      "gallery.filterTraining": "Formation",
      "gallery.filterWorkshops": "Ateliers",
      
      // Testimonials Section
      "testimonials.title": "Histoires de Notre Communauté",
      "testimonials.subtitle": "Écoutez les jeunes leaders africains dont les vies ont été transformées par YANGG",
      
      // Newsletter Section
      "newsletter.title": "Rejoignez Notre Communauté",
      "newsletter.subtitle": "Restez informé de nos programmes, événements et opportunités pour autonomiser la jeunesse africaine",
      "newsletter.emailPlaceholder": "Entrez votre adresse e-mail",
      "newsletter.button": "Rejoindre Maintenant",
      
      // Contact Section
      "contact.title": "Contactez-Nous",
      "contact.subtitle": "Vous avez des questions sur nos programmes? Vous voulez vous associer avec nous? Nous aimerions vous entendre!",
      "contact.email": "E-mail",
      "contact.phone": "Téléphone",
      "contact.office": "Bureau",
      "contact.officeHours": "Heures de Bureau",
      "contact.officeHoursTime": "Lundi - Vendredi: 9h00 - 17h00 (WAT)",
      "contact.formName": "Nom Complet",
      "contact.formEmail": "Adresse E-mail",
      "contact.formPhone": "Numéro de Téléphone",
      "contact.formSubject": "Sujet",
      "contact.formMessage": "Message",
      "contact.formNamePlaceholder": "Jean Dupont",
      "contact.formEmailPlaceholder": "jean@exemple.com",
      "contact.formPhonePlaceholder": "+234 XXX XXX XXXX",
      "contact.formSubjectPlaceholder": "Comment pouvons-nous vous aider?",
      "contact.formMessagePlaceholder": "Parlez-nous de votre demande...",
      "contact.submitButton": "Envoyer le Message",
      
      // Values Section
      "values.title": "Nos Valeurs",
      "values.subtitle": "Les principes qui guident notre travail à travers l'Afrique",
      "values.value1Title": "Partenariat Stratégique",
      "values.value1Desc": "Tout comme aucun océan n'existe sans la fusion des rivières et des mers, nous croyons au pouvoir de la collaboration. YANGG s'engage à s'associer avec des organisations qui partagent notre rêve de faire de l'Afrique l'Arbre de Vie.",
      "values.value2Title": "Intégrité",
      "values.value2Desc": "L'intégrité est le fondement de l'humanité. Nous soutenons la conviction que chaque individu mérite dignité et respect. Pour que l'Afrique prospère en paix, nous devons protéger et promouvoir l'intégrité humaine avant tout.",
      "values.value3Title": "Innovation",
      "values.value3Desc": "Pour transformer l'Afrique en un joyau brillant, nous devons libérer la créativité de notre jeunesse. YANGG inspire les jeunes Africains à penser audacieusement, créer librement et diriger avec innovation.",
      "values.value4Title": "Panafricanisme",
      "values.value4Desc": "Nous portons le flambeau des leaders visionnaires, plaidant pour une Afrique unie, où la race, le genre, la religion et la couleur ne sont jamais des barrières à l'unité.",
      "values.value5Title": "Inclusivité",
      "values.value5Desc": "Nous voulons rendre notre continent hospitalier pour les riches et les pauvres, les noirs et les blancs, les jeunes et les vieux, les forts et les faibles, et surtout les personnes handicapées.",
      "values.value6Title": "Travail d'Équipe",
      "values.value6Desc": "Comme le disent nos gens, 'une main ne peut jamais attacher un paquet.' YANGG favorise une culture de travail d'équipe parmi les jeunes Africains, les encourageant à s'unir, collaborer et résoudre les défis ensemble.",
      
      // FAQ Section
      "faq.title": "Questions Fréquemment Posées",
      "faq.subtitle": "Tout ce que vous devez savoir sur YANGG",
      "faq.q1": "Qu'est-ce que YANGG?",
      "faq.a1": "YANGG (Réseau des Jeunes Africains pour les Objectifs Mondiaux) est une organisation panafricaine dirigée par des jeunes dédiée à l'autonomisation des jeunes Africains pour conduire un changement positif dans leurs communautés.",
      "faq.q2": "Quelle est la vision de YANGG?",
      "faq.a2": "Notre vision est de former des leaders mondiaux de la jeunesse enracinés dans la durabilité pour la transformation africaine.",
      "faq.q3": "Combien de pays font partie de YANGG?",
      "faq.a3": "YANGG opère actuellement dans 17 pays membres à travers l'Afrique.",
      "faq.q4": "Qui peut rejoindre YANGG?",
      "faq.a4": "YANGG est ouvert aux jeunes Africains dynamiques et passionnés qui sont désireux de contribuer au développement communautaire, à l'avancement du leadership et à la croissance économique.",
      "faq.q5": "Sur quoi se concentre YANGG?",
      "faq.a5": "YANGG se concentre sur: La réalisation des Objectifs de Développement Durable (ODD), Le développement des affaires et l'entrepreneuriat, Le développement du leadership et le renforcement des capacités.",
      "faq.q6": "Comment YANGG atteint-il ses objectifs?",
      "faq.a6": "Nous atteignons nos objectifs grâce à des projets percutants, des formations en leadership, des programmes de développement des affaires, des campagnes de plaidoyer et des partenariats stratégiques qui autonomisent les jeunes à faire la différence.",
      "faq.q7": "Pourquoi YANGG est-il dirigé par des jeunes?",
      "faq.a7": "Nous croyons que les jeunes Africains sont de puissants agents de changement qui comprennent les besoins de leurs communautés et peuvent créer des solutions innovantes pour une croissance durable.",
      "faq.q8": "Comment puis-je devenir membre de YANGG?",
      "faq.a8": "Vous pouvez devenir membre en vous inscrivant via notre portail d'adhésion officiel sur le site Web et en participant à nos programmes et initiatives.",
      "faq.q9": "YANGG travaille-t-il avec d'autres organisations?",
      "faq.a9": "Oui. Nous collaborons avec des organisations locales et internationales, des gouvernements et des partenaires du secteur privé pour amplifier notre impact à travers l'Afrique.",
      "faq.q10": "Comment puis-je soutenir le travail de YANGG?",
      "faq.a10": "Vous pouvez soutenir YANGG en vous associant avec nous, en faisant du bénévolat, en parrainant des projets ou en faisant un don à nos initiatives pour favoriser le développement des jeunes et la transformation communautaire.",
      
      // Footer
      "footer.description": "Réseau des Jeunes Africains pour les Objectifs Mondiaux - Autonomiser la jeunesse africaine à façonner l'avenir par le leadership, l'innovation et l'engagement civique.",
      "footer.company": "Entreprise",
      "footer.programs": "Programmes",
      "footer.resources": "Ressources",
      "footer.connect": "Connecter",
      "footer.copyright": "YANGG - Réseau des Jeunes Africains pour les Objectifs Mondiaux",
      "footer.tagline": "Autonomiser la Jeunesse Africaine"
    }
  },
  es: {
    translation: {
      // Navbar
      "nav.home": "Inicio",
      "nav.about": "Sobre Nosotros",
      "nav.programs": "Programas",
      "nav.events": "Eventos",
      "nav.gallery": "Galería",
      "nav.testimonials": "Testimonios",
      "nav.getInTouch": "Contáctenos",
      
      // Hero Section
      "hero.badge": "Empoderando a la Juventud Africana",
      "hero.title": "Transformando África a través del",
      "hero.titleHighlight": "Liderazgo Juvenil",
      "hero.titleEnd": "y la Innovación",
      "hero.description": "Empoderamos a los jóvenes africanos para que se conviertan en productores, no solo consumidores—construyendo soluciones locales que impulsan la transformación digital y el desarrollo sostenible en todo el continente.",
      "hero.emailPlaceholder": "Dirección de correo electrónico",
      
      // About Section
      "about.tag": "QUIÉNES SOMOS",
      "about.title": "Construyendo el Futuro de África, Un Joven Líder a la Vez",
      "about.feature1Title": "Soluciones Centradas en África",
      "about.feature1Desc": "Creemos que las soluciones que transformarán África deben venir de los africanos, arraigadas en el conocimiento y la innovación locales.",
      "about.feature2Title": "Empoderamiento Juvenil",
      "about.feature2Desc": "Invertimos en el potencial de los jóvenes, proporcionándoles habilidades, redes y plataformas para convertirse en líderes y agentes de cambio.",
      
      // Features Section
      "features.title": "Cómo Empoderamos a la Juventud Africana",
      "features.subtitle": "Nuestro enfoque de tres pasos para formar la próxima generación de líderes africanos",
      "features.feature1Title": "Identificar Potencial",
      "features.feature1Desc": "Descubrimos y cultivamos jóvenes líderes africanos con pasión por el cambio positivo",
      "features.feature2Title": "Desarrollar Capacidad",
      "features.feature2Desc": "Programas de capacitación integral que desarrollan habilidades de liderazgo e innovación",
      "features.feature3Title": "Generar Impacto",
      "features.feature3Desc": "Los jóvenes empoderados crean soluciones sostenibles para sus comunidades",
      "features.button": "Únete a Nuestros Programas",
      
      // Schedule Section
      "schedule.tag": "NUESTRO IMPACTO",
      "schedule.title": "Empoderando a la Juventud en Cuatro Naciones Africanas",
      "schedule.description": "Con más del 60% de la población africana menor de 25 años, estamos transformando esta ventaja demográfica en una fuerza productiva. A través de nuestros programas en Nigeria, Gambia, Kenia y Ghana, estamos construyendo una red de jóvenes líderes que impulsan el desarrollo sostenible en todo el continente.",
      "schedule.link": "Aprende más sobre nuestro impacto",
      
      // Monitor Section
      "monitor.tag": "TRANSFORMACIÓN DIGITAL",
      "monitor.title": "De Consumidores a Creadores de Tecnología",
      "monitor.description": "Defendemos el futuro digital de África empoderando a los jóvenes para que se conviertan en innovadores y creadores, no solo consumidores. A través de capacitación, mentoría y acceso a recursos, estamos construyendo una generación que crea soluciones locales para los desafíos africanos.",
      "monitor.link": "Explora nuestros programas",
      
      // Programs Section
      "programs.title": "Nuestros Programas Transformando a la Juventud Africana",
      "programs.subtitle": "Iniciativas integrales diseñadas para empoderar a la próxima generación de líderes africanos",
      "programs.point1": "Desarrollo de liderazgo y fortalecimiento de capacidades",
      "programs.point2": "Apoyo al emprendimiento e innovación",
      "programs.button": "Explorar Programas",
      "programs.program1Title": "Academia de Liderazgo",
      "programs.program1Desc": "Programa de capacitación integral que equipa a los jóvenes africanos con habilidades de liderazgo y pensamiento estratégico.",
      "programs.program2Title": "Afripreneur",
      "programs.program2Desc": "Apoyando a jóvenes emprendedores a construir negocios sostenibles que resuelvan problemas locales.",
      "programs.program3Title": "Ella Lidera",
      "programs.program3Desc": "Empoderando a las jóvenes africanas para asumir roles de liderazgo en los negocios y la sociedad civil.",
      "programs.program4Title": "Capacitación ODS",
      "programs.program4Desc": "Programas virtuales enfocados en lograr los Objetivos de Desarrollo Sostenible en África.",
      "programs.learnMore": "APRENDER MÁS",
      
      // Events Section
      "events.title": "Nuestros Eventos y Programas",
      "events.subtitle": "Únete a nosotros en nuestros próximos eventos y programas diseñados para empoderar a los jóvenes líderes africanos",
      "events.learnMore": "Aprender Más",
      "events.completed": "Completado",
      "events.upcoming": "Próximo",
      "events.ongoing": "En Curso",
      
      // Gallery Section
      "gallery.title": "Galería",
      "gallery.subtitle": "Momentos de nuestros eventos, programas y los increíbles jóvenes líderes con los que trabajamos",
      "gallery.filterAll": "Todo",
      "gallery.filterConferences": "Conferencias",
      "gallery.filterTraining": "Capacitación",
      "gallery.filterWorkshops": "Talleres",
      
      // Testimonials Section
      "testimonials.title": "Historias de Nuestra Comunidad",
      "testimonials.subtitle": "Escucha a los jóvenes líderes africanos cuyas vidas han sido transformadas por YANGG",
      
      // Newsletter Section
      "newsletter.title": "Únete a Nuestra Comunidad",
      "newsletter.subtitle": "Mantente actualizado sobre nuestros programas, eventos y oportunidades para empoderar a la juventud africana",
      "newsletter.emailPlaceholder": "Ingresa tu dirección de correo electrónico",
      "newsletter.button": "Únete Ahora",
      
      // Contact Section
      "contact.title": "Contáctenos",
      "contact.subtitle": "¿Tienes preguntas sobre nuestros programas? ¿Quieres asociarte con nosotros? ¡Nos encantaría saber de ti!",
      "contact.email": "Correo Electrónico",
      "contact.phone": "Teléfono",
      "contact.office": "Oficina",
      "contact.officeHours": "Horario de Oficina",
      "contact.officeHoursTime": "Lunes - Viernes: 9:00 AM - 5:00 PM (WAT)",
      "contact.formName": "Nombre Completo",
      "contact.formEmail": "Dirección de Correo Electrónico",
      "contact.formPhone": "Número de Teléfono",
      "contact.formSubject": "Asunto",
      "contact.formMessage": "Mensaje",
      "contact.formNamePlaceholder": "Juan Pérez",
      "contact.formEmailPlaceholder": "juan@ejemplo.com",
      "contact.formPhonePlaceholder": "+234 XXX XXX XXXX",
      "contact.formSubjectPlaceholder": "¿Cómo podemos ayudarte?",
      "contact.formMessagePlaceholder": "Cuéntanos más sobre tu consulta...",
      "contact.submitButton": "Enviar Mensaje",
      
      // Values Section
      "values.title": "Nuestros Valores",
      "values.subtitle": "Los principios que guían nuestro trabajo en África",
      "values.value1Title": "Asociación Estratégica",
      "values.value1Desc": "Así como ningún océano existe sin la fusión de ríos y mares, creemos en el poder de la colaboración. YANGG se compromete a asociarse con organizaciones que comparten nuestro sueño de hacer de África el Árbol de la Vida.",
      "values.value2Title": "Integridad",
      "values.value2Desc": "La integridad es el fundamento de la humanidad. Sostenemos la creencia de que cada individuo merece dignidad y respeto. Para que África prospere en paz, debemos proteger y promover la integridad humana por encima de todo.",
      "values.value3Title": "Innovación",
      "values.value3Desc": "Para transformar África en una joya brillante, debemos desbloquear la creatividad de nuestra juventud. YANGG inspira a los jóvenes africanos a pensar audazmente, crear libremente y liderar con innovación.",
      "values.value4Title": "Panafricanismo",
      "values.value4Desc": "Llevamos la antorcha de líderes visionarios, abogando por una África unida, donde la raza, el género, la religión y el color nunca sean barreras para la unidad.",
      "values.value5Title": "Inclusividad",
      "values.value5Desc": "Queremos hacer que nuestro continente sea hospitalario tanto para ricos como para pobres, negros y blancos, jóvenes y viejos, fuertes y débiles, y lo más importante, las personas con discapacidad.",
      "values.value6Title": "Trabajo en Equipo",
      "values.value6Desc": "Como dice nuestra gente, 'una mano nunca puede atar un paquete.' YANGG fomenta una cultura de trabajo en equipo entre los jóvenes africanos, alentándolos a unirse, colaborar y resolver desafíos juntos.",
      
      // FAQ Section
      "faq.title": "Preguntas Frecuentes",
      "faq.subtitle": "Todo lo que necesitas saber sobre YANGG",
      "faq.q1": "¿Qué es YANGG?",
      "faq.a1": "YANGG (Red de Jóvenes Africanos para Objetivos Globales) es una organización panafricana dirigida por jóvenes dedicada a empoderar a los jóvenes africanos para impulsar un cambio positivo en sus comunidades.",
      "faq.q2": "¿Cuál es la visión de YANGG?",
      "faq.a2": "Nuestra visión es formar líderes juveniles globales arraigados en la sostenibilidad para la transformación africana.",
      "faq.q3": "¿Cuántos países forman parte de YANGG?",
      "faq.a3": "YANGG opera actualmente en 17 países miembros en toda África.",
      "faq.q4": "¿Quién puede unirse a YANGG?",
      "faq.a4": "YANGG está abierto a jóvenes africanos vibrantes y apasionados que están ansiosos por contribuir al desarrollo comunitario, el avance del liderazgo y el crecimiento económico.",
      "faq.q5": "¿En qué se enfoca YANGG?",
      "faq.a5": "YANGG se enfoca en: Actualización de los Objetivos de Desarrollo Sostenible (ODS), Desarrollo empresarial y emprendimiento, Desarrollo de liderazgo y fortalecimiento de capacidades.",
      "faq.q6": "¿Cómo logra YANGG sus objetivos?",
      "faq.a6": "Logramos nuestros objetivos a través de proyectos impactantes, capacitación en liderazgo, programas de desarrollo empresarial, campañas de defensa y asociaciones estratégicas que empoderan a los jóvenes para marcar la diferencia.",
      "faq.q7": "¿Por qué YANGG está dirigido por jóvenes?",
      "faq.a7": "Creemos que los jóvenes africanos son poderosos agentes de cambio que entienden las necesidades de sus comunidades y pueden crear soluciones innovadoras para el crecimiento sostenible.",
      "faq.q8": "¿Cómo puedo convertirme en miembro de YANGG?",
      "faq.a8": "Puedes convertirte en miembro registrándote a través de nuestro portal de membresía oficial en el sitio web y participando en nuestros programas e iniciativas.",
      "faq.q9": "¿YANGG trabaja con otras organizaciones?",
      "faq.a9": "Sí. Colaboramos con organizaciones locales e internacionales, gobiernos y socios del sector privado para amplificar nuestro impacto en toda África.",
      "faq.q10": "¿Cómo puedo apoyar el trabajo de YANGG?",
      "faq.a10": "Puedes apoyar a YANGG asociándote con nosotros, siendo voluntario, patrocinando proyectos o donando a nuestras iniciativas para promover el desarrollo juvenil y la transformación comunitaria.",
      
      // Footer
      "footer.description": "Red de Jóvenes Africanos para Objetivos Globales - Empoderando a la juventud africana para dar forma al futuro a través del liderazgo, la innovación y el compromiso cívico.",
      "footer.company": "Empresa",
      "footer.programs": "Programas",
      "footer.resources": "Recursos",
      "footer.connect": "Conectar",
      "footer.copyright": "YANGG - Red de Jóvenes Africanos para Objetivos Globales",
      "footer.tagline": "Empoderando a la Juventud Africana"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
