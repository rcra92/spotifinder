import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {ButtonToolbar, Button} from 'react-bootstrap';

import { incrementYear, decrementYear } from '../redux/actions'

class YearSelector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedYears: this.props.selectedYears
    }
  }

  static getDerivedStateFromProps (props, state) {
    if (props.selectedYears) {
      return {
        selectedYears: props.selectedYears
      }
    }
    return null
  }

  render() {
    return (
      <ButtonToolbar>
        <Button variant="outline-dark"
          size="lg"
          onClick={() => this.props.decrementYear(this.state.selectedYears.current)}
          disabled={!this.props.selectedYears.hasPrevious}><i className="fas fa-chevron-left"></i></Button>
        <Button variant="outline-dark" size="lg">{this.state.selectedYears.current}</Button>
        <Button variant="outline-dark"
          size="lg"
          onClick={() => this.props.incrementYear(this.state.selectedYears.current)}
          disabled={!this.props.selectedYears.hasNext}><i className="fas fa-chevron-right"></i></Button>
      </ButtonToolbar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    releaseYears: state.releaseYears,
    selectedYears: state.selectedYears
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ incrementYear, decrementYear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(YearSelector)