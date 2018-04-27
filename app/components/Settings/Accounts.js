import React from 'react';
import { DynamicTableStateless } from '@atlaskit/dynamic-table';
import AddAccount from './AddAccount';
import { ipcRenderer } from 'electron';
import DropdownMenu, {
  DropdownItemGroup,
  DropdownItem,
} from '@atlaskit/dropdown-menu';
import { connect } from 'react-redux';
import MoreVerticalIcon from '@atlaskit/icon/glyph/more-vertical';
import TrashIcon from '@atlaskit/icon/glyph/trash';
import SmartModal from '../SmartModal';
import { fetchAllAccounts } from '../../reducers/accounts';

const createHead = (withWidth) => {
  return {
    cells: [
      {
        key: 'accountName',
        content: 'Name',
        shouldTruncate: false,
        width: withWidth ? 15 : undefined,
      },
      {
        key: 'accessKeyID',
        content: 'Access key ID',
        shouldTruncate: false,
        width: withWidth ? 20 : undefined,
      },
      {
        key: 'accessKeySecret',
        content: 'Secret access key',
        shouldTruncate: true,
        width: withWidth ? 20 : undefined,
      },
      {
        key: 'created',
        content: 'Added on',
        shouldTruncate: false,
        width: withWidth ? 20 : undefined,
      },
      {
        key: 'actions',
        content: '',
        shouldTruncate: false,
        width: withWidth ? 10 : undefined,
      },
    ],
  };
};

const head = createHead(true);

class AccountSettings extends React.Component {
  constructor() {
    super();
    this.state = {
      deleteModal: false,
      page: 1
    };
    this.listenToAccountChanges();
    ipcRenderer.send('account.list', {});
  }
  confirmDeleteAccount = (accountName) => {
    this.setState({
      deleteModal: accountName
    });
  }
  deleteAccount = () => {
    const accountName = this.state.deleteModal;
    ipcRenderer.send('account.delete', accountName);

    this.setState({
      deleteModal: false,
    }, () => {
      ipcRenderer.send('account.list', {});
    });
  }
  listenToAccountChanges = () => {
    ipcRenderer.on('account.create.response', (event, res) => {
      ipcRenderer.send('account.list', {});
    });
    // ipcRenderer.on('account.list.response', (event, res) => {
    //   // const accounts = res.data.map(item => (
    //   //   {
    //   //     accountName: item.account,
    //   //     ...(JSON.parse(item.password)),
    //   //   }
    //   // ));

    //   // this.props.fetchAllAccounts(accounts);
    //   this.setState({
    //     rows: tableData,
    //   });
    // });
  }

  onModalClose = () => {
    this.setState({
      deleteModal: false,
    });
  }
  render() {
    let deleteModal = null;
    const { accounts } = this.props;

    const tableData = Object.keys(accounts.list).map(accountName => {
      const { accessKeyID,
        accessKeySecret, createdOn } = accounts.list[accountName];

      return {
        key: `account-${accountName}`,
        cells: [
          {
            key: `accountName-${accountName}`,
            content: `${accountName}`,
          },
          {
            key: `accessKeyID-${accountName}`,
            content: accessKeyID,
          },
          {
            key: `accessKeySecret-${accountName}`,
            content: accessKeySecret,
          },
          {
            key: `createdOn-${accountName}`,
            content: (new Date(createdOn)).toString()
          },
          {
            key: `actions-${accountName}`,
            content: (
              <DropdownMenu triggerType="button" triggerButtonProps={{}}>
                <DropdownItemGroup>
                  <DropdownItem
                    elemBefore={<TrashIcon />}
                    onClick={() => { this.confirmDeleteAccount(accountName); }}
                  >
                    Delete
                  </DropdownItem>
                </DropdownItemGroup>
              </DropdownMenu>
            )
          }
        ]
      };
    });

    if (this.state.deleteModal) {
      deleteModal = (
        <SmartModal
          heading="Confirm deletion"
          onClose={this.onModalClose}
          actions={
            [
              {
                text: 'Delete account',
                onClick: this.deleteAccount,
                iconBefore: <TrashIcon />,
                appearance: 'danger'
              },
            ]
          }
        >
        This will permanently delete account: <b>{this.state.deleteModal}</b>
          <br />This action cannot be undone.
        </SmartModal>
      );
    }


    return (
      <div key="accountList">
        <DynamicTableStateless
          head={head}
          rows={tableData}
          emptyView={
            <div style={{ padding: '30px 0' }}>
              <h4 style={{ color: '#aaa' }}>No accounts to display</h4>
            </div>
          }
          rowsPerPage={4}
          page={this.state.page}
          loadingSpinnerSize="large"
          isLoading={false}
          isFixedSize
          onSetPage={(page) => this.setState({ page: this.state.page + (page - 1) })}
        />
        <hr />
        <AddAccount />
        {deleteModal}
      </div>
    );
  }
}


export default connect((state) => ({
  accounts: state.accounts,
}), { fetchAllAccounts })(AccountSettings);
