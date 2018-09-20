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
    // this.setFilmNumber = this.setFilmNumber.bind(this);
    this.handleSetFilmNumber = this.handleSetFilmNumber.bind(this);

  }

  render() {
    var currentPage = this.state.currentPage;
    var currentFilm = this.state.currentFilm;
    let page;

    if(this.state.currentFilm === null){
      if(currentPage === 'allCinemas'){
            page = <AllCinemas/>
      }else if(currentPage === 'allFilms'){
          page = <AllFilms
            setFilmNumber={this.handleSetFilmNumber}
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

  // goToSingle(){
  //   this.setState({
  //     currentPage: 'singleFilm'
  //   })
  // }
}

class AllCinemas extends Component {
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
      film: [],
      currentFilm: this.props.filmNumber
    }

  }

  componentDidMount() {
    fetch("http://192.168.33.10:5000/filmsNumber/"+this.props.filmNumber)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            film: result
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

    const error = this.state.error;
    const currentPage = this.state.currentPage;
    var film = this.state.film;
    console.log(film.director);

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
                <div className="film-time col">
                  <h6 className="text-uppercase font-weight-bold">11.00 am</h6>
                </div>
                <div className="film-cinema col">
                  <h6 className="text-uppercase text-right">{film.venue}</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-time col">
                  <h6 className="text-uppercase font-weight-bold">11.45 am</h6>
                </div>
                <div className="film-cinema col">
                  <h6 className="text-uppercase text-right">null</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-time col">
                  <h6 className="text-uppercase font-weight-bold">1.30 am</h6>
                </div>
                <div className="film-cinema col">
                  <h6 className="text-uppercase text-right">null</h6>
                </div>
              </div>
          </div>
        </div>


        </div>
      )
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
      var currentPage = this.state.currentPage;

      if (error){
        return <div>Error: {error.message}</div>;
      } else if (currentPage === 'allFilms'){
        return (
          <div className="main">
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
      this.props.setFilmNumber(itemID);
    }
}



export default App;
