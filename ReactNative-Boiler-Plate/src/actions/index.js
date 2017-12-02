export const updateMessage = (message) => {
  return {
    type: 'UPDATE_MESSAGE',
    payload: message
  }
}

export const updateVal = (val) => ({ type: 'UPDATE_VAL', payload: val })
