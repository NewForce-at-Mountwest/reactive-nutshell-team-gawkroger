import React, { Component } from "react"
import './login.css'
import userManager from "./userManager";


export default class Login extends Component {

    // Set initial state
    state = {

        userEmail: "",
        password: "",
        rememberMe: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        // console.log(evt.target.checked)
        // console.log(evt.target.id)
        this.setState(stateToChange)
    }

    handleCheckbox = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }

    goBack() {
        window.history.back();
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.userEmail === "") {
            alert("Please enter your registered email address.")
        } else if
        (this.state.password === "") {
            alert("Please enter your password")
        }
        else {
            userManager.checkUserEmail(this.state.userEmail)
                .then(su => {
                    console.log(su)
                    if (su[0].length === 0) {
                        alert("That email address was not found. Please try to register or use a different email.")
                    } if
                        (su[0].password !== this.state.password) {
                        alert("That password is not correct. Please try again.")
                    }
                    else if (this.state.rememberMe === true) {
                        localStorage.setItem("userId", su[0].id)
                        sessionStorage.setItem("userId", su[0].id)
                        this.props.getUserEvents(parseInt(sessionStorage.getItem("userId")))
                        this.props.getUserTasks(parseInt(sessionStorage.getItem("userId")))
                        this.props.history.push("/news")
                    } else {
                        sessionStorage.setItem("userId", su[0].id)
                        this.props.getUserEvents(parseInt(sessionStorage.getItem("userId")))
                        this.props.getUserTasks(parseInt(sessionStorage.getItem("userId")))
                        this.props.history.push("/news")
                    }
                }
            )
        }
    }


render() {
    return (
        <div>
            <form onSubmit={this.handleLogin}>
                <h1>Reactive Nutshell - Team Gawkroger</h1>
                <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                <br></br>

                <label htmlFor="userEmail">
                    Email address
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="userEmail"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <br></br>
                <label htmlFor="inputPassword">
                    Password
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <br></br>
                <label htmlFor="rememberMe">
                    Remember Me
                </label>
                <input onChange={this.handleCheckbox} type="checkbox"
                    id="rememberMe"
                    placeholder=""
                    required="" autoFocus="" />
                <br></br>
                <button type="submit">
                    Sign in
                        </button>
            </form>
            <section>
                <br></br>
                <h3>-or-</h3>
                <br></br>
                <button type="register" onClick={() => this.props.history.push("/register")}
                    id="newUserReg">
                    Register New User
                </button>
            </section>
        </div>
    )
}
}