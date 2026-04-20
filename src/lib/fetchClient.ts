// src/lib/fetchClient.ts


const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const fetchClient = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');

  const headers = new Headers(options.headers);
  headers.set('Accept', 'application/json');

  // Only add content type if not doing a multipart/form-data upload
  if (!(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let errorMessage = 'Something went wrong';
    try {
      const data = await response.json();
      errorMessage = data.message || data.error || errorMessage;
    } catch {
      errorMessage = response.statusText;
    }
    throw new Error(errorMessage);
  }

  // If response is a 204 No Content, return null instead of trying to parse JSON
  if (response.status === 204) {
    return null;
  }

  return response.json();
};
