import React, { Component } from "react";
// import { Link } from "react-router-dom";
import EventCard from './eventCard';
import eventsAPIManager from './eventsAPIManager'
// import ResourceList from '../generics/resourceList';
import "./events.css";


export default class EventList extends Component {

// state = {
//     userEvents: []
// }

// componentDidMount() {
//     const newState = {};
//     eventsAPIManager.getUserEvents(sessionStorage.getItem("userId"))
//         .then (ua => (newState.userEvents = ua))
//         .then (() => this.setState(newState))
// }

    render() {
        return (
            <React.Fragment>
                <div className="addEventButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/Events/new")
                        }
                        }>
                        Add A New Event
                    </button>
                </div>
                <br></br>
                <section className="events">
                    {this.props.events.map(event => (
                        <EventCard key={event.id} event={event} deleteEvent={this.props.deleteEvent} {...this.props} />
                    ))}
                </section>

            </React.Fragment>
        );
    }
}


{/* <section className="events">
                    {
                        this.props.events.map(event => {
                            return (
                                <div key={this.props.events.id} className="card">
                                    <div className="card-body">
                                        <h5 className="card-title">

                                            <p>{event.name}</p>
                                            <p>{event.date}</p>
                                            <p>{event.description}</p>

                                            {/* <Link className="nav-link" to={`/${this.props.route}/${this.props.resource.id}`}>Details</Link> */}

                //                             <button
                //                                 className="btn btn-danger"
                //                                 href="#"
                //                                 onClick={() => this.props.deleteEvent(event.id)}
                //                             >
                //                                 Delete
                //                         </button>
                //                         </h5>
                //                     </div>
                //                 </div>
                //             )
                //         }
                //         )
                //     }
                // </section> */}