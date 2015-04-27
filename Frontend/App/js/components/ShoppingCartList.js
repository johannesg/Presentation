import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import Actions from '../actions/ShoppingCartActions'
import Store from '../stores/ShoppingCartStore'

var ShoppingCartList = React.createClass({
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

  componentWillReceiveProps(newProps) {
  },

  render() {
    if (!this.state.items.length)
      return <div><h3>Men, du har ju inte köpt något...</h3></div>

    let items = this.state.items.map(i => <tr key={i.id} >
      <td className='article-image'>
        <img src={i.article.ImageUrl}></img>
      </td>
      <td className='vert-align'>
        {i.article.Description}
      </td>
      <td className='vert-align'>
        {i.article.Price} kr
      </td>
      <td className='vert-align'>
        {i.count} st
      </td>
      <td className='vert-align'>
        {i.article.Price * i.count} kr
      </td>
    </tr>);

    let total = _.reduce(this.state.items, (total, i) => total + i.article.Price * i.count, 0);

    return <table className='table table-striped'>
      <thead>
        <tr>
          <th>
          </th>
          <th>
            Beskrivning
          </th>
          <th>
            Pris
          </th>
          <th>
            Antal
          </th>
          <th>
            Totalt
          </th>
        </tr>
        
      </thead>
      <tbody>
        {items}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan='3'/>
          <td>
            <strong>
              Totalt
            </strong>
          </td>
          <td>
            <strong>
              {total} kr
            </strong>
          </td>
        </tr>
      </tfoot>
    </table>
  }
});

export default ShoppingCartList
