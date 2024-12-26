import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Briefcase,
  Clock,
  ExternalLink,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function ClientDashboard() {
  const { t } = useTranslation()

  const stats = [
    {
      title: t("dashboard.stats.activeProjects"),
      value: "3",
      icon: Briefcase,
      trend: "+1",
    },
    {
      title: t("dashboard.stats.totalSpent"),
      value: "85,000 DA",
      icon: BarChart,
      trend: "+25%",
    },
    {
      title: t("dashboard.stats.hiredFreelancers"),
      value: "8",
      icon: Star,
      trend: "+2",
    },
    {
      title: t("dashboard.stats.messages"),
      value: "15",
      icon: MessageSquare,
      trend: "5 new",
    },
  ]

  const activeProjects = [
    {
      title: "E-commerce Website",
      freelancer: "Mohamed A.",
      status: "In Progress",
      deadline: "2024-02-20",
      progress: 65,
    },
    {
      title: "Logo Design",
      freelancer: "Amira K.",
      status: "Review",
      deadline: "2024-02-08",
      progress: 90,
    },
  ]

  return (
    <div className="space-y-6 p-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">
                <TrendingUp className="mr-1 h-3 w-3 inline" />
                {stat.trend}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.activeProjects")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeProjects.map((project, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="space-y-1">
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.freelancer")}: {project.freelancer}
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <div className="text-sm font-medium">{project.progress}%</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-end">
                    <Clock className="mr-1 h-3 w-3" />
                    {project.deadline}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Button
            variant="link"
            className="mt-4 w-full"
            asChild
          >
            <Link to="/dashboard/projects">
              {t("dashboard.viewAllProjects")} <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("dashboard.findFreelancers")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button className="w-full" asChild>
            <Link to="/freelancers">
              {t("dashboard.postNewProject")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
