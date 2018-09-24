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
    var currentCinema = this.state.currentCinema; //cinema that user has clicked on
    let page; //what page you are on

    if(this.state.currentFilm === null){ // if there is no current film
        if(currentPage === 'allCinemas'){
            page = <AllCinemas
              sendCinemaNumber={this.handleSetCinemaNumber} //sends the getCinemaNumber (???) to the handle function to set it
            />
        }else if(currentPage === 'allFilms'){
            page = <AllFilms
              setFilmNumber={this.handleSetFilmNumber}
            />
        }else if (currentPage === 'singleCinema') {
              page = <SingleCinema
                cinemaNumber={currentCinema}
              />
        }

    }  else {
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
      currentCinema: cinemaID, //current cinema is now user selected one
      currentPage: 'singleCinema' //run the if statement for if currentPage = singleCinema
    });
    console.log('we are FINALLY on: ' + cinemaID); //works
  }

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

      this.setCinemaNumber = this.setCinemaNumber.bind(this);

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

      const { error } = this.state;
      var currentPage = this.state.currentPage;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (currentPage === "allCinemas") {
        return (
          <div>
            <GoogleApiWrapper
             getCinemaNumber={this.setCinemaNumber}
             />
          </div>
        )
      }


    }

    setCinemaNumber(cinemaID){ //sets the state of the current cinema to selected cinema ID
      this.setState({
        currentCinema: cinemaID
      });
      console.log('setting the cinema: ' + cinemaID); //works
      this.props.sendCinemaNumber(cinemaID);
    }


}


class SingleCinema extends Component {

  render(){
    console.log('You are on single cinema');
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
      this.props.setFilmNumber(itemID);
    }
}




export default App;
