export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}

export const updateVal = (val) => ({ type: 'UPDATE_VAL', payload: val })

export const loginFacebook = (data) => ({ type: 'UPDATE_LOGIN', payload: data })

export const storeToken = (token) => ({ type: "UPDATE_TOKEN", payload: token})
