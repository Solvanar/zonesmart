import axios from 'axios'

export const login = async (email: string, password: string): Promise<any> => {
  try {
    return await axios.post(
      'http://localhost:8080/api/login',
      {
        email,
        password
      },
    )
  } catch(error) {
    return error
  }
}

export const authRefresh = async (token: string): Promise<any> => {
  try {
    return await axios.post(
      `https://dev-ar.zonesmart.com/api/user/jwt/refresh/`,
      {
        refresh: token
      }
    )
  } catch(error) {
    return error
  }
}