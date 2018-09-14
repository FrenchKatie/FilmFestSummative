import React, { Component } from 'react';
import './index.css';
import './js/script.js';
import SimpleMap from './map';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      currentPage: 'page1'
    }

    this.changeClass = this.changePage.bind(this);

  }

  componentDidMount() {
    fetch("http://192.168.33.10:5000")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {

    var currentPage = this.state.currentPage;
    let page;

    if(currentPage === 'allCinemas'){
          page = <AllCinemas/>
    } else if(currentPage === 'allFilms'){
        page = <AllFilms/>
    }

    const { error, isLoaded, items } = this.state;

    if (error){
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="App">
          <header>
            <div className="row text-center">
              <div className="inactive col headerText text-uppercase" onClick={this.changePage.bind(this, 'allCinemas')}>Cinemas</div>
              <div className="active col headerText text-uppercase" onClick={this.changePage.bind(this, 'allFilms')}>Films</div>
            </div>
          </header>
            {page}
        </div>
      );
    }

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
    render() {
      return (
        <div id="filmList">
        <div id="anchor"></div>
        <hr />
          <h4 className="letter text-center">A</h4>

          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
          <div className="filmListItem row">
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
    }
}

export default App;
