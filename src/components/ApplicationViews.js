import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from '../components/authentication/newUserReg'
import userManager from "./authentication/userManager";
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import newsManager from "../modules/newsManager";
import NewsList from "./news/NewsList"
import EventList from '../components/Events/eventsList'
import EventForm from '../components/Events/eventForm'
import EventEditForm from '../components/Events/eventEditForm'
import eventsAPIManager from '../components/Events/eventsAPIManager'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    chats: [],
    tasks: [],
    events: [],
    news: []
  }

  deleteNews = id => {
    return newsManager.deleteNews(id).then(news =>
      this.setState({
        news: news
      })
    );
  }

  addNews = newsObject => {
    return newsManager.addNews(newsObject)
      .then(() => newsManager.getAll())
      .then(news =>
        this.setState({
          news: news
        })
      );
  }

  updateNews = editedNewsObeject => {
    return newsManager.updateNews(editedNewsObeject)
      .then(() => newsManager.getAll())
      .then(news =>
        this.setState({
          news: news
        }))
  }

  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  componentDidMount() {
    const newState = {};
    newsManager.getAll()
      .then(news => (newState.news = news))
      .then(userManager.getAllUsers)
      .then(users => (newState.users = users))
      .then(eventsAPIManager.getAllEvents)
      .then(events => (newState.events = events))
      .then(() => this.setState(newState))
  }

  updateEvent = editedEvent => {
    return eventsAPIManager.putEvent(editedEvent)
      .then(() => eventsAPIManager.getAllEvents())
      .then(events => {
        this.setState({
          events: events
        });
      });
  };

  deleteEvent = id => {
    return eventsAPIManager.deleteEvent(id)
    .then(events =>
      this.setState({
        events: events
      })
    );
  };



  render() {
    return (
      <React.Fragment>

        <Route exact path="/"
          render={props => {
            return <NewUserReg {...props} />
          }} />

        <Route
          exact
          path="/news"
          render={props => {
            // if (this.isAuthenticated()) {
            return <NewsList {...props} news={this.state.news} />
          }}
        // }
        />
        <Route
          path="/news/new"
          render={props => {
            // if (this.isAuthenticated()) {
            return <NewsForm {...props} addNews={this.addNews} />
          }}
        // }
        />
        <Route
          path="/news/newsId(\d+)/edit"
          render={props => {
            // if (this.isAuthenticated()) {
            return <NewsEditForm {...props} updateNews={this.updateNews} />
          }}
        // }
        />

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
            } else {
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

        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
            return <EventList {...props} events={this.state.events} deleteEvent={this.deleteEvent}/>

          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route path="/events/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <EventForm {...props}
              events={this.state.events} />
          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route
          path="/events/:eventId(\d+)/edit"
          render={props => {
            return (
              <EventEditForm
                {...props}
                events={this.state.events}
                updateEvent={this.updateEvent}
              />
            );
          }}
        />


      </React.Fragment>
    );
  }
}
