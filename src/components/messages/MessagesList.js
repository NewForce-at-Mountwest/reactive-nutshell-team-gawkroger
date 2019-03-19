import { Component } from "react";
import React from "react";

export default class MessagesList extends Component {
    state = {
        message: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewMessage = evt => {
        evt.preventDefault();
        const message = {
            message: this.state.userMessage
            };
            this.props.addMessage(message)
        }

    render() {
        return (
            <React.Fragment>
                <div className="PastMessages">
                    <h1>Message History</h1>
                    <ul className="MessageList">
                        {this.props.messages.map(singleMessage => {
                            return <p key={singleMessage.id}>{singleMessage.name}:{singleMessage.message}</p>
                        })}
                    </ul>
                </div>
                <div className="NewMessage">
                <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="userMessage"
              placeholder="Enter your message here"
            />
                </div>
                <button
            type="submit"
            onClick={this.constructNewMessage}
            className="btn btn-primary"
          >
            Submit
          </button>
            </React.Fragment>
        )
    }
}
