import axios from 'axios'

export const login = async (email: string, password: string): Promise<any> => {
  try {
    return await axios.post(
      `https://dev-ar.zonesmart.com/api/user/jwt/create/`,
      {
        email,
        password,
      }
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