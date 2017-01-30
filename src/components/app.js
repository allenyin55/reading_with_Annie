import React, { PropTypes as T } from 'react';

export default class App extends React.Component {

  static contextTypes = {
    router: T.object
  };

  render() {
    let children = null;
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth, //sends auth instance to children
        profile:this.props.route.auth.getProfile()
      })
    }

    return (
      <div>
        {children}
      </div>
    )
  }
}
