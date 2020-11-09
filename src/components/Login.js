import React from 'react';
import { Redirect } from 'react-router-dom';
import history from '../ServerInterface/history.js';
import { withRouter } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            authenticated: false
        };
    }

    onSubmit = (event) => {
        if(this.state.username.trim().length > 0) {
            history.username = this.state.username;
            this.setState({authenticated: true});
        }
        event.preventDefault();
    }

    onInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;
        this.setState({[name]: value});
    }

    render() {
        let from = {pathname: this.props.location.from, prevProps: this.props.location};

        if(this.state.authenticated) {
            return (
                <Redirect to={from} />
            );
        }

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <lable>Username:</lable>
                    <input 
                        type="text" 
                        name="username"
                        value={this.state.username}
                        onChange={this.onInputChange}
                    ></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);