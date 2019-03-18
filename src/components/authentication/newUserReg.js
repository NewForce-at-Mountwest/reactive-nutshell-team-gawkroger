import React, { Component } from "react"
// import InputMask from 'react-input-mask';
// import './login.css'
import userAPIManager from './userManager'



export default class NewUserReg extends Component {

    // Set initial state
    state = {
        userName: "",
        userEmail: "",
        // password: ""

    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        // console.log(evt.target.checked)
        // console.log(evt.target.id)
        this.setState(stateToChange)
    }

    // handleCheckbox = (evt) => {
    //     const stateToChange = {}
    //     stateToChange[evt.target.id] = evt.target.checked
    //     this.setState(stateToChange)
    // }

    goBack() {
        window.history.back();
    }

    handleRegister = (e) => {
        e.preventDefault()

        if (this.state.userName === "") {
            window.alert("Please enter your user name");
        } else if
            (this.state.userEmail === "") {
            window.alert("Please enter your email address")
        } else if
            (this.state.userPassword === "") {
            window.alert("Please choose a valid password")
        }


        else {
            const newUser = {
                name: this.state.userName,
                email: this.state.userEmail,
                // password: this.state.userPassword
                // Make sure the employeeId is saved to the database as a number since it is a foreign key.
                // employeeId: parseInt(this.state.employeeId)
            };
            // this.props
            // .addUser(newUser)
            console.log(newUser)
            // .then(() => this.props.history.push("/"));
            userAPIManager.postUser(newUser)

            // if (this.state.rememberMe === true) {
            //     localStorage.setItem(
            //         "credentials",
            //         JSON.stringify({
            //             email: this.state.email,
            //             password: this.state.password
            //         }))
            //     sessionStorage.setItem(
            //         "credentials",
            //         JSON.stringify({
            //             email: this.state.email,
            //             password: this.state.password
            //         }))
            //     this.goBack()
            // } else {
                sessionStorage.setItem(
                    "credentials",
                    JSON.stringify({
                        email: this.state.email,
                        userName: this.state.userName
                    }))
                // this.goBack()
        }
    };

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1>Roo's MF'n Ark</h1>
                <h2 className="h3 mb-3 font-weight-normal">Register New User</h2>
                <br></br>

                <label htmlFor="userName">
                    User Name
                </label>
                <input onChange={this.handleFieldChange} type="text"
                    id="userName"
                    placeholder="User Name"
                    required="" autoFocus="" />
                <br></br>

                <label htmlFor="userEmail">
                    Email Address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="userEmail"
                    placeholder="Email Address"
                    required="" />
                <br></br>
                <br></br>
                <br></br>

                <button type="submit">
                    Register New User
                </button>
            </form>
        )
    }
}