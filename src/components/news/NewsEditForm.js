import React, { Component } from "react";
import newsManager from "../../modules/newsManager"
export default class NewsEditForm extends Component {

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

    updateExistingNews = evt => {
        evt.preventDefault();
        const editedNews = {
            id: this.props.match.params.newsId,
            title: this.state.newsTitle,
            synopsis: this.state.newsSynopsis,
            URL: this.state.newsURL
        }
        this.props
        .updateNews(editedNews)
        .then(() => this.props.history.push("/news"))
    };

    componentDidMount() {
        newsManager.getOne(this.props.match.params.newsId).then(news => {
            this.setState({
                newsTitle: news.title,
                newsSynopsis: news.synopsis,
                newsURL: news.url
            });
        });
    };

    render() {
        return (
        <React.Fragmemnt>
        <form className="newsForm">
        <div className="form-group">
        <label htmlFor="newsTitle">News Headline</label>
        <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="newsTitle"
            value={this.state.newsTitle}
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
            value={this.state.newsSynopsis}
        />
        </div>
        <div className="form-group">
        <lable htmlFor="newsURL">URL</lable>
        <input
            type="url"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="newsURL"
            value={this.state.newsURL}
        />
        </div>
        <button
            type="submit"
            onClick={this.updateExistingNews}
            className="btn btn-primary"
        >
        Submit
        </button>
        </form>
        </React.Fragmemnt>
        )
    }
}
