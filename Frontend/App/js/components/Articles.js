import React from 'react'
import $ from 'jquery'
import { Row, Col } from 'react-bootstrap'
import ShoppingCartActions from '../actions/ShoppingCartActions'
import ShoppingCartWidget from './ShoppingCartWidget'

var ArticleList = React.createClass({
  //mixin: [PureRenderMixin],

  getInitialState() {
    return { articles: [] };
  },

  componentWillMount() {
    $.get('/api/articles')
    .then(result => {
      this.setState({ articles: result });
    });
  },

  addToCart(item, event) 
  {
    event.preventDefault();
    ShoppingCartActions.addToCart(item);
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
        {i.price} kr
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
