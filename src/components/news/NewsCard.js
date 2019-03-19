import React, { Component } from "react";

export default class NewsCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.news.title}</h5>
          <a href={this.props.news.url} alt="news link">{this.props.news.url}</a>
          <p>{this.props.news.synopsis}</p>
        </div>
      </div>
    );
  }
}
