import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      brand: 'Humanova',
      nav: {
        home: 'Home',
        opportunities: 'Opportunities',
        support: 'Accessibility Support',
        dashboard: 'Dashboard',
        profile: 'Profile',
        login: 'Log in',
        register: 'Sign up'
      },
      hero: {
        title: 'Where volunteering, training, and accessibility meet.',
        subtitle:
          'Humanova connects students, volunteers, charities, companies, and universities in one inclusive ecosystem.',
        ctaPrimary: 'Explore opportunities',
        ctaSecondary: 'Watch how it works'
      }
    }
  },
  ar: {
    translation: {
      brand: 'هيومانوفا',
      nav: {
        home: 'الرئيسية',
        opportunities: 'الفرص',
        support: 'دعم الوصول',
        dashboard: 'لوحة التحكم',
        profile: 'الملف الشخصي',
        login: 'تسجيل الدخول',
        register: 'إنشاء حساب'
      },
      hero: {
        title: 'منصة توحد التطوع والتدريب ودعم ذوي الإعاقة.',
        subtitle:
          'هيومانوفا تربط الطلبة والمتطوعين والجمعيات والشركات والجامعات في منظومة واحدة شاملة.',
        ctaPrimary: 'استكشف الفرص',
        ctaSecondary: 'شاهد كيف تعمل المنصة'
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'ar'],
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
