import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'auth/login/index': ExtractProps<(typeof import('../../inertia/pages/auth/login/index.tsx'))['default']>
    'auth/signup/index': ExtractProps<(typeof import('../../inertia/pages/auth/signup/index.tsx'))['default']>
    'errors/not-found/index': ExtractProps<(typeof import('../../inertia/pages/errors/not-found/index.tsx'))['default']>
    'errors/server-error/index': ExtractProps<(typeof import('../../inertia/pages/errors/server-error/index.tsx'))['default']>
    'landing/index': ExtractProps<(typeof import('../../inertia/pages/landing/index.tsx'))['default']>
    'projects/create/index': ExtractProps<(typeof import('../../inertia/pages/projects/create/index.tsx'))['default']>
    'projects/documentation/index': ExtractProps<(typeof import('../../inertia/pages/projects/documentation/index.tsx'))['default']>
    'projects/home/index': ExtractProps<(typeof import('../../inertia/pages/projects/home/index.tsx'))['default']>
    'projects/list/index': ExtractProps<(typeof import('../../inertia/pages/projects/list/index.tsx'))['default']>
    'projects/llm-settings/index': ExtractProps<(typeof import('../../inertia/pages/projects/llm-settings/index.tsx'))['default']>
  }
}
