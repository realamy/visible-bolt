export type LanguageCode = 'en' | 'fr' | 'ar';

interface CategoryTranslation {
  [key in LanguageCode]: string;
}

export interface ServiceCategory {
  id: string;
  icon?: string;
  translations: CategoryTranslation;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'plumbing',
    translations: {
      en: 'Plumbing',
      fr: 'Plomberie',
      ar: 'السباكة'
    }
  },
  {
    id: 'electrical',
    translations: {
      en: 'Electrical Work',
      fr: 'Travaux Électriques',
      ar: 'أعمال كهربائية'
    }
  },
  {
    id: 'painting',
    translations: {
      en: 'Painting',
      fr: 'Peinture',
      ar: 'دهان'
    }
  },
  {
    id: 'carpentry',
    translations: {
      en: 'Carpentry',
      fr: 'Menuiserie',
      ar: 'نجارة'
    }
  },
  {
    id: 'renovation',
    translations: {
      en: 'Home Renovation',
      fr: 'Rénovation',
      ar: 'تجديد المنازل'
    }
  },
  {
    id: 'cleaning',
    translations: {
      en: 'Cleaning',
      fr: 'Nettoyage',
      ar: 'تنظيف'
    }
  },
  {
    id: 'moving',
    translations: {
      en: 'Moving Services',
      fr: 'Déménagement',
      ar: 'خدمات النقل'
    }
  },
  {
    id: 'gardening',
    translations: {
      en: 'Gardening',
      fr: 'Jardinage',
      ar: 'بستنة'
    }
  },
  {
    id: 'hvac',
    translations: {
      en: 'HVAC',
      fr: 'Climatisation',
      ar: 'تكييف'
    }
  },
  {
    id: 'appliance',
    translations: {
      en: 'Appliance Repair',
      fr: 'Réparation d\'Appareils',
      ar: 'إصلاح الأجهزة'
    }
  },
  {
    id: 'masonry',
    translations: {
      en: 'Masonry',
      fr: 'Maçonnerie',
      ar: 'بناء'
    }
  },
  {
    id: 'tiling',
    translations: {
      en: 'Tiling',
      fr: 'Carrelage',
      ar: 'تبليط'
    }
  },
  {
    id: 'roofing',
    translations: {
      en: 'Roofing',
      fr: 'Toiture',
      ar: 'تسقيف'
    }
  },
  {
    id: 'security',
    translations: {
      en: 'Security Systems',
      fr: 'Systèmes de Sécurité',
      ar: 'أنظمة الأمان'
    }
  },
  {
    id: 'interior',
    translations: {
      en: 'Interior Design',
      fr: 'Design d\'Intérieur',
      ar: 'تصميم داخلي'
    }
  }
];
