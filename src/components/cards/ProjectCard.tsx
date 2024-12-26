import { Calendar, MapPin, Timer, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface ProjectCardProps {
  title: string
  description: string
  budget: {
    min: number
    max: number
  }
  duration: string
  location: string
  category: string
  postedDate: string
  requiredSkills: string[]
  proposalCount: number
}

export function ProjectCard({
  title,
  description,
  budget,
  duration,
  location,
  category,
  postedDate,
  requiredSkills,
  proposalCount,
}: ProjectCardProps) {
  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription className="mt-1.5">
              <div className="flex items-center gap-3 text-sm">
                <Badge variant="secondary">{category}</Badge>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {location}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {postedDate}
                </span>
              </div>
            </CardDescription>
          </div>
          <Badge variant="outline" className="whitespace-nowrap">
            {proposalCount} proposals
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {description}
        </p>

        {/* Project Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>
              {budget.min} - {budget.max} DA
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Required Skills */}
        <div className="flex flex-wrap gap-1.5">
          {requiredSkills.map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between">
        <Button variant="outline">View Details</Button>
        <Button>Submit Proposal</Button>
      </CardFooter>
    </Card>
  )
}
