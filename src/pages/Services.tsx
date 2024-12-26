import { useState } from 'react'
import { Search, Filter, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'

interface Service {
  id: number
  title: string
  description: string
  price: number
  rating: number
  reviews: number
  category: string
  image: string
}

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('')
  
  // Mock data - replace with API call
  const services: Service[] = [
    {
      id: 1,
      title: "Professional Website Development",
      description: "I will create a modern, responsive website for your business using React and Next.js",
      price: 15000,
      rating: 4.8,
      reviews: 124,
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3"
    },
    {
      id: 2,
      title: "Logo Design & Branding",
      description: "Professional logo design and complete branding package for your business",
      price: 8000,
      rating: 4.9,
      reviews: 89,
      category: "Graphic Design",
      image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3"
    },
    {
      id: 3,
      title: "Social Media Marketing",
      description: "Complete social media marketing strategy and management for your brand",
      price: 12000,
      rating: 4.7,
      reviews: 156,
      category: "Digital Marketing",
      image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-4.0.3"
    },
  ]

  return (
    <div className="space-y-8">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search services..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <Card key={service.id}>
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <CardHeader>
              <h3 className="font-semibold truncate">{service.title}</h3>
              <p className="text-sm text-foreground/60 line-clamp-2">
                {service.description}
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 text-sm">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span>{service.rating}</span>
                <span className="text-foreground/60">({service.reviews} reviews)</span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="font-semibold">
                {service.price.toLocaleString('fr-DZ')} DZD
              </span>
              <Button>View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Services
