import React, { Component } from 'react';
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
            <h3 className="text-center border border-light p-5">Task Details: </h3>
            <section className="taskSelected">
              <div key={task.id} className="cardDetails">
                <div className="card-body">
                  <div className="card-title">
                    <h4>Task Name:</h4>
                    <h5 className="bold-name">{task.name}</h5>
                    <h6 >Due Date: </h6>
                    <h6 className="bold-name">{task.dueDate}</h6>
                    <button
                      type="button"
                      className="btn btn-success"
                      id="editBtn"
                      onClick={() => {
                        this.props.history.push(`/tasks/${task.id}/edit`);
                      }}
                    >
                      Edit
                </button>
                    <button className="cardBtnDelete" onClick={() => this.props.deleteTask(task.id)
                      .then(() => this.props.history.push("/tasks"))}>Delete Task</button>
                  </div>
                </div>
              </div>
            </section>
          </React.Fragment>
        );
      }
  }