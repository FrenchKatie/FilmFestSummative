import React, { Component } from 'react';
import './index.css';
import './js/script.js';
import SimpleMap from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'page1'
    }

    this.changeClass = this.changePage.bind(this);

  }

  render() {
    var currentPage = this.state.currentPage;
    let page;

    if(currentPage === 'allCinemas'){
          page = <AllCinemas/>
    } else if(currentPage === 'allFilms'){
        page = <AllFilms/>
    }

      return (
        <div className="App">
          <header>
            <div className="row text-center">
              <div className="inactive col headerText text-uppercase" onClick={this.changePage.bind(this, 'allCinemas')}>Cinemas</div>
              <div className="active col headerText text-uppercase" onClick={this.changePage.bind(this, 'allFilms')}>Films</div>
            </div>
          </header>
          <div>
            {page}
          </div>
        </div>
      );

  }

  changePage(pageNumber){
    this.setState({
      currentPage: pageNumber
    });

  }
}

class AllCinemas extends Component {
    render() {

      return (
        <div id="map">
          <SimpleMap />
        </div>
      );
    }
}

class AllFilms extends Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    }

  }

  componentDidMount() {
    fetch("http://192.168.33.10:5000/films")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            items: result
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

    render() {

      const { error, items } = this.state;

      if (error){
        return <div>Error: {error.message}</div>;
      } else {
        return (
          <div id="filmList">
            {items.map(item => (
              <div key={item.title}>
              <div className="filmListItem row">
                <div className="col">
                  <div className="filmListItem-img" id={item.id}>
                    <h6 className="filmListItem-category text-center position-relative cat-fresh">{item.section}</h6>
                  </div>
                </div>
                <div className="col">
                  <h5 className="filmListItem-title">{item.title}</h5>
                  <h6 className="filmListItem-director">{item.director[0]}</h6>
                  <p className="filmListItem-description">{item.blurb}</p>

                </div>
              </div>
              </div>
            ))}
          </div>
        );
      }
    }
}

export default App;
