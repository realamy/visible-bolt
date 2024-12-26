import { useState, useContext } from 'react'
import { 
  Mail, 
  MapPin, 
  Link as LinkIcon, 
  Calendar, 
  Star,
  Clock,
  Languages,
  Shield,
  CheckCircle,
  Share2,
  Bookmark,
  MessageCircle,
  Calendar as CalendarIcon,
  Image,
  Award,
  BadgeCheck
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useLanguage } from '@/contexts/language-context'

// Mock user data - replace with API call
const user = {
  name: "Mohamed Amine",
  title: "Full Stack Developer",
  location: "Algiers, Algeria",
  email: "mohamed.amine@example.com",
  website: "www.mohamedamine.dev",
  joined: "January 2023",
  avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
  bio: "Passionate full-stack developer with 5+ years of experience in web development. Specialized in React, Node.js, and cloud technologies.",
  languages: ["Arabic", "French", "English"],
  verificationStatus: {
    identity: true,
    phone: true,
    email: true,
    professional: true
  },
  availability: {
    status: "Available",
    responseTime: "< 2 hours",
    workingHours: "9:00 AM - 6:00 PM",
    workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  },
  stats: {
    completedProjects: 48,
    totalEarnings: 450000,
    rating: 4.9,
    reviews: 32,
    completionRate: 98,
    onTimeDelivery: 95
  },
  certifications: [
    {
      name: "AWS Certified Developer",
      issuer: "Amazon Web Services",
      year: 2023
    },
    {
      name: "Professional Web Developer",
      issuer: "Algeria Tech Institute",
      year: 2022
    }
  ],
  skills: [
    "React.js", "Node.js", "TypeScript", "MongoDB", "AWS", 
    "Docker", "GraphQL", "Next.js", "Tailwind CSS"
  ],
  portfolio: [
    {
      id: 1,
      title: "E-commerce Platform",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Healthcare Dashboard",
      image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3",
      category: "Web Development"
    },
    {
      id: 3,
      title: "Real Estate App",
      image: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?ixlib=rb-4.0.3",
      category: "Mobile Development"
    }
  ],
  services: [
    {
      id: 1,
      title: "Full Stack Web Development",
      description: "Complete web application development using modern technologies",
      price: 5000,
      duration: "2-4 weeks"
    },
    {
      id: 2,
      title: "API Development",
      description: "RESTful API development with Node.js and Express",
      price: 3000,
      duration: "1-2 weeks"
    }
  ],
  reviews: [
    {
      id: 1,
      client: "Ahmed K.",
      rating: 5,
      date: "2024-01-15",
      comment: "Excellent work! Delivered the project ahead of schedule.",
      project: "E-commerce Website"
    },
    {
      id: 2,
      client: "Sarah M.",
      rating: 5,
      date: "2024-01-02",
      comment: "Very professional and great communication throughout the project.",
      project: "Mobile App Development"
    }
  ]
}

const Profile = () => {
  const { t } = useTranslation()
  const { direction } = useLanguage()
  const [isBookmarked, setIsBookmarked] = useState(false)

  return (
    <div className="container mx-auto max-w-7xl p-6 space-y-8">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover ring-2 ring-primary/20"
              />
              {user.verificationStatus.professional && (
                <Badge 
                  className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground"
                  variant="default"
                >
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  Verified Pro
                </Badge>
              )}
            </div>

            <div className="space-y-4 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    {user.verificationStatus.identity && (
                      <Badge variant="secondary">
                        <Shield className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-muted-foreground">{user.title}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => setIsBookmarked(!isBookmarked)}>
                    <Bookmark className={`w-4 h-4 mr-2 ${isBookmarked ? 'fill-primary' : ''}`} />
                    {isBookmarked ? 'Saved' : 'Save'}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Languages className="h-4 w-4 shrink-0" />
                  <span>{user.languages.join(", ")}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4 shrink-0" />
                  <span>{user.availability.responseTime}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <CalendarIcon className="h-4 w-4 shrink-0" />
                  <span>{user.joined}</span>
                </div>
              </div>

              <p className="text-foreground/80">{user.bio}</p>

              <div className="flex flex-wrap gap-4">
                {user.verificationStatus.identity && (
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    ID Verified
                  </Badge>
                )}
                {user.verificationStatus.phone && (
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Phone Verified
                  </Badge>
                )}
                {user.verificationStatus.email && (
                  <Badge variant="secondary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Email Verified
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{user.stats.completedProjects}</div>
            <p className="text-sm text-muted-foreground">Projects</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">
              {user.stats.totalEarnings.toLocaleString('fr-DZ')} DA
            </div>
            <p className="text-sm text-muted-foreground">Earnings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold">{user.stats.rating}</span>
              <Star className="h-5 w-5 fill-primary text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">Rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{user.stats.reviews}</div>
            <p className="text-sm text-muted-foreground">Reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{user.stats.completionRate}%</div>
            <p className="text-sm text-muted-foreground">Completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">{user.stats.onTimeDelivery}%</div>
            <p className="text-sm text-muted-foreground">On Time</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="services" className="space-y-4">
        <TabsList>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-4">
          {user.services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap justify-between items-center">
                  <div className="space-y-1">
                    <div className="text-sm text-muted-foreground">Starting from</div>
                    <div className="text-2xl font-bold">{service.price.toLocaleString('fr-DZ')} DA</div>
                  </div>
                  <div className="space-y-1 text-right">
                    <div className="text-sm text-muted-foreground">Delivery Time</div>
                    <div className="font-medium">{service.duration}</div>
                  </div>
                </div>
                <Button className="w-full mt-4">Request Quote</Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.portfolio.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-4">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1">
                  <div className="text-3xl font-bold flex items-center gap-2">
                    {user.stats.rating}
                    <Star className="h-6 w-6 fill-primary text-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    {user.stats.reviews} reviews
                  </p>
                </div>
                <div className="flex-[2]">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <div className="w-12 text-sm text-muted-foreground">
                          {rating} stars
                        </div>
                        <Progress 
                          value={rating === 5 ? 85 : rating === 4 ? 12 : 3} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {user.reviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold">{review.client}</div>
                    <div className="text-sm text-muted-foreground">{review.project}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>{review.rating}</span>
                    <Star className="h-4 w-4 fill-primary text-primary" />
                  </div>
                </div>
                <p className="mt-4">{review.comment}</p>
                <div className="mt-4 text-sm text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle>Certifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-start gap-3">
                    <Award className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{cert.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {cert.issuer} • {cert.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card>
            <CardHeader>
              <CardTitle>Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Current Status</div>
                  <Badge variant={user.availability.status === "Available" ? "default" : "secondary"}>
                    {user.availability.status}
                  </Badge>
                </div>
                <div>
                  <div className="font-medium mb-2">Working Hours</div>
                  <div className="text-sm text-muted-foreground">
                    {user.availability.workingHours}
                  </div>
                </div>
                <div>
                  <div className="font-medium mb-2">Working Days</div>
                  <div className="flex flex-wrap gap-2">
                    {user.availability.workDays.map((day) => (
                      <Badge key={day} variant="secondary">
                        {day}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile