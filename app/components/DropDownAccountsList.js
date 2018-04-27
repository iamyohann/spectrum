import React from 'react';
import { connect } from 'react-redux';
import {
  DropdownItem
} from '@atlaskit/dropdown-menu';
import Lozenge from '@atlaskit/lozenge';

import { switchAccount } from '../reducers/accounts';

const mapState = (state) => (
  {
    accounts: state.accounts,
  }
);

class DropDownAccountsList extends React.Component {
  render() {
    const activeAccountName = this.props.accounts.active;
    const accounts = Object.keys(this.props.accounts.list).map(accountName => {
      return (
        <DropdownItem key={accountName} onClick={() => this.props.switchAccount(accountName)}>
          {accountName} { accountName === activeAccountName &&
            <Lozenge appearance="success" isBold>Active</Lozenge>
          }
        </DropdownItem>
      );
    });
    return accounts;
  }
}

export default connect(({ accounts }) => ({
  accounts
}), { switchAccount })(DropDownAccountsList);
