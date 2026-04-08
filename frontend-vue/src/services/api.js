const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
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
