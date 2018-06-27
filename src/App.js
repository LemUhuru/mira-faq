import React, { Component } from 'react';
import data from './data.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      faq: [],
      articleCategory: {},
      displayArticles: false,
      displayArticle: false,
    }

    this.handleCategoryClick = this.handleCategoryClick.bind(this)
    this.handleArticleClick = this.handleArticleClick.bind(this)
  }

  handleCategoryClick(articleCategory) {
    this.setState({displayArticles: true, articleCategory})
  }

  handleArticleClick(event) {
    event.stopPropagation()
    let articleBody = event.target.nextElementSibling
    articleBody.classList.toggle('active')

  }

  componentDidMount() {
    this.setState({ faq: data.collections })
  }

  render() {
    const { faq, articleCategory, displayArticles, displayArticle } = this.state
    const { collectionName, articles } = articleCategory

    return (
      <div className="App container">
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <input
                onClick={() => this.setState({displayArticles: false})}
                type="button"
                className="btn btn-primary"
                value="Home"
                />
            </div>
          </div>
        </nav>

        <h1 className="page-title">Knowledge Center</h1>
        {displayArticles ? (
          <div>
            <p className="category-title">Category: {collectionName}</p>
            <ul className="articles-list">
              {articles.map((article, index) => {
                return (
                  <li key={index}
                    >
                    <p
                      onClick={e => this.handleArticleClick(e)}
                      className="article-title"
                      >
                      {article.title}

                    </p>
                    <p className="article-body">{article.body}</p>
                  </li>)
              })}
            </ul>
          </div>

        ):(
          <ul className="categories-list">
            {faq.map((category, index) => {
            return (<li
              key={index}
              onClick={() => this.handleCategoryClick(category)}
              >
                <div className="title">{category.collectionName}</div>
              </li>)
            })}
          </ul>
        )}
      </div>
    );
  }
}

export default App;
