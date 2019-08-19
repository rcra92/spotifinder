import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Artists from '../containers/dropdown';
import Chart from '../containers/charts'
import YearSelector from '../containers/yearSelector'

export default class Home extends Component {

  render() {
    return (
      <Container>
        <Row className="justify-content-around">
          <Artists />
          <YearSelector />
        </Row>
        <Chart />
      </Container>
    );
  }
}
