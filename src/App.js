import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap';

import Home from './components/home';
import Search from './containers/search';
import { Route } from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <Container>
        <Route exact path="/" component={Home} />
        <Route exact path="/album" component={Search} />
      </Container>
    );
  }
}

const mapStateToProps = store => ({
});

export default connect(mapStateToProps)(App);