import { Badge } from '~/components/ui/badge'
import { ButtonLink } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

type Project = {
  id: number
  name: string
  repositoryUrl: string
  gitProvider: string
}

export default function ProjectsIndex({ projects }: { projects: Project[] }) {
  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Projetos</p>
          <h1>Documentacao tecnica</h1>
        </div>
        <ButtonLink href="/projects/create">Novo projeto</ButtonLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Projetos cadastrados</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhum projeto cadastrado</h3>
              <p>Cadastre o primeiro repositorio para configurar o fluxo de documentacao.</p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Repositorio</th>
                    <th>Provider Git</th>
                    <th>Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>{project.name}</td>
                      <td className="mono-cell">{project.repositoryUrl}</td>
                      <td>
                        <Badge>{project.gitProvider}</Badge>
                      </td>
                      <td className="row-actions">
                        <ButtonLink
                          href={`/projects/${project.id}/settings/llm`}
                          variant="secondary"
                        >
                          LLM
                        </ButtonLink>
                        <ButtonLink href={`/projects/${project.id}/documentation`} variant="ghost">
                          Docs
                        </ButtonLink>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
