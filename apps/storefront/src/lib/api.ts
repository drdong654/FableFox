const apiBaseUrl = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '')

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  const hasBody = options.body !== undefined && options.body !== null

  if (hasBody && !(options.body instanceof FormData) && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`, {
    ...options,
    credentials: 'include',
    headers,
  })

  const isJson = response.headers.get('content-type')?.includes('application/json')
  const payload = isJson ? await response.json() : await response.text()

  if (!response.ok) {
    const message = typeof payload === 'object' && payload && 'message' in payload
      ? String(payload.message)
      : 'Не удалось выполнить запрос'
    throw new ApiError(message, response.status)
  }

  return payload as T
}
