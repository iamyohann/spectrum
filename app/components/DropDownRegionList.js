import React from 'react';
import { connect } from 'react-redux';
import {
  DropdownItem
} from '@atlaskit/dropdown-menu';
import Lozenge from '@atlaskit/lozenge';

import { switchRegion } from '../reducers/accounts';

const mapState = (state) => (
  {
    accounts: state.accounts,
  }
);

class DropDownAccountsList extends React.Component {
  render() {
    const activeRegionName = this.props.accounts.region;
    const accounts = Object.keys(this.props.accounts.regions).map(regionName => {
      return (
        <DropdownItem key={regionName} onClick={() => this.props.switchRegion(regionName)}>
          {regionName} { regionName === activeRegionName &&
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
}), { switchRegion })(DropDownAccountsList);
