import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TaskCard from './TaskCard'
import './Task.css';

// For filter fx, "return task.isCompleted" could alternatively be set to inequality (!=) operator @ true.

// state = {
//     userTasks: []
// }

// componentDidMount() {
//     const newState = {};
//     TaskManager.getUserTasks(sessionStorage.getItem("userId"))
//         .then (access => (newState.userTasks = access))
//         .then (() => this.setState(newState))
// }

export default class TaskList extends Component {
  render() {
    var props = this.props;
    return (
      <React.Fragment>
        <section className="my-5">
          <h2 className="h1-responsive font-weight-bold text-center my-5"><i className="material-icons md-48">menu</i> List of Tasks</h2>
          <div className="card" id="card-tasks"><br></br>
            <img src="http://coachdavebeam.com/wp-content/uploads/2013/03/IMG_0975_-e1430594615427-130x130.jpg" alt="Coach Dave" id="task-image"></img><br></br>
            <p className="ptask">"We live in a fantasy world, a world of illusion. The great <u>task</u> in life is to find reality.</p><br></br>
            <section className="tasks">
              {props.tasks
                .filter(function (task) {
                  return task.isCompleted === undefined || task.isCompleted === false || task.isCompleted === "";
                }).map(task => (<TaskCard key={task.id} task={task} {...props} />))}
            </section>
          </div>
          <div className="card-body">
            <div className="form-header blue accent-1">
              <h3 className="mt-2"><i className="material-icons md-48">add_box</i> Create Task:</h3>
            </div>
            <h3 className="mt-2"><button type="button" className="btn btn-success" onClick={() => { this.props.history.push("/tasks/new"); }}>
              <i className="material-icons md-18">note_add</i>  Add Task
              </button></h3>
          </div>
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
        </section>
      </React.Fragment>
    );
  }
}