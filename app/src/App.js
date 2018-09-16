import React, { Component } from 'react';
import './index.css';
import GoogleApiWrapper from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentPage: 'allCinemas'
    }
<<<<<<< HEAD
    this.changePage = this.changePage.bind(this);
    this.goToSignle = this.goToSignle.bind(this);
=======

    this.changePage = this.changePage.bind(this);

>>>>>>> 64626a515d2c3205d48419ac1127e4b9be9a4b32
  }

  render() {
    var currentPage = this.state.currentPage;
    let page;

    if(currentPage === 'allCinemas'){
          page = <AllCinemas/>
    }else if(currentPage === 'allFilms'){
        page = <AllFilms
                  handleChange={this.goToSignle}
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

  goToSignle(){
    this.setState({
      currentPage: 'singleFilm'
    })
  }
}

class AllCinemas extends Component {
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
<<<<<<< HEAD
    constructor(){
        super();
        this.state = {
          currentPage: 'allFilms'
        }
        this.changePage = this.changePage.bind(this);
      }


    render() {

      var currentPage = this.state.currentPage;
      let page;

      if(currentPage === 'allCinemas'){
            page = <AllCinemas/>
      }else if(currentPage === 'allFilms'){
          page = <AllFilms/>
      } else if (currentPage === 'singleFilm') {
          page = <SingleFilm/>
      }


      return (
        <div id="filmList">
          <h4 className="letter text-center">A</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film1">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">American Animals</h5>
              <h6 className="filmListItem-director">Bart Layton</h6>
              <p className="filmListItem-description">Rising stars Barry Keoghan (The Killing of a Sacred Deer) and Evan Peters (American Horror Story) lead this enthralling true-crime thriller that is as thematically probing as it is straight-up propulsive.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film2">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">And Breathe Normally</h5>
              <h6 className="filmListItem-director">Ísold Uggadóttir</h6>
              <p className="filmListItem-description">A single mother turned border guard and a refugee from Guinea-Bissau form an unlikely bond in this intimate Icelandic drama about two people literally and figuratively trapped on the edge of the world.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>


          <h4 className="letter text-center">B</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film4">
                <h6 className="filmListItem-category text-center position-relative cat-bigNights">Big Nights</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Birds of Passage</h5>
              <h6 className="filmListItem-director">Cristina Gallego, Ciro Guerra</h6>
              <p className="filmListItem-description">The ancient traditions of Colombia’s indigenous Wayuu are shaped by an ambitious matriarch to stake a place for her clan in the burgeoning drug economy of the 1970s. This spectacularly original film opens NZIFF18.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film5">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Border</h5>
              <h6 className="filmListItem-director">Ali Abbasi</h6>
              <p className="filmListItem-description">An ingenious and twisted blend of crime drama and supernatural romance, this thrillingly unpredictable Swedish film from the writer of Let the Right One In delivers a fresh spin on Nordic mythology.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>
          <h4 className="letter text-center">C</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film1">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">American Animals</h5>
              <h6 className="filmListItem-director">Bart Layton</h6>
              <p className="filmListItem-description">Rising stars Barry Keoghan (The Killing of a Sacred Deer) and Evan Peters (American Horror Story) lead this enthralling true-crime thriller that is as thematically probing as it is straight-up propulsive.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film2">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">And Breathe Normally</h5>
              <h6 className="filmListItem-director">Ísold Uggadóttir</h6>
              <p className="filmListItem-description">A single mother turned border guard and a refugee from Guinea-Bissau form an unlikely bond in this intimate Icelandic drama about two people literally and figuratively trapped on the edge of the world.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>
          <h4 className="letter text-center">D</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film1">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">American Animals</h5>
              <h6 className="filmListItem-director">Bart Layton</h6>
              <p className="filmListItem-description">Rising stars Barry Keoghan (The Killing of a Sacred Deer) and Evan Peters (American Horror Story) lead this enthralling true-crime thriller that is as thematically probing as it is straight-up propulsive.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film2">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">And Breathe Normally</h5>
              <h6 className="filmListItem-director">Ísold Uggadóttir</h6>
              <p className="filmListItem-description">A single mother turned border guard and a refugee from Guinea-Bissau form an unlikely bond in this intimate Icelandic drama about two people literally and figuratively trapped on the edge of the world.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>
          <h4 className="letter text-center">E</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film1">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">American Animals</h5>
              <h6 className="filmListItem-director">Bart Layton</h6>
              <p className="filmListItem-description">Rising stars Barry Keoghan (The Killing of a Sacred Deer) and Evan Peters (American Horror Story) lead this enthralling true-crime thriller that is as thematically probing as it is straight-up propulsive.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film2">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">And Breathe Normally</h5>
              <h6 className="filmListItem-director">Ísold Uggadóttir</h6>
              <p className="filmListItem-description">A single mother turned border guard and a refugee from Guinea-Bissau form an unlikely bond in this intimate Icelandic drama about two people literally and figuratively trapped on the edge of the world.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>
          <h4 className="letter text-center">F</h4>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film1">
                <h6 className="filmListItem-category text-center position-relative cat-fresh">Fresh</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">American Animals</h5>
              <h6 className="filmListItem-director">Bart Layton</h6>
              <p className="filmListItem-description">Rising stars Barry Keoghan (The Killing of a Sacred Deer) and Evan Peters (American Horror Story) lead this enthralling true-crime thriller that is as thematically probing as it is straight-up propulsive.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film2">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">And Breathe Normally</h5>
              <h6 className="filmListItem-director">Ísold Uggadóttir</h6>
              <p className="filmListItem-description">A single mother turned border guard and a refugee from Guinea-Bissau form an unlikely bond in this intimate Icelandic drama about two people literally and figuratively trapped on the edge of the world.</p>

            </div>
          </div>
          <div className="filmListItem row" onClick={this.changePage.bind(this, 'singleFilm')}>
            <div className="col">
              <div className="filmListItem-img" id="film3">
                <h6 className="filmListItem-category text-center position-relative cat-world">World</h6>
              </div>
            </div>
            <div className="col">
              <h5 className="filmListItem-title">Ash Is Purest White</h5>
              <h6 className="filmListItem-director">Jia Zhang-ke</h6>
              <p className="filmListItem-description">The transfixing Zhao Tao plays a tough, resilient woman in love with a small-time hoodlum in Jia Zhang-ke’s epic gangland romance, set against China’s relentless modernisation in the 21st century.</p>

            </div>
          </div>
        </div>

      );
=======

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
>>>>>>> 64626a515d2c3205d48419ac1127e4b9be9a4b32
    }

    changePage(pageNumber){
      console.log('test');
      this.props.handleChange(pageNumber);
    }
}



export default App;
