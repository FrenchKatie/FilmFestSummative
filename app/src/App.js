import React, { Component } from 'react';
import './index.css';
import SimpleMap from './map';

class App extends Component {

  constructor(){
    super();
    this.state = {
      currentPage: 'page1'
    }

    this.changeClass = this.changePage.bind(this);

  }

  render() {

    var currentPage = this.state.currentPage;
    let page;

    if(currentPage === 'page1'){
          page = <Page1/>
    } else if(currentPage === 'page2'){
        page = <Page2/>
    }

    return (
      <div className="App">
        <div className="nav">
          <span className="nav-tab" onClick={this.changePage.bind(this, 'page1')}>FILMS</span>
          <span className="nav-tab" onClick={this.changePage.bind(this, 'page2')}>CINEMAS</span>
        </div>
        <h1>Hello world</h1>
          {page}
      </div>
    );
  }

  changePage(pageNumber){
    this.setState({
      currentPage: pageNumber
    });

  }

}

class Page1 extends Component {
    render() {
      return (
        <div>
            <h2>Page 1</h2>
            <p>This is the content of page 1</p>
        </div>
      );
    }
}

class Page2 extends Component {
    render() {
      return (
        <div>
            <h2>Page 2</h2>
            <p>This is the content of page 2</p>
        </div>
      );
    }
}

export default App;
