import React from 'react'
import $ from 'jquery'

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

  addToCart(id) 
  {
    console.debug(`Item ${id} added to cart`);
  },

  render() {

    let items = this.state.articles.map(i => <tr key={i.Id} >
      <td className='article-image'>
        <img src={i.ImageUrl}></img>
      </td>
      <td className='pull-left'>
        {i.Description}
      </td>
      <td>
        <a onClick={this.addToCart.bind(this, i.Id)} className='fa fa-shopping-cart'>
         
       </a> 
      </td>
      <td className='pull-right'>
        {i.Price} kr
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
    return <div className='row'>
      <div className='col-md-8'>
        <ArticleList>
          
        </ArticleList>
        
      </div>
    </div>
  }
});

export default Articles
