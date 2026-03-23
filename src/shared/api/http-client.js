export class ApiError extends Error {
  constructor({ message, status, statusText, url, body }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.statusText = statusText;
    this.url = url;
    this.body = body;
  }
}

export function isAbortError(error) {
  return (
    Boolean(error) && typeof error === 'object' && error.name === 'AbortError'
  );
}

async function readResponseBody(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');

  if (isJson) {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  try {
    return await response.text();
  } catch {
    return null;
  }
}

export async function fetchJson(url, { signal, method, headers, body } = {}) {
  const response = await fetch(url, {
    signal,
    method,
    headers,
    body,
  });

  if (!response.ok) {
    const responseBody = await readResponseBody(response);
    throw new ApiError({
      message: `Request failed: ${response.status} ${response.statusText}`,
      status: response.status,
      statusText: response.statusText,
      url,
      body: responseBody,
    });
  }

  return response.json();
}
