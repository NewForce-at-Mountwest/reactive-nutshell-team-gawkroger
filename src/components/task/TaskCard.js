import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Task.css';

export default class TaskCard extends Component {
    render() {
        return (
            <div className="row">
            <div key={this.props.task.id} className="col-lg-5 mb-lg-0 mb-4">
                <div className="card">
                    <div className="card-body">
                    <div className="form-header blue accent-1">
                        <h3 className="mt-2"><i className="material-icons md-48">toc</i> Task Name:</h3>
                        </div>
                        <h4 className="">{this.props.task.name}</h4>
                        </div>
                        <div>
                        <button className="btn btn-info"><Link className="text-white" to={`/tasks/${this.props.task.id}`}><i className="material-icons md-18">details</i>Task Details</Link></button>
                        </div>
                        <div>
                        <button className="btn btn-danger"><a href="/tasks/" onClick={() => this.props.deleteTask(this.props.task.id)} className="text-white" alt="Remove Task"><i className="material-icons md-18">delete</i>Delete  Task</a></button>
                        </div>
                </div>
            </div>
            </div>
        );
    }
}