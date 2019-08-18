import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import _ from 'lodash'

import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Brush, Label } from 'recharts';
import { fetchArtist } from '../redux/actions'

const data = () => {
  let tmp = []
  tmp.push(['Year', 'Sales', 'Expenses', 'Profit'])
  for (let i = 1990; i<2019; i = i+1) {
    tmp.push({ name: i, uv: 400 }) 
  }
  console.log('>>>>', tmp)
  return tmp
}

class Chart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  static getDerivedStateFromProps (props, state) {
    console.log('RECEIVE PROPS', props, state)
    return null
  }

  renderBars () {
    let bars = []
    for (let i = 0; i < this.props.albumsPerYear; i++) {
      console.log(this.props.albumsPerYear)
      console.log('index chart', i+1)
      bars.push(
        <Bar dataKey={`album${i+1}`} fill="#8884d8" />
      )
    }
    return bars
  }

  render() {
    console.log(this)
    if (_.isEmpty(this.props.albums)) return <div />
    return (
      <BarChart width={800} height={500} data={this.props.albums} margin={{
          top: 50, right: 30, left: 20, bottom: 5,
          }} >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.renderBars()}
        <Brush data={this.props.albums} startIndex={15}/>
        <ReferenceArea layout={'vertical'} x1={2017} x2={null}>
          <Label value="Atual" position="top" />
        </ReferenceArea>
      </BarChart>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('STATE: ', state)
  return {
    albums: state.albums,
    albumsPerYear: state.albumsPerYear,
    releaseYears: state.releaseYears
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchArtist }, dispatch);

export default connect(mapStateToProps, { fetchArtist })(Chart)