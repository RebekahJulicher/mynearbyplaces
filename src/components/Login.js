import React from 'react';
import { Redirect } from 'react-router-dom';
import history from '../ServerInterface/history.js';
import { withRouter } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

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
        const name = event.target.id;
        this.setState({[name]: value});
    }

    render() {
        if (this.props.location.from == "/list"){
            let from = {pathname: "/mynearbyplaces", prevProps: this.props.location};
            if(this.state.authenticated) {
                return (
                    <Redirect to={from} />
                );
            }
        }
        else{
            let from = {pathname: this.props.location.from, prevProps: this.props.location};
            if(this.state.authenticated) {
                return (
                    <Redirect to={from} />
                );
            }
        }

        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="username">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={this.state.username} onChange={this.onInputChange} 
                        placeholder="Enter username" />
                    </Form.Group>
                    <Button variant="secondary" onClick={this.onCancel} >Cancel</Button>
                    <Button type="submit">Login</Button>
                </Form>
            </Container>
        )
    }

}

export default withRouter(Login);