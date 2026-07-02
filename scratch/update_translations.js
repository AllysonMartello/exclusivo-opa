const fs = require('fs');

const en = {
  header: {
    nav: {
      house: "The House",
      experience: "Ready to Live",
      tour: "Virtual Tour",
    },
    cta: "Schedule Visit",
    toggleMenu: "Toggle menu",
    languageLabel: "Language",
  },
  hero: {
    eyebrow: "Engenho D’Água, Ilhabela",
    title: "Sophistication and stunning views at Engenho D’Água",
    subtitle: "A contemporary house at Engenho D’Água, ready to experience Ilhabela from day one.",
    primaryCta: "I want to see this house",
    secondaryCta: "Talk to OPA",
    imageAlt: "Front facade sea view",
  },
  zoom: {
    altSala: "Integrated living room",
    altPiscina: "Outdoor area with pool",
    altSuite: "Master suite",
    altQuartoEscritorio: "Bedroom / office",
    altCozinha: "Gourmet kitchen",
    altBanheiro: "Double bathroom",
    altQuartoVista: "Bedroom with external view",
  },
  location: {
    eyebrow: "Engenho D’Água, Ilhabela",
    title: "Engenho D’Água, Ilhabela/SP",
    paragraphs: [
      "Engenho D’Água is one of Ilhabela's most desired areas, combining beach, access, services, and a lifestyle close to the sea.",
      "This house is located at the beginning of the neighborhood, close to the city level.",
      "You barely have to go uphill.",
      "But you already get a wide view of the center, the aviation field, Saco da Capela pier, and the channel.",
      "In Ilhabela, this matters.",
      "Because many houses have a view, but charge for it in accessibility. Here, the house delivers the view without complicating the routine.",
    ],
    highlight: "The view is not just a detail. It is part of the routine.",
    paragraphFinal: "",
    aroundTitle: "Nearby",
    coordinatesLabel: "Coordinates",
    mapAlt: "Map of Engenho D’Água, Ilhabela",
    openInMaps: "Open in Google Maps",
    items: [
      { label: "Engenho D’Água Beach" },
      { label: "Ilhabela Village" },
      { label: "Downtown" },
      { label: "Saco da Capela" },
      { label: "Main Avenue" },
      { label: "Restaurants, services, and shops" },
      { label: "Water sports, beach tennis, and beach routine" },
    ],
  },
  theHouse: {
    galleryTitle: "New, clean, and functional architecture",
    galleryDescription: "A newly built house with a contemporary language and integrated spaces.",
    differentialsEyebrow: "What the house delivers in practice",
    differentialsTitle: "Differentials",
    video: {
      title: "See the house in motion",
      desc: "Light, sea, architecture, and routine in a few minutes.",
    },
    media: [
      { title: "Arrival", desc: "The facade preserves privacy, revealing little to the street." },
      { title: "Integrated social area", desc: "No visual barriers. You can cook and stay in the conversation." },
      { title: "Outdoor area", desc: "A space with a pool and open sea views." },
      { title: "Island kitchen", desc: "Integrates with the house and brings people together." },
      { title: "Suite with a view", desc: "Comfort, privacy, and landscape in one place." },
      { title: "Balcony, pool, and sea", desc: "The breathing point of the house." },
    ],
    details: [
      "New house, built from scratch",
      "Contemporary architecture",
      "Wide sea view",
      "Located at the beginning of Engenho D’Água",
      "Easier access than higher houses",
      "Integrated environments",
      "Master suite on the main floor",
      "3 suites on the lower floor",
      "Independent and air-conditioned gourmet area",
      "Fully air-conditioned house",
      "Lighting design",
      "Automated shutters",
      "Pool",
      "BBQ Grill",
      "Bathtub",
      "Furnished",
      "Turn-key delivery",
      "Electric car charger",
      "Electric bike charger",
      "Regularized deed",
    ],
  },
  experience: {
    eyebrow: "Experience",
    title: "What it's like to live here",
    items: [
      {
        time: "Morning",
        title: "Routine starts on the main floor",
        desc: "Coffee, living room, kitchen, master suite, and channel view.\n\nEverything is close.\n\nEverything is simple.",
      },
      {
        time: "Afternoon",
        title: "The house opens to the pool and balcony",
        desc: "It's the time to host, move around, and use the house informally.",
      },
      {
        time: "Night",
        title: "The view changes",
        desc: "The center lights up, the channel gets busy. Practicality on the main floor, privacy in the lower suites.",
      },
    ],
    quote: "The view is not a detail. It is part of the routine.",
  },
  forWho: {
    eyebrow: "Who it makes sense for",
    title: "Who it makes sense for",
    intro: "",
    profiles: [
      {
        text: "The main floor master suite allows simple use even without guests.",
        tag: "For couples",
      },
      {
        text: "The independent gourmet area allows hosting without mixing with the private area.",
        tag: "For those who host",
      },
      {
        text: "For those who prefer contemporary lines, integrated environments, and a cleaner aesthetic.",
        tag: "For architecture lovers",
      },
      {
        text: "Delivers horizon and sea, but stays close to the city level.",
        tag: "For views without isolation",
      },
    ],
    selectedLabel: "For me",
    unselectedLabel: "Click here if this is you",
    quote: "",
    cta: "I want to schedule a visit",
  },
  virtualTour: {
    title: "Enter the house before visiting",
    previewAlt: "Virtual tour preview",
    features: [
      "Understand the floor plan",
      "See how spaces connect",
      "Evaluate the view from each space",
      "Notice the privacy of the suites",
      "Get to know the house before the physical visit",
    ],
    button: "Access virtual tour",
  },
  technicalSpecs: {
    title: "Technical Specs",
    specs: [
      { label: "Code", value: "CA006944" },
      { label: "Type", value: "House" },
      { label: "Neighborhood", value: "Engenho D’Água" },
      { label: "City", value: "Ilhabela/SP" },
      { label: "Built Area", value: "376 m²" },
      { label: "Land Area", value: "1.131 m²" },
      { label: "Suites", value: "4" },
      { label: "Bathrooms", value: "4" },
      { label: "Parking", value: "2" },
      { label: "Condition", value: "Brand new, recently built" },
      { label: "Delivery", value: "Furnished and turn-key" },
      { label: "Documentation", value: "Regularized deed" },
      { label: "Property Tax (IPTU)", value: "R$ 10.963,00 yearly" },
      { label: "Sale Price", value: "R$ 8.500.000,00" },
    ],
    priceFooter: "",
  },
  theOPA: {
    eyebrow: "OPA Real Estate Curation",
    titleStart: "Ilhabela is not a",
    titleEnd: "simple market",
    paragraphs: [
      "Every neighborhood responds differently. Every house behaves differently over time. And not everything that appears in a photo defines the value of a property.",
      "When OPA presents a house, it has already gone through this technical reading based on usability and the real relationship with the sea. You are not looking at an ad. You are looking at curation.",
    ],
    badgeLabel: "Experience",
    badgeValue: "+20 years",
    logoAlt: "OPA Real Estate",
  },
  marcosView: {
    eyebrow: "Service with Marco",
    name: "Marco Henrique",
    role: "Architect · OPA Real Estate Curation",
    audioTitle: "Technical Analysis, Engenho D’Água",
    quote: "Marco Henrique conducts the visit with the eyes of someone who knows Ilhabela, architecture, and the market.\n\nThe idea is not to pressure a decision.\n\nIt is to understand if the house makes sense for your moment.\n\nBecause a good house is not good for everyone.\n\nIt needs to find the right person.",
    talkCta: "Talk to Marco",
    emailCta: "Send professional e-mail",
  },
  finalCTA: {
    title: "Want to know if this house makes sense for you?",
    subtitle: "Talk to OPA and schedule a visit peacefully.\n\nWe will present the house, explain the location, show the logic of the floor plan, and help you make a decision with more clarity.",
    button: "I want to talk about this house",
    footer: "Schedule visit",
  },
  footer: {
    description: "Curation of properties with soul, design, and purpose. Transforming the way you find your next retreat.",
    contactTitle: "Contact",
    quickLinksTitle: "Quick Links",
    quickLinks: ["The House", "Experience", "Virtual Tour", "Schedule Visit"],
    rights: "All rights reserved.",
  },
  cookieConsent: {
    title: "Privacy and Cookies",
    body: "We use cookies to improve your experience, analyze traffic, and personalize ads. Learn more in our",
    accept: "Accept all",
    reject: "Reject",
    policyLink: "Privacy Policy",
  },
  leadForm: {
    headerTitle: "Personalized Consulting",
    backLabel: "Back",
    continueLabel: "Continue",
    namePlaceholder: "Your full name",
    phonePlaceholder: "Phone / WhatsApp",
    emailPlaceholder: "Your best e-mail",
    emailPlaceholderOptional: "Your best e-mail (optional)",
    cityPlaceholder: "City you live in",
    submitLabel: "Finish and Send",
    submittingLabel: "Sending...",
    closeLabel: "Close",
    contactMethodEmail: "E-mail",
    errors: {
      name: "Enter your name",
      phone: "Invalid phone",
      email: "Invalid e-mail",
      emailRequired: "Enter your e-mail",
      city: "Enter your city",
      submit: "Could not send right now. Try again shortly or contact us via WhatsApp.",
    },
    successTitle: "Request Sent!",
    successBody: "Thank you for your interest. Marco Henrique will contact you shortly with the requested information.",
    emailSubject: "New Lead - Engenho D’Água",
    fieldLabels: {
      name: "Name",
      phone: "Phone",
      email: "E-mail",
      city: "City",
    },
    whatsappMessage: "Hello! I would like more information about the Engenho D’Água house in Ilhabela.",
    multiHint: "(Select what makes sense)",
    steps: [
      {
        question: "What are you looking for in Ilhabela?",
        options: ["Second home", "Family retreat", "Patrimonial investment", "Lifestyle change"],
      },
      {
        question: "What is most important for your family's experience in Ilhabela?",
        options: ["Privacy and tranquility", "Panoramic sea or nature view", "Sea access / nautical life", "Proximity to the Village and restaurants", "Integration with nature"],
      },
      {
        question: "Do you already know Ilhabela?",
        options: ["I have a house or visit frequently", "I have visited a few times", "It would be my first time"],
      },
      {
        question: "When could you make a physical visit to the house?",
        options: ["In the next few weeks", "Next month", "No set date yet"],
      },
      {
        question: "When do you intend to make a purchase decision?",
        options: ["I am ready to move forward now", "In the next 3 to 6 months", "Just studying the market"],
      },
      {
        question: "How do you prefer us to contact you?",
        options: ["WhatsApp", "Call", "E-mail"],
      },
      {
        question: "Almost there! What can we call you?",
        options: [],
      },
    ],
  },
  thankYou: {
    eyebrow: "Request received",
    title: "Congratulations on taking this important decision for your life, we will treat it with the same importance!",
    bodyLine1: "Soon, our team will get in touch with you.",
    bodyLine2: "If you prefer, you can talk directly to us right now.",
    whatsappCta: "Talk via WhatsApp",
    whatsappMessage: "Hello! I just filled out the Engenho D’Água form and would like to speak directly with you.",
    imageAlt: "Sea view, Engenho D’Água",
  },
};

const filepath = 'c:/Users/allys/OneDrive/Documentos/exclusivo-opa/app/engenho-CA006944/_i18n/translations.ts';
let content = fs.readFileSync(filepath, 'utf8');

// Convert `en` object to a string
const enString = `const en = ${JSON.stringify(en, null, 2)};`;

// Replace `export const translations = { pt, en: pt };`
content = content.replace(
  /export const translations: Record<Lang, Dictionary> = \{ pt, en: pt \};/,
  `${enString}\n\nexport const translations: Record<Lang, Dictionary> = { pt, en };`
);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Done mapping en in translations.ts!');
