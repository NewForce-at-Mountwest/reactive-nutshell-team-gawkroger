import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NewsCard extends Component {
    render() {
        return (
            <div className="card">
            <div className="card-body">
            <h5 className="card-title">
            {this.props.news.newsTitle}
            </h5>
            <h4>{this.props.news.newsURL}</h4>
            <p>{this.props.news.newsSynopsis}</p>

            </div>

            </div>

        )
    }

}