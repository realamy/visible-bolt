import { useTranslation } from "react-i18next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Briefcase,
  DollarSign,
  ExternalLink,
  MessageSquare,
  Star,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

export default function DashboardOverview() {
  const { t } = useTranslation()

  const stats = [
    {
      title: t("dashboard.stats.activeProjects"),
      value: "12",
      description: t("dashboard.stats.activeProjectsDesc"),
      icon: Briefcase,
      trend: "+2.5%",
      trendUp: true,
    },
    {
      title: t("dashboard.stats.earnings"),
      value: "$2,450",
      description: t("dashboard.stats.earningsDesc"),
      icon: DollarSign,
      trend: "+18.2%",
      trendUp: true,
    },
    {
      title: t("dashboard.stats.messages"),
      value: "28",
      description: t("dashboard.stats.messagesDesc"),
      icon: MessageSquare,
      trend: "+4.1%",
      trendUp: true,
    },
    {
      title: t("dashboard.stats.rating"),
      value: "4.9",
      description: t("dashboard.stats.ratingDesc"),
      icon: Star,
      trend: "+0.2%",
      trendUp: true,
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {t('dashboard.overview.title')}
          </h2>
          <p className="text-muted-foreground">
            {t('dashboard.overview.subtitle')}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            {t('dashboard.actions.editprofile')}
          </Button>
          <Button asChild>
            <Link to="/profile">
            <ExternalLink className="mr-2 h-4 w-4" />
            {t('dashboard.actions.viewprofile')}
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
              <div className="mt-2 flex items-center text-xs">
                <TrendingUp className={cn(
                  "mr-1 h-3 w-3",
                  stat.trendUp ? "text-green-500" : "text-red-500"
                )} />
                <span className={cn(
                  stat.trendUp ? "text-green-500" : "text-red-500"
                )}>
                  {stat.trend}
                </span>
                <span className="text-muted-foreground ml-1">
                  {t('dashboard.stats.fromlastmonth')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.recentactivity.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {/* Activity items will go here */}
            <div className="text-center text-sm text-muted-foreground">
              {t('dashboard.recentactivity.empty')}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Earnings Chart */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{t('dashboard.earnings.title')}</CardTitle>
          <Button variant="outline" size="sm">
            <BarChart className="mr-2 h-4 w-4" />
            {t('dashboard.earnings.viewreport')}
          </Button>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">
            {t('dashboard.earnings.chartplaceholder')}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
