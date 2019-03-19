import React, { Component } from "react"
import { Link } from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
export default class NavBar extends Component {

    logout() {
        sessionStorage.clear();
        localStorage.clear();
    }
    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        {sessionStorage.getItem("credentials") === null &&
                            localStorage.getItem("credentials") === null
                            ? (
                                <Link className="nav-link" to="/">
                                    Sign In
                    </Link>
                            ) : (
                                <Link className="nav-link" to="/" onClick={this.logout}>
                                    Sign Out
                    </Link>
                            )}
                    </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/news">News</Link>
                        </li>
                        {/* <li className="nav-item">
                        <Link className="nav-link" to="/friends">Friends</Link>
                    </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/messages">Messages</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/tasks">Tasks</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/events">Events</Link>
                        </li>
                </ul>
            </nav>
                )
            }
        }
