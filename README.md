# Gerador Automático de Documentação Técnica com LLM Configurável

Projeto full-stack para automatizar a geração e manutenção de documentação técnica a partir de eventos de Git, como commits e pull requests.

A decisão principal do produto é o modelo BYOK, ou seja, cada projeto cadastrado configura seu próprio provider de LLM e sua própria chave de API. O sistema também prevê um modo sem LLM, usando estratégias estruturais locais como Swagger/OpenAPI, JSDoc ou análise estática como fallback gratuito.

## Stack

- Backend: AdonisJS
- Frontend: React
- Integração frontend-backend: InertiaJS
- UI: componentes no estilo shadcn/ui
- ORM: Lucid
- Banco de dados: PostgreSQL
- Linguagem: TypeScript

Este projeto não usa uma SPA com API REST separada. As telas são renderizadas pelo fluxo AdonisJS + InertiaJS, com controllers retornando páginas React e seus dados.

## Funcionalidades nesta etapa

- Cadastro e listagem de projetos.
- Configuração de provider de LLM por projeto.
- Suporte inicial aos providers `anthropic`, `openai`, `google`, `ollama` e `none`.
- Listagem de documentações geradas por projeto.
- Migrations e models Lucid para:
  - `projects`
  - `llm_provider_configs`
  - `documentation_entries`
- Estrutura inicial de abstração para providers de LLM em `app/services/llm`.

## Requisitos

- Node.js compatível com o projeto.
- PostgreSQL acessível localmente ou por rede.
- NPM.

## Configuração local

Crie ou atualize o arquivo `.env` com as variáveis necessárias.

Exemplo de estrutura:

```env
TZ=UTC
PORT=3333
HOST=localhost
NODE_ENV=development

LOG_LEVEL=info
APP_KEY=defina_uma_chave_do_adonis
APP_URL=http://${HOST}:${PORT}

SESSION_DRIVER=cookie

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha_local
DB_DATABASE=gerador_documentacao
```

Boas práticas:

- Nunca versionar `.env`.
- Nunca colocar chaves reais de LLM em código, seed, teste, README ou exemplos.
- Usar credenciais diferentes por ambiente.
- Gerar uma `APP_KEY` própria para cada ambiente.

## Instalação

```bash
npm install
```

Caso o ambiente já tenha dependências instaladas, valide a aplicação com:

```bash
npm run typecheck
npm run lint
```

## Banco de dados

Verifique se as credenciais do PostgreSQL no `.env` estão corretas e se o banco informado em `DB_DATABASE` existe.

Para consultar o status das migrations:

```bash
node ace migration:status
```

Para aplicar as migrations:

```bash
node ace migration:run
```

Após rodar as migrations, o Lucid pode regenerar classes de schema automaticamente. Rode a checagem de tipos depois:

```bash
npm run typecheck
```

## Execução

Ambiente de desenvolvimento:

```bash
node ace serve --hmr
```

A aplicação fica disponível, por padrão, em:

```txt
http://localhost:3333
```

Build de produção:

```bash
npm run build
```

Servidor de produção:

```bash
npm start
```

## Rotas principais

- `/projects`: lista os projetos cadastrados.
- `/projects/create`: cadastra um novo projeto.
- `/projects/:id/settings/llm`: configura o provider de LLM do projeto.
- `/projects/:id/documentation`: lista documentações geradas para o projeto.

## Segurança das chaves de API

A chave de API do provider de LLM nunca deve ser salva em texto puro.

Regras implementadas:

- A API key é criptografada antes de persistir usando `@adonisjs/core/services/encryption`.
- O campo persistido é `encrypted_api_key`.
- O model não serializa `encryptedApiKey` para o frontend.
- A interface usa campo `password` para entrada da chave.
- Ao editar uma configuração existente, a chave original não é retornada para o frontend.
- Para providers `ollama` e `none`, a chave pode ser nula.
- Para providers remotos, a chave é obrigatória quando ainda não há uma chave salva.

Ao evoluir o projeto, mantenha este comportamento como contrato de segurança.

## Modelo BYOK

Cada projeto pode ter uma configuração própria de LLM. Isso evita uma chave global da empresa e permite que cada repositório escolha provider, model, base URL e política de ativação.

Providers previstos:

- `anthropic`
- `openai`
- `google`
- `ollama`
- `none`

O provider `none` representa o modo sem LLM. Ele deve ser usado para geração estrutural gratuita ou como fallback quando não houver chave configurada.

## Estrutura de providers

A abstração inicial fica em:

```txt
app/services/llm
  contracts/llm_provider.ts
  providers/anthropic_provider.ts
  providers/openai_provider.ts
  providers/google_provider.ts
  providers/ollama_provider.ts
  providers/none_provider.ts
  llm_provider_factory.ts
```

Nesta etapa, os providers remotos ainda não fazem chamadas reais. O objetivo é preparar o contrato e a fábrica para evolução segura.

## Boas práticas de desenvolvimento

- Preferir controllers Inertia para fluxos de tela, sem criar API REST separada antes de existir necessidade clara.
- Manter validações de entrada em validators VineJS.
- Não retornar campos sensíveis nos props enviados ao frontend.
- Serializar models para objetos simples antes de enviar dados para páginas React quando houver campos sensíveis ou tipos complexos.
- Manter migrations pequenas, explícitas e reversíveis.
- Rodar `npm run typecheck` antes de entregar mudanças.
- Rodar `npm run lint` antes de entregar mudanças.
- Evitar providers ou chaves fixas no código.
- Documentar novas variáveis de ambiente em `.env.example`, sem valores reais.

## Comandos úteis

```bash
# Servidor de desenvolvimento
node ace serve --hmr

# Status das migrations
node ace migration:status

# Executar migrations pendentes
node ace migration:run

# Reverter último batch de migrations
node ace migration:rollback

# Checagem de tipos
npm run typecheck

# Lint
npm run lint

# Build
npm run build
```

## Observações de ambiente

Em alguns ambientes Windows com políticas restritivas, o NPM ou o Vite podem falhar ao manipular arquivos de `node_modules` ou executar o binário do `esbuild`, retornando `EPERM`. Quando isso ocorrer, valide primeiro:

```bash
npm run typecheck
npm run lint
node ace migration:status
```

Se esses comandos passarem, o problema provavelmente está na permissão local de execução ou escrita, não necessariamente no código da aplicação.

## Próximos passos sugeridos

- Implementar integração real com providers remotos.
- Adicionar fluxo de webhooks Git.
- Criar geração estrutural sem LLM baseada em OpenAPI/JSDoc.
- Adicionar testes funcionais para cadastro de projeto e configuração de LLM.
- Criar política de rotação ou substituição de API keys.
