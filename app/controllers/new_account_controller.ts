import User from '#models/user'
import { inertiaPages } from '#services/inertia_pages'
import jwtAuthService from '#services/jwt_auth_service'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class NewAccountController {
  async create({ inertia }: HttpContext) {
    return inertia.render(inertiaPages.auth.signup, {})
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(signupValidator)
    const user = await User.create({ ...payload })
    const token = jwtAuthService.issueToken(user)

    jwtAuthService.setAuthCookie(response, token)
    return response.redirect().toRoute('home')
  }
}
