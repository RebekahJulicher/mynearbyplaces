import React from 'react';
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class Reviews extends React.Component {
    constructor(props) {
        super(props);
    };

    logout = () => {
        this.setState({ username: '' });
        history.username = '';
    }

    body = () => {
        const { prevProps } = this.props.location;
        let place = {};
        if (prevProps){
            place = prevProps.place;
        }
        return (
            <Row>
                <Col sm={2}>
                        {history.username.length > 0 ?
                            <Col>
                                <Row>{history.username}</Row>
                                <Row>
                                    <Button variant="btn btn-outline-primary btn-sm" onClick={this.logout}>Logout</Button>
                                </Row>
                            </Col>
                            : <Button variant="btn btn-outline-primary btn-sm">
                                <Link to={{ pathname: '/login', place: place, from: '/reviews' }}>Login</Link>
                                </Button>}
                    </Col>
                {place.reviews.length > 0 ?
                    <Col sm={8}>
                        {place.reviews.map((q, i) =>
                            <Col key={i}>
                                <Row><b>{q.stars + "/5 stars     - " + q.user}</b></Row>
                                <Row>{q.content}</Row>
                            </Col>)}
                        {history.username.length > 0 ?
                        <Link to={{ pathname: "/newreview", place: place, from: '/reviews' }}>Create a new review</Link>
                        :
                        <Row>Log in to post a review</Row>}
                        <Row>
                                <Button variant="outline-warning" size="small">
                                    <Link to="/mynearbyplaces">Back to search</Link>
                                </Button>
                            </Row>
                    </Col>
                    : <Col sm={8}>
                        <Row>No reviews found for this business</Row>
                        {history.username.length > 0 ?
                        <Row><Link to={{ pathname: "/newreview", place: place, from: '/reviews' }}>Be the first</Link></Row>
                        :
                        <Row>Log in to post a review</Row>}
                        <Row>
                                <Button variant="outline-warning" size="small">
                                    <Link to="/mynearbyplaces">Back to search</Link>
                                </Button>
                            </Row>
                    </Col>}
            </Row>
        );
    }


    render() {
        return (
            <Container>
                {this.body()}
            </Container>
        );
    }

}
export default Reviews;