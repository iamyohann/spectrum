import React, { Component } from 'react';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Tabs from '@atlaskit/tabs';
import Accounts from '../components/Settings/Accounts';
import Preferences from '../components/Settings/Preferences';

const tabs = [
  { label: 'Preferences', content: <Preferences /> },
  { label: 'Accounts', content: <Accounts /> },
];
export default class Setting extends Component {
  render() {
    return (
      <ContentWrapper>
        <PageTitle>Settings</PageTitle>
        <Tabs
          tabs={tabs}
        />
      </ContentWrapper>
    );
  }
}
