import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Login from '../components/authentication/login'
import NewUserReg from '../components/authentication/newUserReg'
import userManager from "./authentication/userManager";
import NewsForm from "./news/NewsForm";
import NewsDetail from "./news/NewsDetail";
import NewsEditForm from "./news/NewsEditForm";
import newsManager from "../modules/newsManager";
import NewsList from "./news/NewsList"
import EventList from '../components/Events/eventsList'
import EventForm from '../components/Events/eventForm'
import EventEditForm from '../components/Events/eventEditForm'
import eventsAPIManager from '../components/Events/eventsAPIManager'

//// Messages imports ////
import MessagesList from "./messages/MessagesList"
import MessagesManager from "../modules/messagesManager"

export default class ApplicationViews extends Component {
  state = {
    users: [],
    messages: [],
    tasks: [],
    events: [],
    news: []
  };

  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  deleteNews = id => {
    return newsManager.deleteNews(id).then(news =>
      this.setState({
        news: news
      })
    );
  };

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

  ///////Messages Components//////

  addMessage = messageObject =>
    MessagesManager.postMessage(messageObject)
      .then(() => MessagesManager.getAllMessages())
      .then(messages =>
        this.setState({
          messages: messages
        })
      // .then(MessagesManager.getAllMessages)
      );

  updateMessages = editedMessageObject => {
        return MessagesManager.put(editedMessageObject)
          .then(() => MessagesManager.getAllMessages())
          .then(messages => {
            this.setState({
              messages: messages
            });
          });
      };

  //////////////////////////////////////
  isAuthenticated = () => sessionStorage.getItem("userId") !== null

  componentDidMount() {
    const newState = {};

    newsManager.getAll()
      .then(news => (newState.news = news))
      .then(MessagesManager.getAllMessages)
      .then(messages => (newState.messages = messages))
      .then(userManager.getAllUsers)
      .then(users => (newState.users = users))
      if(sessionStorage.userId !== "" || localStorage.userId !== "") {
      return this.getUserEvents(sessionStorage.getItem("userId"))
      // .then(events => (newState.events = events))
      .then(() => this.setState(newState))
  }}

  updateEvent = editedEvent => {
    return eventsAPIManager.putEvent(editedEvent)
      .then(() => this.getUserEvents(sessionStorage.getItem("userId")))
      .then(events => {
        this.setState({
          events: events
        });
      });
  };

  deleteEvent = id => {
    return eventsAPIManager.deleteEvent(id)
      .then(parsedEvents =>
        this.setState({
          events: parsedEvents
        })
      );
  };

  getUserEvents = id => {
    return eventsAPIManager.getUserEvents(id)
      .then(pue => {
        const eventsByDate = pue.sort(function (a, b) {
          var dateA = new Date(a.date), dateB = new Date(b.date)
          return dateA - dateB
        })
        this.setState({
          events: eventsByDate
        })
      })
  }


  postEvent = eventObject => {
    return eventsAPIManager.postEvent(eventObject)
      .then(() => this.getUserEvents(sessionStorage.getItem("userId"))
      )
  }

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <Login  {...props} getUserEvents={this.getUserEvents} />
          }}
        />
        <Route
          exact
          path="/register"
          render={props => {
            return <NewUserReg {...props} getUserEvents={this.getUserEvents} />;
          }}
        />

        <Route
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return <NewsList {...props} news={this.state.news} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route
          path="/news/new"
          render={props => {
            if (this.isAuthenticated()) {
              return <NewsForm {...props} addNews={this.addNews} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route
          exact
          path="/news/:newsId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <NewsDetail
                  {...props}
                  deleteNews={this.deleteNews}
                  news={this.state.news}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }}
        />
        <Route
          path="/news/:newsId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <NewsEditForm {...props}
                  updateNews={this.updateNews}
                  news={this.state.news}
                />
              )
            } else {
              return <Redirect to="/" />
            }
          }}
        />

        <Route
          path="/friends" render={props => {
            if (this.isAuthenticated()) {
              return null
              // Remove null and return the component which will show list of friends
            }
          }}
        />

        <Route
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return <MessagesList {...props} messages={this.state.messages} addMessage={this.addMessage} updateMessages={this.updateMessages} />;
            } else {
              return <Redirect to="/" />
            }
          }}
        />

        <Route
          path="/tasks"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
              // Remove null and return the component which will show the user's tasks
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
            return <EventList {...props} events={this.state.events} getUserEvents={this.getUserEvents} deleteEvent={this.deleteEvent} />

          } else {
            return <Redirect to="/" />
          }
        }} />

        <Route path="/events/new" render={(props) => {
          if (this.isAuthenticated()) {
            return <EventForm {...props}
              events={this.state.events} postEvent={this.postEvent} />
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
