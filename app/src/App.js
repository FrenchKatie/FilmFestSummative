import React, { Component } from 'react';
import './css/index.css';
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
    this.handleSetCinemaNumber = this.handleSetCinemaNumber.bind(this);

  }

  render() {
    var currentPage = this.state.currentPage;
    var currentFilm = this.state.currentFilm;
    var currentCinema = this.state.currentCinema; //cinema that user has clicked on

    let page;

    {/* When currentFilm is set a valid value, it will change to the single film page */}
    if(this.state.currentFilm === null){ // if there is no current film
        if(currentPage === 'allCinemas'){
            page = <AllCinemas
              sendCinemaNumber={this.handleSetCinemaNumber} //sends the getCinemaNumber (???) to the handle function to set it
            />
            this.state.cinemaTab = 'active';
            this.state.filmTab = 'inactive';
        }else if(currentPage === 'allFilms'){
            page = <AllFilms
              setFilmNumber={this.handleSetFilmNumber}
            />
            this.state.cinemaTab = 'inactive';
            this.state.filmTab = 'active';
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

  handleSetCinemaNumber(cinemaID){
    this.setState({
      currentCinema: cinemaID, //current cinema is now user selected one
      currentPage: 'singleCinema' //run the if statement for if currentPage = singleCinema
    });
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
      this.props.sendCinemaNumber(cinemaID);
    }


}


class SingleCinema extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'SingleCinema',
      error: null,
      cinemaInfo: {},
      openingHours: {}
    }

  }

  componentDidMount() {
    var apiURL = "http://" + process.env.REACT_APP_API_URL + ":5000/cinemasNumber/"+this.props.cinemaNumber;
    // fetch("http://192.168.33.10:5000/cinemas")
    // fetch("http://localhost:5000/cinemas")
    fetch(apiURL)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            cinemaInfo: result,
            openingHours: result.openingHours
          });
        },
        (error) => {
          this.setState({
            error
          });
        }
      )
  }

  render(){
    var currentCinema = this.props.cinemaNumber;
    var cinemaInfo = this.state.cinemaInfo;
    var openingHours = this.state.openingHours;

      return (
        <div id="cinema">
          <div className="cinema">
            <div className="row">
              <div id="cinemaInfo" className="col">
                <h2 className="cinemaInfo-title text-center text-uppercase">{cinemaInfo.title}</h2>
                <div className="cinemaInfo-wrap">
                  <div id="cinema-address" className="">
                    <h6 className="font-weight-bold cinemaInfo-header text-uppercase  ">Address</h6>
                    <p id="cinema-address-street" className="cinemaInfo-text">{cinemaInfo.street}</p>
                    <p id="cinema-address-suburb" className="cinemaInfo-text">{cinemaInfo.suburb}</p>
                    <p id="cinema-address-city" className="cinemaInfo-text">{cinemaInfo.city}</p>
                  </div>
                  <div id="cinema-phone" className=" cinemaInfoPadd">
                    <h6 className="font-weight-bold cinemaInfo-header text-uppercase  ">Phone</h6>
                    <p className="cinemaInfo-text">{cinemaInfo.phone}</p>
                  </div>

                  <div id="cinema-hours" className=" cinemaInfoPadd">
                    <h6 className="font-weight-bold cinemaInfo-header text-uppercase ">Opening Hours</h6>
                    <div id="cinema-hours-monday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Monday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Monday}</p>
                    </div>
                    <div id="cinema-hours-tuesday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Tuesday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Tuesday}</p>
                    </div>
                    <div id="cinema-hours-wednesday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Wednesday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Wednesday}</p>
                    </div>
                    <div id="cinema-hours-thursday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Thursday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Thursday}</p>
                    </div>
                    <div id="cinema-hours-friday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Friday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Friday}</p>
                    </div>
                    <div id="cinema-hours-saturday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Saturday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Saturday}</p>
                    </div>
                    <div id="cinema-hours-sunday" className="row">
                      <p className="cinemaInfo-text cinemaInfo-days col">Sunday</p>
                      <p className="cinemaInfo-text cinemaInfo-times col">{openingHours.Sunday}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      )

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
      screenings: [],
      currentFilm: this.props.filmNumber,
      cinemaInfo: [],
      activeTab: null,
      moreInfo: 'hidden',
      dateTabs: document.getElementsByClassName('date-tab')

    }

    this.toggleShowInfo = this.toggleShowInfo.bind(this);

  }

  componentDidMount() {
    fetch("http://" + process.env.REACT_APP_API_URL + ":5000/filmsNumber/"+this.props.filmNumber)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            film: result,
            venues: result.venue,
            screenings: result.screenings,
            activeTab: 'mon'
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
    var venues = this.state.venues;
    var screenings = this.state.screenings;
    var activeTab = this.state.activeTab;

    var dateTabs = this.state.dateTabs;
    if (dateTabs.length == 7){
      for (var i = 0; i < dateTabs.length; i++) {
        if(activeTab == dateTabs[i].id){
          dateTabs[i].classList.add('date-active');
          dateTabs[i].classList.remove('date-inactive');
        } else {
          dateTabs[i].classList.remove('date-active');
          dateTabs[i].classList.add('date-inactive');
        }
      }
    }


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
          <button type="button" name="button" className="btnOutline text-uppercase" onClick={this.toggleShowInfo.bind(this)}>Read More Info</button>
        </div>
        <div className={`more-info ${this.state.moreInfo}`}>
          <h5 className="film-info text-center text-uppercase">Produced by <span className="font-weight-bold">{film.producer}</span></h5>
          <h5 className="film-info text-center text-uppercase">Edited by <span className="font-weight-bold">{film.editor}</span></h5>
          <h5 className="film-info text-center text-uppercase">Music by <span className="font-weight-bold">{film.music}</span></h5>
          <p>{film.description}</p>
        </div>
          <div className="filmScreenings">
            <h3 className="text-uppercase text-center screeningsHeader">Screenings</h3>
            <div className="scroll-ctnr">
              <div className="screening-dates row">
                <div className="date-tab date-inactive col text-center text-uppercase" id='sat' onClick={this.selectDate.bind(this, 'sat')}>
                  <p className="date-day">Sat</p>
                  <p className="date-number">18</p>
                </div>
                <div className="date-tab date-inactive col text-center text-uppercase" id='sun' onClick={this.selectDate.bind(this, 'sun')}>
                  <p className="date-day">Sun</p>
                  <p className="date-number">19</p>
                </div>
                <div className="date-tab date-active col text-center text-uppercase" id='mon' onClick={this.selectDate.bind(this, 'mon')}>
                  <p className="date-day">Mon</p>
                  <p className="date-number">20</p>
                </div>
                <div className="date-tab date-inactive col text-center text-uppercase" id='tue' onClick={this.selectDate.bind(this, 'tue')}>
                  <p className="date-day">Tue</p>
                  <p className="date-number">21</p>
                </div>
                <div className="date-tab date-inactive col text-center text-uppercase" id='wed' onClick={this.selectDate.bind(this, 'wed')}>
                  <p className="date-day">Wed</p>
                  <p className="date-number">22</p>
                </div>
                <div className="date-tab date-inactive col text-center text-uppercase" id='thu' onClick={this.selectDate.bind(this, 'thu')}>
                  <p className="date-day">Thur</p>
                  <p className="date-number">23</p>
                </div>
                <div className="date-tab date-inactive col text-center text-uppercase" id='fri' onClick={this.selectDate.bind(this, 'fri')}>
                  <p className="date-day">Fri</p>
                  <p className="date-number">24</p>
                </div>
              </div>
            </div>

          {venues.map((venue, index) => {
            var times = screenings[index];
            // this.state.screenings.[{venue}].mon[0]
            if (activeTab === 'mon'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.mon}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'tue'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.tue}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'wed'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.wed}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'thu'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.thu}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'fri'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.fri}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'sat'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.sat}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            } else if (activeTab === 'sun'){
              return (
                <div key={venue} className="screening-timetable">
                    <div className="row film-screeningInfo">
                      <div className="film-time col">
                        <h6 className="text-uppercase font-weight-bold">{times.sun}</h6>
                      </div>
                      <div className="film-cinema col">
                        <h6 className="text-uppercase text-right">{venue}</h6>
                      </div>
                    </div>
              </div>
              );
            }

        })}

          </div>
        </div>
      )
    }


  }
  changePage(){
    this.props.setFilmNumber(null);
  }

  selectDate(day){

    var screenings = this.state.screenings;
    var activeTab = this.state.activeTab;

    this.setState({
      activeTab: day
    });

  }

  toggleShowInfo(){
    if (this.state.moreInfo === 'hidden'){
      this.setState({
        moreInfo: 'visible'
      });
    } else {
      this.setState({
        moreInfo: 'hidden'
      });
    }
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
