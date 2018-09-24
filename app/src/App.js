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

        <div className="row">
          <div id="cinemaInfo" className="col">
            <div id="cinema-address">
              <h6 className="font-weight-bold cinemaInfo-header text-uppercase">Address</h6>
              <p id="cinema-address-street" className="cinemaInfo-text">129 Imaginary Street</p>
              <p id="cinema-address-suburb" className="cinemaInfo-text">Te Aro</p>
              <p id="cinema-address-city" className="cinemaInfo-text">Wellington</p>
            </div>
            <div id="cinema-phone">
              <h6 className="font-weight-bold cinemaInfo-header text-uppercase">Phone</h6>
              <p className="cinemaInfo-text">(04) 587 2653</p>
            </div>
            <div id="cinema-hours" className="">
              <h6 className="font-weight-bold cinemaInfo-header text-uppercase">Opening Hours</h6>
              <div id="cinema-hours-monday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Monday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-tuesday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Tuesday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-wednesday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Wednesday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-thursday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Thursday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-friday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Friday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-saturday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Saturday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
              <div id="cinema-hours-sunday" className="row">
                <p className="cinemaInfo-text cinemaInfo-days col">Sunday</p>
                <p className="cinemaInfo-text cinemaInfo-times col">10am - 11am</p>
              </div>
            </div>
          </div>
        </div>
        <div className="screenings">
          <h3 className="text-uppercase text-center screeningsHeader">Screenings</h3>
          <div className="screening-dates row">
            <div className="date-inactive col text-center text-uppercase">
              <p className="date-day">Sat</p>
              <p className="date-number">18</p>
            </div>
            <div className="date-inactive col text-center text-uppercase">
              <p className="date-day">Sun</p>
              <p className="date-number">19</p>
            </div>
            <div className="date-active col text-center text-uppercase">
              <p className="date-day">Mon</p>
              <p className="date-number">20</p>
            </div>
            <div className="date-inactive col text-center text-uppercase">
              <p className="date-day">Tue</p>
              <p className="date-number">21</p>
            </div>
            <div className="date-inactive col text-center text-uppercase">
              <p className="date-day">Wed</p>
              <p className="date-number">22</p>
            </div>
          </div>
          <div className="screening-timetable">

              <div className="row film-screeningInfo">
                <div className="film-timeTitleDirector col-7">
                  <h6 className="text-uppercase font-weight-bold screeningText screening-time">11.00 am</h6>
                  <h6 className="text-uppercase font-weight-bold screeningText">Blue My Mind</h6>
                  <h6 className="screeningText">Lisa Bruhlmann</h6>
                </div>
                <div className="film-category col-5">
                  <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-timeTitleDirector col-7">
                  <h6 className="text-uppercase font-weight-bold screeningText screening-time">11.00 am</h6>
                  <h6 className="text-uppercase font-weight-bold screeningText">The Rider </h6>
                  <h6 className="screeningText">Chloé Zhao</h6>
                </div>
                <div className="film-category col-5">
                  <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-timeTitleDirector col-7">
                  <h6 className="text-uppercase font-weight-bold screeningText screening-time">11.00 am</h6>
                  <h6 className="text-uppercase font-weight-bold screeningText">The Trial</h6>
                  <h6 className="screeningText">Maria Augusta Ramos</h6>
                </div>
                <div className="film-category col-5">
                  <h6 className="filmListItem-category text-center position-relative cat-newsAndFakeNews">News / Fake News</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-timeTitleDirector col-7">
                  <h6 className="text-uppercase font-weight-bold screeningText screening-time">11.00 am</h6>
                  <h6 className="text-uppercase font-weight-bold screeningText">Yellow is Forbidden</h6>
                  <h6 className="screeningText">Pietra Brettkelly</h6>
                </div>
                <div className="film-category col-5">
                  <h6 className="filmListItem-category text-center position-relative cat-bigNights">Big Nights</h6>
                </div>
              </div>


          </div>
        </div>
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
