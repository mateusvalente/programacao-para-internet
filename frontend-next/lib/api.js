const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    cache: 'no-store',
    ...options
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Erro inesperado' }));
    throw new Error(error.message || 'Erro inesperado');
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}
