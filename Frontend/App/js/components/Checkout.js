import React from 'react'
import $ from 'jquery'
import { Row, Col, Button } from 'react-bootstrap'
import ShoppingCartActions from '../actions/ShoppingCartActions'
import ShoppingCartWidget from './ShoppingCartWidget'
import BillingAddress from './BillingAddress'
import DeliveryAddress from './DeliveryAddress'
import ShoppingCartList from './ShoppingCartList'

var Checkout = React.createClass({
  //mixin: [PureRenderMixin],

  onConfirmOrder() {
    
  },

  render() {
    return <div>
      <Row>
        <Col md={4}>
          <BillingAddress/>
        </Col>
        <Col md={4}>
          <DeliveryAddress/>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ShoppingCartList/>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <Button bsStyle='primary' className='pull-right'>
            Bekräfta order
          </Button>
        </Col>
      </Row>
    </div>
  }
});

export default Checkout
