const MainReducerDefaultState = {
  message : '',
  simple: false,
  uid: null,
  name: null,
  val: null,
  token: null,
  events: null,
  eventId: null,
  eventTurns: null,
  category: null,
  results: null,
  region: null
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
    case 'UPDATE_EVENTS':
      return {
        ...state,
        events: action.payload
      }
    case 'UPDATE_EVENT_ID':
      return {
        ...state,
        eventId: action.payload
      }
    case 'UPDATE_EVENT_TURNS':
      return {
        ...state,
        eventTurns: action.payload
      }
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        category: action.payload
      }
    case 'UPDATE_RESULTS':
      return {
        ...state,
        results: action.payload
      }
    case 'UPDATE_REGION':
      return {
        ...state,
        region: action.payload
      }
    default:
      return state;
  }
};
