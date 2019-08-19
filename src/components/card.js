import React, { Component } from 'react';
import {Button, Card, Row} from 'react-bootstrap';

export default class CustomCard extends Component {
  render() {
    return (
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Row>
            <Card.Title>{this.props.order}</Card.Title>
          </Row>
          <Card.Text>
            {this.props.name}
          </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    );
  }
}
