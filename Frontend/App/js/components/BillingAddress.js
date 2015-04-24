import React from 'react'
import { Row, Col } from './Common'
import { Button, Modal, ModalTrigger } from 'react-bootstrap'
import { EditAddressButton } from './Address'
import Store from '../stores/BillingStore'
import Actions from '../actions/BillingActions'

var BillingAddress = React.createClass({
  //mixin: [PureRenderMixin],
  getInitialState() {
    return Store.getBillingAddress();
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
    this.setState(Store.getBillingAddress());
  },

  onSetAddress(address) {
    console.debug(address);
    Actions.updateBillingAddress(address);
  },

  render() {
  
    return <div>
      <h4>
        Faktureringsaddress
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

        <EditAddressButton address={this.state} onSetAddress={this.onSetAddress}>
          
        </EditAddressButton>
        
      </div>
    </div>


  }
});

export default BillingAddress
