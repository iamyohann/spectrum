import { createActions, handleActions } from 'redux-actions';

const defaultState = {
  list: [],
  regions: [],
  active: null,
  region: null,
};

const { fetchAllAccounts, fetchAllRegions, switchAccount, switchRegion } = createActions({
  FETCH_ALL_ACCOUNTS: (accounts) => ({ accounts }),
  FETCH_ALL_REGIONS: (regions) => ({ regions }),
  SWITCH_ACCOUNT: (accountName) => ({ accountName }),
  SWITCH_REGION: (region) => ({ region }),
});

const reducer = handleActions({
  [fetchAllAccounts]: (state, { payload: { accounts = [] } }) => {
    return {
      ...state,
      list: accounts,
    };
  },
  [switchAccount]: (state, { payload: { accountName = null } }) => {
    return {
      ...state,
      active: accountName,
    };
  },
  [switchRegion]: (state, { payload: { region = null } }) => {
    return {
      ...state,
      region,
    };
  },
  [fetchAllRegions]: (state, { payload: { regions = [] } }) => {
    return {
      ...state,
      regions,
    };
  }
}, defaultState);

export { fetchAllAccounts, fetchAllRegions, switchAccount, switchRegion };

export default reducer;
