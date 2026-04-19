import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "nav_home": "Home",
      "nav_about": "About",
      "nav_services": "Services",
      "nav_projects": "Projects",
      "nav_blog": "Knowledge",
      "nav_tech_stack": "Tech Stack",
      "nav_contact": "Contact Me",
      "nav_terminal": "Terminal",
      "nav_guestbook": "Guestbook",
      "hero_hi": "Hi! I'm Rajendra Chaudhary",
      "hero_title": "Full Stack Developer",
      "hero_desc": "I build robust, high-performance web applications using the MERN stack and DevOps best practices.",
      "btn_resume": "Download Resume",
      "btn_hire_me": "Hire Me",
      "btn_get_resume": "Get Resume",
      "footer_handcrafted": "Handcrafted with",
      "terminal_welcome": "Welcome to Rajendra's Interactive Terminal. Type 'help' for commands.",
      "guestbook_title": "Sign My Guestbook",
      "guestbook_placeholder": "Leave a message...",
      "guestbook_btn": "Sign Guestbook"
    }
  },
  ne: {
    translation: {
      "nav_home": "गृहपृष्ठ",
      "nav_about": "बारेमा",
      "nav_services": "सेवाहरू",
      "nav_projects": "परियोजनाहरू",
      "nav_blog": "ब्लग",
      "nav_tech_stack": "प्रविधि",
      "nav_contact": "सम्पर्क",
      "nav_terminal": "टर्मिनल",
      "nav_guestbook": "अतिथि पुस्तिका",
      "hero_hi": "नमस्ते! म राजेन्द्र चौधरी",
      "hero_title": "फुल स्ट्याक विकासकर्ता",
      "hero_desc": "म MERN स्ट्याक र DevOps अभ्यासहरू प्रयोग गरेर बलियो वेब अनुप्रयोगहरू निर्माण गर्छु।",
      "btn_resume": "बायोडाटा डाउनलोड गर्नुहोस्",
      "btn_hire_me": "मलाई नियुक्त गर्नुहोस्",
      "btn_get_resume": "बायोडाटा लिनुहोस्",
      "footer_handcrafted": "हातले बनाइएको",
      "terminal_welcome": "राजेन्द्रको अन्तरक्रियात्मक टर्मिनलमा स्वागत छ। आदेशहरूको लागि 'help' टाइप गर्नुहोस्।",
      "guestbook_title": "मेरो अतिथि पुस्तिकामा हस्ताक्षर गर्नुहोस्",
      "guestbook_placeholder": "सन्देश छोड्नुहोस्...",
      "guestbook_btn": "हंसाक्षर गर्नुहोस्"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
