export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'

export const fetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<T> => {
  try {
    const baseUrl = 'http://localhost:3000/api'
    const response = await fetch(baseUrl + url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    const res = await response.json()
    return res
  } catch (err) {
    throw new Error(err)
  }
}
