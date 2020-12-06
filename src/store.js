import { createStore } from 'redux';

const initialState = {
  registryUri: undefined,
  publicKey: undefined,
  nonce: undefined,
  tokensData: undefined,
  bags: undefined,
  bagsData: undefined,
  tab: undefined,
  loading: false,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'INIT': {
      return {
        ...state,
        registryUri: action.payload.registryUri,
        publicKey: action.payload.publicKey,
      };
    }
    case 'SET_LOADING': {
      return {
        ...state,
        loading: action.payload,
      };
    }
    case 'INIT_TOKEN': {
      return {
        ...state,
        publicKey: action.payload.publicKey,
        locked: action.payload.locked,
        nonce: action.payload.nonce,
        tokensData: action.payload.tokensData,
        bags: action.payload.bags,
        bagsData: action.payload.bagsData,
        loading: false,
      };
    }
    case 'UPDATE_NONCE': {
      return {
        ...state,
        nonce: action.payload,
      };
    }
    case 'CHANGE_TAB': {
      return {
        ...state,
        tab: action.payload,
      };
    }
    case 'IDENTIFIED': {
      return {
        ...state,
        identified: true,
      };
    }
    case 'UPDATE_NONCE': {
      return {
        ...state,
        nonce: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const store = createStore(reducer);
