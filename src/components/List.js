import server from "../ServerInterface/server.js";
import React from 'react';
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';

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
        return (
            <div>
                <div className="loginButton">
                    {history.username.length > 0 ?
                        <div>
                            {history.username}
                            <button onClick={this.logout}>Logout</button>
                        </div>
                        : <Link to='/login'>Login</Link>}
                </div>
                {this.state.places.length > 0 ?
                    <div>
                        {this.state.places.map((q, i) =>
                            <div className="storeDiv" key={i}>
                                <Link className="storeLink" to={{ pathname: "/reviews", prevProps: {place: q} }}>
                                    <div className="business">
                                        <h2>{q.name}</h2>
                                        <h3>{q.city}, {q.state}</h3>
                                        <p>{q.category}</p>
                                    </div>
                                </Link>
                            </div>)}
                        <Link to="/mynearbyplaces"><h3>Back to search</h3></Link>
                    </div>
                    : <div>
                        <h2>No businesses found matching that criteria.</h2>
                        <Link to="/mynearbyplaces"><h3>Back to search</h3></Link>
                    </div>}

                <div className="buttons">
                    <Link to={{ pathname: "/place", removing: false }}>
                        <h3>Add a business</h3>
                    </Link>
                    <Link to={{ pathname: "/place", removing: true }}>
                        <h3>Remove a business</h3>
                    </Link>
                </div>
            </div>
        );
    }

    componentDidMount() {
        const { city, state, category, } = this.props.location.state;
        
        let allPlaces = server.search(city, state, category);

        this.setState({ places: allPlaces });
    }

    render() {
        return (
            <div>
                {this.body()}
            </div>
        );
    }

}
export default List;