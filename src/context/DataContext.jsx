import { createContext, useContext, useState } from 'react';

const INITIAL = {
  hero: {
    photo: '/mansouri.webp',
    eyebrow: 'Architecture · Research · Education',
    nameFirst: 'Ahmed',
    nameLast: 'Mansouri',
    role: 'Doctor of Engineering in Architecture',
    bio: 'Architect, researcher, and educator dedicated to the intersection of spatial theory, sustainable design, and architectural pedagogy.',
    stats: [
      { id: 1, num: '20+', label: 'Years of Practice' },
      { id: 2, num: '40+', label: 'Publications' },
      { id: 3, num: '15+', label: 'Design Projects' },
      { id: 4, num: '500+', label: 'Students Mentored' },
    ],
    primaryBtn: { text: 'View Research', href: '/research' },
    ghostBtn: { text: 'Get in Touch', href: '/contact' },
  },
  about: {
    education: [
      { id: 1, degree: 'Doctor of Engineering', field: 'Architecture', institution: 'University of Architecture', year: '2005' },
      { id: 2, degree: 'Master of Science', field: 'Architectural Design', institution: 'National School of Architecture', year: '2001' },
      { id: 3, degree: 'Bachelor of Architecture', field: 'Architecture', institution: 'National School of Architecture', year: '1999' },
    ],
    positions: [
      { id: 1, role: 'Full Professor', org: 'Department of Architecture', period: '2015 – Present' },
      { id: 2, role: 'Associate Professor', org: 'Department of Architecture', period: '2010 – 2015' },
      { id: 3, role: 'Assistant Professor', org: 'Department of Architecture', period: '2006 – 2010' },
      { id: 4, role: 'Visiting Researcher', org: 'European Institute of Urbanism', period: '2008 – 2009' },
    ],
    skills: [
      'Architectural Theory', 'Sustainable Design', 'Urban Planning',
      'BIM / Revit', 'AutoCAD', 'Rhino 3D', 'Parametric Design',
      'Research Methodology', 'Academic Writing', 'Studio Pedagogy',
    ],
  },
  research: [
    { id: 1, year: '2024', title: 'Spatial Cognition and the Architecture of Memory: A Phenomenological Approach', journal: 'Journal of Architectural Theory and Criticism', tags: ['Theory', 'Phenomenology'], abstract: 'This paper explores the relationship between spatial design and human memory formation, drawing on phenomenological frameworks to argue for architecture as a mnemonic apparatus.', doi: '#' },
    { id: 2, year: '2023', title: 'Bioclimatic Strategies in Contemporary North African Vernacular Architecture', journal: 'Sustainable Architecture Review', tags: ['Sustainability', 'Vernacular'], abstract: 'An investigation of passive cooling and ventilation techniques embedded in traditional North African building typologies, evaluated through thermal simulation and field observation.', doi: '#' },
    { id: 3, year: '2022', title: 'Parametric Morphology and Structural Efficiency in Doubly-Curved Shell Structures', journal: 'Architectural Science Review', tags: ['Parametric', 'Structures'], abstract: 'This study applies parametric generative methods to optimize the geometry of shell structures, balancing aesthetic expression with material efficiency.', doi: '#' },
    { id: 4, year: '2021', title: 'The Public Void: Rethinking Urban Plazas as Negotiated Space', journal: 'Urban Design International', tags: ['Urban', 'Public Space'], abstract: 'An ethnographic and spatial analysis of urban plazas across Mediterranean cities, examining how design conditions shape social negotiation and inclusive use.', doi: '#' },
    { id: 5, year: '2020', title: 'Toward a Tectonic Ethics: Material Honesty in Post-Digital Architecture', journal: 'Nexus Network Journal', tags: ['Theory', 'Digital'], abstract: 'A critical essay arguing for material honesty as an ethical imperative in architecture that increasingly relies on digital fabrication and surface simulation.', doi: '#' },
    { id: 6, year: '2019', title: 'Heritage Conservation and Adaptive Reuse: A Case Study Framework', journal: 'Historic Environment: Policy & Practice', tags: ['Heritage', 'Conservation'], abstract: 'Proposes a decision-support framework for adaptive reuse of heritage buildings, tested against five case studies across Algeria and Tunisia.', doi: '#' },
  ],
  designs: [
    { id: 1, title: 'Cultural Center — Algiers', type: 'Cultural', year: '2022', area: '12,400 m²', status: 'Built', desc: 'A monolithic concrete structure articulated by light wells and vaulted promenades, set against the Mediterranean hillside.', aspect: 'wide', image: null },
    { id: 2, title: 'Desert Research Station — Tamanrasset', type: 'Research', year: '2021', area: '3,200 m²', status: 'Built', desc: 'Low-profile rammed-earth compound integrating passive ventilation and solar shading derived from Saharan vernacular models.', aspect: 'tall', image: null },
    { id: 3, title: 'Waterfront Promenade — Annaba', type: 'Urban', year: '2020', area: '—', status: 'Realized', desc: 'An urban edge redefined by canopy structures, reflecting pools, and granite paving that mediates between the city grid and sea.', aspect: 'wide', image: null },
    { id: 4, title: 'School of Architecture — Tlemcen', type: 'Educational', year: '2018', area: '8,600 m²', status: 'Built', desc: 'Layered terraced volumes carved from the hillside topography; studios oriented toward the Medina skyline.', aspect: 'normal', image: null },
    { id: 5, title: 'Memorial Garden — Constantine', type: 'Cultural', year: '2017', area: '—', status: 'Competition', desc: 'A landscaped void carved into rocky terrain, where silence, erosion, and inscription form the material language of commemoration.', aspect: 'normal', image: null },
    { id: 6, title: 'Eco-Housing Prototype', type: 'Residential', year: '2016', area: '180 m²', status: 'Prototype', desc: 'A net-zero dwelling demonstrating bioclimatic principles through earthen walls, green roof, and roof-integrated water harvesting.', aspect: 'normal', image: null },
  ],
  videos: [
    { id: 1, title: 'Architecture as Memory: A Public Lecture', duration: '52:14', type: 'Lecture', year: '2024', venue: 'National School of Architecture', desc: 'Keynote address exploring how architecture encodes collective and individual memory through spatial organization and material choice.', thumb: null, videoKey: null, ytbLink: null },
    { id: 2, title: 'Sustainable Design in the Maghreb Context', duration: '38:40', type: 'Conference', year: '2023', venue: 'EARC Symposium, Tunis', desc: 'Paper presentation at the Euro-African Regional Conference on climate-responsive architecture informed by vernacular tradition.', thumb: null, videoKey: null, ytbLink: null },
    { id: 3, title: 'Parametric Tools in Studio Education', duration: '44:20', type: 'Workshop', year: '2023', venue: 'Department of Architecture', desc: 'A recorded workshop introducing Grasshopper and Rhino to third-year architecture students, with live modeling exercises.', thumb: null, videoKey: null, ytbLink: null },
    { id: 4, title: 'Desert Vernacular: Field Recording', duration: '18:05', type: 'Documentary', year: '2022', venue: 'Tamanrasset, Algeria', desc: 'A short documentary following a research field trip documenting Saharan ksour architecture and earthen construction techniques.', thumb: null, videoKey: null, ytbLink: null },
    { id: 5, title: 'Heritage and Modernity: Panel Discussion', duration: '1:24:10', type: 'Panel', year: '2022', venue: 'University of Architecture — International Forum', desc: 'A moderated panel addressing the tension between heritage conservation and the imperatives of contemporary urban development.', thumb: null, videoKey: null, ytbLink: null },
    { id: 6, title: 'Tectonic Ethics in the Post-Digital Age', duration: '29:55', type: 'Lecture', year: '2021', venue: 'Architecture Review Podcast', desc: 'A recorded podcast episode discussing material authenticity, craft, and the ethical dimensions of computational design.', thumb: null, videoKey: null, ytbLink: null },
  ],
  teaching: {
    courses: [
      { id: 1, code: 'ARCH 301', title: 'Architectural Theory & Criticism', level: 'Undergraduate · Year 3', semester: 'Both semesters', desc: 'Survey of architectural thought from the Enlightenment to contemporary discourse. Emphasis on close reading and critical writing.', materials: ['Lecture slides', 'Reading list', 'Essay prompts'] },
      { id: 2, code: 'ARCH 502', title: 'Advanced Design Studio', level: 'Graduate · Year 1', semester: 'Autumn', desc: 'Complex mixed-use design project integrating urban context, programmatic innovation, and tectonic expression. Individual and team work.', materials: ['Studio briefs', 'Reference sheets', 'Assessment criteria'] },
      { id: 3, code: 'ARCH 410', title: 'Sustainable & Bioclimatic Design', level: 'Undergraduate · Year 4', semester: 'Spring', desc: 'Passive design strategies, energy simulation methods, and daylighting analysis applied to Mediterranean and arid climatic zones.', materials: ['Technical handouts', 'Simulation tutorials', 'Case studies'] },
      { id: 4, code: 'ARCH 610', title: 'Heritage Conservation & Adaptive Reuse', level: 'Graduate · Year 2', semester: 'Spring', desc: 'Principles of heritage conservation, survey methods, and design approaches for adapting historic structures to contemporary use.', materials: ['Lecture notes', 'Survey manual', 'Design guidelines'] },
      { id: 5, code: 'ARCH 220', title: 'Architectural History I', level: 'Undergraduate · Year 2', semester: 'Autumn', desc: 'From ancient civilizations through the Renaissance: building technology, spatial concepts, and cultural context across traditions.', materials: ['Image bank', 'Timeline', 'Exam guides'] },
      { id: 6, code: 'ARCH 705', title: 'Research Methods in Architecture', level: 'Graduate · Doctoral', semester: 'Autumn', desc: 'Qualitative and quantitative methodologies for architectural research, including case study design, ethnography, and simulation.', materials: ['Methodology guide', 'Academic writing workshop', 'Bibliography templates'] },
    ],
    theses: [
      { id: 1, title: 'Thermal Performance of Earth Architecture in Semi-Arid Zones', student: 'M. Benali', year: '2024', level: 'PhD' },
      { id: 2, title: 'Urban Vacancy as Resource: Regeneration of Post-Industrial Sites', student: 'L. Hamdane', year: '2023', level: 'PhD' },
      { id: 3, title: "Spatial Narratives in Children's Educational Environments", student: 'S. Ferhat', year: '2023', level: 'Master' },
      { id: 4, title: 'Computational Form-Finding for Shell Structures', student: 'R. Bouzid', year: '2022', level: 'Master' },
    ],
  },
  societies: [
    { id: 1, name: 'Union of Arab Architects', role: 'Member', since: '2010', country: 'Regional', logo: null },
    { id: 2, name: 'Algerian Order of Architects', role: 'Registered Member', since: '2006', country: 'Algeria', logo: null },
    { id: 3, name: 'Docomomo International', role: 'Corresponding Member', since: '2015', country: 'International', logo: null },
    { id: 4, name: 'Architectural Research Centers Consortium', role: 'Associate Member', since: '2018', country: 'International', logo: null },
  ],
  social: [
    { id: 1, platform: 'YouTube', label: 'YouTube Channel 1', url: '' },
    { id: 2, platform: 'YouTube', label: 'YouTube Channel 2', url: '' },
    { id: 3, platform: 'YouTube', label: 'YouTube Channel 3', url: '' },
    { id: 4, platform: 'Facebook', label: 'Facebook Page 1', url: '' },
    { id: 5, platform: 'Facebook', label: 'Facebook Page 2', url: '' },
    { id: 6, platform: 'Facebook', label: 'Facebook Page 3', url: '' },
    { id: 7, platform: 'X', label: 'X / Twitter', url: '' },
    { id: 8, platform: 'ResearchGate', label: 'ResearchGate', url: '' },
    { id: 9, platform: 'Academia', label: 'Academia.edu', url: '' },
    { id: 10, platform: 'Email', label: 'Email', url: '' },
    { id: 11, platform: 'ORCID', label: 'ORCID', url: '' },
  ],
  contact: {
    items: [
      { id: 1, label: 'Email', value: 'a.mansouri@university.dz' },
      { id: 2, label: 'Office', value: 'Faculty of Architecture, Room 214' },
      { id: 3, label: 'Office Hours', value: 'Mon & Wed, 10:00–12:00' },
      { id: 4, label: 'ResearchGate', value: 'researchgate.net/profile/…' },
      { id: 5, label: 'Google Scholar', value: 'scholar.google.com/…' },
    ],
  },
  footer: {
    name: 'Ahmed Mansouri',
    role: 'Dr.Eng · Architecture',
  },
};

function load() {
  try {
    const stored = localStorage.getItem('am_site_data');
    if (!stored) return INITIAL;
    const parsed = JSON.parse(stored);
    // Shallow merge ensures new top-level keys (societies, social) are present
    return { ...INITIAL, ...parsed };
  } catch {
    return INITIAL;
  }
}

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(load);

  function update(patch) {
    setData((prev) => {
      const next = { ...prev, ...patch };
      try {
        localStorage.setItem('am_site_data', JSON.stringify(next));
      } catch (e) {
        if (e.name === 'QuotaExceededError') {
          alert('Storage full: the image could not be saved. Try uploading a smaller file.');
          return prev;
        }
        throw e;
      }
      return next;
    });
  }

  function reset() {
    localStorage.removeItem('am_site_data');
    setData(INITIAL);
  }

  return (
    <DataContext.Provider value={{ data, update, reset }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
