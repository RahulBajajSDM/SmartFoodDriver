import {THEME_SET} from '../actions';
const defaultState = {
  theme: 'default',
};
export default (state = defaultState, action) => {
  switch (action.type) {
    case THEME_SET:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};
