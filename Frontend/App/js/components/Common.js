import React from 'react'
import Router from 'react-router'
import _ from 'lodash'

let Link = Router.Link;

var NavLink = React.createClass({
  //mixin: [PureRenderMixin],
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function() {
    let isActive = this.context.router.isActive(this.props.to, this.props.params, this.props.query);
    return <li className={isActive ? 'active' : ''} >
      <Link {...this.props}>
      </Link>
    </li>
  }
});

class Panel extends React.Component {
  render() {
    let heading = null;
    if (this.props.heading)
      heading = <div className='panel-heading'>{this.props.heading}</div>

    return <div className='panel panel-default'>
      {heading}
      <div className='panel-body'>
        {this.props.children}
      </div>
    </div>
  }
}

class Row extends React.Component {
  render() {
    return <div className='row' style={{marginBottom: 10}}>
      {this.props.children}
    </div>
  }
}

var Col = React.createClass({
  //mixin: [PureRenderMixin],

  render: function() {
    return <div className={ `col-md-${this.props.span}` }>
      {this.props.children}
    </div>
  }
});

export { NavLink, Panel, Row, Col }
