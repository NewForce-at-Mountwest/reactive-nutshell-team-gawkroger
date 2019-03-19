import React, { Component } from "react";
// import { Link } from "react-router-dom";
import EventCard from './eventCard';
// import ResourceList from '../generics/resourceList';
import "./events.css";

export default class EventList extends Component {
    //   state = {
    //     events: []
    //   };
    render() {
        return (
            <React.Fragment>
                <div className="addEventButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("events/new")
                        }
                        }>
                        Add A New Event
                    </button>
                </div>
                <br></br>
                <section className="events">
                    {this.props.events.map(event => (
                        <EventCard key={event.id} event={event} deleteEvent={this.props.deleteEvent}/>
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