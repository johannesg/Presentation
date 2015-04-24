import React from 'react'
import { Row, Col } from './Common'
import { Button, Modal, ModalTrigger } from 'react-bootstrap'
import { EditAddressButton } from './Address'
import Store from '../stores/ShippingStore'
import Actions from '../actions/ShippingActions'

var DeliveryAddress = React.createClass({
  //mixin: [PureRenderMixin],
  getInitialState() {
    return Store.getDeliveryAddress();
  },

  componentWillMount() {
    this.unsubscribe = Store.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  componentWillReceiveProps(newProps) {
  },

  onChange() {
    this.setState(Store.getDeliveryAddress());
  },

  onSetAddress(address) {
    console.debug(address);
    Actions.updateDeliveryAddress(address);
  },

  useBillingAddress() {
    Actions.useBillingAddress();
  },

  render() {
  
    return <div>
      <h4>
        Leveransadress
      </h4>
      <div>
        {this.state.name}
      </div>
      <div>
        {this.state.address}
      </div>
      <div>
        {this.state.zipcode} {this.state.city}
      </div>
      <div>

        <EditAddressButton onSetAddress={this.onSetAddress}>
          
        </EditAddressButton>
      <Button onClick={this.useBillingAddress}>
        Använd faktureringsadress
      </Button>
        
      </div>
    </div>


  }
});

export default DeliveryAddress

