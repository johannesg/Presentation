import React from 'react'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
import ShoppingCartActions from '../actions/ShoppingCartActions'
import ShoppingCartWidget from './ShoppingCartWidget'
import { getAjax } from '../stores/Ajax'

import ArticleStore from '../stores/ArticleStore'
import BillingStore from '../stores/BillingStore'

var ArticleList = React.createClass({
  //mixin: [PureRenderMixin],

  getInitialState() {
    return { articles: [] };
  },

  componentWillMount() {
    this.unsubscribe1 = ArticleStore.addChangeListener(this.onChange);
    this.unsubscribe2 = BillingStore.addChangeListener(this.onChange);
  },

  componentWillUnmount() {
    this.unsubscribe1();
    this.unsubscribe2();
  },

  onChange() {
    this.setState( { articles: ArticleStore.getArticles() });
  },

  addToCart(item, event) 
  {
    event.preventDefault();
    ShoppingCartActions.addToCart(item.id);
  },

  render() {
    let items = this.state.articles.map(i => <tr key={i.id} >
      <td className='article-image'>
        <img src={i.imageUrl}></img>
      </td>
      <td className='vert-align'>
        {i.description}
      </td>
      <td className='vert-align'>
        { BillingStore.getPrice(i.id) } kr
      </td>
      <td>
        <a href='#' onClick={this.addToCart.bind(this, i)} className='fa fa-shopping-cart fa-3x' /> 
      </td>
    </tr>);
    return <table className='table table-striped'>
      {items}
    </table>
  }
});

var Articles = React.createClass({
  //mixin: [PureRenderMixin],

  render() {
    return <Row>
      <Col md={8}>
        <ArticleList/>
        <ShoppingCartWidget/>
      </Col>
    </Row>
  }
});

export default Articles
