import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Task.css';

export default class TaskDetails extends Component {
  render() {
    console.log(this.props);
    // Using the route parameter, find task that the user 'clicked' on by looking at the "this.props.tasks" collection that was passed down from ApplicationViews.
    const task =
      this.props.tasks.find(
        a => a.id === parseInt(this.props.match.params.taskId)
      ) || {};

    return (
      <React.Fragment>
        <h2 className="h1-responsive font-weight-bold text-center my-5"><i className="material-icons md-48">menu</i> Task Detail: </h2>
        <section className="taskSelected">
          <div key={task.id} className="col-lg-5 mb-lg-0 mb-4">
            <div className="card">
              <div className="card-body">
              <div className="form-header blue accent-1">
                <h3 className="mt-2"><i className="material-icons md-48">event_note</i>   Task Name:</h3>
                </div>
                <h4 className=""><i className="material-icons md-18">note</i>   {task.name}</h4>
                <div className="form-header blue accent-1">
                <h4 className=""><i className="material-icons md-48">date_range</i> Due Date: </h4>
                </div>
                <h5 className="bold-name"><i className="material-icons md-18">event</i>   {task.dueDate}</h5>
                <div>
                <button
                  type="button"
                  className="btn btn-success"
                  id="editBtn"
                  onClick={() => {
                    this.props.history.push(`/tasks/${task.id}/edit`);
                  }}
                ><i className="material-icons md-18">edit</i>   Edit Task
                </button>
                </div>
                <div>
                  <button className="btn btn-danger text-white" onClick={() => this.props.deleteTask(task.id)
                    .then(() => this.props.history.push("/tasks"))} alt="Remove Task"><i className="material-icons md-18">delete_forever</i>   Delete Task</button>
                  </div>
                  <div className="taskButton">
                  <button className="btn btn-info"><Link className="text-white" to={`/tasks`}>
                  <i className="material-icons md-18">toc</i>  Back to List of Tasks</Link>
              </button>
          </div>
              </div>
            </div>
          </div>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"></link>
        </section>
      </React.Fragment>
    );
  }
}