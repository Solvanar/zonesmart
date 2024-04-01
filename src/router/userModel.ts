import { authRefresh } from '../api/api';

export const REFRESH_TOKEN = 'refresh_token'
export const ACCESS_TOKEN = 'access_token'

export const user = {
  token: '',
  isLoggedIn: false,
  async refresh() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)

    if (!refreshToken) {
      this.removeToken()
      return false
    }

    try {
      const result = await authRefresh(refreshToken)
      console.log(result)
      if (!result) {
        this.removeToken()
        return false
      }
      this.setToken(result.token, result.refresh)
      return true
    } catch (error) {
      console.error(error)
    }
    return false
  },
  getToken() {
    if (!this.token) {
      this.token = localStorage.getItem(ACCESS_TOKEN) || '';
      this.isLoggedIn = true;
    }
    return this.token;
  },
  setToken(access, refresh) {
    this.token = access;
    localStorage.setItem(REFRESH_TOKEN, refresh);
    localStorage.setItem(ACCESS_TOKEN, access);
  },
  removeToken() {
    this.token = '';
    this.isLoggedIn = false;
    localStorage.removeItem(REFRESH_TOKEN);
    localStorage.removeItem(ACCESS_TOKEN);
  },
}