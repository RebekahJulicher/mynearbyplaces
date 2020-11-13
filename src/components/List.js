import server from "../ServerInterface/server.js";
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            places: [],
        }
    };

    logout = () => {
        this.setState({ username: '' });
        history.username = '';
    }

    body = () => {
        const { prevProps } = this.props.location;
        let place = {};
        if (prevProps) {
            place = prevProps.place;
        }
        return (
            <Container>
                <Row>
                    <Col sm={2}>
                        {history.username.length > 0 ?
                            <Col>
                                <Row>{history.username}</Row>
                                <Row>
                                    <Button variant="btn btn-outline-primary btn-sm" onClick={this.logout}>Logout</Button>
                                </Row>
                            </Col>
                            : <Row><Button variant="btn btn-outline-primary btn-sm">
                                <Link to={{ pathname: '/login', place: place, from: '/list' }}>Login</Link>
                            </Button></Row>}
                    </Col>
                    {this.state.places.length > 0 ?
                        <Col sm={8}>
                            {this.state.places.map((q, i) =>
                                <Row key={i}>
                                    <Col>
                                        <Link className="storeLink" to={{ pathname: "/reviews", prevProps: { place: q } }}>
                                            <Button variant="outline-secondary" size="lg" block>
                                                <Row><b>{q.name}</b></Row>
                                                <Row>{q.city}, {q.state}</Row>
                                                <Row>{q.category}</Row>
                                            </Button>
                                        </Link>
                                    </Col>
                                </Row>)}
                            <Row>
                                <Link to={{ pathname: "/place", removing: false }}>Add a business</Link>
                            </Row>
                            <Row>
                                <Link to={{ pathname: "/place", removing: true }}>Remove a business</Link>
                            </Row>
                            <Row>
                                <Button variant="outline-warning" size="small">
                                    <Link to="/mynearbyplaces">Back to search</Link>
                                </Button>
                            </Row>
                        </Col>
                        : <Col sm={8}>
                            <Row>No businesses found matching that criteria.</Row>
                            <Row>
                                <Link to={{ pathname: "/place", removing: false }}>Add a business</Link>
                            </Row>
                            <Row>
                                <Link to={{ pathname: "/place", removing: true }}>Remove a business</Link>
                            </Row>
                            <Row>
                                <Button variant="outline-warning" size="small">
                                    <Link to="/mynearbyplaces">Back to search</Link>
                                </Button>
                            </Row>
                        </Col>}
                </Row>
            </Container>
        );
    }

    componentDidMount() {
        const { city, state, category, } = this.props.location.state;

        let allPlaces = server.search(city, state, category);

        this.setState({ places: allPlaces });
    }

    render() {
        return (
            this.body()
        );
    }

}
export default List;