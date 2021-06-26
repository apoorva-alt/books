import { FETCH_ALL, FETCH_BY_SEARCH, FETCH_POST, CREATE, UPDATE, DELETE, LIKE, GET_POST_ERROR, CLEAR_ERROR} from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, isLoading: true, error:'' };
    case 'END_LOADING':
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
        error:''
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case FETCH_POST:
      return { ...state, post: action.payload.post, error:''};
    case LIKE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case GET_POST_ERROR: 
      return { ...state, error: action.payload, isLoading: false };
    case CLEAR_ERROR: 
    return { ...state, error: null };
    default:
      return state;
  }
};

