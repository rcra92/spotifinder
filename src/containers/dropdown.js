import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import { fetchArtist } from '../redux/actions'

class Artists extends Component {
  constructor(props) {
    super(props);

    this.state = {
      location: [
        {
          id: 0,
          title: 'Iron Maiden',
          selected: false,
          key: 'ironMaiden'
        },
        {
          id: 1,
          title: 'Raimundos',
          selected: false,
          key: 'raimundos'
        },
        {
          id: 2,
          title: 'Metallica',
          selected: false,
          key: 'metallica'
        },
        {
          id: 3,
          title: 'Charlie Brown Jr.',
          selected: false,
          key: 'charlieBrown'
        },
        {
          id: 4,
          title: 'Kings of Leon',
          selected: false,
          key: 'kingsOfLeon'
        }
      ]
    }
  }

  resetThenSet = (id, key) => {
    console.log('-----', id, key)
    let temp = JSON.parse(JSON.stringify(this.state.location));
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      location: temp
    });
    this.props.fetchArtist(temp[id].key)
    console.log(':::::', this)
  }

  render() {
    console.log(this)
    return (
      <Dropdown
        title="Select band"
        list={this.state.location}
        resetThenSet={this.resetThenSet}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchArtist }, dispatch);

export default connect(mapStateToProps, { fetchArtist })(Artists)