import React, { Component } from 'react';
import './index.css';
import GoogleApiWrapper from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'allCinemas'
    }

    this.changePage = this.changePage.bind(this);
    this.goToSingle = this.goToSingle.bind(this);

  }

  render() {
    var currentPage = this.state.currentPage;
    let page;

    if(currentPage === 'allCinemas'){
          page = <AllCinemas/>
    }else if(currentPage === 'allFilms'){
        page = <AllFilms
                  handleChange={this.goToSingle}
                />
    } else if (currentPage === 'singleFilm') {
        page = <SingleFilm />
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

  goToSingle(){
    this.setState({
      currentPage: 'singleFilm'
    })
  }
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

      return (
        <GoogleApiWrapper />
      );
    }

}



class SingleFilm extends Component {


  render(){
    return (
      <div id="film">
        <div className="film-image">

        </div>
        <div className="film-blurb text-center">
          <p>A mysterious high-school girl dives headfirst into the vices of teenage life, while undergoing a radical and uncontrollable transformation of her own, in Lisa Brühlmann’s formidable debut feature.</p>
        </div>
        <h2 className="film-title text-uppercase text-center">Blue My Mind</h2>
        <h5 className="film-director text-center text-uppercase">Directed by <span className="font-weight-bold">Lisa Bruhlmann</span></h5>
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
                  <h6 className="text-uppercase text-right">Lighthouse</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-time col">
                  <h6 className="text-uppercase font-weight-bold">11.45 am</h6>
                </div>
                <div className="film-cinema col">
                  <h6 className="text-uppercase text-right">Penthouse</h6>
                </div>
              </div>
              <div className="row film-screeningInfo">
                <div className="film-time col">
                  <h6 className="text-uppercase font-weight-bold">1.30 am</h6>
                </div>
                <div className="film-cinema col">
                  <h6 className="text-uppercase text-right">Embassy</h6>
                </div>
              </div>
          </div>
        </div>
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
      selectedFilm: false
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
        selectedFilm: itemID
      });
      console.log(itemID);

    }
}




export default App;
