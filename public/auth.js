const API_BASE = 'http://localhost:5050/api';

async function apiRequest(endpoint, data) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.message || 'Something went wrong');
    }
    return result;
  } catch (err) {
    throw err;
  }
}

function saveSession(token, role, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('role', role);
  localStorage.setItem('user', JSON.stringify(user));
}

function showError(elementId, message) {
  const el = document.getElementById(elementId);
  el.textContent = message;
  el.style.display = 'block';
}

function redirectByRole(role) {
  if (role === 'patient') window.location.href = 'patient-dashboard.html';
  else if (role === 'doctor') window.location.href = 'doctor-dashboard.html';
  else if (role === 'admin') window.location.href = 'admin-dashboard.html';
}