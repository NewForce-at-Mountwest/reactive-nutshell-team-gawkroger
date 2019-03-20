import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TaskCard from './TaskCard'
import './Task.css';

export default class TaskList extends Component {
  render() {
    var props = this.props;
    return (
      <React.Fragment>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5"><i className="material-icons md-48">menu</i> List of Tasks:</h2>
          <section className="tasks">
            {props.tasks
            .filter(function(task) {
              return task.isCompleted === undefined;
            })
            .map(task => (
              <TaskCard key={task.id} task={task} {...props} />
            ))}
          </section>
          <div className="taskButton">
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push("/tasks/new");
              }}
            >
              <i className="material-icons md-18">note_add</i>  Add Task
              </button>
          </div>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
        </section>
      </React.Fragment>
    );
  }
}