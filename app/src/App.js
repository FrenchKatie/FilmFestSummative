import React, { Component } from 'react';
import './index.css';
import GoogleApiWrapper from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'allCinemas',
      currentFilm: null,
      cinemaTab: 'active',
      filmTab: 'inactive'
    }

    this.changePage = this.changePage.bind(this);
    this.handleSetFilmNumber = this.handleSetFilmNumber.bind(this);
  }

  render() {
    var currentPage = this.state.currentPage;
    var currentFilm = this.state.currentFilm;
    let page;

    {/* When currentFilm is set a valid value, it will change to the single film page */}
    if(this.state.currentFilm === null){
      if(currentPage === 'allCinemas'){
            page = <AllCinemas/>
            this.state.cinemaTab = 'active';
            this.state.filmTab = 'inactive';
      }else if(currentPage === 'allFilms'){
          page = <AllFilms
            setFilmNumber={this.handleSetFilmNumber}
          />
          this.state.cinemaTab = 'inactive';
          this.state.filmTab = 'active';
      } {/* handleSetFilmNumber() is the function being invoked using the argument we set on line 339 */}
    } else {
      page = <SingleFilm
        filmNumber={currentFilm}
      />
    }



      return (
        <div className="App">
          <header>

            <div className="row text-center">
              <div className={`col headerText text-uppercase ${this.state.cinemaTab}`} onClick={this.changePage.bind(this, 'allCinemas')}>Cinemas</div>
              <div className={`col headerText text-uppercase  ${this.state.filmTab}`} onClick={this.changePage.bind(this, 'allFilms')}>Films</div>
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
      currentPage: pageNumber,
      currentFilm: null
    });
  }

  handleSetFilmNumber(itemID){
    {/* this function is setting the current film to the number that was clicked*/}
    {/* see line 25*/}
    this.setState({
      currentFilm: itemID
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
        currentPage: 'allFilms',
        error: null,
        isLoaded: false,
        items: []
      }

    }

    componentDidMount() {
      var apiURL = "http://" + process.env.REACT_APP_API_URL + ":5000/cinemas";
      // fetch("http://192.168.33.10:5000/cinemas")
      // fetch("http://localhost:5000/cinemas")
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

      return (
        <div className="main">
          <GoogleApiWrapper />
        </div>
      );

    }


}



class SingleFilm extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'SingleFilm',
      error: null,
      isLoaded: false,
      film: {},
      venues: [],
      currentFilm: this.props.filmNumber,
      cinemaInfo: [],
      activeTab: null,

    }

  }

  componentDidMount() {
    fetch("http://" + process.env.REACT_APP_API_URL + ":5000/filmsNumber/"+this.props.filmNumber)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            film: result,
            venues: result.venue
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      );

      fetch("http://" + process.env.REACT_APP_API_URL + ":5000/cinemas/")
        .then(res => res.json())
        .then(
          (cinemaResult) => {
            this.setState({
              cinemaInfo: cinemaResult
            });
          },
          (cinemaError) => {
            this.setState({
              cinemaError
            });
          }
        )
  }

  render(){

    const error = this.state.error;
    const currentPage = this.state.currentPage;
    var film = this.state.film;
    var screenings = this.state.cinemaInfo;
    var venues = this.state.venues;

    console.log(screenings);

    if (error){
      return <div>Error: {error.message}</div>;
    } else if (currentPage === 'SingleFilm'){
      return (
        <div className="main">
        <div className="film-image" style={{backgroundImage: `url(${film.images})`}}>

        </div>
        <div className="film-blurb text-center">
          <p>{film.blurb}</p>
        </div>
        <h2 className="film-title text-uppercase text-center">{film.title}</h2>
        <h5 className="film-director text-center text-uppercase">Directed by <span className="font-weight-bold">{film.director}</span></h5>
        <div className="text-center">
          <button type="button" name="button" className="btnFill text-uppercase">Watch Trailer</button>
          <button type="button" name="button" className="btnOutline text-uppercase">Read More Info</button>
        </div>
          <div className="filmScreenings">
            <h3 className="text-uppercase text-center screeningsHeader">Screenings</h3>
            <div className="scroll-ctnr">
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
                <div className="date-inactive col text-center text-uppercase">
                  <p className="date-day">Thur</p>
                  <p className="date-number">23</p>
                </div>
                <div className="date-inactive col text-center text-uppercase">
                  <p className="date-day">Fri</p>
                  <p className="date-number">24</p>
                </div>
              </div>
            </div>

          {venues.map(venue => (
              <div key={venue} className="screening-timetable">
                  <div className="row film-screeningInfo">
                    <div className="film-time col">
                      <h6 className="text-uppercase font-weight-bold">11:00 am</h6>
                    </div>
                    <div className="film-cinema col">
                      <h6 className="text-uppercase text-right">{venue}</h6>
                    </div>
                  </div>
            </div>

          ))}

          </div>
        </div>
      )
    }


  }
  changePage(){
    this.props.setFilmNumber(null);
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
          <div className="main">
            {items.map(item => (
              <div key={item.title}>
              {/* Here when the film div is clicked, a function runs and carries the film's number (item.id) as an argument */}
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

    // {/* itemID = the number of the film*/}
    // {/* This function takes the film's number and returns it to the component where it is being rendered */}
    setPage(itemID){
      this.setState({
        currentFilm: itemID
      });
      {/* This component has a property called "setFilmNumber" which runs a function. Here we are invoking the function with the itemID as an argument to make it dynamic*/}
      {/* see line 32 & 37 */}
      this.props.setFilmNumber(itemID);
    }
}




export default App;
