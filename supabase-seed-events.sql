-- ============================================
-- YANGG Events Seed Data
-- ============================================
-- This file contains all 14 events from your static data
-- Run this in Supabase SQL Editor after creating the schema
-- ============================================

-- Clear existing data (optional - remove if you want to keep existing data)
-- DELETE FROM events;

-- Insert all events
INSERT INTO events (
  id, title, theme, short_description, overview, date, location, 
  category, status, image, objectives, speakers, highlights, 
  impact, participants, created_at, updated_at
) VALUES

-- Event 1: Africa the Future Conference 2024
(
  'africa-future-conference-2024',
  'Africa the Future Conference - Third Edition',
  'Local Actions, Global Impact',
  'YANGG''s flagship event bringing together youth leaders, innovators, and policymakers to shape Africa''s future.',
  'The Young African Network for Global Goals (YANGG) successfully hosted the third edition of its flagship event, the Africa the Future Conference, on October 5, 2024. This year''s conference was themed "Local Actions, Global Impact" and sought to inspire and empower young Africans to take transformative actions within their communities that contribute to broader global development objectives.',
  'October 5, 2024',
  'Virtual',
  'conference',
  'completed',
  '/src/assets/gallery/1.JPG',
  '["Inspire and empower young Africans to take transformative actions", "Provide platform for thought-provoking dialogue on youth-led development", "Foster meaningful connections and long-term collaborations", "Promote innovation, education, and leadership development"]'::jsonb,
  '[{"name": "Mr. Stanley Amucbe", "title": "Executive Director, Fidelity Bank", "topic": "Leveraging Finance for Social Impact"}, {"name": "Mr. Felix Achibiri", "title": "Founder, DFC Holding", "topic": "Building Inclusive Economies through Social Enterprise"}, {"name": "Mr. Emmanuel Obinne", "title": "Head of Growth and Partnerships, BPC", "topic": "Financing Africa''s Future for Sustainable Development"}, {"name": "Mr. Collins Ndieze", "title": "Founder, YANGG", "topic": "Opening Address"}]'::jsonb,
  '["Distinguished audience of youth leaders, innovators, entrepreneurs, and policymakers", "Panel discussion on \"Reimagining African Leadership\"", "Recognition awards for keynote speakers and strategic partners", "Networking opportunities across the African continent"]'::jsonb,
  'The conference provided a platform for actionable insights on how young Africans can shape the future of the continent through innovation, education, and leadership.',
  NULL,
  NOW(),
  NOW()
),

-- Event 2: Virtual SDGs Training 2020
(
  'virtual-sdgs-training-2020',
  'YANGG Virtual SDGs Training Program',
  'Building a Sustainable Africa for Productivity',
  'Intensive virtual training series equipping 507 youth participants with SDG knowledge and sustainable development strategies.',
  'The Young Africans Network for Global Goals (YANGG) launched a groundbreaking virtual initiative titled "African Youths Virtual SDGs Training", held on May 6th, 8th, 10th, 13th, and 15th, 2020. This training series brought together a diverse group of young leaders from Africa and beyond to engage in intensive learning and dialogue centered around sustainable development and productivity.',
  'May 6, 8, 10, 13, 15, 2020',
  'Virtual (Zoom)',
  'training',
  'completed',
  '/src/assets/gallery/2.jpg',
  '["Provide young Africans with deep understanding of SDGs and their applicability", "Build capacity among young leaders to lead sustainable initiatives", "Foster cross-border collaboration and knowledge sharing", "Ignite action-oriented leadership focused on impact and resilience"]'::jsonb,
  '[{"name": "Ibeawuchi Collins", "country": "Nigeria", "title": "YANGG Global President"}, {"name": "Kelechi Ndieze", "country": "Nigeria"}, {"name": "Subodh Bhattarai", "country": "Nepal"}, {"name": "Janet Chemutai", "country": "Kenya"}, {"name": "Christopher H. Punzalan", "country": "Philippines"}, {"name": "Tamsir Sallah", "country": "Gambia"}, {"name": "Imane Mouhty", "country": "Canada"}, {"name": "Folashade Gift", "country": "Nigeria"}, {"name": "Oduetsa Montsho", "country": "Botswana"}, {"name": "Khaled El Houchaimi", "country": "Lebanon"}]'::jsonb,
  NULL,
  'Created strategic platform to empower new generation of African and global youth leaders. Fostered international collaboration and initiated wave of community-based SDG projects.',
  '507 youth participants',
  NOW(),
  NOW()
),

-- Event 3: Capacity Building Uganda 2020
(
  'capacity-building-uganda-2020',
  'YANGG Virtual Capacity Building Initiative on the SDGs',
  'Building Capacities for Africa''s Sustainable Development',
  'A Mindset Tune Session organized by YANGG Uganda to equip young Africans with leadership tools for sustainable development.',
  'The Young Africans Network for Global Goals – Uganda (YANGG Uganda) organised a high-impact virtual training event on May 16th and 17th, 2020, titled "A Mindset Tune Session Towards the SDGs." This strategic initiative was curated to equip young Africans with the mindset, knowledge, and leadership tools necessary to drive sustainable development.',
  'May 16-17, 2020',
  'Virtual (Google Hangouts)',
  'training',
  'completed',
  '/src/assets/gallery/3.jpg',
  '["Reorient young people''s mindset toward inclusive SDG engagement", "Build local capacity in leadership, project planning, and biodiversity conservation", "Promote cross-cultural learning and youth collaboration", "Amplify Uganda''s role in advancing African youth development"]'::jsonb,
  NULL,
  NULL,
  'Sparked conversations on localized SDG solutions, promoted gender-balanced leadership, and strengthened YANGG Uganda''s visibility as regional hub for youth capacity development.',
  'Over 300 youth',
  NOW(),
  NOW()
),

-- Event 4: African Leadership Summit 2020
(
  'african-leadership-summit-2020',
  'YANGG African Leadership Summit 2020',
  'Re-Inventing the Africa of Our Dream',
  'High-level virtual dialogue with 425 participants exploring leadership transformation and development across Africa.',
  'On June 5th, 2020, YANGG convened the African Leadership Summit 2020 under the transformative theme "Re-Inventing the Africa of Our Dream." The summit brought together distinguished thought leaders, development strategists, public policy experts, and youth champions.',
  'June 5, 2020',
  'Virtual (Zoom)',
  'conference',
  'completed',
  '/src/assets/gallery/4.jpg',
  '["Foster visionary leadership across African nations", "Provide platform for strategic dialogue on national development", "Build leadership capital through mentoring and knowledge sharing", "Inspire actionable solutions to Africa''s pressing challenges"]'::jsonb,
  '[{"name": "Lady B Bless", "title": "Executive Director, TLBHH Foundation, USA"}, {"name": "Ibeawuchi Collins", "title": "President, YANGG", "country": "Nigeria"}, {"name": "Linus Okorie", "title": "CEO, GOTNI Leadership Centre", "country": "Nigeria"}, {"name": "Dr. Sam Amadi", "title": "Scholar, Baze University", "country": "Nigeria"}, {"name": "Kelechi Ndieze", "title": "Director, YANGG International Programs", "country": "Nigeria"}]'::jsonb,
  NULL,
  'Equipped participants with frameworks for personal branding and civic engagement. Triggered cross-border networks fostering joint initiatives around education and economic empowerment.',
  '425 participants',
  NOW(),
  NOW()
),

-- Event 5: Youth School Leavers Togo 2020
(
  'youth-school-leavers-togo-2020',
  'Empowering Young School Leavers During and Beyond the Pandemic',
  'Opportunity Identification Amid COVID-19',
  'YANGG Togo initiative supporting young school leavers to identify opportunities during the pandemic.',
  'The Young African Network for Global Goals (YANGG) Togo Chapter launched a virtual initiative aimed at supporting young school leavers to identify and harness opportunities amid the COVID-19 pandemic and beyond.',
  'June 15-18, 2020',
  'Virtual',
  'training',
  'completed',
  '/src/assets/gallery/5.JPG',
  NULL,
  '[{"name": "Jean-Claude Atandji", "title": "HR Officer, AIESEC", "country": "Togo"}, {"name": "Gedeon Kakonde", "title": "Cultural Association Member", "country": "France/DRC"}, {"name": "Souadou Adja", "title": "Vice President, YANGG", "country": "Senegal"}, {"name": "Biaze Dieuang", "title": "Secretary General, YANGG", "country": "Cameroon"}, {"name": "Norbert Koleyovo", "title": "Head of Communications, YANGG Togo", "country": "Togo"}]'::jsonb,
  NULL,
  'Significant effort to uplift youth voices and enable long-term impact through innovation and entrepreneurship.',
  NULL,
  NOW(),
  NOW()
),

-- Event 6: Youth Sustainable Innovations Namibia 2020
(
  'youth-sustainable-innovations-namibia-2020',
  'Youth for Sustainable Innovations',
  'Youth for Sustainable Innovations',
  'YANGG Namibia''s first virtual forum promoting youth-led innovations for sustainable development.',
  'The Young Africans Network for Global Goals (YANGG) Namibia hosted its first-ever virtual forum under the theme "Youth for Sustainable Innovations" on Friday, 4th September 2020.',
  'September 4, 2020',
  'Virtual',
  'workshop',
  'completed',
  '/src/assets/gallery/6.jpg',
  '["Highlight youth-led initiatives contributing to sustainable development", "Unlock strategic avenues for youth participation in economic recovery", "Foster cross-country collaboration on development issues"]'::jsonb,
  '[{"name": "Ibeawuchi Collins", "title": "YANGG Global President"}, {"name": "Mr. Benjamin", "title": "Researcher/Consultant for ICT"}, {"name": "Eunike Nekundi", "title": "Country Coordinator, YANGG Namibia"}, {"name": "Ruusa Lipinge", "title": "Founder, Namibia-Driven Solutions"}, {"name": "Kelechi Ndiezue", "title": "International Director of Programs"}]'::jsonb,
  NULL,
  'Marked pivotal moment in YANGG Namibia''s journey toward youth mobilization for SDGs. Amplified voices of African youth and reinforced importance of sustainable thinking.',
  NULL,
  NOW(),
  NOW()
),

-- Event 7: Afripreneur Summit 2020
(
  'afripreneur-summit-2020',
  'Africa Youth Summit 5.0: AFRIPRENEUR and Young Innovators',
  'AFRIPRENEUR and Young Innovators',
  'Virtual summit showcasing African youth entrepreneurs and innovators driving local solutions.',
  'As part of its flagship Africa Youth Summit 5.0, YANGG hosted an insightful virtual event under the theme "AFRIPRENEUR and Young Innovators" on 12th September 2020.',
  'September 12, 2020',
  'Virtual (Zoom & Facebook Live)',
  'conference',
  'completed',
  '/src/assets/gallery/7.jpg',
  '["Showcase African youth entrepreneurs spearheading local solutions", "Create platform for knowledge sharing among changemakers", "Encourage youth involvement in sustainable development through entrepreneurship", "Promote cross-border collaboration among young professionals"]'::jsonb,
  '[{"name": "Ibeawuchi Collins Ugochukwu", "title": "Global President, YANGG"}, {"name": "Derrick Odidi", "title": "CEO, Derricko Investments", "country": "Kenya"}, {"name": "Hillary Goodness Ekene", "title": "Founder, Ulogwu Technologies", "country": "Nigeria"}, {"name": "Janet Chemtai", "title": "Director for Human Capacity Development, YANGG Kenya"}]'::jsonb,
  '["Broadcast live on Zoom and Facebook", "Real-world entrepreneurial experiences shared", "Focus on innovation as tool for empowerment and job creation"]'::jsonb,
  'Inspired and equipped Africa''s next generation with mindset, tools, and networks for meaningful change through entrepreneurship.',
  NULL,
  NOW(),
  NOW()
),

-- Event 8: International Women's Day 2021
(
  'international-womens-day-2021',
  'Global Conversation Celebrating International Women''s Day',
  'Celebrating Women''s Achievements',
  'Virtual dialogue celebrating women''s contributions and fostering inclusive conversation on gender equity.',
  'In recognition of International Women''s Day, YANGG hosted a powerful virtual dialogue on March 8th at 3:30 PM (GMT+1) via Zoom, bringing together youth leaders and advocates to celebrate women''s achievements.',
  'March 8, 2021',
  'Virtual (Zoom)',
  'conference',
  'completed',
  '/src/assets/gallery/8.jpg',
  '["Celebrate contributions of women in leadership and innovation", "Provide platform for gender-sensitive dialogue", "Inspire young women to take up leadership roles", "Promote inclusive partnerships for SDG 5 – Gender Equality"]'::jsonb,
  '[{"name": "Ibeawuchi Collins", "title": "Global President, YANGG", "role": "Host"}, {"name": "Kelechi Ndiezue", "title": "International Director of Programmes", "role": "Moderator"}, {"name": "Ruth Asiimwe", "title": "Executive Director, Uganda Youth Network", "role": "Guest Speaker"}]'::jsonb,
  NULL,
  'Reaffirmed YANGG''s commitment to gender equality. Strengthened network of regional youth advocates for inclusive governance.',
  NULL,
  NOW(),
  NOW()
),

-- Event 9: She Leads African Identity 2020
(
  'she-leads-african-identity-2020',
  'African Youth Summit 4.0 – She Leads: Women & The African Identity',
  'Women & The African Identity',
  'She Leads Series dialogue amplifying women''s voices on identity, leadership, and representation.',
  'YANGG hosted African Youth Summit 4.0 under the theme "Women & The African Identity" on August 28th, 2020. This She Leads Series event addressed systemic challenges women face regarding identity and leadership.',
  'August 28, 2020',
  'Virtual (Zoom & Facebook)',
  'conference',
  'completed',
  '/src/assets/gallery/9.jpg',
  '["Create platform for discourse on African women''s experiences", "Highlight intersection of gender, culture, and leadership", "Equip young African women with knowledge and motivation", "Challenge harmful cultural stereotypes"]'::jsonb,
  '[{"name": "Ibeawuchi Collins Ugochukwu", "title": "Global President, YANGG", "role": "Host"}, {"name": "Imane Mouhtji", "title": "Vice President, JCI Montreal", "country": "Canada"}, {"name": "Divine Chineecherem", "title": "Coordinator, Dare Women for Change", "country": "Nigeria"}, {"name": "Ogechukwu Egwutu", "title": "YANGG Nigeria National Coordinator"}, {"name": "Mwiza Muwowo", "title": "YANGG Zambia National Coordinator"}, {"name": "Loteleni Kauko Shikulo", "title": "Community Development Director, YANGG Namibia"}, {"name": "Ifunanya Juliet Otih", "title": "Creative Writer & CEO, SilentScream", "country": "Nigeria"}]'::jsonb,
  NULL,
  'Catalyzed new partnerships with women-focused organizations. Increased young women participation in YANGG programming.',
  NULL,
  NOW(),
  NOW()
),

-- Event 10: She Leads Summit 2020
(
  'she-leads-summit-2020',
  'African Leadership Summit 0.2 – She Leads Series',
  'She Leads...',
  'Leadership summit amplifying women''s leadership and governance across Africa and diaspora.',
  'YANGG hosted the African Leadership Summit 0.2 on July 3rd, 2020, under the theme "She Leads..." as part of the acclaimed She Leads Series dedicated to amplifying women''s leadership.',
  'July 3, 2020',
  'Virtual (Zoom)',
  'conference',
  'completed',
  '/src/assets/gallery/10.jpg',
  '["Explore impact of women''s leadership in Africa''s development", "Showcase young female trailblazers in business and policy", "Initiate dialogue on inclusive governance and gender equality", "Encourage pan-African solidarity among emerging leaders"]'::jsonb,
  '[{"name": "Emma Ochieng", "title": "Founder, EYS Kenya", "country": "Kenya"}, {"name": "Ugbad Nour Abdilahi", "title": "Entrepreneur", "country": "Malaysia"}, {"name": "Janet Chemtiei", "title": "International Director of Management, YANGG"}, {"name": "Adja Souadou Mane", "title": "Global Vice President, YANGG", "country": "Senegal"}]'::jsonb,
  NULL,
  'Advanced gender equality in leadership platforms. Established collaborations across Africa and diaspora. Fostered culture of inclusive governance.',
  NULL,
  NOW(),
  NOW()
),

-- Event 11: International Youth Day Gambia 2020
(
  'international-youth-day-gambia-2020',
  'International Youth Day 2020 Virtual Summit',
  'Youth Engagement for Global Action',
  'YANGG Gambia summit amplifying youth voice in national development and global action.',
  'In commemoration of International Youth Day 2020, YANGG Gambia Chapter convened a high-level virtual summit on August 12, 2020, aimed at amplifying the voice of African youth in national development.',
  'August 12, 2020',
  'Virtual (Zoom)',
  'conference',
  'completed',
  '/src/assets/gallery/11.jpg',
  '["Promote youth-centered dialogue on sustainable development", "Identify policy gaps limiting youth participation", "Foster collaborative action between communities and educators", "Advocate for investments in education and employment"]'::jsonb,
  '[{"name": "Fatou Camara", "title": "CEO/Founder, Fatou Network", "topic": "Role of Youths in National Development"}, {"name": "Fatumatta Camara", "title": "Founder/President, Think Africa", "topic": "Importance of Youths in TVET"}, {"name": "Dr. Ismaila Ceesay", "title": "Lecturer, University of The Gambia", "topic": "Youth Participation in Decision-Making"}]'::jsonb,
  NULL,
  'Aligned with SDG 4, 8, 16, and 17. Reinforced principle that young people are key architects of Africa''s future.',
  NULL,
  NOW(),
  NOW()
),

-- Event 12: Advancing Social Change SDGs
(
  'advancing-social-change-sdgs',
  'Virtual Education Series: Advancing Social Change through SDGs',
  'Advancing Social Change through SDG Implementation',
  'Two-day workshop educating youth on practical SDG implementation and social change strategies.',
  'YANGG hosted a two-day virtual workshop designed to educate and engage young people on the practical implementation of the United Nations Sustainable Development Goals.',
  'Two-day workshop',
  'Virtual',
  'workshop',
  'completed',
  '/src/assets/gallery/12.jpg',
  '["Demystify the 17 SDGs and highlight relevance to young Africans", "Provide platform for peer-led knowledge sharing", "Explore innovative ways youth can contribute to social progress", "Empower attendees with advocacy models aligning local action with global agendas"]'::jsonb,
  '[{"name": "Rugare Rodney", "title": "Youth Leader & SDG Advocate", "country": "Zimbabwe"}, {"name": "Uwakwe Henry Ikechukwu", "title": "Youth Educator & Policy Enthusiast", "country": "Nigeria"}, {"name": "Kelechi Ndienze", "title": "International Director of Programs, YANGG"}]'::jsonb,
  NULL,
  'Equipped youth with SDG literacy. Encouraged civic innovation in education, health, and climate action. Laid groundwork for national SDG action plans.',
  NULL,
  NOW(),
  NOW()
),

-- Event 13: Leadership in Crisis 2020
(
  'leadership-in-crisis-2020',
  'Virtual Leadership Training: Leadership in Times of Crisis',
  'Leadership in Times of Crisis',
  'Training session guiding youth through crisis leadership during COVID-19 pandemic.',
  'In response to the COVID-19 pandemic, YANGG organized a virtual leadership training on May 13th, 2020, titled "Leadership in Times of Crisis" to support young people through uncertain circumstances.',
  'May 13, 2020',
  'Virtual (Zoom)',
  'training',
  'completed',
  '/src/assets/gallery/13.jpg',
  '["Explore authentic and ethical leadership during crises", "Examine how overconfidence can intensify crises", "Provide tools for resilience during disruptions", "Encourage adaptive leadership aligned with SDG 16"]'::jsonb,
  NULL,
  NULL,
  'Created safe virtual space during lockdowns. Strengthened youth capacities in critical thinking and emotional intelligence. Reinforced leadership as service.',
  NULL,
  NOW(),
  NOW()
),

-- Event 14: End Infibulation Campaign
(
  'end-infibulation-campaign',
  'Online Campaign Against Infibulation Practices',
  '#EndInfibulation_Africa',
  'Five-month digital advocacy campaign against Female Genital Mutilation across Africa.',
  'YANGG launched a five-month continent-wide digital advocacy campaign titled "Online Campaign Against Infibulation Practices" to raise awareness and challenge harmful traditional practices.',
  '5-month campaign',
  'Online (Pan-African)',
  'campaign',
  'completed',
  '/src/assets/gallery/14.jpg',
  '["Educate and inform about dangers of infibulation", "Mobilize youth leaders for community conversations", "Amplify survivor voices", "Influence policy and practice"]'::jsonb,
  NULL,
  NULL,
  'Over 220,000 users reached. Engaged 3,000+ youth leaders. Stimulated local and international dialogue on human rights and public health.',
  NULL,
  NOW(),
  NOW()
);

-- Verify the insert
SELECT COUNT(*) as total_events FROM events;
SELECT id, title, category, status FROM events ORDER BY created_at DESC;
