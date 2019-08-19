import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {Container, Row} from 'react-bootstrap';
import _ from 'lodash'

import CustomCard from '../components/card'

import { fetchAlbumInfo } from '../redux/actions'

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: this.props.album
    }
  }

  componentDidMount () {
    this.props.fetchAlbumInfo()
  }

  static getDerivedStateFromProps (props, state) {
    if (props.album) {
      return {
        album: props.album
      }
    }

    return null
  }

  filterList (event) {
    let updatedList = this.state.initialItems;
    updatedList = updatedList.filter(function(item){
      return item.toLowerCase().search(
        event.target.value.toLowerCase()) !== -1;
    });
    this.setState({items: updatedList})
  }

  renderList() {
    if (_.isEmpty(this.state.album)) return
    let cards = []
    this.state.album.map((e, index) => {
        cards.push(
          <CustomCard
            name={e.name}
            order={e.track_number}
            explicit={e.explicit} />
        )
    })

    return cards
  }

  render() {
    return (
      <Container>
        <div className="filter-list">
          <input type="text" placeholder="Search" onChange={this.filterList}/>
        </div>
        <Row>
          {this.renderList()}
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    album: state.album,
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchAlbumInfo }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search)