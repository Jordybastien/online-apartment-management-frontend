import { FETCH_APARTMENTS } from '../actions/actionTypes';

export default function apartments(state = {}, action) {
  switch (action.type) {
    case FETCH_APARTMENTS:
      return {
        ...state,
        ...action.apartments,
      };

    default:
      return state;
  }
}
