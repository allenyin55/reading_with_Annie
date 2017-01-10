import React, { PropTypes as T } from 'react'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'

export class Login extends React.Component {
    static contextTypes = {
        router: T.object
    };

    static propTypes = {
        location: T.object,
        auth: T.instanceOf(AuthService)
    };

    render() {
        const { auth }  = this.props;
        return (
            <div className="text-xl-center">
                <h2>Reading with Annie</h2>
                <Button  bsStyle="primary" bsSize="large" onClick={auth.login.bind(this)}>Login</Button>
            </div>
        )
    }
}

export default Login;