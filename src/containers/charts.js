import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { Link, withRouter } from 'react-router-dom';
import _ from 'lodash'

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ReferenceArea, Brush, Label } from 'recharts';
import { fetchArtist } from '../redux/actions'

class Chart extends Component {
  constructor(props) {
    super(props);
  
    this.state = {};
  }

  static getDerivedStateFromProps (props, state) {
    return null
  }

  handleClick () {
    return null
  }

  renderBars () {
    let bars = []
    for (let i = 0; i < this.props.albumsPerYear; i++) {
      bars.push(
        <Bar onClick={() => this.props.history.push('/album')} dataKey={`album${i+1}`} fill="#8884d8" />
      )
    }
    return bars
  }

  render() {
    if (_.isEmpty(this.props.albums)) return <div />
    return (
      <BarChart width={800} height={500} data={this.props.albums} >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {this.renderBars()}
        <Brush data={this.props.albums} startIndex={Math.floor(this.props.albums.length / 2)}/>
        <ReferenceArea layout={'vertical'} x1={this.props.selectedYears.current} x2={this.props.selectedYears.hasNext}>
          <Label value="Atual" position="top" />
        </ReferenceArea>
      </BarChart>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    albums: state.albums,
    albumsPerYear: state.albumsPerYear,
    selectedYears: state.selectedYears
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchArtist }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Chart))