import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import AddToDo from './containers/AddToDo';
import ToDoListContainer from './containers/ToDoListContainer';

import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea } from 'recharts';

// const data = [{ name: 2011, uv: 400, pv: 1000, amt: 3000 }, { name: 2012, uv: 200, amt: 3000 }];

const data = () => {
  let tmp = []
  for (let i = 1900; i<1950; i = i+1) {
    tmp.push({ name: i, uv: 400, pv: 1000, amt: 3000 }) 
  }
  console.log('>>>>', tmp)
  return tmp
}

const renderBarChart = (
  <BarChart width={800} height={500} data={data()}>
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="pv" fill="#8884d8" />
    <Bar dataKey="uv" fill="#82ca9d" />
    <ReferenceArea layout={'vertical'} x1={2012} x2={null} label={(e) => {
      console.log('>>>>', e)
      return (
        <div height={0}>
          Atual
        </div>
      )
    }} />
  </BarChart>
);
class App extends Component {
  render() {
    return (
      <Container>
        <Row className="row">
          <Col xs={12}>
            <h1>To Do List</h1>
            <AddToDo />
            <ToDoListContainer />
          </Col>
        </Row>
        {renderBarChart}
      </Container>
    );
  }
}

export default App;