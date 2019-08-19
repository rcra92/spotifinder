import React, { Component } from 'react';
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AddToDo from './containers/AddToDo';
import ToDoListContainer from './containers/ToDoListContainer';

import Artists from './containers/dropdown';

import Chart from './containers/charts'

import YearSelector from './containers/yearSelector'

// import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Brush, Label } from 'recharts';

// import Chart from 'react-apexcharts';

// const data = [{ name: 2011, uv: 400, pv: 1000, amt: 3000 }, { name: 2012, uv: 200, amt: 3000 }];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <h1>To Do List</h1>
            <AddToDo />
          </Col>
        </Row>

        <Row className="row">
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