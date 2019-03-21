import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./news.css";
import Moment from "react-moment";


export default class NewsCard extends Component {


  render() {


    return (
      <div className="card" id="cardID">
        <div className="card-body" id="cardBody">
          <h5 className="card-title">{this.props.news.title}</h5>
          <a href={this.props.news.url} alt="news link">{this.props.news.url}</a>
          <p>{this.props.news.synopsis}</p>
          <Moment parse="YYYY-MM-DD HH:mm">
          {this.props.news.timestamp}
          </Moment>
        </div>
            <Link className="nav-link mng-link" to={`/news/${this.props.news.id}`}>
            Manage
            </Link>

        </div>
    );
  }
}
