import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./news.css";


export default class NewsCard extends Component {
  render() {

    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{this.props.news.title}</h5>
          <a href={this.props.news.url} alt="news link">{this.props.news.url}</a>
          <p>{this.props.news.synopsis}</p>
        </div>
            <Link className="nav-link mng-link" to={`/news/${this.props.news.id}`}>
            Manage
            </Link>

        </div>
    );
  }
}
