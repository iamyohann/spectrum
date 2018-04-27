import React from 'react';
import styled from 'styled-components';
import WorldIcon from '@atlaskit/icon/glyph/world';
import PersonCircleIcon from '@atlaskit/icon/glyph/person-circle';
import { connect } from 'react-redux';
import NotificationDirectIcon from '@atlaskit/icon/glyph/notification-direct';
import { setTimeout } from 'timers';

const mapState = (state) => (
  {
    accounts: state.accounts,
  }
);

const UnstyledStatusBarItem = ({ children, ...rest }) => (
  <span className="item" {...rest}>
    {children}
  </span>
);

const StatusBarItem = styled(UnstyledStatusBarItem)`
  &:first-child {
    margin-left: 20px;
  }
  & {
    vertical-align: middle;
    line-height: 30px;
  }
  &:after {
    margin-left: 15px;
    content: '|';
    margin-right: 15px;
  }
  &:last-child:after {
    margin-left: 0px;
    content: '';
    margin-right: 0px;
  }
`;

class StatusBar extends React.Component {
  // TODO: Show all messages
  render() {
    const { active, region } = this.props.accounts;
    let currentMessage = this.props.loading.messages[Object.keys(this.props.loading.messages)[0]];

    if (!currentMessage) {
      currentMessage = 'Idle';
    }

    return (
      <div className={this.props.className}>
        <StatusBarItem>
          <WorldIcon /> {region ? region : 'not selected'}
        </StatusBarItem>
        <StatusBarItem>
          <PersonCircleIcon /> {active ? active : 'not selected'}
        </StatusBarItem>
        <StatusBarItem>
          <NotificationDirectIcon /> {currentMessage}
        </StatusBarItem>
      </div>
    );
  }
}

const StyledStatusBar = styled(StatusBar)`
  position: fixed;
  background: #223843;
  color: white;
  bottom: 0px;
  left: 0px;
  height: 30px;
  padding: 0;
  box-style: border-box;
  z-index: 999;
  width: 100vw;
  background: repeating-linear-gradient(45deg, #004e92, #7a0074, #004e92);
  width: 100%;
  background-size: 200% auto;
  background-position: 0 100%;
  animation: ${(props) => Object.keys(props.loading.messages).length > 0 ? 'gradient 2s infinite' : 'none'};
  animation-fill-mode: forwards;
  animation-timing-function: linear;
  @keyframes gradient {
    0%   { background-position: 0 0; }
    100% { background-position: -200% 0; }
  }
  & > span > span > svg {
    width: 15px;
    height: 15px;
  }
`;

export default connect(({ accounts, loading }) => ({
  accounts,
  loading,
}), {})(StyledStatusBar);
