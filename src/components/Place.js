import server from "../ServerInterface/server.js";
import React from 'react';
import { Redirect } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Place extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            category: '',
            city: '',
            state: '',
            done: false
        }
    };

    onAddSubmit = (event) => {
        const { name, category, city, state } = this.state;
        server.addPlace(name, category, city, state);
        event.preventDefault();
        console.log(server.getAllPlaces());
        this.setState({ done: true });
    }

    onRemoveSubmit = (event) => {
        const { name, category, city, state } = this.state;
        server.removePlace(name, category, city, state);
        event.preventDefault();
        console.log(server.getAllPlaces());
        this.setState({ done: true });
    }

    onCancel = (event) => {
        event.preventDefault();
        this.setState({ done: true });
    }

    onInputChange = (event) => {
        const value = event.target.value.toUpperCase();
        const name = event.target.id;
        this.setState({ [name]: value });
    }

    addForm = () => {
        return (
            <Container>
                <Row>
                    <Col><Form onSubmit={this.onAddSubmit}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={this.state.name}
                                onChange={this.onInputChange} placeholder="Enter name" />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Category</Form.Label>
                            <Form.Control type="text" value={this.state.category}
                                onChange={this.onInputChange} placeholder="Enter category" />
                        </Form.Group>
                        <Form.Group controlId="city">
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" value={this.state.city}
                                onChange={this.onInputChange} placeholder="Enter city" />
                        </Form.Group>
                        <Form.Group controlId="state">
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" value={this.state.state}
                                onChange={this.onInputChange} placeholder="Enter state" />
                        </Form.Group>

                        <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                        <Button variant="primary" type="submit">Add Business</Button>
                    </Form></Col>
                </Row>
            </Container>
        )
    }

    removeForm = () => {
        return (
            <Row>
                <Col><Form onSubmit={this.onRemoveSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" value={this.state.name}
                            onChange={this.onInputChange} placeholder="Enter name" />
                    </Form.Group>

                    <Form.Group controlId="category">
                        <Form.Label>Category</Form.Label>
                        <Form.Control type="text" value={this.state.category}
                            onChange={this.onInputChange} placeholder="Enter category" />
                    </Form.Group>
                    <Form.Group controlId="city">
                        <Form.Label>City</Form.Label>
                        <Form.Control type="text" value={this.state.city}
                            onChange={this.onInputChange} placeholder="Enter city" />
                    </Form.Group>
                    <Form.Group controlId="state">
                        <Form.Label>State</Form.Label>
                        <Form.Control type="text" value={this.state.state}
                            onChange={this.onInputChange} placeholder="Enter state" />
                    </Form.Group>

                    <Button variant="secondary" onClick={this.onCancel}>Cancel</Button>
                    <Button variant="primary" type="submit">Remove Business</Button>
                </Form></Col>
            </Row>
        )
    }

    render() {
        let from = { pathname: '/mynearbyplaces' };
        if (this.state.done) {
            return (<Redirect to={from} />);
        }
        return (
            <Container>
                {this.props.location.removing === false ?
                    this.addForm()
                    :
                    this.removeForm()}
            </Container>
        )
    }
}
export default Place;