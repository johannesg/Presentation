import React from 'react'
import $ from 'jquery'
import { Row, Col } from './Common'
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

  componentWillReceiveProps(newProps) {
  },

  addToCart(item, event) 
  {
    event.preventDefault();
    ShoppingCartActions.addToCart(item);
  },

  render() {

    let items = this.state.articles.map(i => <tr key={i.Id} >
      <td className='article-image'>
        <img src={i.ImageUrl}></img>
      </td>
      <td className='vert-align'>
        {i.Description}
      </td>
      <td className='vert-align'>
        {i.Price} kr
      </td>
      <td>
        <a href='#' onClick={this.addToCart.bind(this, i)} className='fa fa-shopping-cart fa-3x'>

        </a> 
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
      <Col span='8'>
        <ArticleList>

        </ArticleList>
        <ShoppingCartWidget>

        </ShoppingCartWidget>
      </Col>
    </Row>
  }
});

export default Articles
