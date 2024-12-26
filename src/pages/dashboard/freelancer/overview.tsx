import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Briefcase,
  Clock,
  DollarSign,
  ExternalLink,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useLanguage } from "@/contexts/language-context"

export default function FreelancerDashboard() {
  const { t } = useTranslation()
  const { direction } = useLanguage()

  const isRtl = direction === 'rtl';
  const stats = [
    {
      title: t("dashboard.stats.activeProjects"),
      value: "4",
      icon: Briefcase,
      trend: "+2",
      description: t("dashboard.stats.activeProjectsDesc")
    },
    {
      title: t("dashboard.stats.earnings"),
      value: "12,450 DA",
      icon: DollarSign,
      trend: "+15%",
      description: t("dashboard.stats.earningsDesc")
    },
    {
      title: t("dashboard.stats.rating"),
      value: "4.8",
      icon: Star,
      trend: "+0.2",
      description: t("dashboard.stats.ratingDesc")
    },
    {
      title: t("dashboard.stats.messages"),
      value: "12",
      icon: MessageSquare,
      trend: "3",
      description: t("dashboard.stats.messagesDesc")
    },
  ]

  const recentProjects = [
    {
      title: t("projects.websiteDevelopment"),
      client: "Ahmed B.",
      status: t("projects.status.inProgress"),
      deadline: "2024-02-15",
      amount: "45,000 DA",
    },
    {
      title: t("projects.mobileAppDesign"),
      client: "Sarah M.",
      status: t("projects.status.review"),
      deadline: "2024-02-10",
      amount: "30,000 DA",
    },
  ]

  return (
    <div className="space-y-8 p-1">
      <div className="flex flex-col gap-3">
        <h2 className={cn(
          "text-3xl font-semibold tracking-tight",
          isRtl && "text-right"
        )}>
          {t("dashboard.welcome")}
        </h2>
        <p className={cn(
          "text-base text-muted-foreground/80",
          isRtl && "text-right"
        )}>
          {t("dashboard.overview.subtitle")}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className={cn(
            "relative overflow-hidden",
            "bg-gradient-to-br from-card to-card/40",
            "border border-border/50 hover:border-border/80",
            "transition-all duration-200 ease-in-out",
            "hover:shadow-lg hover:-translate-y-0.5",
            isRtl && "text-right"
          )}>
            <div className="absolute right-3 top-3">
              <div className={cn(
                "rounded-xl bg-primary/10 p-2.5",
                "ring-1 ring-primary/20"
              )}>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold tracking-tight mb-3">
                {stat.value}
              </div>
              <div className={cn(
                "inline-flex items-center gap-1.5",
                "rounded-lg bg-emerald-500/10 text-emerald-500",
                "px-2.5 py-1.5 text-sm font-medium"
              )}>
                <TrendingUp className="h-4 w-4" />
                <span>{stat.trend}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={cn(
        "border border-border/50",
        "shadow-sm hover:shadow-md transition-shadow",
        isRtl && "text-right"
      )}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
          <div className="space-y-1">
            <CardTitle className="text-xl font-semibold leading-none tracking-tight">
              {t("dashboard.recentProjects")}
            </CardTitle>
            <CardDescription>
              {t("dashboard.recentProjectsDescription")}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild className="h-8">
            <Link to="/dashboard/projects" className={cn(
              "inline-flex items-center gap-2 text-sm font-medium",
              isRtl && "flex-row-reverse"
            )}>
              {t("dashboard.viewAllProjects")}
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {recentProjects.map((project, index) => (
              <div
                key={index}
                className={cn(
                  "group flex items-center justify-between py-4",
                  index !== recentProjects.length - 1 && "border-b border-border/50",
                  isRtl && "flex-row-reverse"
                )}
              >
                <div className={cn("space-y-2", isRtl && "text-right")}>
                  <div className="flex items-center gap-2">
                    <p className="font-medium tracking-tight group-hover:text-primary transition-colors">
                      {project.title}
                    </p>
                    <Badge variant="outline" className={cn(
                      "h-5 px-2 text-xs font-normal",
                      project.status === "inProgress" ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500" :
                      project.status === "review" ? "border-amber-500/30 bg-amber-500/10 text-amber-500" :
                      "border-primary/30 bg-primary/10 text-primary"
                    )}>
                      {project.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>{t("dashboard.client")}: {project.client}</span>
                  </div>
                </div>
                <div className={cn(
                  "text-right space-y-2",
                  isRtl && "text-left"
                )}>
                  <div className="font-medium tracking-tight">{project.amount}</div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{project.deadline}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
