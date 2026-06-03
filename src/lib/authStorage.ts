const REMEMBER_ME_KEY = "remember_me"
const ACCESS_TOKEN_KEY = "access_token"
const USER_ID_KEY = "user_id"
const MUST_CHANGE_PASSWORD_KEY = "must_change_password"

export const getRememberMeValue = () => {
  return localStorage.getItem(REMEMBER_ME_KEY) === "true"
}

export const saveRememberMeValue = (rememberMe: boolean) => {
  localStorage.setItem(REMEMBER_ME_KEY, rememberMe ? "true" : "false")
}

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY)
}

export const saveAccessToken = (accessToken: string) => {
  if (getRememberMeValue()) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
    return
  }

  sessionStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
  sessionStorage.removeItem(ACCESS_TOKEN_KEY)
}

export const getUserId = () => {
  return localStorage.getItem(USER_ID_KEY) || sessionStorage.getItem(USER_ID_KEY)
}

export const saveUserId = (userId: string) => {
  if (getRememberMeValue()) {
    localStorage.setItem(USER_ID_KEY, userId)
    sessionStorage.removeItem(USER_ID_KEY)
    return
  }

  sessionStorage.setItem(USER_ID_KEY, userId)
  localStorage.removeItem(USER_ID_KEY)
}

export const removeUserId = () => {
  localStorage.removeItem(USER_ID_KEY)
  sessionStorage.removeItem(USER_ID_KEY)
}

export const getMustChangePassword = () => {
  return localStorage.getItem(MUST_CHANGE_PASSWORD_KEY) || sessionStorage.getItem(MUST_CHANGE_PASSWORD_KEY)
}

export const saveMustChangePassword = () => {
  if (getRememberMeValue()) {
    localStorage.setItem(MUST_CHANGE_PASSWORD_KEY, "true")
    sessionStorage.removeItem(MUST_CHANGE_PASSWORD_KEY)
    return
  }

  sessionStorage.setItem(MUST_CHANGE_PASSWORD_KEY, "true")
  localStorage.removeItem(MUST_CHANGE_PASSWORD_KEY)
}

export const removeMustChangePassword = () => {
  localStorage.removeItem(MUST_CHANGE_PASSWORD_KEY)
  sessionStorage.removeItem(MUST_CHANGE_PASSWORD_KEY)
}
