import React, { Component } from 'react';
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
        isCompleted: this.state.isCompleted,
        dueDate: this.state.dueDate
      };

  // Create the task / redirect user to task list:
      this.props
        .addTask(task)
        .then(() => this.props.history.push("/tasks"));
    };

  render() {
    return (
      <React.Fragment>
        <h3 className="task">Add a New Task</h3>
        <form id="taskformwindow" className="taskForm">
        <div id="inputwindow">
          <div className="form-group col-auto">
            <label className="bold-name" htmlFor="taskName">Task Name: </label>
            <input type="text" required className="grayText form-control text-center" onChange={this.handleFieldChange} id="taskName" placeholder="Name of Task"/>
          </div>
          <div className="form-group col-auto">
            <label className="bold-name" htmlFor="dueDate">Due Date: </label>
            <input type="date" required className="grayText form-control text-center" onChange={this.handleFieldChange} id="dueDate" placeholder="Date Task is Due"/>
          </div>
          <div className="form-group col-auto">
              <label className="bold-name" htmlFor="task">Has This Task Been Completed?:</label>
              <br></br>
              <select
                className="grayText form-group col-auto"
                name="task"
                id="isCompleted"
                onChange={this.handleFieldChange}
                value={this.state.isCompleted}>
                <option value="" className="form-control text-center" placeholder="Select an Answer">Select an Answer:</option>
                <option className="form-control text-center" value="Yes">Yes</option>
                <option className="form-control text-center" value="No">No</option>
              </select>
            </div>
            <div id="inputcontainer">
          <button type="" onClick={this.constructNewTask} className="btn btn-primary">
            <b>Add Task</b>
          </button>
          </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}