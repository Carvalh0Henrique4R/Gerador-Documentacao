import User from '#models/user'
import env from '#start/env'
import { createHmac, timingSafeEqual } from 'node:crypto'
import type { HttpContext } from '@adonisjs/core/http'

export const JWT_AUTH_COOKIE = 'docneitor_jwt'

const JWT_ALGORITHM = 'HS256'
const JWT_TTL_SECONDS = 60 * 60 * 2
const JWT_COOKIE_MAX_AGE = '2h'

type JwtHeader = {
  alg: typeof JWT_ALGORITHM
  typ: 'JWT'
}

type JwtPayload = {
  sub: string
  email: string
  fullName: string | null
  iat: number
  exp: number
}

class JwtAuthService {
  issueToken(user: User) {
    const issuedAt = Math.floor(Date.now() / 1000)
    const header: JwtHeader = {
      alg: JWT_ALGORITHM,
      typ: 'JWT',
    }
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      iat: issuedAt,
      exp: issuedAt + JWT_TTL_SECONDS,
    }
    const encodedHeader = this.encode(header)
    const encodedPayload = this.encode(payload)
    const unsignedToken = `${encodedHeader}.${encodedPayload}`

    return `${unsignedToken}.${this.sign(unsignedToken)}`
  }

  setAuthCookie(response: HttpContext['response'], token: string) {
    response.encryptedCookie(JWT_AUTH_COOKIE, token, {
      httpOnly: true,
      maxAge: JWT_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
    })
  }

  clearAuthCookie(response: HttpContext['response']) {
    response.clearCookie(JWT_AUTH_COOKIE, {
      path: '/',
    })
  }

  async authenticateRequest(ctx: HttpContext) {
    const token = this.getTokenFromRequest(ctx)
    if (!token) {
      return null
    }

    const payload = this.verifyToken(token)
    if (!payload) {
      return null
    }

    return User.find(payload.sub)
  }

  private getTokenFromRequest(ctx: HttpContext) {
    const authorization = ctx.request.header('authorization')

    if (authorization?.toLowerCase().startsWith('bearer ')) {
      return authorization.slice('bearer '.length).trim()
    }

    return ctx.request.encryptedCookie(JWT_AUTH_COOKIE) as string | undefined
  }

  private verifyToken(token: string) {
    const [encodedHeader, encodedPayload, signature, ...extraParts] = token.split('.')
    if (!encodedHeader || !encodedPayload || !signature || extraParts.length > 0) {
      return null
    }

    const unsignedToken = `${encodedHeader}.${encodedPayload}`
    if (!this.safeCompare(signature, this.sign(unsignedToken))) {
      return null
    }

    try {
      const header = this.decode<JwtHeader>(encodedHeader)
      const payload = this.decode<JwtPayload>(encodedPayload)
      const now = Math.floor(Date.now() / 1000)

      if (header.alg !== JWT_ALGORITHM || header.typ !== 'JWT') {
        return null
      }
      if (!payload.sub || typeof payload.exp !== 'number' || payload.exp <= now) {
        return null
      }

      return payload
    } catch {
      return null
    }
  }

  private encode(value: object) {
    return Buffer.from(JSON.stringify(value), 'utf8').toString('base64url')
  }

  private decode<T>(value: string) {
    return JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as T
  }

  private sign(value: string) {
    return createHmac('sha256', this.secret).update(value).digest('base64url')
  }

  private safeCompare(value: string, expected: string) {
    const valueBuffer = Buffer.from(value)
    const expectedBuffer = Buffer.from(expected)

    return (
      valueBuffer.length === expectedBuffer.length && timingSafeEqual(valueBuffer, expectedBuffer)
    )
  }

  private get secret() {
    const appKey = env.get('APP_KEY') as unknown as { release?: () => string }

    return typeof appKey.release === 'function' ? appKey.release() : String(appKey)
  }
}

const jwtAuthService = new JwtAuthService()

export default jwtAuthService

declare module '@adonisjs/core/http' {
  interface HttpContext {
    jwtUser?: User
  }
}
