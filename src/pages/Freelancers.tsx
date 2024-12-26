import { useState } from 'react'
import { Search, Filter, Star, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'

interface Freelancer {
  id: number
  name: string
  title: string
  location: string
  avatar: string
  hourlyRate: number
  rating: number
  reviews: number
  description: string
  skills: string[]
  completedProjects: number
}

const Freelancers = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock data - replace with API call
  const freelancers: Freelancer[] = [
    {
      id: 1,
      name: "Karim Benzema",
      title: "Full Stack Developer",
      location: "Algiers",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
      hourlyRate: 2500,
      rating: 4.8,
      reviews: 56,
      description: "Experienced full-stack developer specializing in React and Node.js. Building scalable web applications with modern technologies.",
      skills: ["React", "Node.js", "TypeScript", "MongoDB"],
      completedProjects: 78
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      title: "UI/UX Designer",
      location: "Oran",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3",
      hourlyRate: 2000,
      rating: 4.9,
      reviews: 43,
      description: "Creative UI/UX designer with a passion for creating beautiful and functional user interfaces. Focused on user-centered design.",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
      completedProjects: 64
    },
    {
      id: 3,
      name: "Mohamed Kaci",
      title: "Digital Marketing Specialist",
      location: "Constantine",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3",
      hourlyRate: 1800,
      rating: 4.7,
      reviews: 38,
      description: "Results-driven digital marketer with expertise in social media marketing, SEO, and content strategy. Helping businesses grow online.",
      skills: ["SEO", "Social Media", "Content Marketing", "Analytics"],
      completedProjects: 92
    }
  ]

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search freelancers..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      {/* Freelancers Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freelancers.map((freelancer) => (
          <Card key={freelancer.id}>
            <CardHeader className="space-y-4">
              <div className="flex gap-4">
                <img
                  src={freelancer.avatar}
                  alt={freelancer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{freelancer.name}</h3>
                  <p className="text-sm text-muted-foreground">{freelancer.title}</p>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{freelancer.location}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-foreground/80 line-clamp-2">
                {freelancer.description}
              </p>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{freelancer.rating}</span>
                    <span className="text-muted-foreground">
                      ({freelancer.reviews} reviews)
                    </span>
                  </div>
                  <span className="font-medium">
                    {freelancer.hourlyRate.toLocaleString('fr-DZ')} DZD/hr
                  </span>
                </div>
                
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Skills:</div>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded-full bg-secondary text-secondary-foreground text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center">
              <div className="text-sm">
                <span className="font-medium">{freelancer.completedProjects}</span>
                <span className="text-muted-foreground"> projects completed</span>
              </div>
              <Button>View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Freelancers
