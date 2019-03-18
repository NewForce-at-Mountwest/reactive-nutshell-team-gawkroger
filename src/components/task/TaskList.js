import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import TaskCard from './TaskCard.js'
import './Task.css';

export default class TaskList extends Component {
    render() {
        return (
          <React.Fragment>
            <div className="taskButton">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => {
                  this.props.history.push("/tasks/new");
                }}
              >
                Add Task
              </button>
            </div>
            <section className="tasks">
              {this.props.tasks.map(task => (
                <TaskCard key={task.id} task={task} {...this.props} />
              ))}
            </section>
          </React.Fragment>
        );
      }
    }