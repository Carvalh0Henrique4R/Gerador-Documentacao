import { useForm } from '@inertiajs/react'
import { Badge } from '~/components/ui/badge'
import { Button, ButtonLink } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { FormActions, FormField, FormShell } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select } from '~/components/ui/select'

type Project = {
  id: number
  name: string
}

type LlmConfig = {
  provider: string
  model: string | null
  baseUrl: string | null
  isActive: boolean
  hasApiKey: boolean
} | null

const providerOptions = [
  { label: 'Anthropic', value: 'anthropic' },
  { label: 'OpenAI', value: 'openai' },
  { label: 'Google', value: 'google' },
  { label: 'Ollama', value: 'ollama' },
  { label: 'Sem LLM', value: 'none' },
]

export default function LlmSettings({ project, config }: { project: Project; config: LlmConfig }) {
  const form = useForm({
    provider: config?.provider || 'none',
    model: config?.model || '',
    apiKey: '',
    baseUrl: config?.baseUrl || '',
    isActive: config?.isActive || false,
  })
  const requiresApiKey = !['ollama', 'none'].includes(form.data.provider)

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    form.post(`/projects/${project.id}/settings/llm`)
  }

  return (
    <section className="page narrow-page">
      <div className="page-header">
        <div>
          <p className="eyebrow">LLM BYOK</p>
          <h1>{project.name}</h1>
        </div>
        <ButtonLink href="/projects" variant="secondary">
          Voltar
        </ButtonLink>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Provider de LLM</CardTitle>
          {config?.hasApiKey ? (
            <Badge tone="success">API key salva</Badge>
          ) : (
            <Badge tone="muted">Sem API key</Badge>
          )}
        </CardHeader>
        <CardContent>
          <FormShell onSubmit={submit}>
            <FormField label="Provider">
              <Select
                value={form.data.provider}
                onChange={(event) => form.setData('provider', event.target.value)}
                error={form.errors.provider}
                options={providerOptions}
              />
            </FormField>
            <FormField label="Model">
              <Input
                value={form.data.model}
                onChange={(event) => form.setData('model', event.target.value)}
                error={form.errors.model}
                placeholder="ex: claude-3-5-sonnet, gpt-4.1, gemini-1.5-pro"
              />
            </FormField>
            <FormField
              label="API key"
              hint={
                config?.hasApiKey
                  ? 'Deixe em branco para manter a chave atual. O valor salvo nunca e exibido.'
                  : requiresApiKey
                    ? 'Obrigatoria para este provider.'
                    : 'Opcional para Ollama e Sem LLM.'
              }
            >
              <Input
                type="password"
                value={form.data.apiKey}
                onChange={(event) => form.setData('apiKey', event.target.value)}
                error={form.errors.apiKey}
                autoComplete="new-password"
              />
            </FormField>
            <FormField label="Base URL opcional">
              <Input
                type="url"
                value={form.data.baseUrl}
                onChange={(event) => form.setData('baseUrl', event.target.value)}
                error={form.errors.baseUrl}
                placeholder="https://api.exemplo.com"
              />
            </FormField>
            <label className="checkbox-field">
              <input
                type="checkbox"
                checked={form.data.isActive}
                onChange={(event) => form.setData('isActive', event.target.checked)}
              />
              <span>Configuracao ativa</span>
            </label>
            <FormActions>
              <ButtonLink href="/projects" variant="secondary">
                Cancelar
              </ButtonLink>
              <Button type="submit" disabled={form.processing}>
                Salvar configuracao
              </Button>
            </FormActions>
          </FormShell>
        </CardContent>
      </Card>
    </section>
  )
}
