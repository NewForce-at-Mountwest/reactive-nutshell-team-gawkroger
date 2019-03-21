import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
// import InputMask from 'react-input-mask';
import "./login.css";
import userAPIManager from "./userManager"

export default class NewUserReg extends Component {
    // Set initial state
    state = {
        userName: "",
        userEmail: ""
        // password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
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
        window.history.back()
    }

    handleRegister = e => {
        e.preventDefault()

        if (this.state.userName === "") {
            window.alert("Please enter your user name")
        } else if (this.state.userEmail === "") {
            window.alert("Please enter your email address")
        }
        if (this.state.userEmail !== "" && this.state.userName !== "")
            var counter = 0
        userAPIManager.getAllUsers().then(au => {
            au.forEach(u => {
                if (
                    u.userName === this.state.userName ||
                    u.email === this.state.userEmail
                ) {
                    counter = counter + 1;
                    alert(
                        "The username or email you entered has already been used, please choose a different username and email"
                    )
                }
            })

            //if username and email are unique then counter will be 0
            if (counter < 1) {
                const newUser = {
                    name: this.state.userName,
                    email: this.state.userEmail
                    // password: this.state.userPassword
                }
                userAPIManager.postUser(newUser).then(pu => {
                    console.log(pu)
                    sessionStorage.setItem("userId", pu.id)
                    this.props.history.push("/news")
                })


            }
        })
    }

    render() {
        return (
            <form onSubmit={this.handleRegister}>
                <h1>Reactive Nutshell - Team Gawkroger</h1>
                <h2 className="h3 mb-3 font-weight-normal">Register New User</h2>
                <br />

                <label htmlFor="userName">User Name</label>
                <input
                    onChange={this.handleFieldChange}
                    type="text"
                    id="userName"
                    placeholder="User Name"
                    required=""
                    autoFocus=""
                />
                <br />

                <label htmlFor="userEmail">Email Address</label>
                <input
                    onChange={this.handleFieldChange}
                    type="email"
                    id="userEmail"
                    placeholder="Email Address"
                    required=""
                />
                <br />
                <br />
                <br />

                <button type="submit">Register New User</button>
            </form>
        )
    }
}