import React, { Component } from "react";

export default class NewsList extends Component {
    render () {
return (
    <React.Fragment>
       <div className="newsButton">
        <button type="button"
        className="btn btn-pprimary"
        onClick={() => {
            this.props.history.push("/news/new");
        }}
        >
        Add News
        </button>
       </div>
       <section className="news">
       {this.props.news.map(singleNewsArticle => (
           <newsCard key={singleNewsArticle.id} news={singleNewsArticle} />

       ))}

       </section>
    </React.Fragment>
)
}
}