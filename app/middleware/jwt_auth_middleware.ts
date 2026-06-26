import jwtAuthService from '#services/jwt_auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class JwtAuthMiddleware {
  redirectTo = '/?login=1'

  async handle(ctx: HttpContext, next: NextFn) {
    const user = await jwtAuthService.authenticateRequest(ctx)

    if (!user) {
      if (this.expectsJson(ctx)) {
        return ctx.response.status(401).send({
          message: 'Autenticação necessária.',
        })
      }

      return ctx.response.redirect(this.redirectTo, true)
    }

    ctx.jwtUser = user

    return next()
  }

  private expectsJson(ctx: HttpContext) {
    const accept = ctx.request.header('accept', '') ?? ''

    return ctx.request.header('x-inertia') !== undefined || accept.includes('application/json')
  }
}
