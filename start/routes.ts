/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import { inertiaPages } from '#services/inertia_pages'
import router from '@adonisjs/core/services/router'

const ProjectsController = () => import('#controllers/projects_controller')

router.on('/').renderInertia(inertiaPages.landing, {}).as('landing')

router
  .group(() => {
    router.get('/home', [ProjectsController, 'dashboard']).as('home')
    router.get('/projects', [ProjectsController, 'index']).as('projects.index')
    router.get('/projects/create', [ProjectsController, 'create']).as('projects.create')
    router.post('/projects', [ProjectsController, 'store']).as('projects.store')
    router
      .get('/projects/:id/settings/llm', [ProjectsController, 'llmSettings'])
      .as('projects.llm_settings')
    router
      .post('/projects/:id/settings/llm', [ProjectsController, 'saveLlmSettings'])
      .as('projects.llm_settings.save')
    router
      .get('/projects/:id/documentation', [ProjectsController, 'documentation'])
      .as('projects.documentation')
  })
  .use(middleware.jwtAuth())

router.get('/auth/me', [controllers.Session, 'me']).as('auth.me')
router.post('/auth/login', [controllers.Session, 'store']).as('auth.login')
router.post('/auth/logout', [controllers.Session, 'destroy']).as('auth.logout')

router
  .group(() => {
    router.get('signup', [controllers.NewAccount, 'create'])
    router.post('signup', [controllers.NewAccount, 'store'])

    router.get('login', [controllers.Session, 'create'])
    router.post('login', [controllers.Session, 'store'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.Session, 'destroy'])
  })
  .use(middleware.jwtAuth())
