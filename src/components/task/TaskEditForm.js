import React, { Component } from 'react';
import TaskManager from "../../modules/TaskManager"
import './Task.css';

export default class TaskEditForm extends Component {
    // Set initial state
    state = {
        taskName: "",
        isCompleted: "",
        dueDate: ""
    };


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingTask = evt => {
        evt.preventDefault()

        const editedTask = {
            id: this.props.match.params.taskId,
            name: this.state.taskName,
            isCompleted: this.state.isCompleted,
            dueDate: this.state.dueDate
        };

        this.props.updateTask(editedTask)
            .then(() => this.props.history.push("/tasks"))
    }

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
        return (
            <React.Fragment>
                <h3 className="task">Edit Task</h3>
                <form id="taskformwindow" className="taskForm">
                    <div id="inputwindow">
                        <div className="form-group col-auto">
                            <label className="bold-name" htmlFor="taskName">Task Name:</label>
                            <input
                                type="text"
                                required
                                className="grayText form-control text-center"
                                onChange={this.handleFieldChange}
                                id="taskName"
                                value={this.state.taskName}
                                placeholder="Name of Task"
                            />
                        </div>
                        <div className="form-group col-auto">
                            <label className="bold-name" htmlFor="dueDate" placeholder="Date Task is Due">Due Date:</label>
                            <input
                                type="date"
                                required
                                className="grayText form-control text-center"
                                onChange={this.handleFieldChange}
                                id="dueDate"
                                value={this.state.dueDate}
                            />
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
                            <button
                                type="submit"
                                onClick={this.updateExistingTask}
                                className="btn btn-primary"
                            >
                                <b>Update</b>
                            </button>
                        </div>
                    </div>
                </form>
            </React.Fragment>
        );
    }
}