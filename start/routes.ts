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
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

const ProjectsController = () => import('#controllers/projects_controller')

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
  .use(middleware.auth())
