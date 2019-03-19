import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from '../components/authentication/newUserReg'
import TaskList from './task/TaskList';
import TaskDetail from './task/TaskDetail';
import TaskForm from './task/TaskForm';
import TaskEditForm from './task/TaskEditForm';
import TaskManager from "../modules/TaskManager";
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import newsManager from "../modules/newsManager";
import NewsList from "./news/NewsList"
import EventList from '../components/Events/eventsList'

export default class ApplicationViews extends Component {
  // Populating React Component State from an API...
  state = {
    // Render the component to the DOM without any data.
    // Empty out current hard-coded state in the ApplicationViews component:
    // Reconfigure it to query the entire API and populate this data structure.
    users: [],
    chat: [],
    news: [],
    tasks: [],
    events: []
    // Populate the API from JSON (why the arrays / data structure are empty, above).
  };

  deleteTask = id => {
    return fetch(`http://localhost:5002/tasks/${id}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(() => fetch(`http://localhost:5002/tasks`))
      .then(response => response.json())
      .then(tasks => this.setState({ tasks: tasks }));
  };

  addTask = task =>
    TaskManager.post(task)
      .then(() => TaskManager.getAll())
      .then(tasks => this.setState({ tasks: tasks }));

  updateTask = (editedTaskObject) => {
    return TaskManager.put(editedTaskObject)
      .then(() => TaskManager.getAll())
      .then(tasks => {
        this.setState({
          tasks: tasks
        })
      });
  };

  componentDidMount() {
    TaskManager.getAll().then(allTasks => {
      this.setState({ tasks: allTasks });
    });
  }

  state = {
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
    .then(()=> newsManager.getAll())
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

  componentDidMount() {
    const newState ={};
    newsManager.getAll()
      .then(news => (newState.news = news))
      .then(() => this.setState(newState))
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
          exact path="/tasks" render={props => {
            if (this.isAuthenticated()) {
              return <TaskList
                {...props}
                deleteTask={this.deleteTask}
                tasks={this.state.tasks}
              />
            } else {
              return <Redirect to="/" />
            }
          }} />
        <Route exact path="/tasks/:taskId(\d+)"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <TaskDetail
                  {...props}
                  deleteTask={this.deleteTask}
                  tasks={this.state.tasks}
                />
              );
            } else {
              return <Redirect to="/" />
            }
          }} />

        <Route path="/tasks/new"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <TaskForm
                  {...props}
                  addTask={this.addTask}
                />
              );
            } else {
              return <Redirect to="/" />
            }
          }} />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
              return <TaskEditForm
                {...props}
                updateTask={this.updateTask} />
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

      </React.Fragment>
    );
  }
}
