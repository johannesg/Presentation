import React from 'react'
import $ from 'jquery'
import _ from 'lodash'
import Actions from '../actions/ShoppingCartActions'

import Store from '../stores/ShoppingCartStore'
import ArticleStore from '../stores/ArticleStore'
import BillingStore from '../stores/BillingStore'

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

  render() {
    if (!this.state.items.length)
      return <div><h3>Men, du har ju inte köpt något...</h3></div>

    let total = 0;
    let items = this.state.items.map(i => {
      let article = ArticleStore.getArticle(i.id);
      let price = BillingStore.getPrice(i.id);
      total += price * i.count;
      return <tr key={i.id} >
        <td className='article-image'>
        <img src={article.imageUrl}></img>
      </td>
      <td className='vert-align'>
        {article.description}
      </td>
      <td className='vert-align'>
        {price} kr
      </td>
      <td className='vert-align'>
        {i.count} st
      </td>
      <td className='vert-align'>
        {price} kr
      </td>
    </tr>
    });

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
