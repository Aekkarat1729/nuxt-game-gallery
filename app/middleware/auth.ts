function parseJwt(token: string | null): { role?: string } | null {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export default defineNuxtRouteMiddleware(async (to) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token) {
    return navigateTo('/login');
  }

  // Decode JWT
  const payload = parseJwt(token);
  if (!payload || !payload.role) {
    localStorage.removeItem('token');
    return navigateTo('/login');
  }

  // Check route access based on role
  if (to.path.startsWith('/admin') && payload.role !== 'admin') {
    return navigateTo('/user');
  } else if (to.path.startsWith('/user') && payload.role !== 'user') {
    return navigateTo('/admin');
  }

  // Allow access
  return;
});