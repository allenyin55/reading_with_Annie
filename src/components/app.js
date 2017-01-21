import React, { PropTypes as T } from 'react'
import { Jumbotron } from 'react-bootstrap'

export default class App extends React.Component {
    static contextTypes = {
        router: T.object
    };

    render() {
        let children = null;
        if (this.props.children) {
            children = React.cloneElement(this.props.children, {
                auth: this.props.route.auth //sends auth instance to children
            })
        }

        return (
            <div>
                <h2 className="text-xl-center">
                    <img className="rounded" style={{width: 650+'px'}} src="https://readingwithannieapi.herokuapp.com/images/Ammie.jpg" />
                </h2>
                {children}
                <footer style={{marginTop:10+"rem"}}></footer>
            </div>
        )
    }
}
