import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {ButtonToolbar, Button} from 'react-bootstrap';


import { fetchArtist } from '../redux/actions'

class YearSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {
    console.log(this)
    return (
      <ButtonToolbar>
        <Button variant="outline-dark" size="lg"><i class="fas fa-chevron-left"></i></Button>
        <Button variant="outline-dark" size="lg">{this.props.releaseYears[0]}</Button>
        <Button variant="outline-dark" size="lg"><i class="fas fa-chevron-right"></i></Button>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    releaseYears: state.releaseYears
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchArtist }, dispatch);

export default connect(mapStateToProps, { fetchArtist })(YearSelector)