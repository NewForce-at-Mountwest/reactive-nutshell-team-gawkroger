import {Component} from "react";
import React from "react";

export default class MessagesList extends Component {
    render () {
        return (
            <React.Fragment>
                 <ul className="Messages-list">{messages.map(m => this.renderMessage(m))}</ul>
            </React.Fragment>
        )
    }






// render() {
//     const {messages} = this.props;
//     return (
//         <ul className="Messages-list">{messages.map(m => this.renderMessage(m))}</ul>
//     );
// }
// }