import React from 'react';
import * as d3 from 'd3';
import styled from 'styled-components';
import Button from '@atlaskit/button';
import MediaServicesZoomInIcon from '@atlaskit/icon/glyph/media-services/zoom-in';
import MediaServicesZoomOutIcon from '@atlaskit/icon/glyph/media-services/zoom-out';
import RefreshIcon from '@atlaskit/icon/glyph/refresh';


class Graph extends React.Component {
  componentDidMount() {
    const zoom = d3.zoom().scaleExtent([-1, 10]);
    zoom.on('zoom', this.zoomed);

    const svg = d3.select('#graph').call(zoom);
    this.initSvg();
    svg.append('g').attr('id', 'graphContent');
  }
  initSvg = () => {
    this.initBackground();
  }
  initBackground = () => {
    const graph = d3.select('#graph');
    const background = graph.append('g').attr('id', 'graphBackground');
    background.append('rect')
      .attr('height', '100%')
      .attr('width', '100%')
      .attr('fill', 'url(#dotPattern)');
  }

  zoomed = () => {
    const rect = d3.selectAll('#graphContent');
    rect.attr('transform', `translate(${d3.event.transform.x}, ${d3.event.transform.y}) scale(${d3.event.transform.k})`).attr('fill', 'red');
  }
  render() {
    return (
      <div className={this.props.className}>
        <div className="controlPanel">
          <Button onClick={this.props.onSync} appearance="primary" iconAfter={<RefreshIcon />}>Sync now</Button>
        </div>
        <svg id="graph" className={this.props.className} />
        <svg height="5" width="5" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <defs>
            <pattern
              id="dotPattern"
              patternUnits="userSpaceOnUse"
              x="10"
              y="10"
              width="20"
              height="20"
            >
              <rect width="20" height="20" fill="black" x="0" y="0" />
              <circle cx="10" cy="10" r="1" style={{ stroke: 'none', fill: '#444' }} />
            </pattern>
          </defs>
        </svg>
        <div className="zoomPanel">
          <Button iconAfter={<MediaServicesZoomInIcon />} />
          <Button iconBefore={<MediaServicesZoomOutIcon />} />
        </div>
      </div>
    );
  }
}
export default styled(Graph)`
  & #graph {
    width: 100%;
    height: 100vh;
    padding-bottom: 30px;
    cursor: pointer;
  }
  & .controlPanel {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  & .zoomPanel {
    position: absolute;
    bottom: 100px;
    right: 10px;
  }

  & .zoomPanel > button {
    clear: both;
    display: block;
  }
`;
