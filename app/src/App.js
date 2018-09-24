import React, { Component } from 'react';
import './index.css';
import GoogleApiWrapper from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'allCinemas',
      currentFilm: null
    }

    this.changePage = this.changePage.bind(this);
    this.handleSetFilmNumber = this.handleSetFilmNumber.bind(this);
    this.handleSetCinemaNumber = this.handleSetCinemaNumber.bind(this);

  }

  render() {
    var currentPage = this.state.currentPage;
    var currentFilm = this.state.currentFilm;
    var currentCinema = this.state.currentCinema;
    let page;

    if(this.state.currentFilm === null){
      if(currentPage === 'allCinemas'){
          page = <AllCinemas
            setCinemaNumber={this.handleSetCinemaNumber}
          />
      }else if(currentPage === 'allFilms'){
          page = <AllFilms
            setFilmNumber={this.handleSetFilmNumber}
          />
      }
    } else if (currentPage === 'singleCinema') {
          page = <SingleCinema
            cinemaNumber={currentCinema}
          />
    } else {
          page = <SingleFilm
            filmNumber={currentFilm}
          />
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

  handleSetFilmNumber(itemID){
    this.setState({
      currentFilm: itemID
    });
  }

  handleSetCinemaNumber(cinemaID){
    this.setState({
      currentCinema: cinemaID
    });
  }

  // goToSingle(){
  //   this.setState({
  //     currentPage: 'singleFilm'
  //   })
  // }
}

class AllCinemas extends Component {

    constructor(props){
      super(props);
      this.state = {
        currentPage: 'allCinemas',
        error: null,
        isLoaded: false,
        items: [],
        currentCinema: null
      }

    }

    componentDidMount() {
      var apiURL = "http://" + process.env.REACT_APP_API_URL + ":5000/cinemas";
      console.log(apiURL);
      // fetch("http://192.168.33.10:5000/cinemas")
      // fetch("http://localhost:5000/cinemas")
      fetch(apiURL)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);
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
      var currentPage = this.state.currentPage;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (currentPage === "allCinemas") {
        return (
          <div>
            <GoogleApiWrapper />
          </div>
        )
      }


    }


}


class SingleCinema extends Component {


  render(){
    return (
      <div id="cinema">
      <h1>The current cinema ID is - {this.props.cinemaNumber}</h1>

      </div>
    )
  }
}



class SingleFilm extends Component {


  render(){
    return (
      <div id="film">
      <h1>The current film ID is - {this.props.filmNumber}</h1>

      </div>
    )
  }
}


class AllFilms extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'allFilms',
      error: null,
      isLoaded: false,
      items: [],
      currentFilm: null
    }

  }

  componentDidMount() {
    var apiURL = "http://" + process.env.REACT_APP_API_URL + ":5000/films";
    console.log(apiURL);
    // fetch("http://192.168.33.10:5000/films")
    // fetch("http://localhost:5000/films")
    fetch(apiURL)
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
      var currentPage = this.state.currentPage;

      if (error){
        return <div>Error: {error.message}</div>;
      } else if (currentPage === 'allFilms'){
        return (
          <div id="filmList">
            {items.map(item => (
              <div key={item.title}>
              <div className="filmListItem row" onClick={this.setPage.bind(this, item.id)}>
                <div className="col">
                  <div className="filmListItem-img" id={item.id} style={{backgroundImage: `url(${item.images[0]})`}}>
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

    setPage(itemID){
      this.setState({
        currentFilm: itemID
      });
      console.log(itemID);
      this.props.set(itemID);
    }
}




export default App;
