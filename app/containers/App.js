import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Flag, { FlagGroup } from '@atlaskit/flag';
import Modal from '@atlaskit/modal-dialog';
import Page from '@atlaskit/page';
import '@atlaskit/css-reset';
import { Grid, GridColumn } from '@atlaskit/page';
import StarterNavigation from '../components/StarterNavigation';
import ContentWrapper from '../components/ContentWrapper';
import { fontSize } from '@atlaskit/theme';
import styled from 'styled-components';

class App extends Component {
  state = {
    flags: [],
    isModalOpen: false,
  };

  static contextTypes = {
    navOpenState: PropTypes.object,
    router: PropTypes.object,
  };

  static propTypes = {
    navOpenState: PropTypes.object,
    onNavResize: PropTypes.func,
  };

  static childContextTypes = {
    showModal: PropTypes.func,
    addFlag: PropTypes.func,
  }

  getChildContext() {
    return {
      showModal: this.showModal,
      addFlag: this.addFlag,
    };
  }

  showModal = () => {
    this.setState({ isModalOpen: true });
  }

  hideModal = () => {
    this.setState({ isModalOpen: false });
  }

  addFlag = () => {
    this.setState({ flags: [{ id: Date.now() }].concat(this.state.flags) });
  }

  onFlagDismissed = (dismissedFlagId) => {
    this.setState({
      flags: this.state.flags.filter(flag => flag.id !== dismissedFlagId),
    });
  }

  render() {
    return (
      <div className={this.props.className}>
        <Page
          data-lol="999"
          navigationWidth={this.context.navOpenState.width}
          navigation={<StarterNavigation onNavResize={this.props.onNavResize} />}
        >
          {this.props.children}
        </Page>
      </div>
    );
  }
}

// <div style={{ padding: '5px 10px', position: 'fixed', bottom: '0px', right: '0px' }}>
//             <div style={{
//               padding: '2px 4px',
//               background: 'rgb(222, 235, 255)',
//               color: 'rgb(7, 71, 166)',
//               fontWeight: '700',
//               textTransform: 'uppercase',
//               fontSize: '10px',
//               borderRadius: '4px',
//               border: 'solid 1px #ddd'
//             }}>
//               Account: <u>435453454534</u>
//               <br />
//               Region: <u>Sydney, Australia</u>
//             </div>
//           </div>

export default styled(App)`
`;
