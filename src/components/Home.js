import React from 'react';
import { Redirect } from "react-router-dom";
import { Link } from 'react-router-dom';
import history from '../ServerInterface/history.js';

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
        const value = event.target.value;
        const name = event.target.name;
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

        return (
            <div>

                <div className="loginButton">
                    {username.length > 0 ?
                        <div>
                            {username}
                            <button onClick={this.logout}>Logout</button>
                        </div>
                        : <Link to='/login'>Login</Link>}
                </div>
                <div>
                    <h1>Search by nearby in category:</h1>
                    <form onSubmit={this.onSubmit}>
                        <label>City: </label>
                        <input
                            type="text"
                            name="city"
                            value={city}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>State: </label>
                        <input
                            type="text"
                            name="state"
                            value={state}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>Category: </label>
                        <input
                            type="text"
                            name="category"
                            value={category}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <button type="submit">Search</button>
                    </form>
                </div>

            </div>
        );
    }
}
export default Home;