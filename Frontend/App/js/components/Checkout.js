import React from 'react'
import $ from 'jquery'
import { Row, Col, Button } from 'react-bootstrap'
import ShoppingCartActions from '../actions/ShoppingCartActions'
import ShoppingCartWidget from './ShoppingCartWidget'
import BillingAddress from './BillingAddress'
import DeliveryAddress from './DeliveryAddress'
import ShoppingCartList from './ShoppingCartList'
import uuid from 'node-uuid'  
import Actions from '../actions/CheckoutActions'

require('../stores/OrderingStore');
require('../stores/InventoryStore');

var Checkout = React.createClass({
  //mixin: [PureRenderMixin],

  onConfirmOrder() {
    let orderId = uuid.v4();

    console.log(`Order id: ${orderId}`);
    Actions.confirmOrder(orderId);
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
          <Button bsStyle='primary' className='pull-right' onClick={this.onConfirmOrder}>
            Bekräfta order
          </Button>
        </Col>
      </Row>
    </div>
  }
});

export default Checkout
