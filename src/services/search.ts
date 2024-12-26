import { Service } from '@/types/service'
import { serviceCategories, LanguageCode } from '@/data/categories'

export interface SearchFilters {
  categories: string[]
  skills: string[]
  location: string
  budget: string
}

export interface SearchResult {
  services: Service[]
  total: number
  page: number
  pageSize: number
}

// Get category name by ID and language
export function getCategoryName(id: string, language: LanguageCode) {
  const category = serviceCategories.find(cat => cat.id === id)
  return category ? category.translations[language] : id
}

export async function searchServices(
  query: string,
  filters: SearchFilters,
  page = 1,
  pageSize = 10
): Promise<SearchResult> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800))

  // Mock data - replace with actual API call
  const mockServices: Service[] = [
    {
      id: '1',
      title: 'Professional Plumbing Services',
      description: 'Expert plumber for all your plumbing needs. Available 24/7 for emergencies.',
      price: 2500,
      rating: 4.8,
      reviews: 127,
      category: 'plumbing',
      location: 'Algiers',
      freelancer: {
        id: '1',
        name: 'Ahmed Benali',
        avatar: 'https://ui-avatars.com/api/?name=Ahmed+Benali',
        rating: 4.9,
        totalReviews: 156,
        verified: true,
        yearsOfExperience: 8,
        responseTime: '1 hour',
        languages: ['Arabic', 'French']
      }
    },
    {
      id: '2',
      title: 'Expert House Painter',
      description: 'Interior and exterior painting services. Quality work with attention to detail.',
      price: 3000,
      rating: 4.7,
      reviews: 98,
      category: 'painting',
      location: 'Oran',
      freelancer: {
        id: '2',
        name: 'Karim Mansouri',
        avatar: 'https://ui-avatars.com/api/?name=Karim+Mansouri',
        rating: 4.8,
        totalReviews: 123,
        verified: true,
        yearsOfExperience: 5,
        responseTime: '2 hours',
        languages: ['Arabic', 'French', 'English']
      }
    },
    {
      id: '3',
      title: 'Home Renovation Specialist',
      description: 'Complete home renovation services. Kitchen, bathroom, and full house remodeling.',
      price: 15000,
      rating: 4.9,
      reviews: 75,
      category: 'renovation',
      location: 'Constantine',
      freelancer: {
        id: '3',
        name: 'Mohamed Larbi',
        avatar: 'https://ui-avatars.com/api/?name=Mohamed+Larbi',
        rating: 4.7,
        totalReviews: 89,
        verified: true,
        yearsOfExperience: 12,
        responseTime: '3 hours',
        languages: ['Arabic', 'French']
      }
    }
  ]

  // Filter services based on search criteria
  let filteredServices = [...mockServices]

  if (query) {
    const searchLower = query.toLowerCase()
    filteredServices = filteredServices.filter(service =>
      service.title.toLowerCase().includes(searchLower) ||
      service.description.toLowerCase().includes(searchLower)
    )
  }

  if (filters.categories.length > 0) {
    filteredServices = filteredServices.filter(service =>
      filters.categories.includes(service.category)
    )
  }

  if (filters.location) {
    filteredServices = filteredServices.filter(service =>
      service.location.toLowerCase() === filters.location.toLowerCase()
    )
  }

  // Calculate pagination
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedServices = filteredServices.slice(startIndex, endIndex)

  return {
    services: paginatedServices,
    total: filteredServices.length,
    page,
    pageSize
  }
}
