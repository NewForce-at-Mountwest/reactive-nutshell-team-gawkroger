import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from '../components/authentication/newUserReg'
import EventList from '../components/Events/eventsList'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    chats: [],
    tasks: [],
    events: [],
    news: []
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  render() {
    return (
      <React.Fragment>

        <Route exact path="/"
          render={props => {
            return <NewUserReg {...props} />
          }} />

        <Route
          path="/news" render={props => {
            if (this.isAuthenticated()) {
              return null
              // Remove null and return the component which will show the user's tasks
            } else {
              return <Redirect to="/" />
            }
          }} />
         {/* Remove null and return the component which will show news articles */}

        <Route
          path="/friends" render={props => {
          if (this.isAuthenticated()) {
            return null
            // Remove null and return the component which will show list of friends
          } else {
            return <Redirect to="/" />
          }
        }}
        />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return null
              // Remove null and return the component which will show the messages
            }  else {
              return <Redirect to="/" />
            }
          }}
        />

        <Route
          path="/tasks" render={props => {
            if (this.isAuthenticated()) {
              return null
              // Remove null and return the component which will show the user's tasks
            } else {
              return <Redirect to="/" />
            }
          }}
        />

        <Route
          path="/events" render={props => {
            return <Route exact path="/events" render={(props) => {
              if (this.isAuthenticated()) {
                return <EventList {...props} events={this.state.events}
                // key={this.state.animals.id} resources={this.state.animals} pr="animals" sr="animal" route="animals"
                />
              } else {
                return <Redirect to="/" />
              }
            }
            } />
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          path="/chat" render={props => {
            return <Route exact path="/chat" render={(props) => {
              if (this.isAuthenticated()) {
                return null

              } else {
                return <Redirect to="/" />
              }
            }
            } />
          }}/>

      </React.Fragment>
    );
  }
}
