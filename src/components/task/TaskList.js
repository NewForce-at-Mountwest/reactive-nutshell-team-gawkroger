import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TaskCard from './TaskCard'
import './Task.css';

export default class TaskList extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5">List of Tasks:</h2>
          <section className="tasks">
            {this.props.tasks.map(task => (
              <TaskCard key={task.id} task={task} {...this.props} />
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
              <i class="small material-icons">add</i>Add Task
              </button>
          </div>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
        </section>
      </React.Fragment>
    );
  }
}