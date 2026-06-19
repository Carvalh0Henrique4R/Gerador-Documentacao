/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  projects: {
    index: typeof routes['projects.index']
    create: typeof routes['projects.create']
    store: typeof routes['projects.store']
    llmSettings: typeof routes['projects.llm_settings'] & {
      save: typeof routes['projects.llm_settings.save']
    }
    documentation: typeof routes['projects.documentation']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}
