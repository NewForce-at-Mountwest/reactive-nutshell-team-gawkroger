import React, { Component } from "react";
import "./news.css";

export default class NewsDetail extends Component {
render() {
    // console.log(this.props.news);
const news =
    this.props.news.find(
        n => n.id === parseInt(this.props.match.params.newsId)
    ) || {};
  return (
<section className="news-section">
<div key={news.id} className="card">
    <div className="card-body">
        <h5 className="card-title">{news.title}</h5>
          <a href={news.url} alt="news link">{news.url}</a>
          <p>{news.synopsis}</p>

 <button
 type="button"
 className="btn btn-danger"
 onClick={() =>
     this.props
     .deleteNews(news.id)
     .then(() => this.props.history.push("/news"))
 }
 >
 Delete
 </button>
 <button
 type="button"
 className="btn btn-success btn-edit"
 onClick={() => {
     this.props.history.push(
         `/news/${news.id}/edit`
     );
 }}
 >
 Edit
 </button>
 </div>
 </div>
 </section>
  )}
}
