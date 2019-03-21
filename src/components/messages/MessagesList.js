import { Component } from "react";
import React from "react";

export default class MessagesList extends Component {
    state = {
        userId: "",
        userMessage: "",
        messageToEdit: {}
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    constructNewMessage = evt => {
        evt.preventDefault();
        const message = {
            message: this.state.userMessage,
            userId: parseInt(sessionStorage.getItem(`userId`))
        };
        this.props.addMessage(message)
            .then(this.setState({ userMessage: "" }))
    }

    editMessage = evt => {
        evt.preventDefault();
        const editedMessage = {
            message: this.state.messageToEdit.message,
            userId: this.state.messageToEdit.UserId,
            id: this.state.messageToEdit.id
        };
        this.props.updateMessages(editedMessage)
            .then(this.setState({ messageToEdit: "" }))
            .then()

    }

    generateForm = (singleMessage) => {
        this.setState({ messageToEdit: singleMessage })
        }


    render() {
        return (
            <React.Fragment>
                <div className="PastMessages">
                    <h1>Message History</h1>
                    <ul className="MessageList">
                        {this.props.messages.map(singleMessage => {
                            const sessionId = parseInt(sessionStorage.getItem(`userId`));
                            if (singleMessage.userId === sessionId) {
                                if (singleMessage.id === this.state.messageToEdit.id) {
                                    console.log(singleMessage)
                                    return <div><input
                                        type="text"
                                        required
                                        className="form-control"
                                        onChange={this.handleFieldChange}
                                        id="userEditMessage"
                                        value={this.state.messageToEdit.userMessage}
                                    />
                                        <button
                                            type="submit"
                                            onClick={this.editMessage}
                                            className="btn btn-primary"
                                        ></button></div>
                                } else {
                                return <p className={singleMessage.id} key={singleMessage.id}>{singleMessage.user.name}:{singleMessage.message}
                                    <button
                                        type="submit"
                                        onClick={() => this.generateForm(singleMessage)}
                                        className="btn btn-primary">
                                        Edit</button></p>
                            }}
                            else {
                                return <p className={singleMessage.id} key={singleMessage.id}>{singleMessage.user.name}:{singleMessage.message}</p>
                            }
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
                        value={this.state.userMessage}
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
