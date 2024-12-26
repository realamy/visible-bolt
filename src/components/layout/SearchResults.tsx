import { Service } from '@/types/service'
import { getCategoryName } from '@/services/search'
import { useLanguage } from '@/contexts/language-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Heart, MapPin } from 'lucide-react'

interface SearchResultsProps {
  results: Service[]
  isLoading: boolean
  total: number
}

export function SearchResults({ results, isLoading, total }: SearchResultsProps) {
  const { language } = useLanguage()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="space-y-4 animate-pulse">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="h-3 bg-muted rounded w-1/4" />
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (!results.length) {
    return (
      <Card className="p-8 text-center">
        <h3 className="text-lg font-semibold mb-2">No results found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters to find what you're looking for.
        </p>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Found {total} services
      </div>
      
      <div className="space-y-4">
        {results.map((service) => (
          <Card key={service.id} className="p-6 group hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {service.description}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span>{service.rating}</span>
                    <span className="text-muted-foreground">
                      ({service.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {getCategoryName(service.category, language)} • {service.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <img
                      src={service.freelancer.avatar}
                      alt={service.freelancer.name}
                      className="h-8 w-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-sm">
                        {service.freelancer.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {service.freelancer.totalReviews} total reviews
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {service.price.toLocaleString()} DA
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Starting from
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
