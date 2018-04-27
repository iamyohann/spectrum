import { ipcRenderer } from 'electron';
import { schema, normalize } from 'normalizr';
import { fetchAllAccounts, fetchAllRegions } from '../reducers/accounts';

const accountSchema = new schema.Entity('account', {}, {
  idAttribute: 'accountName'
});

const regionSchema = new schema.Entity('region', {}, {
  idAttribute: 'RegionName'
});

const accountListSchema = new schema.Array(accountSchema);
const regionListSchema = new schema.Array(regionSchema);

const listAccounts = (store) => {
  ipcRenderer.on('account.list.response', (event, res) => {
    const accounts = res.data.map(item => ({
      accountName: item.account,
      ...(JSON.parse(item.password)),
    }));

    const { entities: { account: normalizedAccountList } } = normalize(accounts, accountListSchema);


    store.dispatch(fetchAllAccounts(normalizedAccountList));
  });
};

const listRegions = (store) => {
  ipcRenderer.on('regions.list.response', (event, res) => {
    const normalized = normalize(res.data.Regions, regionListSchema);
    store.dispatch(fetchAllRegions(normalized.entities.region));
  });
};

const register = (store) => {
  listAccounts(store);
  listRegions(store);
};

export { register };
