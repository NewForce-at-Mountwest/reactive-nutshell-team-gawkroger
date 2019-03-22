import React, { Component } from "react";
import eventAPIManager from "./eventsAPIManager";
import './events.css'

export default class EventEditForm extends Component {
  // Set initial state
  state = {
    eventName: "",
    eventDate: "",
    eventLocation: "",
    userId: sessionStorage.getItem("userId")
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
        location: this.state.eventLocation,
        userId : parseInt(sessionStorage.getItem("userId"))
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
        eventLocation: event.location,

      });
      console.log(event)
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="editCard">
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
                  <label htmlFor="eventLocation">Event Location</label>
                  <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleFieldChange}
                    id="eventLocation"
                    value={this.state.eventLocation}
                  />
                </div>
                <input
                    type="hidden"
                    required
                    className="form-control"
                    // onChange={this.handleFieldChange}
                    id="userId"
                    value={this.state.userId}
                  />

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
