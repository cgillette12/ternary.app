export const apiFetch = async <T>(
  path: string,
  options?: {
    body?: any,
    headers?: any,
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  },
): Promise<T> => {
  try {
    const { body, headers = {}, method = 'GET' } = options ?? {};
    const methodToUse = (method) || (body ? 'POST' : 'GET');
    const requestBody = body ? JSON.stringify(body) : body;

    const res = await fetch(`https://ternary.app/quiz/${path}`, {
      method: methodToUse,
      body: requestBody,
      headers: {
        ...headers,
      },
    });
    if (!res.ok) {
      const data = await res.json();
      throw (data.error);
    } else {

      return await res.json() as T;
    }
  } catch (e) {
    throw e;
  }
};