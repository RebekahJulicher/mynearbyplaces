import React from 'react';
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';

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
            <div>
                <div className="loginButton">
                    {history.username.length > 0 ?
                        <div>
                            {history.username}
                            <button onClick={this.logout}>Logout</button>
                        </div>
                        : <Link to={{ pathname: '/login', place: place, from: '/reviews' }}>Login</Link>}
                </div>
                {place.reviews.length > 0 ?
                    <div>
                        {place.reviews.map((q, i) =>
                            <div className="storeDiv" key={i}>
                                <h3>{q.stars + "/5 stars     - " + q.user}</h3>
                                <p>{q.content}</p>
                            </div>)}
                        {history.username.length > 0 ?
                        <Link to={{ pathname: "/newreview", place: place, from: '/reviews' }}>
                        <h3>Create a new review</h3>
                        </Link>
                        :
                        <h3>Log in to post a review</h3>}
                    </div>
                    : <div>
                        <h2>No reviews found for this business</h2>
                        {history.username.length > 0 ?
                        <Link to={{ pathname: "/newreview", place: place, from: '/reviews' }}>
                        <h3>Be the first</h3>
                        </Link>
                        :
                        <h3>Log in to post a review</h3>}
                    </div>}

                <Link to="/mynearbyplaces"><h3>Back to search</h3></Link>
            </div>
        );
    }


    render() {
        return (
            <div>
                {this.body()}
            </div>
        );
    }

}
export default Reviews;