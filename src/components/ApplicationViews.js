import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from "../components/authentication/newUserReg";
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import newsManager from "../modules/newsManager";
import NewsList from "./news/NewsList";
import EventList from "../components/Events/eventsList";
import NewsDetail from "./news/NewsDetail";

export default class ApplicationViews extends Component {
  state = {
    chats: [],
    tasks: [],
    events: [],
    news: []
  };

  deleteNews = id => {
    return newsManager.deleteNews(id).then(news =>
      this.setState({
        news: news
      })
    );
  };

  addNews = newsObject => {
    return newsManager
      .addNews(newsObject)
      .then(() => newsManager.getAll())
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  updateNews = editedNewsObeject => {
    return newsManager
      .updateNews(editedNewsObeject)
      .then(() => newsManager.getAll())
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  componentDidMount() {
    const newState = {};
    newsManager
      .getAll()
      .then(news => (newState.news = news))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null;

  render() {
    return (
      <React.Fragment>
        <Route
          exact
          path="/"
          render={props => {
            return <NewUserReg {...props} />;
          }}
        />

        <Route
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return <NewsList {...props} news={this.state.news} />;
            }
          }}
        />
        <Route
          path="/news/new"
          render={props => {
            if (this.isAuthenticated()) {
              return <NewsForm {...props} addNews={this.addNews} />;
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
              );
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
              );
            }
          }}
        />

        <Route
          path="/friends"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
              // Remove null and return the component which will show list of friends
            } else {
              return <Redirect to="/" />;
            }
          }}
        />

        <Route
          path="/messages"
          render={props => {
            if (this.isAuthenticated()) {
              return null;
              // Remove null and return the component which will show the messages
            } else {
              return <Redirect to="/" />;
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

        <Route
          path="/events"
          render={props => {
            return (
              <Route
                exact
                path="/events"
                render={props => {
                  if (this.isAuthenticated()) {
                    return (
                      <EventList
                        {...props}
                        events={this.state.events}
                        // key={this.state.animals.id} resources={this.state.animals} pr="animals" sr="animal" route="animals"
                      />
                    );
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />
            );
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          path="/chat"
          render={props => {
            return (
              <Route
                exact
                path="/chat"
                render={props => {
                  if (this.isAuthenticated()) {
                    return null;
                  } else {
                    return <Redirect to="/" />;
                  }
                }}
              />
            );
          }}
        />
      </React.Fragment>
    );
  }
}
