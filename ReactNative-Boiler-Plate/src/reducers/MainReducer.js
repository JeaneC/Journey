const MainReducerDefaultState = {
  message : '',
  simple: false,
  uid: null,
  val: null,
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
    default:
      return state;
  }
};
