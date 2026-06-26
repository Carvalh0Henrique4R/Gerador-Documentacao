export function csrfHeaders(): Record<string, string> {
  const token = xsrfToken()
  const headers: Record<string, string> = {}

  if (token) {
    headers['X-XSRF-TOKEN'] = token
  }

  return headers
}

function xsrfToken() {
  if (typeof document === 'undefined') {
    return null
  }

  const cookie = document.cookie.split('; ').find((item) => item.startsWith('XSRF-TOKEN='))

  if (!cookie) {
    return null
  }

  return cookie.slice('XSRF-TOKEN='.length)
}
