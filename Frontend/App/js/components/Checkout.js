import React from 'react'
import $ from 'jquery'
import { Row, Col } from './Common'
import ShoppingCartActions from '../actions/ShoppingCartActions'
import ShoppingCartWidget from './ShoppingCartWidget'
import BillingAddress from './BillingAddress'
import DeliveryAddress from './DeliveryAddress'

var Checkout = React.createClass({
  //mixin: [PureRenderMixin],

  render() {
    return <div>
      <Row>
        <Col span='4'>
          <BillingAddress>

          </BillingAddress>
        </Col>
        <Col span='4'>
          <DeliveryAddress>

          </DeliveryAddress>
        </Col>
      </Row>
    </div>
  }
});

export default Checkout
