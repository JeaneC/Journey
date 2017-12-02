const MainReducerDefaultState = {
  message : '',
  simple: false,
  uid: null,
  name: null,
  val: null,
  token: null
}

export default (state = MainReducerDefaultState, action) => {
  switch (action.type){
    case 'UPDATE_MESSAGE':
      return {
        ...state,
        message: action.payload
      }
    case 'UPDATE_VAL':
      return {
        ...state,
        val: action.payload
      }
    case 'UPDATE_TOKEN':
      return {
        ...state,
        token: action.payload
      }
    case 'UPDATE_LOGIN':
      return {
        ...state,
        uid: action.payload.id,
        name: action.payload.name
      }
    case 'UPDATE_NAME':
      return {
        ...state,
        name: action.payload
      }
    default:
      return state;
  }
};
