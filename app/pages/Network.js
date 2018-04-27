import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as d3 from 'd3';
import AWS from 'aws-sdk';
import Button, { ButtonGroup } from '@atlaskit/button';
import { connect } from 'react-redux';
import { ipcRenderer } from 'electron';
import MainSection from '../components/MainSection';
import ContentWrapper from '../components/ContentWrapper';
import PageTitle from '../components/PageTitle';
import Graph from '../components/Graph';
import { addLoadingMessage, removeLoadingMessage } from '../reducers/loading';
import { drawNetwork } from '../utils/d3';

class Network extends Component {
  componentDidMount() {
    const graphContent = d3.select('#graphContent');
    graphContent.append('rect')
      .attr('x', 100)
      .attr('y', 100)
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'rgba(255, 0, 0, 0.3)');
  }
  onSync = () => {
    this.props.addLoadingMessage('root', 'Fetching network information...');

    ipcRenderer.once('network.detail.response', (event, res) => {
      drawNetwork(res);
      this.props.removeLoadingMessage('root');
    });
    ipcRenderer.send('network.detail', {
      accountName: 'playground',
      region: 'ap-southeast-2'
    });

  }
  render() {
    return (
      <Graph onSync={this.onSync} />
    );
  }
}

export default connect(({ loading, accounts }) => (
  {
    loading,
    accounts
  }
), { addLoadingMessage, removeLoadingMessage })(Network);
