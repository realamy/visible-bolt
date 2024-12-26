import { useState } from 'react'
import { 
  ArrowRight, 
  Star, 
  Globe, 
  Code, 
  Palette, 
  Users,
  Lock,
  CheckCircle2,
  ChevronRight,
  Heart,
  Wrench,
  Zap,
  Home as HomeIcon,
  User,
  Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { SearchSection } from '@/components/layout/SearchSection'
import { Badge } from '@/components/ui/badge'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '@/contexts/language-context'
import { LanguageCode } from '@/data/categories'

// Define base translation type
type CategoryTranslation = {
  title: string;
  description: string;
}

// Define category with translations
interface Category {
  id: number;
  translations: { [key in LanguageCode]: CategoryTranslation };
  icon: React.ElementType;
  count?: number;
  type?: string;
}

function Home() {
  const { t } = useTranslation()
  const { language, direction } = useLanguage()
  const [activeTab, setActiveTab] = useState('client')

  const popularCategories: Category[] = [
    // Digital Services
    {
      id: 1,
      translations: {
        en: {
          title: "Web Development",
          description: "Custom websites and web applications"
        },
        fr: {
          title: "Développement Web",
          description: "Sites web et applications web personnalisés"
        },
        ar: {
          title: "تطوير الويب",
          description: "مواقع وتطبيقات ويب مخصصة"
        }
      },
      icon: Code,
      count: 245,
      type: "digital"
    },
    {
      id: 2,
      translations: {
        en: {
          title: "Graphic Design",
          description: "Logos, branding, and visual identity"
        },
        fr: {
          title: "Design Graphique",
          description: "Logos, image de marque et identité visuelle"
        },
        ar: {
          title: "التصميم الجرافيكي",
          description: "الشعارات والعلامات التجارية والهوية البصرية"
        }
      },
      icon: Palette,
      count: 189,
      type: "digital"
    },
    // Home Services
    {
      id: 3,
      translations: {
        en: {
          title: "Plumbing",
          description: "Repairs, installations, and maintenance"
        },
        fr: {
          title: "Plomberie",
          description: "Réparations, installations et maintenance"
        },
        ar: {
          title: "السباكة",
          description: "إصلاحات وتركيبات وصيانة"
        }
      },
      icon: Wrench,
      count: 167,
      type: "home"
    },
    {
      id: 4,
      translations: {
        en: {
          title: "Electrical",
          description: "Wiring, fixtures, and repairs"
        },
        fr: {
          title: "Électricité",
          description: "Câblage, luminaires et réparations"
        },
        ar: {
          title: "الكهرباء",
          description: "الأسلاك والتركيبات والإصلاحات"
        }
      },
      icon: Zap,
      count: 134,
      type: "home"
    }
  ]

  const features = [
    {
      id: 1,
      translations: {
        en: {
          title: "Local Talent",
          description: "Connect with skilled Algerian professionals"
        },
        fr: {
          title: "Talents Locaux",
          description: "Connectez-vous avec des professionnels algériens qualifiés"
        },
        ar: {
          title: "المواهب المحلية",
          description: "تواصل مع المحترفين الجزائريين المهرة"
        }
      },
      icon: Users
    },
    {
      id: 2,
      translations: {
        en: {
          title: "Secure Payments",
          description: "Safe and reliable payment processing"
        },
        fr: {
          title: "Paiements Sécurisés",
          description: "Traitement des paiements sûr et fiable"
        },
        ar: {
          title: "مدفوعات آمنة",
          description: "معالجة آمنة وموثوقة للمدفوعات"
        }
      },
      icon: Lock
    },
    {
      id: 3,
      translations: {
        en: {
          title: "Quality Work",
          description: "Guaranteed satisfaction with every project"
        },
        fr: {
          title: "Travail de Qualité",
          description: "Satisfaction garantie pour chaque projet"
        },
        ar: {
          title: "عمل عالي الجودة",
          description: "رضا مضمون مع كل مشروع"
        }
      },
      icon: CheckCircle2
    }
  ]

  const topProfessionals = [
    {
      id: 1,
      name: "Sarah Ahmed",
      title: "Full Stack Developer",
      rating: 4.9,
      reviews: 127,
      image: "https://ui-avatars.com/api/?name=Sarah+Ahmed",
      badges: ["topRated", "quickResponse"],
      type: "digital"
    },
    {
      id: 2,
      name: "Ahmed Benali",
      title: "Master Plumber",
      rating: 4.8,
      reviews: 98,
      image: "https://ui-avatars.com/api/?name=Ahmed+Benali",
      badges: ["licensedPro"],
      type: "home"
    },
    {
      id: 3,
      name: "Amina Kadi",
      title: "UI/UX Designer",
      rating: 5.0,
      reviews: 156,
      image: "https://ui-avatars.com/api/?name=Amina+Kadi",
      badges: ["topRatedPlus"],
      type: "digital"
    }
  ]

  const translatedPopularCategories = popularCategories.map(category => ({
    ...category,
    title: category.translations[language].title,
    description: category.translations[language].description
  }))

  const translatedFeatures = features.map(feature => ({
    ...feature,
    title: feature.translations[language].title,
    description: feature.translations[language].description
  }))

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/5 dark:bg-primary/10">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-12 sm:py-16 lg:py-20">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {t('home.hero.title.start')}{' '}
                <span className="text-primary">{t('home.hero.title.highlight')}</span>
                <br />
                {t('home.hero.title.end')}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                {t('home.hero.subtitle')}
              </p>
            </div>
            
            <div className="mt-10">
              <SearchSection />
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                {t('home.hero.popular')}:
                {[
                  t('home.hero.popularservices.webdev'),
                  t('home.hero.popularservices.graphicdesign'),
                  t('home.hero.popularservices.plumbing'),
                  t('home.hero.popularservices.electrical')
                ].map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="border-y bg-muted/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold tracking-tight">{t('home.trust.title')}</h3>
            <p className="text-sm font-medium text-muted-foreground">
              {t('home.trust.subtitle')}
            </p>
          </div>
          
          <div className="mt-8 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-4">
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{t('home.trust.stats.professionals.value')}</p>
              <p className="text-sm text-muted-foreground text-center">{t('home.trust.stats.professionals.label')}</p>
            </div>
            
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{t('home.trust.stats.projects.value')}</p>
              <p className="text-sm text-muted-foreground text-center">{t('home.trust.stats.projects.label')}</p>
            </div>
            
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{t('home.trust.stats.rating.value')}</p>
              <p className="text-sm text-muted-foreground text-center">{t('home.trust.stats.rating.label')}</p>
            </div>
            
            <div className="col-span-1 flex flex-col items-center gap-2">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{t('home.trust.stats.coverage.value')}</p>
              <p className="text-sm text-muted-foreground text-center">{t('home.trust.stats.coverage.label')}</p>
            </div>
          </div>

          <div className="mt-12">
            <div className="text-center space-y-4 mb-8">
              <h4 className="text-xl font-semibold tracking-tight">{t('home.trust.media.title')}</h4>
              <p className="text-sm text-muted-foreground">
                {t('home.trust.media.subtitle')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
              {[
                {
                  name: t('home.trust.media.partners.echorouk.name'),
                  type: t('home.trust.media.partners.echorouk.type'),
                  reach: t('home.trust.media.partners.echorouk.reach')
                },
                {
                  name: t('home.trust.media.partners.elwatan.name'),
                  type: t('home.trust.media.partners.elwatan.type'),
                  reach: t('home.trust.media.partners.elwatan.reach')
                },
                {
                  name: t('home.trust.media.partners.liberte.name'),
                  type: t('home.trust.media.partners.liberte.type'),
                  reach: t('home.trust.media.partners.liberte.reach')
                },
                {
                  name: t('home.trust.media.partners.tsa.name'),
                  type: t('home.trust.media.partners.tsa.type'),
                  reach: t('home.trust.media.partners.tsa.reach')
                },
                {
                  name: t('home.trust.media.partners.elkhabar.name'),
                  type: t('home.trust.media.partners.elkhabar.type'),
                  reach: t('home.trust.media.partners.elkhabar.reach')
                },
                {
                  name: t('home.trust.media.partners.dzentreprise.name'),
                  type: t('home.trust.media.partners.dzentreprise.type'),
                  reach: t('home.trust.media.partners.dzentreprise.reach')
                }
              ].map((partner) => (
                <div
                  key={partner.name}
                  className="col-span-1 group"
                >
                  <div className="flex flex-col items-center space-y-2 p-4 rounded-lg hover:bg-muted transition-colors">
                    <span className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {partner.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {partner.type}
                    </span>
                    <span className="text-xs font-medium text-primary/80">
                      {partner.reach}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                {t('home.trust.media.viewall')}
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('home.categories.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.categories.subtitle')}
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
            {translatedPopularCategories.map((category) => (
              <Card
                key={category.id}
                className="group relative overflow-hidden transition-all hover:shadow-lg"
              >
                <CardHeader className="p-4 sm:p-6 space-y-0">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <category.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                    {category.type === "digital" ? (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Globe className="h-3 w-3" />
                        <span className="hidden sm:inline">{t('home.categories.types.digital')}</span>
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <HomeIcon className="h-3 w-3" />
                        <span className="hidden sm:inline">{t('home.categories.types.home')}</span>
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="mt-4 text-base font-semibold sm:text-lg">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {category.count}+ {t('home.categories.count')}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`group-hover:translate-x-${direction === 'rtl' ? '-1' : '1'} transition-transform ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
                    >
                      {category.type === "digital" ? t('home.categories.cta.digital') : t('home.categories.cta.home')} 
                      <ChevronRight className={`${direction === 'rtl' ? 'mr-1 rotate-180' : 'ml-1'} h-4 w-4`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('home.features.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.features.subtitle')}
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {translatedFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="group relative overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-6">
                  <div className="rounded-lg bg-primary/10 p-3 w-fit">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-20 bg-muted/50" dir={direction}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('home.howitworks.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('home.howitworks.subtitle')}
            </p>

            {/* Path Selection */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                variant="outline" 
                size="lg"
                className={`min-w-[200px] transition-colors ${activeTab === 'client' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                onClick={() => setActiveTab('client')}
              >
                <User className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t('home.howitworks.client')}
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className={`min-w-[200px] transition-colors ${activeTab === 'professional' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''}`}
                onClick={() => setActiveTab('professional')}
              >
                <Briefcase className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                {t('home.howitworks.professional')}
              </Button>
            </div>
          </div>

          <div className="mt-16">
            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                {['describe', 'compare', 'connect', 'complete'].map((step, index) => (
                  <div key={step} className="group relative">
                    <div className="absolute -inset-x-4 -inset-y-4 z-0 scale-95 bg-background opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl" />
                    <div className="relative z-10 p-6">
                      {/* Step Number */}
                      <div className={`absolute ${direction === 'rtl' ? '-right-4' : '-left-4'} -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-4 ring-background`}>
                        <span className="text-base font-bold">{index + 1}</span>
                      </div>

                      <div className={`${direction === 'rtl' ? 'mr-6' : 'ml-6'}`}>
                        <h3 className="text-xl font-semibold">
                          {t(`home.howItWorks.steps.${step}.title`)}
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                          {t(`home.howItWorks.steps.${step}.description`)}
                        </p>
                        <ul className="mt-4 space-y-3">
                          {(t(`home.howItWorks.steps.${step}.benefits`, { returnObjects: true }) as string[]).map((benefit) => (
                            <li key={benefit} className="flex items-start">
                              <CheckCircle2 className={`${direction === 'rtl' ? 'ml-3' : 'mr-3'} h-5 w-5 text-primary flex-shrink-0 mt-0.5`} />
                              <span className="text-sm text-muted-foreground">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                        <Button 
                          variant="ghost" 
                          className="mt-6 w-full group-hover:bg-primary/5 font-medium"
                        >
                          <div className="flex w-full items-center justify-between">
                            <ArrowRight 
                              className="h-5 w-5 transition-transform group-hover:translate-x-1" 
                            />
                            <span>{t(`home.howItWorks.steps.${step}.cta`)}</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center rounded-full border bg-background px-4 py-1.5 text-sm text-muted-foreground">
              <Star className={`${direction === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5 text-primary`} />
              {t('home.howitworks.bottomctatext')}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="min-w-[200px] font-medium">
                <div className="flex w-full items-center justify-between">
                  <ArrowRight 
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                  <span>{t('home.howitworks.bottomcta.postproject')}</span>
                </div>
              </Button>
              <Button size="lg" variant="outline" className="min-w-[200px] font-medium">
                <div className="flex w-full items-center justify-between">
                  <ArrowRight 
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  />
                  <span>{t('home.howitworks.bottomcta.becomeprofessional')}</span>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Success Stories */}
      <section className="bg-muted/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t('home.successstories.title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.successstories.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                client: t('home.successstories.stories.techstartup.client'),
                service: t('home.successstories.stories.techstartup.service'),
                professional: t('home.successstories.stories.techstartup.professional'),
                description: t('home.successstories.stories.techstartup.description'),
                result: t('home.successstories.stories.techstartup.result'),
                type: "digital"
              },
              {
                client: t('home.successstories.stories.villaowner.client'),
                service: t('home.successstories.stories.villaowner.service'),
                professional: t('home.successstories.stories.villaowner.professional'),
                description: t('home.successstories.stories.villaowner.description'),
                result: t('home.successstories.stories.villaowner.result'),
                type: "home"
              },
              {
                client: t('home.successstories.stories.restaurant.client'),
                service: t('home.successstories.stories.restaurant.service'),
                professional: t('home.successstories.stories.restaurant.professional'),
                description: t('home.successstories.stories.restaurant.description'),
                result: t('home.successstories.stories.restaurant.result'),
                type: "digital"
              }
            ].map((story, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant={story.type === "digital" ? "default" : "secondary"}>
                      {story.type === "digital" ? t('home.successstories.types.digital') : t('home.successstories.types.home')}
                    </Badge>
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  </div>
                  <h3 className="text-lg font-semibold">{story.client}</h3>
                  <p className="text-sm text-primary mt-1">{story.service}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{story.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm font-medium">By {story.professional}</span>
                    <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-200">
                      {story.result}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Professionals */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {t('home.professionals.title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('home.professionals.subtitle')}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {topProfessionals.map((professional) => (
              <Card
                key={professional.id}
                className="group relative overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="p-4 sm:p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <img
                          src={professional.image}
                          alt={professional.name}
                          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-sm sm:text-base">{professional.name}</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            {professional.title}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className={`h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm font-medium">{professional.rating}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">
                        ({professional.reviews} {t('home.professionals.reviews')})
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {professional.badges.map((badge) => (
                        <Badge key={badge} variant="secondary" className="text-xs sm:text-sm">
                          {t(`home.professionals.badges.${badge.toLowerCase().replace(' ', '')}`)}
                        </Badge>
                      ))}
                    </div>

                    <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        className={`w-full text-sm ${direction === 'rtl' ? 'flex-row-reverse' : ''}`} 
                        variant="outline"
                      >
                        {professional.type === "digital" ? t('home.categories.cta.digital') : t('home.categories.cta.home')}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button 
              size="lg" 
              className={`gap-2 ${direction === 'rtl' ? 'flex-row-reverse' : ''}`}
            >
              {t('home.professionals.browseall')}
              <ArrowRight className={`${direction === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
