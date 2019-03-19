import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from '../components/authentication/newUserReg'

export default class ApplicationViews extends Component {

  state = {
    messages: []
  };

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;


  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            if (this.isAuthenticated()) {
              return <MessageList {...props} animals={this.state.animals} />;
            } else {
              return <Redirect to="/login" />;
            }

          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />
          <Route exact path="/"
                    render={props => {
                        return <NewUserReg {...props} />
                    }} />
        />

      </React.Fragment>
    );
  }
}
