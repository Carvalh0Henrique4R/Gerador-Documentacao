import { useForm } from '@inertiajs/react'
import { Button, ButtonLink } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { FormActions, FormField, FormShell } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'

const gitProviderOptions = [
  { label: 'GitHub', value: 'github' },
  { label: 'GitLab', value: 'gitlab' },
  { label: 'Bitbucket', value: 'bitbucket' },
  { label: 'Azure DevOps', value: 'azure_devops' },
  { label: 'Outro', value: 'other' },
]

export default function CreateProject() {
  const form = useForm({
    name: '',
    repositoryUrl: '',
    gitProvider: 'github',
    webhookSecret: '',
  })

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post('/projects')
  }

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">Novo projeto</p>
          <h1>Cadastrar repositorio</h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Dados do projeto</CardTitle>
        </CardHeader>
        <CardContent>
          <FormShell onSubmit={submit}>
            <FormField label="Nome">
              <Input
                value={form.data.name}
                onChange={(event) => form.setData('name', event.target.value)}
                error={form.errors.name}
                required
              />
            </FormField>
            <FormField label="URL do repositorio">
              <Input
                type="url"
                value={form.data.repositoryUrl}
                onChange={(event) => form.setData('repositoryUrl', event.target.value)}
                error={form.errors.repositoryUrl}
                required
              />
            </FormField>
            <FormField label="Provider Git">
              <Select
                value={form.data.gitProvider}
                onChange={(event) => form.setData('gitProvider', event.target.value)}
                error={form.errors.gitProvider}
                options={gitProviderOptions}
              />
            </FormField>
            <FormField label="Webhook secret">
              <Input
                type="password"
                value={form.data.webhookSecret}
                onChange={(event) => form.setData('webhookSecret', event.target.value)}
                error={form.errors.webhookSecret}
                required
              />
            </FormField>
            <FormActions>
              <ButtonLink href="/projects" variant="secondary">
                Cancelar
              </ButtonLink>
              <Button type="submit" disabled={form.processing}>
                Salvar projeto
              </Button>
            </FormActions>
          </FormShell>
        </CardContent>
      </Card>
    </section>
  )
}
