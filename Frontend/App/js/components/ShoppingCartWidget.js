import React from 'react'
import Store from '../stores/ShoppingCartStore'
import _ from 'lodash'
import { Link } from 'react-router'

var ShoppingCartWidget = React.createClass({
  //mixin: [PureRenderMixin],
  getInitialState() {
    return Store.getCart();
  },

  componentWillMount() {
    this.unsubscribe = Store.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    this.unsubscribe();
  },

  onChange() {
    this.setState(Store.getCart());
  },

  render() {
    let summary = _.reduce(this.state.items, (summary, c) => {
          summary.count += c.count;
          summary.amount += c.count * c.price;
        },
        { count: 0, amount: 0});

    let checkoutBtn = null;
    if (itemCount > 0)
      checkoutBtn = <div>
        <Link to='checkout' className='btn btn-primary'>
          Kassa
        </Link>
      </div>

    return <div>
      <div>Antal artiklar: {itemCount}</div>
      {checkoutBtn}
    </div> 
});

export default ShoppingCartWidget
