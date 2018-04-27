import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  messages: {},
};

const { addLoadingMessage, removeLoadingMessage } = createActions({
  ADD_LOADING_MESSAGE: (id, message) => ({ id, message }),
  REMOVE_LOADING_MESSAGE: (id) => ({ id })
});

const reducer = handleActions({
  [addLoadingMessage]: (state, { payload: { id, message } }) => {
    return {
      ...state,
      messages: {
        ...state.messages,
        [id]: message,
      },
    };
  },
  [removeLoadingMessage]: (state, { payload: { id } }) => {

    const newState = {
      ...state,
    };

    delete newState.messages[id];

    return newState;
  },
}, defaultState);

export { addLoadingMessage, removeLoadingMessage };

export default reducer;
