import React, { Component } from "react";
import "./events.css";
import eventsAPIManager from './eventsAPIManager'

export default class EventForm extends Component {
    // Set initial state
    state = {
        eventName: "",
        eventDate: "",
        eventLocation: ""
    };

    // Update state whenever an input field is edited (USED ALMOST EVERY TIME A FORM IS IN REACT!!!!)
    handleFieldChange = evt => {
        //   console.log(evt)
        //   console.log(evt.target.value)
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    buildNewEvent = evt => {
        evt.preventDefault();
        if (this.state.eventName === "") {
            window.alert("Please enter an event name");
        } else if (this.state.eventDate === "") {
            window.alert("Please choose an event date");
        } else {
            const newEvent = {
                name: this.state.eventName,
                date: this.state.eventDate,
                location: this.state.eventLocation,
                userId: parseInt(sessionStorage.getItem("userId"))
            };

            //   console.log(newEvent)

            this.props.postEvent(newEvent)
                .then(() => this.props.history.push("/events"));
        }
    };

    render() {
        return (
            <React.Fragment>
                <form className="eventsForm">
                    <div className="form-group">
                        <label htmlFor="eventName">Event Name</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventName"
                            placeholder="Event Name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventDate">Event Date</label>
                        <input
                            type="date"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventDate"
                            placeholder="Event Date"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="eventLocation">Event Location</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            onChange={this.handleFieldChange}
                            id="eventLocation"
                            placeholder="Event Location"
                        />
                    </div>
                    <button
                        type="submit"
                        onClick={this.buildNewEvent}
                        className="btn btn-primary">

                        Add New Event
                    </button>
                </form>
            </React.Fragment>
        );
    }
}