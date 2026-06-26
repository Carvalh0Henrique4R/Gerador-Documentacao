export const inertiaPages = {
  landing: 'landing/index',
  auth: {
    login: 'auth/login/index',
    signup: 'auth/signup/index',
  },
  errors: {
    notFound: 'errors/not-found/index',
    serverError: 'errors/server-error/index',
  },
  projects: {
    home: 'projects/home/index',
    list: 'projects/list/index',
    create: 'projects/create/index',
    documentation: 'projects/documentation/index',
    llmSettings: 'projects/llm-settings/index',
  },
} as const
