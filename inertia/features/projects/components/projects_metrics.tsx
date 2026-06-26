import { Card, CardContent } from '~/components/ui/card'
import { projectMetricCards } from '../metric_cards'
import type { ProjectDashboardStats, ProjectListItem } from '../types'
import { ProjectIcon, type ProjectIconName } from './project_icon'

const metricIcons: Record<(typeof projectMetricCards)[number]['key'], ProjectIconName> = {
  docs: 'fileText',
  failures: 'alert',
  projects: 'folder',
  providers: 'cpu',
}

type ProjectsMetricsProps = {
  projects: ProjectListItem[]
  stats?: ProjectDashboardStats
}

export function ProjectsMetrics({ projects, stats }: ProjectsMetricsProps) {
  return (
    <div className="projects-metrics" aria-label="Resumo de projetos">
      {projectMetricCards.map((metric) => (
        <Card className={`projects-metric projects-metric-${metric.tone}`} key={metric.key}>
          <CardContent className="projects-metric-content">
            <span className="projects-metric-icon" aria-hidden="true">
              <ProjectIcon name={metricIcons[metric.key]} />
            </span>
            <div>
              <h2>{metric.label}</h2>
              <strong>{metric.value(projects, stats)}</strong>
              <p>{metric.hint}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
