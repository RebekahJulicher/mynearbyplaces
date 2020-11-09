import server from "../ServerInterface/server.js";
import React from 'react';
import { Redirect } from "react-router-dom";

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
        const value = event.target.value;
        const name = event.target.name;
        this.setState({ [name]: value });
    }

    render() {
        let from = { pathname: '/mynearbyplaces' };
        if (this.state.done) {
            return (<Redirect to={from} />);
        }
        return (
            <div>
                {this.props.location.removing === false ?
                    <form onSubmit={this.onAddSubmit}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={this.state.category}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            value={this.state.state}
                            onChange={this.onInputChange}
                        ></input>
                        <div>
                        <button onClick={this.onCancel} >Cancel</button>
                        <button type="submit">Add Business</button>
                        </div>
                    </form>
                    :
                    <form onSubmit={this.onRemoveSubmit}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={this.state.name}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>Category:</label>
                        <input
                            type="text"
                            name="category"
                            value={this.state.category}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={this.state.city}
                            onChange={this.onInputChange}
                        ></input>
                        <br />
                        <label>State:</label>
                        <input
                            type="text"
                            name="state"
                            value={this.state.state}
                            onChange={this.onInputChange}
                        ></input>
                        <div>
                        <button onClick={this.onCancel} >Cancel</button>
                        <button type="submit">Remove Business</button>
                        </div>
                    </form>}
            </div>
        )
    }
}
export default Place;