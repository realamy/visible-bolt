export interface Freelancer {
  id: string
  name: string
  avatar: string
  rating: number
  totalReviews: number
  verified: boolean
  yearsOfExperience: number
  responseTime: string
  languages: string[]
}

export interface Service {
  id: string
  title: string
  description: string
  price: number
  rating: number
  reviews: number
  category: string // This is now a category ID (e.g., 'plumbing', 'painting', etc.)
  location: string
  freelancer: Freelancer
}
