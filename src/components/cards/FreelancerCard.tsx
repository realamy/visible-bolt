import { Star, Clock, BookmarkPlus, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface Skill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Expert'
}

interface FreelancerCardProps {
  name: string
  title: string
  avatar: string
  rating: number
  completedProjects: number
  responseTime: string
  skills: Skill[]
  status: 'Active' | 'Busy' | 'Away'
  hourlyRate: number
}

export function FreelancerCard({
  name,
  title,
  avatar,
  rating,
  completedProjects,
  responseTime,
  skills,
  status,
  hourlyRate,
}: FreelancerCardProps) {
  const statusColors = {
    Active: 'text-green-500',
    Busy: 'text-orange-500',
    Away: 'text-gray-500',
  }

  const skillLevelColors = {
    Beginner: 'bg-blue-100 text-blue-800',
    Intermediate: 'bg-purple-100 text-purple-800',
    Expert: 'bg-green-100 text-green-800',
  }

  return (
    <Card className="w-full max-w-sm hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">{name}</h3>
              <p className="text-sm text-muted-foreground">{title}</p>
            </div>
            <Button variant="ghost" size="icon">
              <BookmarkPlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Stats */}
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
          <div>
            <span className="font-medium">{completedProjects}</span> Projects
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{responseTime}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className={skillLevelColors[skill.level]}
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Circle className={`h-3 w-3 fill-current ${statusColors[status]}`} />
          <span className="text-sm text-muted-foreground">{status}</span>
        </div>
        <div className="text-right">
          <div className="text-lg font-semibold">{hourlyRate} DA</div>
          <div className="text-sm text-muted-foreground">per hour</div>
        </div>
      </CardFooter>
    </Card>
  )
}
