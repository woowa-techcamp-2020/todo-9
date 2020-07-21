export type MethodType = 'GET' | 'POST' | 'DELETE' | 'PUT'

export const fetchWrapper = async <T, B>(
  method: MethodType,
  url: string,
  body?: B
): Promise<T> => {
  try {
    const baseUrl = '/api'
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
