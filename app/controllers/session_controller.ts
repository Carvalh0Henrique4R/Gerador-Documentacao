import User from '#models/user'
import jwtAuthService from '#services/jwt_auth_service'
import { inertiaPages } from '#services/inertia_pages'
import UserTransformer from '#transformers/user_transformer'
import { loginValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render(inertiaPages.auth.login, {})
  }

  async store({ request, response, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      const token = jwtAuthService.issueToken(user)

      jwtAuthService.setAuthCookie(response, token)

      if (this.expectsJson(request)) {
        return {
          token,
          user: UserTransformer.transform(user),
        }
      }

      return response.redirect().toRoute('home')
    } catch {
      if (this.expectsJson(request)) {
        return response.status(401).send({
          message: 'E-mail ou senha inválidos.',
        })
      }

      session.flash('error', 'E-mail ou senha inválidos.')
      return response.redirect().back()
    }
  }

  async me(ctx: HttpContext) {
    const user = ctx.jwtUser ?? (await jwtAuthService.authenticateRequest(ctx))

    if (!user) {
      return ctx.response.status(401).send({
        authenticated: false,
      })
    }

    return {
      authenticated: true,
      user: UserTransformer.transform(user),
    }
  }

  async destroy({ request, response }: HttpContext) {
    jwtAuthService.clearAuthCookie(response)

    if (this.expectsJson(request)) {
      return {
        success: true,
      }
    }

    return response.redirect().toRoute('landing')
  }

  private expectsJson(request: HttpContext['request']) {
    const accept = request.header('accept', '') ?? ''

    return (
      request.header('x-requested-with') === 'XMLHttpRequest' || accept.includes('application/json')
    )
  }
}
