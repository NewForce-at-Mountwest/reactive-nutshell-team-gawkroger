import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Task.css';

export default class TaskForm extends Component {
  // Set INITIAL state:
  state = {
    taskName: "",
    isCompleted: "",
    dueDate: ""
  };

  // UPDATE state whenever an input field is EDITED:
  handleFieldChange = evt => {
    const stateToChange = {};
    console.log(evt.target.id, evt.target.value);
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  // Local method for validation, creating task object, and invoking function reference passed from parent component:
  constructNewTask = evt => {
    evt.preventDefault();

    const task = {
      name: this.state.taskName,
      isCompleted: this.state.checkboxState,
      dueDate: this.state.dueDate,
      userId: parseInt(sessionStorage.getItem("userId"))
    };

    // Create the task / redirect user to task list:
    this.props
      .addTask(task)
      .then(() => this.props.history.push("/tasks"));
  };

  onSubmit(event) {
    event.preventDefault();
  }

  toggle(event) {
    this.setState({
      checkboxState: !this.state.checkboxState
    });
  };

  render() {
    const checkedOrNot = [];
    checkedOrNot.push(this.state.checkboxState ? true : false);
    const checkbox = (
      <span>
        <label><i className="material-icons md-18">playlist_add_check</i>   Task Completed?</label><br></br>
        <h4 className="">
          <input type="checkbox" onClick={this.toggle.bind(this)} className="big-checkbox" id="isCompleted" value={this.state.checkboxState} onChange={this.handleFieldChange}></input>
        </h4>
      </span>
    );

    return (
      <React.Fragment>
        <h2 className="h1-responsive font-weight-bold text-center my-5"><i className="material-icons md-48">menu</i> Add a New Task</h2>
        <section className="taskSelected">
          <div className="form-header blue accent-1">
          </div>
          <form id="card-tasks" className="card" onSubmit={this.onSubmit.bind(this)}>
            <div className="form-group col-auto">
              <div className="form-group col-auto">
                <label className="bold-name" htmlFor="taskName"><h3 className="mt-2"><i className="material-icons md-18">event_note</i>   Task Name:</h3></label>
                <h4 className=""><input type="text" required className="text-center form-control-lg" onChange={this.handleFieldChange} id="taskName" placeholder="Name of Task" /></h4>
              </div>
              <div className="form-group col-auto">
                <label className="bold-name" htmlFor="dueDate"><h3 className="mt-2"><i className="material-icons md-18">date_range</i>   Due Date:</h3></label>
                <h4 className=""><input type="date" required className="text-center form-control-lg" onChange={this.handleFieldChange} id="dueDate" placeholder="Date Task is Due" /></h4>
              </div>
              <div className="form-group col-auto">
                <label className="bold-name" htmlFor="task"><h3 className="mt-2">{checkbox}</h3></label>
              </div>
            </div>
            <div id="inputcontainer">
              <button type="" onClick={this.constructNewTask} className="btn btn-success"><i className="material-icons md-18">add</i>  Add Task</button>
            </div><br></br>
            <div className="taskButton">
              <button className="btn btn-info"><Link className="text-white" to={`/tasks`}>
                <i className="material-icons md-18">toc</i>  Back to List of Tasks</Link>
              </button>
            </div>
          </form>
        </section>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      </React.Fragment>
    );
  }
}