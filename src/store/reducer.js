const INITIAL_STATE = {
  loading: false,
  error: null,
  kits: null,
  verbs: null,
  kitBuffers: {},
  verbBuffers: {},
  currentKit: 0,
  currentVerb: 0
};

export default function reducer(state, action) {
  console.log('action received', action)
  switch (action.type) {
    case 'IS_LOADING':
        return {
          ...state,
          loading: true
        };
    case 'DATA_LOADED':
      return {
        ...state,
        kits: action.data.kits,
        verbs: action.data.verbs,
        loading: false
      };
    case 'KIT_BUFFERS_LOADED':
      return {
        ...state,
        kitBuffers: action.buffers,
        loading: false
      };
    case 'VERB_BUFFERS_LOADED':
      return {
        ...state,
        verbBuffers: action.buffers,
        loading: false
      };
    case 'CURRENT_KIT':
      return {
        ...state,
        currentKit: action.index
      };
    case 'CURRENT_VERB':
      return {
        ...state,
        currentVerb: action.index
      };
    case 'IS_ERROR':
      return {
        ...state,
        error: action.err
      };
    default:
      throw new Error();
  }
}