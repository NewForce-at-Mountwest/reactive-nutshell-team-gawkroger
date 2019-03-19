import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import ResourceCard from '../generics/resourceCard';
// import ResourceList from '../generics/resourceList';
// import "./animal.css";

export default class EventList extends Component {
//   state = {
//     events: []
//   };
  render() {
    return (
      <React.Fragment>
          <form className="eventForm">
          <div className="form-group">
            <label htmlFor="eventName">Event Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="eventName"
              placeholder="Event Name"
              size="30"
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
              size="30"
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
              size="30"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewAnimal}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>

      </React.Fragment>
    );
  }
}