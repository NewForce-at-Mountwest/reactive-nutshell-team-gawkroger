import React, { Component } from "react";
import { Link } from "react-router-dom";
import EventEditForm from './eventEditForm'
import eventsAPIManager from "./eventsAPIManager";


export default class EventCard extends Component {
  render() {

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">

            <p>{this.props.event.name}</p>
            <br></br>
            <p>{this.props.event.date}</p>
            <p>{this.props.event.description}</p>



            <Link className="btn btn-success" to={`/events/${this.props.event.id}/edit`}>
              Edit Event
            </Link>
            <br></br>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                console.log(this.props.event.id)
                this.props.deleteEvent(this.props.event.id)
                .then(() => this.props.history.push("/events")
                )}}>

              Delete Event
            </button>

          </h5>
        </div>
      </div>
    );
  }
}