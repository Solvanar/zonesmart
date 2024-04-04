import axios from 'axios'
import { store } from '../store';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

api.interceptors.request.use(
  config => {
    const token = store.getters.getAccessToken;
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (error.response.data.code === 'token_not_valid' && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await refreshToken();
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

async function refreshToken() {
  const refreshToken = store.getters.getRefreshToken;
  if (!refreshToken) {
    throw new Error('No refresh token');
  }
  const response = await api.post('/refresh', { refreshToken })
  const { access } = response.data
  store.dispatch('setAccessToken', { access })
}

export const login = async (email: string, password: string): Promise<any> => {
  try {
    return await api.post('/login', { email, password })
  } catch(error) {
    console.log(error)
  }
}

export const data = async (limit: number, offset: number): Promise<any> => {
  try {
    return await api.get('/data', { params: { limit, offset } });
  } catch(error) {
    console.log(error)
  }
}