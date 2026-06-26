import jwtAuthService from '#services/jwt_auth_service'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Silent auth middleware can be used as a global middleware to silent check
 * if the user is logged-in or not.
 *
 * The request continues as usual, even when the user is not logged-in.
 */
export default class SilentAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const jwtUser = await jwtAuthService.authenticateRequest(ctx)
    if (jwtUser) {
      ctx.jwtUser = jwtUser
    }

    await ctx.auth.check()

    return next()
  }
}
