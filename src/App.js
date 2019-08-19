import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row } from 'react-bootstrap';

import Artists from './containers/dropdown';

import Chart from './containers/charts'

import YearSelector from './containers/yearSelector'

class App extends Component {

  render() {
    return (
      <Container>
        <Row>
          <Artists />
          <YearSelector />
        </Row>
        <Chart />

      </Container>
    );
  }
}

const mapStateToProps = store => ({
});

export default connect(mapStateToProps)(App);