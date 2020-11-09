import server from "../ServerInterface/server.js";
import React from 'react';
import { Redirect } from "react-router-dom";
import history from '../ServerInterface/history.js';

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
        const { stars, content} = this.state;
        server.addReview(this.props.location.place, {stars: stars, content: content, user: history.username});
        event.preventDefault();
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
        let from = {pathname: this.props.location.from, prevProps: this.props.location};
        if (this.state.done) {
            return (<Redirect to={from} />);
        }
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Stars:</label>
                    <input
                        type="number"
                        name="stars"
                        value={this.state.stars}
                        onChange={this.onInputChange}
                    ></input>
                    <br />
                    <label>Review:</label>
                    <input
                        type="text"
                        name="content"
                        value={this.state.content}
                        onChange={this.onInputChange}
                    ></input>
                    <br />
                    <button onClick={this.onCancel} >Cancel</button>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }
}
export default NewReview;