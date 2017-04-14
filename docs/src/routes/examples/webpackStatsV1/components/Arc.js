// @flow weak

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { arc } from 'd3-shape';
import { scaleLinear, scaleSqrt } from 'd3-scale';
import { VIEW, TRBL, COLORS } from '../module/constants';

const dims = [
  VIEW[0] - TRBL[1] - TRBL[3],  // Usable dimensions width
  VIEW[1] - TRBL[0] - TRBL[2],  // Usable dimensions height
];

const radius = Math.min(...dims) / 2;

const x = scaleLinear()
    .range([0, 2 * Math.PI]);

const y = scaleSqrt()
    .range([0, radius]);

const path = arc()
  .startAngle((d) => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
  .endAngle((d) => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
  .innerRadius((d) => Math.max(0, y(d.y0)))
  .outerRadius((d) => Math.max(0, y(d.y1)));

class Arc extends Component {
  static propTypes = {
    data: PropTypes.shape({
      x0: PropTypes.number.isRequired,
      x1: PropTypes.number.isRequired,
      y0: PropTypes.number.isRequired,
      y1: PropTypes.number.isRequired,
      depth: PropTypes.number.isRequired,
    }).isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    removeNode: PropTypes.func.isRequired,
  };

  render() {
    const { data } = this.props;

    return (
      <path
        opacity={0.7}
        fill={COLORS[data.depth]}
        stroke="grey"
        d={path(data)}
      />
    );
  }
}

export default Arc;

