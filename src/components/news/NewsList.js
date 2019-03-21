import React, { Component } from "react";
import NewsCard from "./NewsCard";
import "./news.css";

export default class NewsList extends Component {
    render () {
return (
    <React.Fragment>
       <section className="news-section">
              {this.props.news.map(singleNewsArticle => (
           <NewsCard key={singleNewsArticle.id} news={singleNewsArticle}/>

       ))}

       </section>
       <div className="newsButton">
        <button type="button"
        className="btn btn-success news-btn"
        onClick={() => {
            this.props.history.push("/news/new");
        }}
        >
        Add News
        </button>
       </div>
    </React.Fragment>
)
}
}