import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TaskManager from "../../modules/TaskManager"
import './Task.css';

export default class TaskCard extends Component {
    // Set initial state
    state = {
        isCompleted: "",
    };

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange);
        console.log(stateToChange)
    }

    updateExistingTask = evt => {
        evt.preventDefault();

        const editedTask = {
            isCompleted: this.state.checkboxState,
        };

        this.props.updateTask(editedTask)
            .then(() => this.props.history.push("/tasks"))
    }

    onSubmit(event) {
        event.preventDefault();
    }

    toggle(event) {
        this.setState({
            checkboxState: !this.state.checkboxState
        });
    };

    render() {

        return (

            <div className="row">
                <div key={this.props.task.id} className="col-lg-5 mb-lg-0 mb-4">
                    <div className="card-task">
                        <div className="card" id="card-tasks">
                            <div className="form-header blue accent-1">
                                <h3 className="mt-2"><i className="material-icons md-48">event_note</i> Task Name:</h3>
                            </div>
                            <h4 className=""><i className="material-icons md-18">toc</i>   {this.props.task.name}</h4>
                            <br></br>
                            <div>
                                <button className="btn btn-info"><Link className="text-white" to={`/tasks/${this.props.task.id}`}><i className="material-icons md-18">details</i>  Task Details</Link></button>
                            </div>
                            <br></br>
                            <div>
                                <button className="btn btn-danger"><a href="/tasks/" onClick={() => this.props.deleteTask(this.props.task.id)} className="text-white" alt="Remove Task"><i className="material-icons md-18">delete_forever</i>  Delete  Task</a></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}