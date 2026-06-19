import { Badge } from '~/components/ui/badge'
import { ButtonLink } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'

type Project = {
  id: number
  name: string
}

type DocumentationEntry = {
  id: number
  sourceType: string
  sourceRef: string
  status: string
  createdAt: string
}

function statusTone(status: string) {
  if (status === 'completed') return 'success'
  if (status === 'pending' || status === 'processing') return 'warning'
  return 'muted'
}

export default function DocumentationPage({
  project,
  entries,
}: {
  project: Project
  entries: DocumentationEntry[]
}) {
  return (
    <section className="page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Documentacoes geradas</p>
          <h1>{project.name}</h1>
        </div>
        <ButtonLink href="/projects" variant="secondary">
          Voltar
        </ButtonLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historico</CardTitle>
        </CardHeader>
        <CardContent>
          {entries.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhuma documentacao gerada</h3>
              <p>
                As entradas criadas por commits, pull requests ou fallback estrutural aparecerao
                aqui.
              </p>
            </div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Source type</th>
                    <th>Source ref</th>
                    <th>Status</th>
                    <th>Criada em</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry) => (
                    <tr key={entry.id}>
                      <td>{entry.sourceType}</td>
                      <td className="mono-cell">{entry.sourceRef}</td>
                      <td>
                        <Badge tone={statusTone(entry.status)}>{entry.status}</Badge>
                      </td>
                      <td>{new Date(entry.createdAt).toLocaleString('pt-BR')}</td>
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
