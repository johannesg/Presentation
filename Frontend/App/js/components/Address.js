import React from 'react'
import { Row, Col, Button, Modal, ModalTrigger } from 'react-bootstrap'

export var EditAddress = React.createClass({
  //mixin: [PureRenderMixin],
  getInitialState() {
    return this.props.address;
  },

  ok() {
    this.props.onSetAddress(this.state);

    this.props.onRequestHide();
  },

  onChange(field, event) {
    let s = {};
    s[field] = event.target.value;
    this.setState(s);
  },

  render() {
    return <Modal {...this.props}>
      <div className='modal-body'>
        <form>
          <div className="form-group">
            <label htmlFor="address.name">Namn</label>
            <input type="text" className="form-control" id="address.name" placeholder="Namn"
              onChange={this.onChange.bind(this, 'name')}
              value={this.state.name} />
            <label htmlFor="address.address">Adress</label>
            <input type="text" className="form-control" id="address.address" placeholder="Adress"
              onChange={this.onChange.bind(this, 'address')}
              value={this.state.address} />
          <Row>
            <Col md={3}>
              <label htmlFor="address.zipcode">Postnr</label>
              <input type="text" className="form-control" id="address.zipcode" placeholder="Postnr"
                onChange={this.onChange.bind(this, 'zipcode')}
                value={this.state.zipcode} />
          </Col>
          <Col md={9}>
            <label htmlFor="address.city">City</label>
            <input type="text" className="form-control" id="address.city" placeholder="City"
              onChange={this.onChange.bind(this, 'city')}
              value={this.state.city} />
        </Col>
      </Row>
    </div>
    <div className='modal-footer'>
      <Button bsStyle='primary' onClick={this.ok}>Spara</Button>
      <Button onClick={this.props.onRequestHide}>Avbryt</Button>
    </div>
  </form>
</div>
    </Modal>
  }
});

export var EditAddressButton = React.createClass({
  render() {
    return <ModalTrigger modal={<EditAddress {...this.props} onSetAddress={this.props.onSetAddress} />}>
      <Button bsStyle='primary' bsSize='small'>Ändra</Button>
    </ModalTrigger>
  }
});

