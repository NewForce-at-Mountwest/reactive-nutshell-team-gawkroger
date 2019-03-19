import {Component} from "react";
import React from "react";

class Messages extends component {
    render() {
        const {messages} = this.props;
        return (
            <ul className="Messages-list">{messages.map(m => this.renderMessage(m))}</ul>
        );
    }
}

export default Messages;