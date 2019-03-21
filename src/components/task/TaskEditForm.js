import React, { Component } from 'react';
// import CheckboxInput from './TaskCheckbox';
import TaskManager from "../../modules/TaskManager"
import './Task.css';

export default class TaskEditForm extends Component {
    // Set initial state
    state = {
        taskName: "",
        isCompleted: false,
        dueDate: "",
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
            id: this.props.match.params.taskId,
            name: this.state.taskName,
            isCompleted: this.state.checkboxState,
            dueDate: this.state.dueDate
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

    componentDidMount() {
        TaskManager.getOne(this.props.match.params.taskId)
            .then(task => {
                this.setState({
                    taskName: task.name,
                    isCompleted: task.isCompleted,
                    dueDate: task.dueDate
                });
            });
    }

    render() {
        const checkbox = (
            <span>
                <label><i className="material-icons md-18">playlist_add_check</i>   Task Completed?</label>
                <br></br>

                <h4 className=""><input
                    type="checkbox"
                    onClick={this.toggle.bind(this)}
                    className="big-checkbox"
                    id="isCompleted"
                    value={this.state.checkboxState}
                    onChange={this.handleFieldChange}>
                </input></h4>
            </span>
        );

        return (
            <React.Fragment>
                <h2 className="h1-responsive font-weight-bold text-center my-5"><i className="material-icons md-48">menu</i>   Edit Task</h2>
                <form id="card-tasks" className="card" onSubmit={this.onSubmit.bind(this)}>
                    <div className="form-group col-auto">
                        <div className="form-group col-auto">
                            <label className="bold-name" htmlFor="taskName"><h3 className="mt-2"><i className="material-icons md-18">event_note</i>   Task Name:</h3></label>
                            <h4 className=""><input
                                type="text"
                                required
                                className="text-center form-control-lg"
                                onChange={this.handleFieldChange}
                                id="taskName"
                                value={this.state.taskName}
                                placeholder="Name of Task"
                            /></h4>
                        </div>
                        <div className="form-group col-auto">
                            <label className="bold-name" htmlFor="dueDate" placeholder="Date Task is Due"><h3 className="mt-2"><i className="material-icons md-18">date_range</i>   Due Date:</h3></label>
                            <h4 className=""><input
                                type="date"
                                required
                                className="text-center form-control-lg"
                                onChange={this.handleFieldChange}
                                id="dueDate"
                                value={this.state.dueDate}
                            /></h4>
                        </div>
                        <div className="form-group col-auto">
                            <label className="bold-name" htmlFor="task"><h3 className="mt-2">{checkbox}</h3></label>
                        </div>
                        <button
                            type="submit"
                            onClick={this.updateExistingTask}
                            className="btn btn-primary"><i className="material-icons md-18">update</i>Update</button>
                    </div>
                </form>
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
                    rel="stylesheet"></link>
            </React.Fragment>
        );
    }
}