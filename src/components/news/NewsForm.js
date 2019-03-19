import React, { Component } from "react";

export default class NewsForm extends Component {
    state = {
        newsTitle: "",
        newsSynopsis: "",
        newsURL: ""
    };

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    buildNewsArticle = evt => {
        evt.preventDefault();
        const news = {
            title: this.state.newsTitle,
            synopsis: this.state.newsSynopsis,
            URL: this.state.newsURL
        };

    this.props
        .addNews(news)
        .then(() => this.props.history.push("/news"));
    }


render() {
    return(
    <React.Fragment>
        <form className="newsForm">
        <div className="form-group">
        <label htmlFor="newsTitle">News Headline</label>
        <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="newsTitle"
            placeholder="News headline"
        />
        </div>
        <div className="form-group">
        <label htmlFor="newsSynopsis">Synopsis</label>
        <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="newsSynopsis"
            placeholder="add a brief synopsis"
        />
        </div>
        <div className="form-group">
        <label htmlFor="newsURL">URL</label>
        <input
            type="url"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="newsURL"
            placeholder="www.yourlink.com"
        />
        </div>
        <button
            type="submit"
            onClick={this.buildNewsArticle}
            className="btn btn-primary"
        >
        Submit
        </button>
        </form>
    </React.Fragment>

    )}
    }
