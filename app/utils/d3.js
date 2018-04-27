import * as d3 from 'd3';

const drawNetwork = (res) => {
  console.log('drawing', res);
  const vpc = res.data.VPC.Vpcs[0];

  drawVPC(vpc);
};

const drawVPC = (vpc) => {
  const graphContent = d3.select('#graphContent');

  graphContent.append('circle')
    .attr('r', 50)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('fill', 'rgba(0, 150, 0, 0.8)');
};

export { drawNetwork };
