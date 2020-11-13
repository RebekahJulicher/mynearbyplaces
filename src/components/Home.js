import React from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            city: '',
            state: '',
            category: '',
            submit: false
        }
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({ submit: true });
    }

    onInputChange = (event) => {
        const value = event.target.value.toUpperCase();
        const name = event.target.id;
        this.setState({ [name]: value });
    }

    logout = () => {
        this.setState({ username: '' });
        history.username = '';
    }

    render() {
        const { city, state, category, submit } = this.state;
        if (submit === true) {
            let destination = {
                pathname: '/list', state: { city: city, state: state, category: category }
            };
            return (<Redirect to={destination} />);
        }

        let username = history.username;
        const { prevProps } = this.props.location;
        let place = {};
        if (prevProps) {
            place = prevProps.place;
        }

        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        {username.length > 0 ?
                            <Col>
                                <Row>{history.username}</Row>
                                <Row>
                                    <Button variant="btn btn-outline-primary btn-sm" onClick={this.logout}>Logout</Button>
                                </Row>
                            </Col>
                            : <Button variant="btn btn-outline-primary btn-sm">
                                <Link to={{ pathname: '/login', place: place, from: '/mynearbyplaces' }}>Login</Link>
                                </Button>}
                        <Row>
                            <Link to={{ pathname: "/place", removing: false }}>Add a business</Link>
                        </Row>
                        <Row>
                            <Link to={{ pathname: "/place", removing: true }}>Remove a business</Link>
                        </Row>
                    </Col>
                    <Col sm={8}>Search for local businesses:
                    <Form onSubmit={this.onSubmit}>
                            <Form.Group controlId="city">
                                <Form.Label>City</Form.Label>
                                <Form.Control type="text" value={city}
                                    onChange={this.onInputChange} placeholder="Enter city" />
                            </Form.Group>

                            <Form.Group controlId="state">
                                <Form.Label>State</Form.Label>
                                <Form.Control type="text" value={state}
                                    onChange={this.onInputChange} placeholder="Enter state" />
                            </Form.Group>
                            <Form.Group controlId="category">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text" value={category}
                                    onChange={this.onInputChange} placeholder="Enter category" />
                            </Form.Group>

                            <Button variant="primary" type="submit">Search</Button>
                        </Form>
                    </Col>
                </Row>

            </Container>
        );
    }
}
export default Home;