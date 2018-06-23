'use strict';

import React from 'react';
import superagent from 'superagent';

import SearchForm from './reddit/searchform.js';
import SearchResult from './reddit/searchresult.js';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      hasError: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log('__STATE__', this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    let searchFormBoard = e.target.searchFormBoard.value.trim();
    let searchFormLimit = e.target.searchFormLimit.value;
    let url = `http://www.reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}`;

    superagent.get(url)
      .then(results => {
        this.setState({hasError: false});
        let topics = results.body.data.children;
        console.log('body data console', results.body.data);
        this.setState(Object.assign(...this.state, {topics}));
      })
      .catch(err => this.setState({hasError: true}));
  }

  render() {
    return (
      <main>        
        <h1>Reddit Search</h1>
        <SearchForm searchClass={this.state.hasError ? 'error' : 'success'} redditSearch={this.handleSubmit} />
        <ul>
          <SearchResult searchResults={this.state.topics}/>
        </ul>
      </main>
    );
  }
}