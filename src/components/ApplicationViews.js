import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewUserReg from '../components/authentication/newUserReg'
import TaskList from './task/TaskList';
import TaskDetail from './task/TaskDetail';
import TaskForm from './task/TaskForm';
import TaskEditForm from './task/TaskEditForm';
import TaskManager from "../modules/TaskManager";

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
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TaskList
              {...props}
              deleteTask={this.deleteTask}
              tasks={this.state.tasks}
            />
          }} />
        <Route exact path="/tasks/:taskId(\d+)"
          render={props => {
            return (
              <TaskDetail
                {...props}
                deleteTask={this.deleteTask}
                tasks={this.state.tasks}
              />
            );
          }} />
        <Route path="/tasks/new"
          render={props => {
            return (
              <TaskForm
                {...props}
                addTask={this.addTask}
              />
            );
          }} />
        <Route
          path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return <TaskEditForm
              {...props}
              updateTask={this.updateTask} />
          }}
        />
        <Route
          path="/events" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />
        {/* <Route
          path="/login" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }} */}
        <Route exact path="/"
          // component={Login}
          render={props => {
            return <NewUserReg {...props} />
          }} />
        />

      </React.Fragment>
    );
  }
}
