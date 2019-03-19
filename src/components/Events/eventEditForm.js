import React, { Component } from "react";
import eventAPIManager from "./eventsAPIManager";
import './events.css'

export default class EventEditForm extends Component {
  // Set initial state
  state = {
    eventName: "",
    eventDate: "",
    eventDescription: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateEvent = evt => {
    evt.preventDefault();

    if (this.state.eventName === "") {
      window.alert("Please enter an event name.");
    } else if (this.state.eventDate === "") {
      window.alert("Please enter an event date.");
    } else {
      const editedEvent = {
        id: this.props.match.params.eventId,
        name: this.state.eventName,
        date: this.state.eventDate,
        description: this.state.eventDescription
      };

      this.props.updateEvent(editedEvent)
        .then(() => this.props.history.push("/events"));
    }
  };

  componentDidMount() {
    eventAPIManager.getSingleEvent(this.props.match.params.eventId).then(event => {
      this.setState({
        eventName: event.name,
        eventDate: event.date,
        eventDescription: event.description
      });
      console.log(event)
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              <form className="eventForm">
                <div className="form-group">
                  <label htmlFor="eventName">Event Name</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="eventName"
                    value={this.state.eventName}
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
                    value={this.state.eventDate}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="eventDescription">Event Description</label>
                  <input
                    type="textarea"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="eventDescription"
                    value={this.state.eventDescription}
                  />
                </div>

                <button
                  type="submit"
                  onClick={this.updateEvent}
                  className="btn btn-primary"
                >
                  Save Changes
                </button>
              </form>
            </h5>
          </div>
        </div>
      </React.Fragment>
    );
  }
}



{/* <p>{this.props.event.name}</p>
              <br></br>
              <p>{this.props.event.date}</p>
              <p>{this.props.event.description}</p> */}

{/* <Link className="nav-link" to={`/events/${this.props.event.id}/edit`}>
                Edit Event
            </Link>
            </h3>
          </div>
        </div> */}
