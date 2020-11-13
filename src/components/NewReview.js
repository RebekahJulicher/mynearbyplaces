import server from "../ServerInterface/server.js";
import React from 'react';
import { Redirect } from "react-router-dom";
import history from '../ServerInterface/history.js';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

class NewReview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stars: 0,
            content: '',
            done: false
        };
    };

    onSubmit = (event) => {
        const { stars, content } = this.state;
        server.addReview(this.props.location.place, { stars: stars, content: content, user: history.username });
        event.preventDefault();
        this.setState({ done: true });
    }

    onCancel = (event) => {
        event.preventDefault();
        this.setState({ done: true });
    }

    onInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.id;
        this.setState({ [name]: value });
    }

    render() {
        let from = { pathname: this.props.location.from, prevProps: this.props.location };
        if (this.state.done) {
            return (<Redirect to={from} />);
        }
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="stars">
                        <Form.Label>Stars:</Form.Label>
                        <Form.Control as="select" onChange={this.onInputChange}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="content">
                        <Form.Label>Review:</Form.Label>
                        <Form.Control type="text" value={this.state.content} onChange={this.onInputChange} placeholder="Enter content" />
                    </Form.Group>
                    <Button variant="secondary" onClick={this.onCancel} >Cancel</Button>
                    <Button type="submit">Submit</Button>
                </Form>
            </Container>
        )
    }
}
export default NewReview;